// MIDDLEWARES
const upperCaser = (req, res, next) => {
  if (req.body.name) return req.name = req.body.name.toUpperCase();
  next();
}

module.exports = { upperCaser };
