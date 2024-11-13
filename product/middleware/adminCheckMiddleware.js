const adminCheck= async (req, res, next) => {
  const role = req.user.role;

  if (role === 'admin') return next();
  res.status(403).json({ success: false, message: 'Access denied' });
}

export default adminCheck;
