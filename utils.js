export function parseMeasureType(measureType) {
	return measureType?.split('.')?.[1];
};

export function isEnum(str) {
  const regex = /^[a-z_]+\.([A-Z_0-9]+)$/;
  return regex.test(str);
}

export function parseEnumType(enumString) {
  return enumString.replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, function(match) {
      return match.toUpperCase();
    });
}

export function createDataLoadingObj(data=[], isLoading=true) {
	return { data: data, isLoading: isLoading };
}


// AI generated
export function copyToClipboard(str) {
  const el = document.createElement('textarea');  // Create a temporary textarea element
  el.value = str;  // Set the value of the textarea to the input string
  document.body.appendChild(el);  // Add the textarea element to the document
  el.select();  // Select the contents of the textarea
  document.execCommand('copy');  // Copy the selected text to the clipboard
  document.body.removeChild(el);  // Remove the temporary textarea element
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

export const adminUsers = ['4711515d-519e-4d68-9f67-5ddb9612eadd', 'f2c90573-baaa-4303-8c54-f844a9cd6d61'];

export const isAdminUser = (username) => {
  return adminUsers.includes(username);
}

// Version 4.0
// Monstrosity courtasy of 
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export const shadeColor = (color, percent) => {
  if (!color) return;
  
  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}
