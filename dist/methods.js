'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addSetMethodsWithState = exports.addMergeMethodsWithState = exports.wrapSetAppState = exports.wrapMergeAppState = exports.setAppState = exports.mergeAppState = exports.bindApp = exports.appStateToProps = exports.methodsToProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _state = require('./state');

var _listeners = require('./listeners');

var _util = require('./util');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateReact = function updateReact() {
	if (_state.app !== null) {
		_state.app.setState(_extends({}, _state.methods, _state.state));
	}
};

exports.default = function (Comp) {
	return function (props) {
		var modProps = _extends({}, _state.state, _state.methods, props);
		return _react2.default.createElement(Comp, modProps);
	};
};

var methodsToProps = exports.methodsToProps = function methodsToProps(Comp) {
	return function (props) {
		var modProps = _extends({}, _state.methods, props);
		return _react2.default.createElement(Comp, modProps);
	};
};
var appStateToProps = exports.appStateToProps = function appStateToProps(Comp) {
	return function (props) {
		var modProps = _extends({}, _state.state, props);
		return _react2.default.createElement(Comp, modProps);
	};
};

var bindApp = exports.bindApp = function bindApp(theApp) {
	(0, _state.setApp)(theApp);
	updateReact();
};

var mergeAppState = exports.mergeAppState = function mergeAppState(newState) {
	for (var _len = arguments.length, publishKeys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		publishKeys[_key - 1] = arguments[_key];
	}

	publishKeys.forEach(function (key) {
		return (0, _listeners.publishFor)(key, sta);
	});
	(0, _state.mergeState)(newState);
	updateReact();
};

var setAppState = exports.setAppState = function setAppState(newState) {
	(0, _state.setState)(newState);
	updateReact();
};

var wrapMergeAppState = exports.wrapMergeAppState = function wrapMergeAppState(newMethods) {
	return (0, _util.reduce)(newMethods, function (accObj, method, key) {
		accObj[key] = wrapMethod(method, mergeAppState);
		return accObj;
	}, {});
};

var wrapSetAppState = exports.wrapSetAppState = function wrapSetAppState(newMethods) {
	return (0, _util.reduce)(newMethods, function (accObj, method, key) {
		accObj[key] = wrapMethod(method, setAppState);
		return accObj;
	}, {});
};

var addAppMethods = function addAppMethods(newMethods) {
	(0, _state.addMethods)(newMethods);
	updateReact();
};

var wrapMethod = function wrapMethod(method) {
	var mergeMethods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	return function () {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		mergeMethods(method.apply(undefined, [_state.state].concat(args)));
	};
};

var addMergeMethodsWithState = exports.addMergeMethodsWithState = function addMergeMethodsWithState(newMethods) {
	var wrappedMethods = wrapMergeAppState(newMethods);
	addAppMethods(wrappedMethods);
	updateReact();
};

var addSetMethodsWithState = exports.addSetMethodsWithState = function addSetMethodsWithState(newMethods) {
	var wrappedMethods = wrapSetAppState(newMethods);
	addAppMethods(wrappedMethods);
	updateReact();
};