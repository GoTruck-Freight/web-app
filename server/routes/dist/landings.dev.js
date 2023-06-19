"use strict";

var router = require('express').Router();

var IntroService = require('../services/intro');

var SlideService = require('../services/slide-service');

var FaqService = require('../services/faq-service');

router.get('/intro', function _callee(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(IntroService.load());

        case 2:
          request = _context.sent;
          // bu kod axirinci elementi gondermek ucundu
          request = request[request.length - 1];
          res.send(request);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/slide', function _callee2(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(SlideService.load());

        case 2:
          request = _context2.sent;
          // bu kod axirinci elementi gondermek ucundu
          request = request[request.length - 1];
          res.send(request);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/faq', function _callee3(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(FaqService.load());

        case 2:
          request = _context3.sent;
          res.send(request);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;