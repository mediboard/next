export function insertNewPostUrl(location) {
	let currentPath = location.pathname;
	let search = location.search;
	let pathArray = currentPath.split('/');
	pathArray.splice(1,0,'newpost');
	return pathArray.filter(x => x !== '').join('/') + search;
}