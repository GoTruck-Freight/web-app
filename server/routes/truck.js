
const TruckService = require('../services/truck-service');

// Create the router instance
const express = require('express');
const router = express.Router();

// GET all trucks
router.get('/', async (req, res) => {
  res.send(await TruckService.load())
})


// GET truck by name
router.get('/name=:name', async (req, res) => {

  const truck = await TruckService.findBy("name", req.params.name)

  if (!truck) return res.status(404)
  res.send(truck)
})

// POST a new truck
router.post('/', async (req, res) => {
  const truck = await TruckService.insert(req.body);
  res.status(201).send(truck);
});

// UPDATE truck by ID
router.put('/:id', async (req, res) => {
  const updatedTruck = await TruckService.update(req.params.id, req.body);
  if (!updatedTruck) return res.status(404).send('Truck not found');
  res.send(updatedTruck);
});

// DELETE truck by ID
router.delete('/:id', async (req, res) => {
  const deletedTruck = await TruckService.removeBy('_id', req.params.id);
  if (!deletedTruck.deletedCount) return res.status(404).send('Truck not found');
  res.sendStatus(204);
});


module.exports = router;