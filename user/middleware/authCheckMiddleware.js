const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(302).json({ message: 'User not logged In' });
}

const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.status(302).json({ message: 'User already logged In' });
}

export { isAuthenticated, isNotAuthenticated };
