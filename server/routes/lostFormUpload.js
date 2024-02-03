let express = require('express');
let router = express.Router();
const lostSchema = require('../models/Lost');

router.post('/api/lostFormUpload', async (req, res) => {
    try {
      const lostData = new lostSchema(req.body);
      const savedPet = await newPet.save();
      res.status(200).json({ message: 'Pet data saved successfully', data: savedPet });
    } catch (error) {
      res.status(500).json({ message: 'Error saving pet data', error });
    }
  });