const express = require('express');
const router = express.Router();
const Truck = require('../models/truck');

// Trucks GET
router.get('/', (req, res) => {
    Truck.find()
      .then((trucks) => {
        res.json(trucks);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Tır alınamadı' });
      });
  });
  
  // Truck GET by ID
  router.get('/:id', (req, res) => {
    const truckId = req.params.id;
    Truck.findById(truckId)
      .then((truck) => {
        if (!truck) {
          return res.status(404).json({ error: 'Tır bulunamadı' });
        }
        res.json(truck);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Tır alınamadı' });
      });
  });
  
  // Truck POST
  router.post('/', (req, res) => {
    const { name } = req.body;
    const newTruck = new Truck({ name });
    newTruck.save()
      .then((truck) => {
        res.status(201).json(truck);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Tır oluşturulamadı' });
      });
  });
  
  // Truck PUT
  router.put('/:id', (req, res) => {
    const truckId = req.params.id;
    const { name } = req.body;
    Truck.findByIdAndUpdate(truckId, { name }, { new: true })
      .then((truck) => {
        if (!truck) {
          return res.status(404).json({ error: 'Tır bulunamadı' });
        }
        res.json(truck);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Tır güncellenemedi' });
      });
  });
  
  // Truck DELETE
  router.delete('/:id', (req, res) => {
    const truckId = req.params.id;
    Truck.findByIdAndDelete(truckId)
      .then((truck) => {
        if (!truck) {
          return res.status(404).json({ error: 'Tır bulunamadı' });
        }
        res.json({ message: 'Tır başarıyla silindi' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Tır silinemedi' });
      });
  });
  
module.exports = router;
