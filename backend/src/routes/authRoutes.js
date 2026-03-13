import express from 'express';
import {
  userSignup,
  userLogin,
  providerSignup,
  providerLogin,
} from '../services/authService.js';
import {
  validateSignup,
  validateLogin,
  validateProviderSignup,
  validateRequest,
} from '../middleware/validationMiddleware.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const router = express.Router();

// User Routes
router.post(
  '/user/signup',
  validateSignup,
  validateRequest,
  asyncHandler(async (req, res) => {
    const result = await userSignup(req.body);
    res.status(result.status === 'success' ? 201 : 400).json(result);
  }),
);

router.post(
  '/user/login',
  validateLogin,
  validateRequest,
  asyncHandler(async (req, res) => {
    const result = await userLogin(req.body.email, req.body.password);
    res.status(result.status === 'success' ? 200 : 401).json(result);
  }),
);

// Provider Routes
router.post(
  '/provider/signup',
  validateProviderSignup,
  validateRequest,
  asyncHandler(async (req, res) => {
    const result = await providerSignup(req.body);
    res.status(result.status === 'success' ? 201 : 400).json(result);
  }),
);

router.post(
  '/provider/login',
  validateLogin,
  validateRequest,
  asyncHandler(async (req, res) => {
    const result = await providerLogin(req.body.email, req.body.password);
    res.status(result.status === 'success' ? 200 : 401).json(result);
  }),
);

export default router;
