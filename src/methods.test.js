import { wrapMethod } from './bindings'; 

test('wrapMethod should wrap the method with cb', ()=>{
	const innerMethod = jest.fn((state, ...rest)=> rest); 
	const outerMethod = jest.fn(); 
	const wrapped = wrapMethod(innerMethod, outerMethod); 

	wrapped(0,1,2); 
 
	expect(outerMethod).toBeCalledWith([0,1,2]); 
});