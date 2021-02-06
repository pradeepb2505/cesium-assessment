module.exports = function ErrorMiddleware(err, req, res, next) {
  res.status(404).send({ url: req.originalUrl + " not found", err });
};
