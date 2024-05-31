import express from 'express';
import { createArtifact, getArtifacts, getArtifactById, updateArtifact, deleteArtifact } from '../controllers/artifact.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createArtifact);
router.get('/', getArtifacts);
router.get('/:id', getArtifactById);
router.put('/:id', updateArtifact);
router.delete('/:id', deleteArtifact);

export default router;
