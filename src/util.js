export const reduce = (obj, cb, acc)=>{
	if(Array.isArray(obj)){
		let startingPoint = 0; 
		if(acc === undefined){
			acc = obj[0]; 
			startingPoint = 1;
		}
		for(let i = startingPoint; i < obj.length; i++){
			acc = cb(acc, obj[i], i);
		}
		return acc; 
	}else{
		let useValue = acc === undefined ? true : false; 
		for(let key in obj){
			if(useValue){
				acc = obj[key];
				useValue = false; 
			}else{
				acc = cb(acc, obj[key], key); 
			}
		}
		return acc; 
	}
	return acc; 
};

export const merge = (...args)=>{
	const initial = Array.isArray(args[1]) ? [] : {};
	return args.reduce((accObj, currentObj)=>{
		if(typeof currentObj !== 'object') return accObj; 
		for(let key in currentObj){
			const value = currentObj[key];
			const accValue = accObj[key]; 
			if(value === null){
				if(accValue !== undefined){
					delete accObj[key]; 
				}
			}
			else if(Array.isArray(value)){
				accObj[key] = value; 
			}
			else if(typeof value === 'object' && typeof accValue === 'object'){
				accObj[key] = merge(accValue, value); 
			}else{
				accObj[key] = value;
			}
		}
		return accObj; 
	}, initial);
};