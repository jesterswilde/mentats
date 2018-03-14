'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setApp = exports.addMethods = exports.setState = exports.mergeState = exports.app = exports.methods = exports.state = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = require('./util');

var state = exports.state = {};
var methods = exports.methods = {};
var app = exports.app = null;

var mergeState = exports.mergeState = function mergeState(newState) {
	exports.state = state = (0, _util.merge)(state, newState);
};
var setState = exports.setState = function setState(newState) {
	exports.state = state = _extends({}, state, newState);
};
var addMethods = exports.addMethods = function addMethods(newMethods) {
	exports.methods = methods = _extends({}, methods, newMethods);
};
var setApp = exports.setApp = function setApp(newApp) {
	exports.app = app = newApp;
};