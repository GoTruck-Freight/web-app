const PricingService = require("../services/pricing-service");

// Create the router instance
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await PricingService.load());
});
// get first element 
router.get("/first", async (req, res) => {
  res.send(await PricingService.first());
});


// Road POST: Create a new road
router.post("/", async (req, res) => {
  const data = await PricingService.insert(req.body);
  res.status(201).send(data);
});

// Road PUT: Update an existing road
router.put("/:id", async (req, res) => {
  const status = await PricingService.update(req.params.id, req.body);
  if (!status) return res.status(404).send("Road not found");
  res.send(status);
});

// Road DELETE: Delete a road
router.delete("/:id", async (req, res) => {
  const deletedRoad = await PricingService.removeBy("_id", req.params.id);
  if (!deletedRoad.deletedCount) return res.status(404).send("Road not found");
  res.sendStatus(204);
});

module.exports = router