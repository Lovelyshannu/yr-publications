<<<<<<< HEAD
const PDFDocument = require("pdfkit");
const fs = require("fs");
const PlagiarismCert = require("../models/PlagiarismCert");

exports.generateCertificate = async (req, res) => {
    const score = req.query.score;
    const certId = "PCERT-" + Date.now();

    const filePath = `uploads/certificates/${certId}.pdf`;
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(24).text("Plagiarism Report Certificate", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Certificate ID: ${certId}`);
    doc.text(`Similarity Score: ${score}%`);
    doc.text(`Status: ${score < 20 ? "Pass" : "Fail"}`);
    doc.end();

    await PlagiarismCert.create({ certId, score, filePath });

    res.download(filePath);
};
=======
const PDFDocument = require("pdfkit");
const fs = require("fs");
const PlagiarismCert = require("../models/PlagiarismCert");

exports.generateCertificate = async (req, res) => {
    const score = req.query.score;
    const certId = "PCERT-" + Date.now();

    const filePath = `uploads/certificates/${certId}.pdf`;
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(24).text("Plagiarism Report Certificate", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Certificate ID: ${certId}`);
    doc.text(`Similarity Score: ${score}%`);
    doc.text(`Status: ${score < 20 ? "Pass" : "Fail"}`);
    doc.end();

    await PlagiarismCert.create({ certId, score, filePath });

    res.download(filePath);
};
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
