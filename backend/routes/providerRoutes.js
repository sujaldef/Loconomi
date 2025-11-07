// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const providerService = require('../services/providerService');

// === CREATE Provider ===
router.post('/', async (req, res) => {
  const result = await providerService.createProvider(req.body);
  res.status(result.status === 'success' ? 201 : 400).json(result);
});

// === GET All Providers ===
router.get('/', async (req, res) => {
  const result = await providerService.getAllProviders();
  res.status(result.status === 'success' ? 200 : 500).json(result);
});

// === GET Provider by ID ===
router.get('/:id', async (req, res) => {
  const result = await providerService.getProviderById(req.params.id);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

// === UPDATE Provider (PATCH) ===
router.patch('/:id', async (req, res) => {
  const result = await providerService.updateProvider(req.params.id, req.body);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

// === DELETE Provider ===
router.delete('/:id', async (req, res) => {
  const result = await providerService.deleteProvider(req.params.id);
  res.status(result.status === 'success' ? 200 : 404).json(result);
});

module.exports = router;