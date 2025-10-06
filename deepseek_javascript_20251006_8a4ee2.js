const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['customer', 'cleaner', 'admin'], default: 'customer' },
  // Cleaner specific fields
  profile: {
    photo: String, // URL to photo
    idVerified: Boolean,
    fingerprintVerified: Boolean,
    backgroundCheck: Boolean,
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    skills: [String], // e.g., ['deep_cleaning', 'green_cleaning']
    certifications: [{
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCourse' },
      dateCompleted: Date
    }]
  },
  // Customer specific fields (if any)
  customerInfo: {
    address: String,
    // ... other customer specific info
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);