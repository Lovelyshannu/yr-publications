const Certificate = require('../models/certificate');
const path = require('path');
const fs = require('fs');

exports.getCertificateForm = (req, res) => {
  res.render('certificate', { certificate: null, verified: null });
};


exports.postCertificateVerification = async (req, res) => {
  const { certificateNumber } = req.body;
  try {
    const certificate = await Certificate.findOne({ certificateNumber });
    if (!certificate) {
      req.flash('error_msg', 'Invalid certificate number');
      return res.render('certificate', { certificate: null, verified: false });
    }
    res.render('certificate', { certificate, verified: true });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Server error');
    res.render('certificate', { certificate: null, verified: false });
  }
};

// Only admin can upload certificates
exports.getUploadForm = (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    req.flash('error_msg', 'Access denied');
    return res.redirect('/');
  }
  res.render('upload');
};

exports.postUpload = (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    req.flash('error_msg', 'Access denied');
    return res.redirect('/');
  }

  const { certificateNumber, studentName, courseName } = req.body;

  if (!req.files || !req.files.certificateFile) {
    req.flash('error_msg', 'No file uploaded');
    return res.redirect('/certificates/upload');
  }

  const certFile = req.files.certificateFile;

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

  if (!allowedTypes.includes(certFile.mimetype)) {
    req.flash('error_msg', 'Invalid file type. Allowed PDF, JPG, PNG');
    return res.redirect('/certificates/upload');
  }

  const uniqueFileName = `${certificateNumber}_${Date.now()}_${certFile.name}`;
  const uploadPath = path.join(__dirname, '..', 'uploads', 'certificates', uniqueFileName);

  certFile.mv(uploadPath, async err => {
    if (err) {
      console.error(err);
      req.flash('error_msg', 'File upload failed');
      return res.redirect('/certificates/upload');
    }

    try {
      const existing = await Certificate.findOne({ certificateNumber });
      if (existing) {
        req.flash('error_msg', 'Certificate number already exists');
        return res.redirect('/certificates/upload');
      }

     const certificate = new Certificate({
        certificateNumber,
        studentName,
        courseName,
        filePath: `/uploads/certificates/${uniqueFileName}`,
        issueDate: new Date()
      });


      await certificate.save();
      req.flash('success_msg', 'Certificate uploaded successfully');
      res.redirect('/certificates');
     } catch (err) {
      console.error(err);
      if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath);
      } 
      req.flash('error_msg', 'Failed to save certificate');
      res.redirect('/certificates/upload');
    }
  });
};
