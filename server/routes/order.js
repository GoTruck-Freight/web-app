const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Orders GET
router.get('/', (req, res) => {
    Order.find()
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sifarişler alınamadı' });
      });
  });
  
  // Order GET by ID
  router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return res.status(404).json({ error: 'Sifariş bulunamadı' });
        }
        res.json(order);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sipariş alınamadı' });
      });
  });
  
  // Order POST
  router.post('/', (req, res) => {
    const { number, created_at, payment, minpayment, maxpayment, propsalpayment, trucktype, weight, route, feedback, status } = req.body;
    const newOrder = new Order({ number, created_at, payment, minpayment, maxpayment, propsalpayment, trucktype, weight, route, feedback, status });
    newOrder.save()
      .then((order) => {
        res.status(201).json(order);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sipariş oluşturulamadı' });
      });
  });
  
  // Order PUT
  router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const { number, created_at, payment, minpayment, maxpayment, propsalpayment, trucktype, weight, route, feedback, status } = req.body;
    Order.findByIdAndUpdate(orderId, { number, created_at, payment, minpayment, maxpayment, propsalpayment, trucktype, weight, route, feedback, status }, { new: true })
      .then((order) => {
        if (!order) {
          return res.status(404).json({ error: 'Sifariş bulunamadı' });
        }
        res.json(order);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sifariş güncellenemedi' });
      });
  });
  
  // Order DELETE
  router.delete('/:id', (req, res) => {
    const orderId = req.params.id;
    Order.findByIdAndDelete(orderId)
      .then((order) => {
        if (!order) {
          return res.status(404).json({ error: 'Sipariş bulunamadı' });
        }
        res.json({ message: 'Sipariş başarıyla silindi' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sipariş silinemedi' });
      });
  });
  
module.exports = router;