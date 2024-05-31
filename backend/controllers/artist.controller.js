import Artist from '../model/artist.js';
import { errorHandler } from '../utils/error.js';



/**
 * POST /artists
 * Creates a new artist.
 * 
 * Request Body:
 * {
 *  "name": String (required),
 *  "bio": String (optional),
 *  "profilePicture": String (optional)
 * }
 * 
 * Response:
 * 201 Created: Artist created successfully.
 * 400 Bad Request: Invalid request data.
 */
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


/**
 * GET /artists
 * Retrieves a list of all artists.
 * 
 * Response:
 * 200 OK: List of artists returned successfully.
 * 500 Internal Server Error: Error fetching artists.
 */
export const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artists'));
  }
};

/**
 * GET /artists/:id
 * Retrieves a single artist by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Response:
 * 200 OK: Artist returned successfully.
 * 404 Not Found: Artist not found.
 */
export const getArtistById = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return next(errorHandler(404, 'Artist not found'));
    res.status(200).json(artist);
  } catch (err) {
    next(errorHandler(500, 'Could not fetch artist'));
  }
};

/**
 * PUT /artists/:id
 * Updates a single artist by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Request Body:
 * {
 *  "name": String (optional),
 *  "bio": String (optional),
 *  "profilePicture": String (optional)
 * }
 * 
 * Response:
 * 200 OK: Artist updated successfully.
 * 404 Not Found: Artist not found.
 */
export const updateArtist = async (req, res, next) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtist) return next(errorHandler(404, 'Artist not found'));
    res.status(200).json(updatedArtist);
  } catch (err) {
    next(errorHandler(500, 'Could not update artist'));
  }
};


/**
 * DELETE /artists/:id
 * Deletes a single artist by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Response:
 * 200 OK: Artist deleted successfully.
 * 404 Not Found: Artist not found.
 */
export const deleteArtist = async (req, res, next) => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
    if (!deletedArtist) return next(errorHandler(404, 'Artist not found'));
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (err) {
    next(errorHandler(500, 'Could not delete artist'));
  }
};
