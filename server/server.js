const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

connectDB();

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
