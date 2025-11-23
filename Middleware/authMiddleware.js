<<<<<<< HEAD
module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Please log in first');
  res.redirect('/login');
};

module.exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin === true) {
    return next();
  }
  req.flash('error_msg', 'Admin access only');
  res.redirect('/login');
};
=======
module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Please log in first');
  res.redirect('/login');
};

module.exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin === true) {
    return next();
  }
  req.flash('error_msg', 'Admin access only');
  res.redirect('/login');
};
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
