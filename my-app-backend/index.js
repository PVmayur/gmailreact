// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file
  },
});

const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jewelrydb',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// POST route to submit form data
app.post('/api/submit', upload.single('profilePic'), (req, res) => {
  const { name, email, gender, plan, terms } = req.body;
  const profilePicPath = req.file.path; // Path to the uploaded file

  const query = 'INSERT INTO users (name, email, gender, plan, terms, profilePic) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, email, gender, plan, terms, profilePicPath], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Data submitted successfully!' });
  });
});

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
