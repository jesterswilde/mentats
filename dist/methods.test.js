'use strict';

var _bindings = require('./bindings');

test('wrapMethod should wrap the method with cb', function () {
	var innerMethod = jest.fn(function (state) {
		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}

		return rest;
	});
	var outerMethod = jest.fn();
	var wrapped = (0, _bindings.wrapMethod)(innerMethod, outerMethod);

	wrapped(0, 1, 2);

	expect(outerMethod).toBeCalledWith([0, 1, 2]);
});