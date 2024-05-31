import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
}, { timestamps: true });

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
