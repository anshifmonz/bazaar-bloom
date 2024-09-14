import passport from 'passport'
import { Strategy } from "passport-local";

import authenticateUser from '../controller/auth/authController.js';
import { getUserById } from "../service/userService.js";

const initializePassport = (passport) => {
  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser( async (id, cb) =>  {
    try {
      const user = await getUserById(id, 'data')
      if (user === 'err') return cb(null, false, { message: 'Server error'});
      if (!user) return cb(null, false);
      return cb(null, user)
    } catch (err) {
      console.log('deserializeUser: ' + err)
      return cb(null, false, { message: 'Server error'});
    }
  })
}

const passportConfig = (app) => {
  initializePassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());
}

export default passportConfig;
