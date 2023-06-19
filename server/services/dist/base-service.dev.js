"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseService =
/*#__PURE__*/
function () {
  function BaseService(model) {
    _classCallCheck(this, BaseService);

    this.model = model;
  }

  _createClass(BaseService, [{
    key: "save",
    value: function save(objects) {
      return this.model.insertMany(objects);
    }
  }, {
    key: "load",
    value: function load() {
      return this.model.find();
    }
  }, {
    key: "insert",
    value: function insert(object) {
      return regeneratorRuntime.async(function insert$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.model.create(object));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "removeBy",
    value: function removeBy(property, value) {
      return regeneratorRuntime.async(function removeBy$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.model.deleteOne(_defineProperty({}, property, value)));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "update",
    value: function update(id, object) {
      return regeneratorRuntime.async(function update$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.model.findByIdAndUpdate(id, object));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "find",
    value: function find(id) {
      return regeneratorRuntime.async(function find$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", this.model.findById(id));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "query",
    value: function query(obj) {
      return regeneratorRuntime.async(function query$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", this.model.find(obj));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findBy",
    value: function findBy(property, value) {
      return regeneratorRuntime.async(function findBy$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", this.model.find(_defineProperty({}, property, value)));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return BaseService;
}();

module.exports = BaseService;