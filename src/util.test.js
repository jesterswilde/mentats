import { reduce, merge } from './index'; 

test('reduce should work with arrays',()=>{
	const array =  [5,6,7];

	const sum = reduce(array, (a, b, c)=> a + b + c, 4);
	
	expect(sum).toBe(25); 
});

test('reduce should work with obj',()=>{
	const obj = {a: 1, b: 2, c: 3}; 

	const sum = reduce(obj, (a, b)=> a + b, 4);
	
	expect(sum).toBe(10); 
});

test('reduce should take the first value if no default is provided', ()=>{
	const array = ['foo','bar','baz']; 
	const obj = {a: 5, b: 6, c: 7}; 

	const arraySum = reduce(array, (a,b)=> a + b); 
	const objSum = reduce(obj, (a,b)=> a + b); 

	expect(arraySum).toBe('foobarbaz'); 
	expect(objSum).toBe(18); 
});

test('classNames evaluates an object for truthiness and makes a string',()=>{
	const classesObj = {
		a: true,
		b: false,
		c: null, 
		d: 10 > 4,
	};

	const className = classNames(classesObj);
	const classArray = className.split(' ');

	expect(classArray).toContain('a');
	expect(classArray).toContain('d');
	expect(classArray).not.toContain('b');
	expect(classArray).not.toContain('c');
});



test('Merge should merge 2 objects deeply', ()=>{
	const obj1 = {foo: {
		bar:{
			baz: 1
		}
	}};
	const obj2 = {what: {
		is:{
			this:'thing'
		}
	}};

	const merged = merge(obj1, obj2); 

	expect(merged).toEqual({
		foo: {
			bar:{
				baz: 1
			}
		},
		what: {
			is:{
				this:'thing'
			}
		}
	});
});

test('merge should not mutate incoming top level objects', ()=>{
	const obj1 = {}; 
	const obj2 = {}; 

	const merged = merge(obj1, obj2); 

	expect(merged).not.toBe(obj1); 
	expect(merged).not.toBe(obj2); 
});

test('merge should merge on the key, and overwrite leaf nodes with the second object', ()=>{
	const obj1 = {foo: {
		bar:{
			baz: 4,
			other: 2
		}
	}};
	const obj2 = {
		foo: {
			bar:{
				baz: 2,
				prop: 'hello'
			}
		}
	};

	const merged = merge(obj1, obj2); 

	expect(merged).toEqual({
		foo:{
			bar:{
				baz:2,
				other:2,
				prop: 'hello'
			}
		}
	});
});

test('Merge should allow you to delete branches by using null', ()=>{
	const obj1 = {
		foo: {
			bar:{
				baz: 2
			}
		},
		other:{
			prop: 'hello'
		}
	};
	const obj2 = {
		foo: null
	};

	const merged = merge(obj1, obj2); 

	expect(merged).toEqual({
		other:{
			prop: 'hello'
		}
	});
});

test('merge should accept an arbitrary amount of arguments', ()=>{
	const obj1 = {
		foo: { 
			bar:{
				baz:2
			}
		}
	};
	const obj2 = {
		theThing:{
			isNested:{
				deely: true
			}
		}
	};
	const obj3 = {
		foo:{
			test: 'hello',
			bar: null
		}
	};
	const obj4 = {
		theThing:{
			isNested: false
		},
		foo:{
			last: true
		}
	};

	const merged = merge(obj1, obj2, obj3, obj4); 

	expect(merged).toEqual({
		foo:{
			test: 'hello',
			last: true
		},
		theThing:{
			isNested: false
		}
	});
});

test('merge should handle arrays', ()=>{
	const obj1 = {
		foo:{
			bar: [1,2,3,{baz: 5}]
		}
	};
	const obj2 = {
		foo:{
			bar:[0,2,3,{other:[]}]
		}
	};

	const merged = merge(obj1, obj2); 

	expect(merged).toEqual({
		foo:{
			bar:[0,2,3,{baz:5, other:[]}]
		}
	});
});
