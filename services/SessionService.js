// The state service mantains the state in session or local
// Makes sure that user experience is such that when a
// user refreshes the page the state stays the same

// It should work by a component asking for the relevant
// state and it giving it to it,

// Storage Strucutre:
// ComponentId: {
//   stateNameOne: {state},
//   stateNameTwo: {state}
// }
// If a state name is not present, add it

export function insertSessionState(componentId, state) {
	let currState = sessionStorage.getItem(componentId);
	if (currState == null) {
		currState = '{}';
	}
	currState = JSON.parse(currState);
	console.log(currState);

	let newState = {...currState, ...state}; //Properties in state overrite currState
	sessionStorage.setItem(componentId, JSON.stringify(newState));
}

export function getSessionState(componentId) {
	let currState = sessionStorage.getItem(componentId);
	if (currState == null) {
		currState = '{}';
	}
	return JSON.parse(currState);
}
