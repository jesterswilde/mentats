'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addAppMethods = exports.addSetMethodsWithState = exports.setAppState = exports.addMergeMethodsWithState = exports.mergeAppState = exports.bindApp = exports.appStateToProps = exports.appMethodsToProps = undefined;

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _methods2.default;
exports.appMethodsToProps = _methods.appMethodsToProps;
exports.appStateToProps = _methods.appStateToProps;
exports.bindApp = _methods.bindApp;
exports.mergeAppState = _methods.mergeAppState;
exports.addMergeMethodsWithState = _methods.addMergeMethodsWithState;
exports.setAppState = _methods.setAppState;
exports.addSetMethodsWithState = _methods.addSetMethodsWithState;
exports.addAppMethods = _methods.addAppMethods;