'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addAppMethods = exports.addSetMethodsWithState = exports.wrapSetAppState = exports.setAppState = exports.addMergeMethodsWithState = exports.wrapMergeAppState = exports.mergeAppState = exports.bindApp = exports.stateToProps = exports.methodsToProps = undefined;

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = appDataToProps;
exports.methodsToProps = _methods.methodsToProps;
exports.stateToProps = _methods.stateToProps;
exports.bindApp = _methods.bindApp;
exports.mergeAppState = _methods.mergeAppState;
exports.wrapMergeAppState = _methods.wrapMergeAppState;
exports.addMergeMethodsWithState = _methods.addMergeMethodsWithState;
exports.setAppState = _methods.setAppState;
exports.wrapSetAppState = _methods.wrapSetAppState;
exports.addSetMethodsWithState = _methods.addSetMethodsWithState;
exports.addAppMethods = _methods.addAppMethods;