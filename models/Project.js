import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    ctsorcap: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4
    },
    note: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);

