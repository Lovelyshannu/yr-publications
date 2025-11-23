<<<<<<< HEAD
exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.postContactForm = (req, res) => {
  // For demo: simply flash success message
  // In real app, you'd send email or save messages in DB

  req.flash('success_msg', 'Thank you for contacting us! We will respond soon.');
  res.redirect('/contact');
};
=======
exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.postContactForm = (req, res) => {
  // For demo: simply flash success message
  // In real app, you'd send email or save messages in DB

  req.flash('success_msg', 'Thank you for contacting us! We will respond soon.');
  res.redirect('/contact');
};
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
