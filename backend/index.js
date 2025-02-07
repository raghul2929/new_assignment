const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import routes
const mongoose = require('mongoose');
const path = require('path');
dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  methods: "GET,POST,PUT,DELETE",  // Allow certain HTTP methods
  credentials: true, // Allow credentials (cookies, headers)
}));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB connection
let connectdb=async()=>{
  // let connection = await mongoose.connect(MONGODB_URI)
  // console.log('Connected to MongoDB');await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await mongoose.connect(process.env.MONGODB_URI)

    .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));



}
connectdb();

// Routes setup
app.use('/api', routes); // Mount routes

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
