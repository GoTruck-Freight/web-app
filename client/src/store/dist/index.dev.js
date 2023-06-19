"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.baseURL = 'http://localhost:3000';

var _default = (0, _vuex.createStore)({
  state: {
    OriginAndDestinationPlace: '',
    payment: false,
    //sistemin təklif etdiyi qiymət
    propasalpayment: false,
    //müştərinin təklif etdiyi qiymət
    // aşağıdakılar müştəri tərəfdən rəy və yükün ağırlığnı bildirir
    weight: '',
    feedback: '',
    // bu state masinin tipini secir misal tentli soyuduculu
    trucktype: false
  },
  getters: {},
  mutations: {
    setRoute: function setRoute(state, data) {
      state.OriginAndDestinationPlace = data;
      console.log(state.OriginAndDestinationPlace);
    },
    setPayment: function setPayment(state, payment) {
      state.payment = payment;
    },
    setPropasalPayment: function setPropasalPayment(state, payment) {
      state.propasalpayment = payment;
    },
    setWeight: function setWeight(state, weight) {
      state.weight = weight;
    },
    setFeedback: function setFeedback(state, feedback) {
      state.feedback = feedback;
    },
    setTrucktype: function setTrucktype(state, type) {
      state.trucktype = type;
    }
  },
  actions: {
    fetchIntro: function fetchIntro() {
      var request;
      return regeneratorRuntime.async(function fetchIntro$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get('/landing/intro'));

            case 2:
              request = _context.sent;
              return _context.abrupt("return", request.data);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    fetchSlide: function fetchSlide() {
      var request;
      return regeneratorRuntime.async(function fetchSlide$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get('/landing/slide'));

            case 2:
              request = _context2.sent;
              return _context2.abrupt("return", request.data);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    fetchFaq: function fetchFaq() {
      var request;
      return regeneratorRuntime.async(function fetchFaq$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get('/landing/faq'));

            case 2:
              request = _context3.sent;
              return _context3.abrupt("return", request.data);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    confirmOrder: function confirmOrder(context, value) {
      var date, data;
      return regeneratorRuntime.async(function confirmOrder$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              date = Date();
              data = {
                name: value.NameSurname,
                number: value.PhoneNumber,
                payment: this.state.payment,
                propasalpayment: this.state.propasalpayment,
                weight: this.state.weight,
                feedback: this.state.feedback,
                date: date.toString()
              };
              console.log(data);
              _context4.next = 5;
              return regeneratorRuntime.awrap(_axios["default"].post("/app/confirmorder", data));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    },
    getOrder: function getOrder(context, value) {
      var roads, obj, data;
      return regeneratorRuntime.async(function getOrder$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].post("/app/getroads"));

            case 2:
              roads = _context5.sent;
              obj = {
                steps: value.Steps,
                roads: roads.data
              };
              _context5.t0 = value.Distance;
              _context5.next = 7;
              return regeneratorRuntime.awrap(context.dispatch('filterRoads', obj));

            case 7:
              _context5.t1 = _context5.sent;
              data = {
                Distance: _context5.t0,
                extraRoads: _context5.t1
              };
              _context5.next = 11;
              return regeneratorRuntime.awrap(context.dispatch('CalculatePayment', data));

            case 11:
              return _context5.abrupt("return", roads.data);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    getRoadsLength: function getRoadsLength(context, value) {
      var length;
      return regeneratorRuntime.async(function getRoadsLength$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              length = value;
              length = length.split(" ");

              if (length[1] == "m") {
                length = length[0] * 0.001;
              } else {
                length = length[0];
              }

              length = parseInt(length);
              return _context6.abrupt("return", length);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    // bu funksiya əsasən dağ yollarında əlavə pulu hesablamaq üçün yazılmışdır funksiya gələn məlumatlardan yolları seçib bazadan seçilmiş qiymətə vurur və geriye pul dönderir
    filterRoads: function filterRoads(context, data) {
      var roads, steps, results;
      return regeneratorRuntime.async(function filterRoads$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // default yollar
              // const roads = [
              //   { number: 'M4', name: 'Bakı-Şamaxı-Yevlax', factor: 0.37 },
              //   { number: 'R22', name: 'Şəmkir-Gədəbəy', factor: 0.37 },
              //   { number: 'R-8', name: 'Muğanlı-İsmayıllı', factor: 0.37 },
              // ]
              roads = data.roads, steps = data.steps;
              results = 0;
              steps.forEach(function _callee(item) {
                var index, roadlength;
                return regeneratorRuntime.async(function _callee$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        for (index = 0; index < roads.length; index++) {
                          if (item.instructions.search(roads[index].number) > -1 || item.instructions.search(roads[index].name) > -1) {
                            roadlength = item.distance.text.split(" ");
                            roadlength = parseInt(roadlength[0]); // ** context.dispatch('getRoadsLength')

                            results += roadlength * roads[index].factor;
                          }
                        }

                      case 1:
                      case "end":
                        return _context7.stop();
                    }
                  }
                });
              });
              return _context8.abrupt("return", results);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      });
    },
    CalculatePayment: function CalculatePayment(context, data) {
      var l, arr, fix, payment, index;
      return regeneratorRuntime.async(function CalculatePayment$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(context.dispatch('getRoadsLength', data.Distance));

            case 2:
              l = _context9.sent;
              // fix ən aşşağı halda gediş haqqıdır
              arr = [{
                distance: 50,
                price: 1
              }, {
                distance: 100,
                price: 1
              }, {
                distance: 200,
                price: 0.9
              }, {
                distance: 300,
                price: 0.8
              }, {
                distance: 400,
                price: 0.7
              }, {
                distance: 500,
                price: 0.7
              }];
              fix = 130;
              payment = 0;
              index = 0;

            case 7:
              if (!(index < arr.length)) {
                _context9.next = 30;
                break;
              }

              if (!(l < arr[0].distance)) {
                _context9.next = 13;
                break;
              }

              //əgər mesafə 50 km dən azdırsa l < 50
              payment += l * arr[0].price;
              return _context9.abrupt("break", 30);

            case 13:
              if (!(l > arr[index].distance)) {
                _context9.next = 27;
                break;
              }

              if (!(index == arr.length - 1)) {
                _context9.next = 19;
                break;
              }

              //əgər məsafə 500 km dan çoxdursa l > 500
              payment += (arr[index].distance - arr[index - 1].distance + l - arr[index].distance) * arr[index].price;
              return _context9.abrupt("break", 30);

            case 19:
              if (!(index > 0)) {
                _context9.next = 26;
                break;
              }

              // misal 453 bu kod bu kod 400 -ü hesablayır
              payment += (arr[index].distance - arr[index - 1].distance) * arr[index].price;

              if (!(l < arr[index + 1].distance)) {
                _context9.next = 24;
                break;
              }

              // misal 453 bu kod 53 -ü hesablayır 
              payment += (l - arr[index].distance) * arr[index].price;
              return _context9.abrupt("break", 30);

            case 24:
              _context9.next = 27;
              break;

            case 26:
              payment += arr[index].distance * arr[index].price;

            case 27:
              index++;
              _context9.next = 7;
              break;

            case 30:
              payment += fix + data.extraRoads;
              console.log('uzunluq: ' + l);
              console.log(payment);
              payment = Math.round(payment / 10) * 10;
              context.commit('setPayment', payment);
              return _context9.abrupt("return", payment);

            case 36:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  },
  modules: {}
});

exports["default"] = _default;