import mongoose from 'mongoose';

const aerospaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mission: {
    type: String,
    required: true,
    trim: true
  },
  launchDate: {
    type: Date,
    required: true
  },
  agency: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['planned', 'active', 'completed', 'failed'],
    default: 'planned'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
aerospaceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Aerospace = mongoose.model('Aerospace', aerospaceSchema);

export default Aerospace; 