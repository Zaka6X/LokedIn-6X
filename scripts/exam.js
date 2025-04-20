//definir la structure dexamen par mongoDB
const mongoose = require('mongoose');


const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  targetStudents: SMI_S4,
  accessLink: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);