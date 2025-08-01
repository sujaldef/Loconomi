const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

const { createRequest } = require('../services/userService'); 
router.post('/', async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(result.status === 'success' ? 201 : 400).json(result);
});

router.get('/:id', async (req, res) => {
  const result = await userService.getUserById(req.params.id);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

router.get('/', async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(result.status === 'success' ? 200 : 500).json(result);
});

router.patch('/:id', async (req, res) => {
  const result = await userService.updateUser(req.params.id, req.body);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

router.post('/:id/request', async (req, res) => {
  const { id } = req.params;
  const { serviceType, location } = req.body;

  // Basic validation (optional)
  if (!serviceType || !location || !location.longitude || !location.latitude) {
    return res.status(400).json({ status: 'error', message: 'Invalid request body', data: null });
  }

  const result = await createRequest(id, serviceType, location);
  res.status(result.status === 'success' ? 201 : 400).json(result);
});

module.exports = router;