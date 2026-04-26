const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader); // 👈 DEBUG

    if (!authHeader) {
      return res.status(401).json({ message: 'No token' });
    }

    const token = authHeader.split(' ')[1];

    console.log("TOKEN:", token); // 👈 DEBUG
    console.log("SECRET:", process.env.JWT_SECRET); // 👈 DEBUG

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded); // 👈 DEBUG

    req.user = decoded;
    next();

  } catch (err) {
    console.error("JWT ERROR:", err.message);
    res.status(401).json({ message: 'Token invalid' });
  }
};