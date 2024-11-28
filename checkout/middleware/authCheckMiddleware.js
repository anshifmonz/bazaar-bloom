import axios from 'axios'

const checkAuthStatus = async (req, res) => {
  try {
    const response = await axios.get('http://user-service:3001/auth/validate-session', {
      headers: { Cookie: req.headers.cookie },
    });

    if (response.data.isAuthenticated) {
      req.user = response.data.user;
      return true;
    } else {
      return false
    }
  } catch (error) {
    throw new Error('Server error');
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const isLogged = await checkAuthStatus(req, res);
    if (isLogged) return next()  
    res.status(403).json({ message: 'User not logged In' });    
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }  
};

export default isAuthenticated;
