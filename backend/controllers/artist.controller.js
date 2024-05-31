import Artist from '../model/artist.js';
import { errorHandler } from '../utils/error.js';

export const createArtist = async (req, res, next) => {
  const { name, bio, profilePicture } = req.body;
  try {
    const newArtist = new Artist({ name, bio, profilePicture });
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    next(errorHandler(500, 'Could not create artist'));
  }
};

export const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artists'));
  }
};

export const getArtistById = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return next(errorHandler(404, 'Artist not found'));
    res.status(200).json(artist);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artist'));
  }
};

export const updateArtist = async (req, res, next) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtist) return next(errorHandler(404, 'Artist not found'));
    res.status(200).json(updatedArtist);
  } catch (err) {
    next(errorHandler(500, 'Could not update artist'));
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
    if (!deletedArtist) return next(errorHandler(404, 'Artist not found'));
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (err) {
    next(errorHandler(500, 'Could not delete artist'));
  }
};
