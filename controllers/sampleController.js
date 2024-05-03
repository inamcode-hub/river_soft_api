const Sample = require('../models/sampleModel');

exports.getSample = async (req, res) => {
  try {
    const samples = await Sample.find();
    res.json(samples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
