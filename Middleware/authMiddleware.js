// middleware/auth.js

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
  },

  forwardAuthenticated: (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    res.redirect('/'); // Redirect to home if already logged in
  },

  ensureAdmin: (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      return next();
    }
    req.flash('error_msg', 'Admin access only');
    res.redirect('/login');
  }
};
