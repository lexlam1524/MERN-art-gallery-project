import Artifact from '../model/artifact.js';
import { errorHandler } from '../utils/error.js';

export const createArtifact = async (req, res, next) => {
  const { title, description, imageUrl, artist } = req.body;
  try {
    const newArtifact = new Artifact({ title, description, imageUrl, artist });
    await newArtifact.save();
    res.status(201).json(newArtifact);
  } catch (err) {
    next(errorHandler(500, 'Could not create artifact'));
  }
};

export const getArtifacts = async (req, res, next) => {
  try {
    const artifacts = await Artifact.find().populate('artist');
    res.status(200).json(artifacts);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artifacts'));
  }
};

export const getArtifactById = async (req, res, next) => {
  try {
    const artifact = await Artifact.findById(req.params.id).populate('artist');
    if (!artifact) return next(errorHandler(404, 'Artifact not found'));
    res.status(200).json(artifact);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artifact'));
  }
};

export const updateArtifact = async (req, res, next) => {
  try {
    const updatedArtifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtifact) return next(errorHandler(404, 'Artifact not found'));
    res.status(200).json(updatedArtifact);
  } catch (err) {
    next(errorHandler(500, 'Could not update artifact'));
  }
};

export const deleteArtifact = async (req, res, next) => {
  try {
    const deletedArtifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!deletedArtifact) return next(errorHandler(404, 'Artifact not found'));
    res.status(200).json({ message: 'Artifact deleted successfully' });
  } catch (err) {
    next(errorHandler(500, 'Could not delete artifact'));
  }
};
