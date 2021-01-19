const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token"),
      url = req.url;

    // dont check login and register
    if (url == "/api/register" || url == "/api/login") {
      return next();
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Təsdiqləmə tokeni yoxdur. Təsdiqləmə rədd edildi." });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ message: "Token təsdiq olunmadı. Təsdiqləmə rədd edildi." });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = auth;
