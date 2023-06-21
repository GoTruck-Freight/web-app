const OrderService = require('../services/order-service');

// Create the router instance
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(await OrderService.load())
})


router.get('/:id', async (req, res) => {
  const order = await OrderService.find(req.params.id)
  if (!order) return res.status(404).send('Cannot find order')
  res.send(order)
})

// Order POST: Create a new order
router.post('/', async (req, res) => {
  const order = await OrderService.insert(req.body);
  res.status(201).send(order);
});

// Order PUT: Update an existing order
router.put('/:id', async (req, res) => {
  const updatedOrder = await OrderService.update(req.params.id, req.body);
  if (!updatedOrder) return res.status(404).send('Orders not found');
  res.send(updatedOrder);
});

// Order DELETE: Delete a order
router.delete('/:id', async (req, res) => {
  const deletedOrder = await OrderService.removeBy('_id', req.params.id);
  if (!deletedOrder.deletedCount) return res.status(404).send('Orders not found');
  res.sendStatus(204);
});

module.exports = router