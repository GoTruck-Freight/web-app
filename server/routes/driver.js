const DriverService = require('../services/driver-service');

// Create the router instance
const express = require('express');
const router = express.Router();

// Driver GET: Get all drivers
router.get('/', async (req, res) => {
  res.send(await DriverService.load());
});

// Driver GET: Get driver by ID
router.get('/:id', async (req, res) => {
  const driver = await DriverService.find(req.params.id);
  if (!driver) return res.status(404).send('Driver not found');
  res.send(driver);
});

// Driver GET: Get driver by name
router.get('/name/:name', async (req, res) => {

  const driver = await DriverService.findBy("name", req.params.name)

  if (!driver) return res.status(404)
  res.send(driver)
})





// Driver POST: Create a new driver
router.post('/', async (req, res) => {
  const driver = await DriverService.insert(req.body);
  res.status(201).send(driver);
});

// Driver PUT: Update an existing driver
router.put('/:id', async (req, res) => {
  const updatedDriver = await DriverService.update(req.params.id, req.body);
  if (!updatedDriver) return res.status(404).send('Driver not found');
  res.send(updatedDriver);
});

// Driver DELETE: Delete a driver
router.delete('/:id', async (req, res) => {
  const deletedDriver = await DriverService.removeBy('_id', req.params.id);
  if (!deletedDriver.deletedCount) return res.status(404).send('Driver not found');
  res.sendStatus(204);
});

module.exports = router;