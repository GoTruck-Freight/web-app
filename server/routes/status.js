const StatusService = require('../services/status-service');

// Create the router instance
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(await StatusService.load())
})

router.get('/name=:name', async (req, res) => {
  const name = req.params.name
  const status = await StatusService.findBy("name", req.params.name)
  if (!status) return res.status(404)
  res.status(201).json(status)
})


// Status POST: Create a new status
router.post('/', async (req, res) => {
  const status = await StatusService.insert(req.body);
  res.status(201).send(status);
});

// Status PUT: Update an existing status
router.put('/:id', async (req, res) => {
  const updatedStatus = await StatusService.update(req.params.id, req.body);
  if (!updatedStatus) return res.status(404).send('Status not found');
  res.send(updatedStatus);
});

// Status DELETE: Delete a status
router.delete('/:id', async (req, res) => {
  const deletedStatus = await StatusService.removeBy('_id', req.params.id);
  if (!deletedStatus.deletedCount) return res.status(404).send('Status not found');
  res.sendStatus(204);
});

module.exports = router