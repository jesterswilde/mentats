'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.publishFor = exports.removeSubscription = exports.subscribeTo = undefined;

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var subscriptions = {};

var subscribeTo = exports.subscribeTo = function subscribeTo(key, callback) {
	subscriptions[key] = subscriptions[key] || [];
	subscriptions[key].push(callback);
};

var removeSubscription = exports.removeSubscription = function removeSubscription(key, callback) {
	if (!Array.isArray(subscriptions[key])) {
		throw {
			name: 'ReferenceError',
			message: 'You are trying to remove a callback from a key that has never had a callback'
		};
	} else {
		var splicedArray = [].concat(_toConsumableArray(subscriptions[key]));
		var index = splicedArray.indexOf(callback);
		if (index === -1) {
			throw {
				name: 'ReferenceError',
				message: 'You are trying to remove a callback that does\'nt exist'
			};
		} else {
			splicedArray.splice(index, 1);
			subscriptions[key] = splicedArray;
		}
	}
};

var publishFor = exports.publishFor = function publishFor(key, state, newState) {
	var subscription = subscriptions[key];
	if (Array.isArray(subscription)) {
		subscription.forEach(function (callback) {
			return callback(state, newState);
		});
	}
};