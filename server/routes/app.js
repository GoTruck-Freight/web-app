const router = require('express').Router()
const RoadService = require('../services/road-service')
const OrderService = require('../services/order-service')
const FeedbackService = require('../services/feedback-service')
const nodemailer = require('nodemailer');

router.get('/getroads', async (req, res) => {
    const results = await RoadService.load()
    res.send(results)
})
router.post('/confirmorder', async (req, res) => {
    OrderService.save(req.body)
})
router.post('/savefeedbackform', async (req, res) => {
    console.log(FeedbackService.save(req.body))
})
module.exports = router