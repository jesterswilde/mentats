import { merge } from './util'

export let state = {}; 
export let methods = {}; 
export let app = null; 



export const mergeState = (newState)=>{
	state = merge(state, newState);
}
export const setState = (newState)=>{
	state = {
		...state,
		...newState
	}
}
export const addMethods = (newMethods)=>{
	methods = {
		...methods,
		...newMethods
	}
}
export const setApp = (newApp)=>{
	app = newApp
}
