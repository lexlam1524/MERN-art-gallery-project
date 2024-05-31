import User from '../model/user.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';



/**
 * GET /users
 * Retrieves a list of all users.
 * 
 * Response:
 * 200 OK: List of users returned successfully.
 * 500 Internal Server Error: Error fetching users.
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    const usersWithoutPassword = users.map(user => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /users/:id
 * Updates a single user by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Request Body:
 * {
 *  "username": String (optional),
 *  "email": String (optional),
 *  "password": String (optional),
 *  "profilePicture": String (optional)
 * }
 * 
 * Response:
 * 200 OK: User updated successfully.
 * 404 Not Found: User not found.
 */

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


/**
 * DELETE /users/:id
 * Deletes a single user by ID.
 * 
 * Path Parameters:
 *  "id": String (required)
 * 
 * Response:
 * 200 OK: User deleted successfully.
 * 404 Not Found: User not found.
 */


export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}