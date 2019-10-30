const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/', (req, res, next) => {
  passport.authenticate(
    'local',
    {
      session: false,
    },
    (err, user, info) => {
      if (err || !user) return next(createError(401, 'Authentication failed.'));

      req.login(
        user,
        {
          session: false,
        },
        err => {
          if (err) return next(createError(500));

          let dataToBeSent = {
            id: user._id,
            name: user.name,
            email: user.email,
          };

          let token = jwt.sign(dataToBeSent, 'super-secret-key');
          res.json({
            token,
          });
        }
      );
    }
  )(req, res);
});

router.get(
  'me',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res, next) => {
    res.json(req.user);
  }
);

module.exports = router;
