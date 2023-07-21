const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
