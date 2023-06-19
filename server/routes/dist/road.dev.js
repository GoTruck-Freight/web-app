"use strict";

var router = require('express').Router();

var RoadService = require('../services/road-service');

router.post('/getorder', function _callee(req, res) {
  var obj, results;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          obj = req.body;
          _context.next = 3;
          return regeneratorRuntime.awrap(RoadService.CalculatePayment(obj));

        case 3:
          results = _context.sent;
          res.send(results);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;