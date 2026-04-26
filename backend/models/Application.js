const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  jobLink: { type: String },
  notes: { type: String },
  interviewDate: { type: Date },
  salary: { type: String },
  appliedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);