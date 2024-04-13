const jwt = require("jsonwebtoken");

function requireAdminLogin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
  }

  jwt.verify(token, "process.env.JWT_SECRET", (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ success: false, message: "Failed to authenticate token" });
    }

    req.adminId = decoded.id;
    next();
  });
}

module.exports = { requireAdminLogin };