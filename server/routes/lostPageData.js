let express = require('express');
let router = express.Router();
const {Lost} = require('../models');

router.get('/api/lostPets/' , async (req, res) => {
    try{
        const lostPets = await Lost.find({ found: false})
      console.log(expenses)
        res.json({ lostPets });
      } catch (error) {
        res.status(500).json({ message: error.message});
      }
})

module.exports = router;
