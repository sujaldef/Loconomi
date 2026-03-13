import express from 'express';
import * as userService from '../services/userService.js';
import {
  authenticateToken,
  authorizeOwner,
} from '../middleware/authMiddleware.js';
import {
  validateLocationRequest,
  validateRequest,
} from '../middleware/validationMiddleware.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const router = express.Router();

// GET user profile (requires auth)
router.get(
  '/me',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const result = await userService.getUserById(req.user.id);
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

// UPDATE user profile (requires auth and ownership)
router.patch(
  '/:id',
  authenticateToken,
  authorizeOwner,
  asyncHandler(async (req, res) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

// DELETE user (requires auth and ownership)
router.delete(
  '/:id',
  authenticateToken,
  authorizeOwner,
  asyncHandler(async (req, res) => {
    const result = await userService.deleteUser(req.params.id);
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

// Get nearby providers for service request
router.post(
  '/:id/request',
  authenticateToken,
  authorizeOwner,
  validateLocationRequest,
  validateRequest,
  asyncHandler(async (req, res) => {
    const { serviceType, location } = req.body;
    const result = await userService.createRequest(
      req.params.id,
      serviceType,
      location,
    );
    res.status(result.status === 'success' ? 201 : 400).json(result);
  }),
);

export default router;
