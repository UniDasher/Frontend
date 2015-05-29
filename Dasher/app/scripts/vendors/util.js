
function fetchArrayElement(oArray, propertyName, propertyValue) {
	var returnValue = {};

	if (oArray === undefined) {
		return returnValue;
	}

	if ( oArray == null ) {
		return returnValue;
	}

	var iArraySize = oArray.length;

	for (var i=0; i < iArraySize; i++) {
		if (oArray[i][propertyName] == propertyValue) {
			returnValue = oArray[i];
			break;
		}
	}

	return returnValue;
}

// Return a sub-json that contains the PropertyName key and PropertyValue value.
function getSubJSONWithValue(aJSON, propertyName, propertyValue) {
	var returnValue = null;

	if (aJSON instanceof Array) {
		for(var i = 0; i < aJSON.length; i++) {
			returnValue = getSubJSONWithValue(aJSON[i], propertyName, propertyValue);

			if (returnValue != null) {
				break;
			}

		}
	} else {
		for (var property in aJSON) {
			if (property == propertyName) {
				if (propertyValue == null) {
					return aJSON;
				}

				if (aJSON[property] == propertyValue) {
					return aJSON;
				}
			}

			if (aJSON[property] instanceof Object || aJSON[property] instanceof Array) {
				returnValue = getSubJSONWithValue(aJSON[property], propertyName, propertyValue);

				if (returnValue != null) {
					break;
				}

			}
		}
	}

	return returnValue;
}

// Return a sub-json that contains the propertyName key.
function getSubJSON(aJSON, propertyName) {
	var returnValue = getSubJSONWithValue(aJSON, propertyName, null);

	return returnValue;
}

// Return a sub-json that has the key propertyName.
function getSubJSONChild(aJSON, propertyName) {
	var returnValue = getSubJSON(aJSON, propertyName);

	if (returnValue == null) {
		return returnValue;
	}

	returnValue = returnValue[propertyName];

	return returnValue;
}

// Return a sub-json that contains the PropertyName key and a property value that is on a leaf node.
function getSubJSONLeafOnly(aJSON, propertyName) {
	var returnValue = null;

	if (aJSON instanceof Array) {
		for (var i = 0; i < aJSON.length; i++) {
			returnValue = getSubJSONLeafOnly(aJSON[i], propertyName);

			if (returnValue != null) {
				break;
			}

		}
	} else {
		for (var property in aJSON) {
			if (property == propertyName) {
				if ( !(aJSON[property] instanceof Object) && !( aJSON[property] instanceof Array)) {
					return aJSON;
				}
			}

			if (aJSON[property] instanceof Object || aJSON[property] instanceof Array) {
				returnValue = getSubJSONLeafOnly(aJSON[property], propertyName);

				if (returnValue != null) {
					break;
				}
			}
		}
	}

	return returnValue;
}

// Return a JSON path that contains the PropertyName key and a property value that is on a leaf node.
// Example: scores.concept.engage
function getJSONPath(aJSON, propertyName) {
	var returnValue = null;

	if (aJSON instanceof Array) {
		for (var i = 0; i < aJSON.length; i++) {
			returnValue = getJSONPath(aJSON[i], propertyName);

			if (returnValue != null) {
				break;
			}
		}
	} else {
		for (var property in aJSON) {
			if (property == propertyName)
			{
				if ( !( aJSON[property] instanceof Object) && !(aJSON[property] instanceof Array)) {
					return property;
				}
			}

			if (aJSON[property] instanceof Object || aJSON[property] instanceof Array) {
				returnValue = getJSONPath(aJSON[property], propertyName);

				if (returnValue != null) {
					returnValue = property + "." + returnValue.toString();
					break;
				}
			}
		}
	}

	return returnValue;
}
