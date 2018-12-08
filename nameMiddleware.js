const nameMiddleWare = (req, res, next) => {
  const name = req.body.name;
  if (name.length > 128) {
    res.status(400).json({
      message: 'The user name must be no longer than 128 characters long.',
    });
  }
  if (name) {
    req.body.name = name.toUpperCase();
  }
  next();
};

module.exports = nameMiddleWare;
