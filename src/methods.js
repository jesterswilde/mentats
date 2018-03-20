import { app, setApp, state, mergeState, methods, 
	addMethods, setState } from './state'; 
import { publishFor } from './listeners'
import { reduce, merge } from './util'; 
import React from 'react'; 


const updateReact = ()=>{
	if(app !== null){
		app.setState({
			...methods,
			...state,
		})
	}
}

export default (Comp)=>{
	return (props)=> {
		const modProps = {
			...state,
			...methods,
			...props
		};
		return <Comp { ...modProps } />;
	};
};

export const methodsToProps = (Comp)=>{
	return (props)=> {
		const modProps = {
			...methods,
			...props
		};
		return <Comp { ...modProps } />;
	};
};
export const stateToProps = (Comp)=>{
	return (props)=> {
		const modProps = {
			...state,
			...props
		};
		return <Comp { ...modProps } />;
	};
};

export const bindApp = (theApp)=> {
	setApp(theApp);
	updateReact(); 
};

export const mergeAppState = (newState)=>{
	mergeState(newState); 
	updateReact(); 
}

export const asyncMergeAppState = async(newState)=>{

}

export const setAppState = (newState)=>{
	setState(newState); 
	updateReact(); 
}

export const wrapMergeAppState = (newMethods)=>{
	return reduce(newMethods, (accObj, method, key)=>{
		accObj[key] = wrapMethod(method, mergeAppState);
		return accObj; 
	}, {});
}

export const wrapSetAppState = (newMethods)=>{
	return reduce(newMethods, (accObj, method, key)=>{
		accObj[key] = wrapMethod(method, setAppState);
		return accObj; 
	}, {});
}
2
const addAppMethods = (newMethods)=> {
	addMethods(newMethods); 
	updateReact();
};

const wrapMethod = (method, mergeMethods = ()=>{} )=>{
	return (...args)=>{
		mergeMethods(method(state, ...args));
	};
};

export const addMergeMethodsWithState = (newMethods)=> {
	const wrappedMethods = wrapMergeAppState(newMethods); 
	addAppMethods(wrappedMethods); 
	updateReact(); 
};

export const asyncMergeMethodsWithState = (newMethods)=>{
	reduce(newMethods, (accObj, method, key)=>{
		accObj[key] = async(...args)=>{
			const nextState = await method(state, ...args);
			mergeAppState(nextState); 
			updateReact(); 
		}
		return accObj;
	}, {})
};


export const asyncSetMethodsWithState = (newMethods)=>{
	reduce(newMethods, (accObj, method, key)=>{
		accObj[key] = async(...args)=>{
			const nextState = await method(state, ...args);
			setAppState(nextState); 
			updateReact(); 
		}
		return accObj;
	}, {})
};

export const addSetMethodsWithState = (newMethods)=>{
	const wrappedMethods = wrapSetAppState(newMethods); 
	addAppMethods(wrappedMethods); 
	updateReact(); 
};
