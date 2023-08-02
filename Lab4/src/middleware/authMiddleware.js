
const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ExtractJwt } = passportJWT;

const User = require('../models/User');

// Set up local strategy for username/password authentication
passport.use(User.createStrategy());

// Set up JWT strategy for token-based authentication
passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key',
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.sub);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
