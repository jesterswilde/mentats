import { merge } from './util'
let subscriptions = {}; 

export const subscribeTo = (key, callback)=>{
	subscriptions[key] = subscriptions[key] || []; 
	subscriptions[key].push(callback); 
}

export const removeSubscription = (key, callback)=>{
	if(!Array.isArray(subscriptions[key])){
		throw {
			name: 'ReferenceError',
			message: 'You are trying to remove a callback from a key that has never had a callback'
		}
	}
	else{
		const splicedArray = [...subscriptions[key]]; 
		const index = splicedArray.indexOf(callback);
		if(index === -1){
			throw {
				name: 'ReferenceError',
				message: 'You are trying to remove a callback that does\'nt exist'
			}
		}else{
			splicedArray.splice(index, 1);
			subscriptions[key] = splicedArray; 
		}
	}
}

export const publishFor = (key, state, newState)=>{
	const subscription = subscriptions[key];
	if(Array.isArray(subscription)){
		subscription.forEach((callback)=> callback(state, newState));
	}
}