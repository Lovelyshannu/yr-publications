const nodemailer = require('nodemailer');

exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.postContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password',
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'YRPublication@gmail.com',
      subject: `Message from ${name}`,
      text: message,
    });

    req.flash('success_msg', 'Message sent successfully!');
    res.redirect('/contact');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to send message. Try again later.');
    res.redirect('/contact');
  }
};