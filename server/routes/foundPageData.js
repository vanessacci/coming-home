let express = require('express');
let router = express.Router();
const {Found} = require('../models');

router.get('/api/foundPets' , async (req, res) => {
    try{
        const foundPets = await Found.find({homed: false})
    //   console.log(foundPets);
        res.json( foundPets );
      } catch (error) {
        res.status(500).json({ message: error.message});
      }
})

module.exports = router;
