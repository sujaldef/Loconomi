import express from 'express';
import * as providerService from '../services/providerService.js';
import {
  authenticateToken,
  authorizeOwner,
} from '../middleware/authMiddleware.js';
import {
  validateProviderUpdate,
  validateRequest,
} from '../middleware/validationMiddleware.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const router = express.Router();

// GET all providers (public endpoint with pagination)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      role: req.query.role,
      availability: req.query.availability,
      minRating: req.query.minRating,
    };

    const result = await providerService.getAllProviders(page, limit, filters);
    res.status(result.status === 'success' ? 200 : 500).json(result);
  }),
);

// GET providers by role
router.get(
  '/role/:role',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const result = await providerService.getProvidersByRole(
      req.params.role,
      page,
      limit,
    );
    res.status(result.status === 'success' ? 200 : 500).json(result);
  }),
);

// GET provider profile (requires auth)
router.get(
  '/me',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const result = await providerService.getProviderById(req.user.id);
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

// GET specific provider by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const result = await providerService.getProviderById(req.params.id);
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

// UPDATE provider (requires auth and ownership)
router.patch(
  '/:id',
  authenticateToken,
  authorizeOwner,
  validateProviderUpdate,
  validateRequest,
  asyncHandler(async (req, res) => {
    const result = await providerService.updateProvider(
      req.params.id,
      req.body,
    );
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

// UPDATE availability
router.patch(
  '/:id/availability',
  authenticateToken,
  authorizeOwner,
  asyncHandler(async (req, res) => {
    const { availability } = req.body;
    if (!availability || !['Available', 'Busy'].includes(availability)) {
      return res.status(400).json({
        status: 'error',
        message: 'Valid availability value required',
        data: null,
      });
    }
    const result = await providerService.updateAvailability(
      req.params.id,
      availability,
    );
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

// DELETE provider (requires auth and ownership)
router.delete(
  '/:id',
  authenticateToken,
  authorizeOwner,
  asyncHandler(async (req, res) => {
    const result = await providerService.deleteProvider(req.params.id);
    res.status(result.status === 'success' ? 200 : 404).json(result);
  }),
);

export default router;
