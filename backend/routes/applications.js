const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');


router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id
    }).sort({ appliedDate: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const newApplication = new Application({
      ...req.body,
      user: req.user.id
    });

    const saved = await newApplication.save();
    res.json(saved);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

 
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, returnDocument: 'after' } 
    );

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

 
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.json({ message: 'Application deleted' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;