'use strict';

module.exports = function (router) {

  /**
   * Get current session's public data.
   */
  router.get('/session', function (req, res) {

    /* Check if there's a user in session */
    if (!req.session.user) {
      return res.status(401).end();
    }

    res.send({
      gender: req.session.user.gender,
      name: req.session.user.name,
      _id: req.session.user._id
    });
  });

};
