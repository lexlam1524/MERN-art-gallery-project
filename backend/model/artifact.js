import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
}, { timestamps: true });

const Artifact = mongoose.model('Artifact', artifactSchema);

export default Artifact;
