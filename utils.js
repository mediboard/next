export function parseMeasureType(measureType) {
	return measureType?.split('.')?.[1];
};

export function createDataLoadingObj(data=[], isLoading=true) {
	return { data: data, isLoading: isLoading };
}

export function isDataLoading(dataObj) {
	return dataObj.isLoading;
}

export function getData(dataObj) {
	return dataObj.data || [];
}

export function swap(json) {
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;	
}

export function getNameFromTag(tag) {
  return tag?.toUpperCase().replace('_', ' ');
}

export function getTagFromName(name) {
  return name?.toLowerCase().replace(' ', '_');
}

export function insertQueryInUrl(searchString, name, value) {
  let params = new URLSearchParams(searchString);
  params.set(name, value);

  return '?' + params.toString();
}

export function removeQueryFromUrl(searchString, name) {
  let params = new URLSearchParams(searchString);
  params.delete(name);
  
  return '?' + params.toString();
}

export function insertTagInUrl(searchString, tag) {
  let params = new URLSearchParams(searchString);
  let tagsParam = params?.get("tags");
  let tags = tagsParam?.split(',') || [];

  if (!tags.includes(tag)) {
    tags.push(tag);
    params.set('tags',tags.join(','))
    return '?' + params.toString();
  }

  return searchString;
}

export function insertParamsInUrl(searchString, values, param) {
  let params = new URLSearchParams(searchString);
  let tagsParam = params?.get(param);
  let tags = tagsParam?.split(',') || [];

  tags = tags.concat(values?.filter(x => !tags.includes(x)));

  params.set(param,tags.join(','))
  return '?' + params.toString();
}

export function upsertParamsInUrl(searchString, values, param) {
  let params = new URLSearchParams(searchString);

  params.set(param,values.join(','))
  return '?' + params.toString();
}

export function removeParamInUrlIfPresent(searchString, value, param) {
  let params = new URLSearchParams(searchString);
  let tagsParam = params?.get(param);
  let tags = tagsParam?.split(',') || [];

  if (tags.includes(value)) {
    tags = tags.filter(x => x !== value);
  }

  if (tags.length !== 0) {
    params.set(param, tags?.join(','));
  }

  if (tags.length === 0) {
    params.delete(param);
  }

  return params.toString() === '' ? '' : '?' + params.toString();
}

export function removeTagInUrlIfPresent(searchString, tag) {
  let params = new URLSearchParams(searchString);
  let tagsParam = params?.get("tags");
  let tags = tagsParam?.split(',') || [];

  if (tags.includes(tag)) {
    tags = tags.filter(x => x !== tag);
  }

  if (tags.length !== 0) {
    params.set('tags', tags?.join(','));
  }

  if (tags.length === 0) {
    params.delete('tags');
  }

  return params.toString() === '' ? '' : '?' + params.toString();
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTagFromTreatment(name) {
  return name?.toLowerCase().replace(' ', '_');
}

export function getTagFromCondition(name) {
  return name?.toLowerCase().replace(' ', '_');
}

export function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

export function capitalizeEachWord(string) {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const adminUsers = ['porterhunley'];

export const isAdminUser = (username) => {
  return adminUsers.includes(username);
}
