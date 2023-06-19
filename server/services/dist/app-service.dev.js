"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BaseService = require('./base-service');

var App = require('../models/app');

var AppService =
/*#__PURE__*/
function (_BaseService) {
  _inherits(AppService, _BaseService);

  function AppService() {
    _classCallCheck(this, AppService);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppService).apply(this, arguments));
  }

  _createClass(AppService, [{
    key: "filterRoads",
    // bu funksiya əsasən dağ yollarında əlavə pulu hesablamaq üçün yazılmışdır
    value: function filterRoads(data) {
      var _this = this;

      var roads, results, x;
      return regeneratorRuntime.async(function filterRoads$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // this.model.countDocuments({}, function (err, count) {
              //     if (err){
              //         console.log(err)
              //     } 
              //     else {
              //         console.log(count)
              //     }
              //   });
              roads = [{
                number: 'M4',
                name: 'Bakı-Şamaxı-Yevlax',
                factor: 0.37
              }, {
                number: 'R22',
                name: 'Şəmkir-Gədəbəy',
                factor: 0.37
              }, {
                number: 'R-8',
                name: 'Muğanlı-İsmayıllı',
                factor: 0.37
              }];
              results = 0;
              data.forEach(function (item) {
                for (var index = 0; index < roads.length; index++) {
                  if (item.instructions.search(roads[index].number) > -1 || item.instructions.search(roads[index].name) > -1) {
                    results += parseInt(_this.getRoadsLength(item.distance.text)) * roads[index].factor;
                  }
                }
              });
              x = this.load();
              console.log(x);
              return _context.abrupt("return", results);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    } // bu funksiya google maps api den gelen ölçünü parçalamaq üçündü

  }, {
    key: "getRoadsLength",
    value: function getRoadsLength(value) {
      var length = value;
      length = length.split(" "); // ölçü metrlə gəldikdə

      if (length[1] == "m") {
        length = length[0] * 0.001;
      } else {
        length = length[0];
      }

      return length;
    } // bu funksiya gediş haqlarını hesablamaq üçün yazılmışdır

  }, {
    key: "CalculatePayment",
    value: function CalculatePayment(obj) {
      this.filterRoads(obj.Name); // l deyişəni yolun uzuluğudur (km-lə)

      var l = this.getRoadsLength(obj.Distance); // fix ən aşşağı halda gediş haqqıdır

      var fix = 120; // uzunluq 100 km ə qədər 1x dən hesablanır sonra daha aşağı

      if (l <= 100) {
        l = l * 1;
      }

      if (l <= 150 && l > 100) {
        l = (l - 100) * 0.8 + 100;
      } else if (l <= 200 && l > 150) {
        l = (l - 150) * 0.7 + 140;
      } else if (l <= 300 && l > 200) {
        l = (l - 200) * 0.68 + 175;
      } else if (l <= 450 && l > 300) {
        l = (l - 300) * 0.66 + 243;
      } else if (l > 450) {
        l = (l - 450) * 0.63 + 342;
      }

      var payment = l + fix + 0;
      payment = payment - payment % 5;
      var results = {
        payment: payment
      };
    }
  }]);

  return AppService;
}(BaseService);

module.exports = new AppService(App);