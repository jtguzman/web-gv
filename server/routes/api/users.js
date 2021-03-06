'use strict';

var bcrypt = require('bcrypt');

module.exports = (router, db) => {

  var User = db.model('user');

  /**
   * Creates a user.
   */
  router.post('/', (req, res, next) => {

    new User(req.body).save((err, user) => {
      if (err) {
        /* Check for duplicated entry */
        if (err.code && err.code === 11000) {
          return res.status(409).end();
        }

        /* Check for invalid data */
        if (err.name && err.name === 'ValidationError') {
          return res.status(400).end();
        }

        /* Unknown error */
        return next(err);
      }

      req.session.user = user.toObject();

      res.status(201).send(user);
    });

  });

  /**
   * Logs a user in.
   */
  router.post('/sign-in', (req, res, next) => {

    /* Logout any previous user */
    delete req.session.user;

    User.findByEmail(req.body.email).

    populate('role').
    populate('gender').

    exec((err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next();
      }

      /* Compare the passwords */
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (err) {
          return next(err);
        }

        if (!matches) {
          return next();
        }

        req.session.user = user;

        res.send(user);
      });
    });

  }, (req, res) => {
    setTimeout(() => {
      res.status(401).end();
    }, 1000);
  });

  /**
   * Logs a user out.
   */
  router.get('/sign-out', (req, res) => {

    delete req.session.user;

    res.status(204).end();

  });

};
