const RoadService = require('../services/road-service');

// Create the router instance
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(await RoadService.load())
})

router.get('/name=:name', async (req, res) => {
  const name = req.params.name
  const status = await RoadService.findByStatusName(name)
  if (!status) return res.status(404)
  res.status(201).json(status)
})
module.exports = router


// Road POST: Create a new road
router.post('/', async (req, res) => {
  const status = await RoadService.insert(req.body);
  res.status(201).send(status);
});

// Road PUT: Update an existing road
router.put('/:id', async (req, res) => {
  const status = await RoadService.update(req.params.id, req.body);
  if (!status) return res.status(404).send('Road not found');
  res.send(status);
});

// Road DELETE: Delete a road
router.delete('/:id', async (req, res) => {
  const deletedRoad = await RoadService.removeBy('_id', req.params.id);
  if (!deletedRoad.deletedCount) return res.status(404).send('Road not found');
  res.sendStatus(204);
});

module.exports = router