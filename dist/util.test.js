'use strict';

var _index = require('./index');

test('reduce should work with arrays', function () {
	var array = [5, 6, 7];

	var sum = (0, _index.reduce)(array, function (a, b, c) {
		return a + b + c;
	}, 4);

	expect(sum).toBe(25);
});

test('reduce should work with obj', function () {
	var obj = { a: 1, b: 2, c: 3 };

	var sum = (0, _index.reduce)(obj, function (a, b) {
		return a + b;
	}, 4);

	expect(sum).toBe(10);
});

test('reduce should take the first value if no default is provided', function () {
	var array = ['foo', 'bar', 'baz'];
	var obj = { a: 5, b: 6, c: 7 };

	var arraySum = (0, _index.reduce)(array, function (a, b) {
		return a + b;
	});
	var objSum = (0, _index.reduce)(obj, function (a, b) {
		return a + b;
	});

	expect(arraySum).toBe('foobarbaz');
	expect(objSum).toBe(18);
});

test('classNames evaluates an object for truthiness and makes a string', function () {
	var classesObj = {
		a: true,
		b: false,
		c: null,
		d: 10 > 4
	};

	var className = classNames(classesObj);
	var classArray = className.split(' ');

	expect(classArray).toContain('a');
	expect(classArray).toContain('d');
	expect(classArray).not.toContain('b');
	expect(classArray).not.toContain('c');
});

test('Merge should merge 2 objects deeply', function () {
	var obj1 = { foo: {
			bar: {
				baz: 1
			}
		} };
	var obj2 = { what: {
			is: {
				this: 'thing'
			}
		} };

	var merged = (0, _index.merge)(obj1, obj2);

	expect(merged).toEqual({
		foo: {
			bar: {
				baz: 1
			}
		},
		what: {
			is: {
				this: 'thing'
			}
		}
	});
});

test('merge should not mutate incoming top level objects', function () {
	var obj1 = {};
	var obj2 = {};

	var merged = (0, _index.merge)(obj1, obj2);

	expect(merged).not.toBe(obj1);
	expect(merged).not.toBe(obj2);
});

test('merge should merge on the key, and overwrite leaf nodes with the second object', function () {
	var obj1 = { foo: {
			bar: {
				baz: 4,
				other: 2
			}
		} };
	var obj2 = {
		foo: {
			bar: {
				baz: 2,
				prop: 'hello'
			}
		}
	};

	var merged = (0, _index.merge)(obj1, obj2);

	expect(merged).toEqual({
		foo: {
			bar: {
				baz: 2,
				other: 2,
				prop: 'hello'
			}
		}
	});
});

test('Merge should allow you to delete branches by using null', function () {
	var obj1 = {
		foo: {
			bar: {
				baz: 2
			}
		},
		other: {
			prop: 'hello'
		}
	};
	var obj2 = {
		foo: null
	};

	var merged = (0, _index.merge)(obj1, obj2);

	expect(merged).toEqual({
		other: {
			prop: 'hello'
		}
	});
});

test('merge should accept an arbitrary amount of arguments', function () {
	var obj1 = {
		foo: {
			bar: {
				baz: 2
			}
		}
	};
	var obj2 = {
		theThing: {
			isNested: {
				deely: true
			}
		}
	};
	var obj3 = {
		foo: {
			test: 'hello',
			bar: null
		}
	};
	var obj4 = {
		theThing: {
			isNested: false
		},
		foo: {
			last: true
		}
	};

	var merged = (0, _index.merge)(obj1, obj2, obj3, obj4);

	expect(merged).toEqual({
		foo: {
			test: 'hello',
			last: true
		},
		theThing: {
			isNested: false
		}
	});
});

test('merge should handle arrays', function () {
	var obj1 = {
		foo: {
			bar: [1, 2, 3, { baz: 5 }]
		}
	};
	var obj2 = {
		foo: {
			bar: [0, 2, 3, { other: [] }]
		}
	};

	var merged = (0, _index.merge)(obj1, obj2);

	expect(merged).toEqual({
		foo: {
			bar: [0, 2, 3, { baz: 5, other: [] }]
		}
	});
});