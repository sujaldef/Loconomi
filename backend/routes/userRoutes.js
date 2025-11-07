// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// === CREATE User ===
router.post('/', async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(result.status === 'success' ? 201 : 400).json(result);
});

// === GET All Users ===
router.get('/', async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(result.status === 'success' ? 200 : 500).json(result);
});

// === GET User by ID ===
router.get('/:id', async (req, res) => {
  const result = await userService.getUserById(req.params.id);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

// === UPDATE User (PATCH) ===
router.patch('/:id', async (req, res) => {
  const result = await userService.updateUser(req.params.id, req.body);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

// === DELETE User ===
router.delete('/:id', async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

// === CREATE Service Request (User requests a provider) ===
router.post('/:id/request', async (req, res) => {
  const { id } = req.params;
  const { serviceType, location } = req.body;

  if (!serviceType || !location || typeof location.longitude !== 'number' || typeof location.latitude !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'serviceType and location { longitude, latitude } are required',
      data: null
    });
  }

  const result = await userService.createRequest(id, serviceType, location);
  res.status(result.status === 'success' ? 201 : 400).json(result);
});

module.exports = router;