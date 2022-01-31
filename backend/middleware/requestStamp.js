module.exports = (req, res, next) => {
  console.log('Method - ', req.method, Date().normalize());
  next();
};
