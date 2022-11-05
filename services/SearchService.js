export function searchArray(searchSpace, searchString) {
	// Just do basic substring matching for now
	return searchSpace.filter(x => x.name.toLowerCase().includes(searchString.toLowerCase()))
}