const adminCheck= async (req, res, next) => {
  const userId = req.user.id;

  const resp = await getUserById(userId, 'data');
  if (resp.role === 'admin') return next();
  
  res.status(403).json({ success: false, message: 'Access denied' });
}

export default adminCheck;
