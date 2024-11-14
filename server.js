const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;  // Change this to your backend port

// Enable CORS for cross-origin requests from Angular
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save uploaded images to the local folder
    cb(null, path.join(__dirname, 'src/assets/uploads/hotelimages'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Route to upload a single image
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const filePath = `assets/uploads/hotelimages/${req.file.filename}`; // Path for the image
    res.json({ path: filePath }); // Send the image path back to the client
  } else {
    res.status(400).json({ message: 'Failed to upload image' });
  }
});

// Start server on port 3000
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
