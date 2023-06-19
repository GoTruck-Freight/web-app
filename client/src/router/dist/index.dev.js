"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _HomeView = _interopRequireDefault(require("../views/HomeView.vue"));

var _OrderView = _interopRequireDefault(require("../views/OrderView.vue"));

var _ConfirmView = _interopRequireDefault(require("../views/ConfirmView.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: '/',
  name: 'Home',
  component: _HomeView["default"]
}, {
  path: '/CreateOrder',
  name: 'Order',
  component: _OrderView["default"]
}, {
  path: '/ConfirmOrder',
  name: 'Confirm',
  component: _ConfirmView["default"]
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(process.env.BASE_URL),
  routes: routes
});
var _default = router;
exports["default"] = _default;