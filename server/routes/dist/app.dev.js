"use strict";

var router = require('express').Router();

var RoadService = require('../services/road-service');

var OrderService = require('../services/order-service');

router.post('/getroads', function _callee(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(RoadService.load());

        case 2:
          results = _context.sent;
          res.send(results);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/confirmorder', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(OrderService.save(req.body));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;