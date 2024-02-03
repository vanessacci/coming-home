const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const cors = require("cors");
app.use(cors());
connectDB();
const PORT = process.env.PORT || 8000;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

// routes
const lostFormUpload = require('./routes/lostFormUpload');
const foundFormUpload = require('./routes/foundFormUpload');
app.use(lostFormUpload);
app.use(foundFormUpload);

const lostPets = require('./routes/lostPageData');
app.use(lostPets);

const foundPets = require('./routes/lostPageData');
app.use(foundPets);

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
