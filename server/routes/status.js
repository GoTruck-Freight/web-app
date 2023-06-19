// const express = require('express');
// const router = express.Router();
// const Status = require('../models/status');

// // Statuses GET
// router.get('/', (req, res) => {
//     Status.find()
//       .then((statuses) => {
//         res.json(statuses);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Statuslar alınamadı' });
//       });
//   });
  
//   // Status GET by ID
//   router.get('/:id', (req, res) => {
//     const statusId = req.params.id;
//     Status.findById(statusId)
//       .then((status) => {
//         if (!status) {
//           return res.status(404).json({ error: 'Status tapılmadı😕' });
//         }
//         res.json(status);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Status yaradıla bilmədi🤔' });
//       });
//   });
//  // Status GET by name
//   router.get('/:name', (req, res) => {
//     const statusname = req.params.name;
//     Status.findById(statusId)
//       .then((status) => {
//         if (!status) {
//           return res.status(404).json({ error: 'Status tapılmadı😕' });
//         }
//         res.json(status);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Status yaradıla bilmədi🤔' });
//       });
//   });
  
//   // Status POST
//   router.post('/', (req, res) => {
//     const { name, title } = req.body;
//     const newStatus = new Status({ name, title });
//     newStatus.save()
//       .then((status) => {
//         res.status(201).json(status);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Status yaradıla bilmədi🤔' });
//       });
//   });
  
//   // Status PUT
//   router.put('/:id', (req, res) => {
//     const statusId = req.params.id;
//     const { name, driver } = req.body;
//     Status.findByIdAndUpdate(statusId, { name, driver }, { new: true })
//       .then((status) => {
//         if (!status) {
//           return res.status(404).json({ error: 'Status tapılmadı😕' });
//         }
//         res.json(status);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Status güncəllənə bilmədi🤔' });
//       });
//   });
  
//   // Status DELETE
//   router.delete('/:id', (req, res) => {
//     const statusId = req.params.id;
//     Status.findByIdAndDelete(statusId)
//       .then((status) => {
//         if (!status) {
//           return res.status(404).json({ error: 'Status tapılmadı😕' });
//         }
//         res.json({ message: 'Status uğurla silindi' });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Status silinə bilmədi' });
//       });
//   });


// module.exports = router;
const { statusService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  res.send(await statusService.load())
})

router.get('/name=:name', async (req, res) => {
  const name = req.params.name
  const status = await statusService.findByStatusName(name)
  if (!status) return res.status(404)
  res.status(201).json(status)
})
module.exports = router