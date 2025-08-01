const express = require('express');
     const router = express.Router();
     const providerService = require('../services/providerService');
     
     router.post('/', async (req, res) => {
       const result = await providerService.createProvider(req.body);
       res.status(result.status === 'success' ? 201 : 400).json(result);
     });
     
     router.get('/:id', async (req, res) => {
       const result = await providerService.getProviderById(req.params.id);
       res.status(result.status === 'success' ? 200 : 404).json(result);
     });
     
     router.get('/', async (req, res) => {
       const result = await providerService.getAllProviders();
       res.status(result.status === 'success' ? 200 : 500).json(result);
     });
     
     router.patch('/:id', async (req, res) => {
       const result = await providerService.updateProvider(req.params.id, req.body);
       res.status(result.status === 'success' ? 200 : 404).json(result);
     });
     
     router.delete('/:id', async (req, res) => {
       const result = await providerService.deleteProvider(req.params.id);
       res.status(result.status === 'success' ? 200 : 404).json(result);
     });
     
     module.exports = router;