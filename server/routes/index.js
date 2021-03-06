'use strict';

module.exports = (router) => {

  /* Set the XSRF-TOKEN cookie on first request (Generated by lusca) */
  router.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', res.locals._csrf);
    next();
  });

  /**
   * Define all public routes here.
   */
  router.get([
    /* Pages */
    '/', '/theme',

    /* Error routes */
    '/lost',

    /* Users */
    '/users/sign-up', '/users/sign-in', '/users/sign-out'

  ], (req, res) => {
    /* Render the base layout */
    res.render('pages/main');
  });

};
