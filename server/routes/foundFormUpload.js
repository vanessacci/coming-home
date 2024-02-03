let express = require("express");
let router = express.Router();
const { Found } = require("../models");

router.post("/api/found-form-upload", async (req, res) => {
  try {
    const foundData = new Found(req.body);
    console.log(req.body);
    const savedFoundData = await foundData.save();
    res
      .status(200)
      .json({ message: "Pet data saved successfully", data: savedFoundData });
  } catch (error) {
    res.status(500).json({ message: "Error saving pet data", error });
  }
});

module.exports = router;
