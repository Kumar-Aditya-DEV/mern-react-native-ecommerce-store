const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a file' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      url: imageUrl
    }
  });
};

module.exports = { uploadImage };
