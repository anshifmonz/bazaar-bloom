import cryptoTokenGenerator from "../utils/cryptoTokenGenerator.js";
import redisClient from "../config/redisConfig.js";

const csrfTokenGenerator = async (req, res) => {
  try {
    const sessionId = req.headers.cookie
      ?.split('; ')
      .find(cookie => cookie.startsWith('connect.sid='))
      ?.split('=')[1];
      console.log(sessionId);
      
    if (!sessionId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const csrfKey = `csrf:${sessionId}`;
    const currentTime = Date.now();
    const neededExpireTimeLeft = 1000 * 60;

    const csrfData = await redisClient.get(csrfKey);
    if (csrfData) {
      const { token, expire } = JSON.parse(csrfData);
      const timeLeft = expire - currentTime;

      if (timeLeft > neededExpireTimeLeft) {
        // Reuse the existing CSRF token
        res.cookie("X-CSRF-TOKEN", token);
        return next();
      }
    }

    // Generate a new CSRF token if none exists or it's close to expiring
    const csrfToken = cryptoTokenGenerator(32);
    const expireTime = Date.now() + 1000 * 60 * 5; // 5 minutes

    // Store the CSRF token and its expiration in Redis
    const newCsrfData = JSON.stringify({ token: csrfToken, expire: expireTime });
    await redisClient.set(csrfKey, newCsrfData, { EX: 300 }); // Expire after 5 minutes

    res.cookie("X-CSRF-TOKEN", csrfToken);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}

export default csrfTokenGenerator;
