'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var reduce = exports.reduce = function reduce(obj, cb, acc) {
	if (Array.isArray(obj)) {
		var startingPoint = 0;
		if (acc === undefined) {
			acc = obj[0];
			startingPoint = 1;
		}
		for (var i = startingPoint; i < obj.length; i++) {
			acc = cb(acc, obj[i], i);
		}
		return acc;
	} else {
		var useValue = acc === undefined ? true : false;
		for (var key in obj) {
			if (useValue) {
				acc = obj[key];
				useValue = false;
			} else {
				acc = cb(acc, obj[key], key);
			}
		}
		return acc;
	}
	return acc;
};

var merge = exports.merge = function merge() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	var initial = Array.isArray(args[1]) ? [] : {};
	return args.reduce(function (accObj, currentObj) {
		if ((typeof currentObj === 'undefined' ? 'undefined' : _typeof(currentObj)) !== 'object') return accObj;
		for (var key in currentObj) {
			var value = currentObj[key];
			var accValue = accObj[key];
			if (value === null) {
				if (accValue !== undefined) {
					delete accObj[key];
				}
			} else if (Array.isArray(value)) {
				accObj[key] = value;
			} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && (typeof accValue === 'undefined' ? 'undefined' : _typeof(accValue)) === 'object') {
				accObj[key] = merge(accValue, value);
			} else {
				accObj[key] = value;
			}
		}
		return accObj;
	}, initial);
};