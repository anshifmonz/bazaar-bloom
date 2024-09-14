const logOutController = async (req, res) => {
  req.logOut(err => {
    if (err) return res.status(500).json({ message: 'Server error' });
    req.session.destroy(err => {
      if (err) res.status(500).json({ message: 'Server error' });

      res.clearCookie('connect.sid');
      res.status(200).json({ success: true, message: 'logOut successful'})
    })
  })
}

export default logOutController;
