const User = require('./models/user');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Middleware for verifiyng the user's data.
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      return User.findOne({
        email,
        password,
      })
        .then(user => {
          if (!user)
            return done(null, false, {
              message: 'Incorrect email or password.',
            });

          return done(null, user, {
            message: 'Logged in successfully.',
          });
        })
        .catch(err => done(err));
    }
  )
);

// Middleware for verifying the recieved token.
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret-key',
    },
    (jwtPayload, done) => {
      let data = {
        id: jwtPayload.id,
        name: jwtPayload.name,
        email: jwtPayload.email,
      };

      done(null, data);
    }
  )
);
