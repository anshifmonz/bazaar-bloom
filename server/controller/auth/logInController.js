import passport from "passport";

const logInController = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(404).json({ message: info.message || 'Authentication failed'});

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.status(200).json({ message: 'LogIn Successful' });
    })
  })(req, res, next);
}

export default logInController;
