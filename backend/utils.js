const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  let payload = { ...user };
  delete payload.password;
  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "30d" });
};

const generateRecoveryToken = (user) => {
  let payload = { ...user };
  delete payload.password;
  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" });
};

const isAuth = (req, res, next) => {
  const { token, isStaySignin } = req.cookies;
  if (Boolean(token) === false) {
    return res.status(401).json({ message: "No Token" });
  }
  try {
    req.user = jwt.verify(token, process.env.JWTSECRET);
    req.isStaySignin = Boolean(isStaySignin);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const isDesigner = (req, res, next) => {
  if (req.user && (req.user.role === 1 || req.user.role === 2)) {
    next();
  } else {
    res.status(403).json({ message: "Invalid Designer Token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 0 && req.user.isDisabled === false) {
    next();
  } else {
    res.status(403).json({ message: "Invalid Admin Token" });
  }
};

const isSuperAdmin = (req, res, next) => {
  if (req.user.isSuper === true) {
    next();
  } else {
    res.status(403).json({ message: "Invalid Super Admin" });
  }
};

const isFederated  = (req, res, next) => {
  if (req.user && req.user.role ===  2) {
    next();
  } else {
    res.status(403).json({ message: "Invalid Federated Token" });
  }
};

const isRecovery = (req, res, next) => {
  const { recovery } = req.cookies;
  if (Boolean(recovery) === false) {
    return res.status(401).json({ message: "No Token" });
  }
  try {
    req.user = jwt.verify(recovery, process.env.JWTSECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  generateToken,
  generateRecoveryToken,
  isAuth,
  isDesigner,
  isAdmin,
  isSuperAdmin,
  isFederated,
  isRecovery,
};