let express = require('express');
let router = express.Router();
const {Lost} = require('../models');

router.post('/api/lostFormUpload', async (req, res) => {
    try {
      const lostData = new Lost(req.body);
      console.log(req.body);
      const savedLostData = await lostData.save();
      res.status(200).json({ message: 'Pet data saved successfully', data: savedLostData });
    } catch (error) {
      res.status(500).json({ message: 'Error saving pet data', error });
    }
  });

  module.exports = router;