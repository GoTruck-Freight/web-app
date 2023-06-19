const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');

// Drivers GET
router.get('/', (req, res) => {
    Driver.find()
      .then((drivers) => {
        res.json(drivers);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sürücüler alınamadı' });
      });
  });
  
  // Driver GET by ID
  router.get('/:id', (req, res) => {
    const driverId = req.params.id;
    Driver.findById(driverId)
      .then((driver) => {
        if (!driver) {
          return res.status(404).json({ error: 'Sürücü bulunamadı' });
        }
        res.json(driver);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Sürücü alınamadı' });
      });
  });
  
  // Driver POST
  router.post('/', (req, res) => {
    const { name, number, trucktype } = req.body;
    const newDriver = new Driver({ name, number, trucktype });
    newDriver.save()
      .then((driver) => {
        res.status(201).json(driver);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sürücü oluşturulamadı' });
      });
  });
  
  // Driver PUT
  router.put('/:id', (req, res) => {
    const driverId = req.params.id;
    const { name, number, trucktype } = req.body;
    Driver.findByIdAndUpdate(driverId, { name, number, trucktype }, { new: true })
      .then((driver) => {
        if (!driver) {
          return res.status(404).json({ error: 'Sürücü bulunamadı' });
        }
        res.json(driver);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sürücü güncellenemedi' });
      });
  });
  
  // Driver DELETE
  router.delete('/:id', (req, res) => {
    const driverId = req.params.id;
    Driver.findByIdAndDelete(driverId)
      .then((driver) => {
        if (!driver) {
          return res.status(404).json({ error: 'Sürücü bulunamadı' });
        }
        res.json({ message: 'Sürücü başarıyla silindi' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Sürücü silinemedi' });
      });
  });

module.exports = router;