import Artifact from '../model/artifact.js';
import { errorHandler } from '../utils/error.js';



/**
 * POST /artifacts
 * Creates a new artifact.
 * 
 * Request Body:
 * {
 *  "title": String (required),
 *  "description": String (optional),
 *  "imageUrl": String (optional),
 *  "artist": String (required)
 * }
 * 
 * Response:
 * 201 Created: Artifact created successfully.
 * 400 Bad Request: Invalid request data.
 */

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

/**
 * GET /artifacts
 * Retrieves a list of all artifacts.
 * 
 * Response:
 * 200 OK: List of artifacts returned successfully.
 * 500 Internal Server Error: Error fetching artifacts.
 */
export const getArtifacts = async (req, res, next) => {
  try {
    const artifacts = await Artifact.find().populate('artist');
    res.status(200).json(artifacts);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artifacts'));
  }
};


/**
 * GET /artifacts/:id
 * Retrieves a single artifact by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Response:
 * 200 OK: Artifact returned successfully.
 * 404 Not Found: Artifact not found.
 */
export const getArtifactById = async (req, res, next) => {
  try {
    const artifact = await Artifact.findById(req.params.id).populate('artist');
    if (!artifact) return next(errorHandler(404, 'Artifact not found'));
    res.status(200).json(artifact);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artifact'));
  }
};


/**
 * PUT /artifacts/:id
 * Updates a single artifact by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Request Body:
 * {
 *  "title": String (optional),
 *  "description": String (optional),
 *  "imageUrl": String (optional),
 *  "artist": String (optional)
 * }
 * 
 * Response:
 * 200 OK: Artifact updated successfully.
 * 404 Not Found: Artifact not found.
 */
export const updateArtifact = async (req, res, next) => {
  try {
    const updatedArtifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtifact) return next(errorHandler(404, 'Artifact not found'));
    res.status(200).json(updatedArtifact);
  } catch (err) {
    next(errorHandler(500, 'Could not update artifact'));
  }
};


/**
 * DELETE /artifacts/:id
 * Deletes a single artifact by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Response:
 * 200 OK: Artifact deleted successfully.
 * 404 Not Found: Artifact not found.
 */
export const deleteArtifact = async (req, res, next) => {
  try {
    const deletedArtifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!deletedArtifact) return next(errorHandler(404, 'Artifact not found'));
    res.status(200).json({ message: 'Artifact deleted successfully' });
  } catch (err) {
    next(errorHandler(500, 'Could not delete artifact'));
  }
};
