/*
 * Tests if the array contains the given object and
 * uses the user-defined equals-function of objects
 */
Array.prototype.contains = function (obj) {
    'use strict';
    var i = this.length - 1;
    while (i >= 0) {
        if (((obj.equals !== undefined && this[i].equals !== undefined) && obj.equals(this[i]) === true) || this[i] === obj) {
            return true;
        }
        i -= 1;
    }
    return false;
};

/*
 * Removes the first found entry
 */
Array.prototype.removeFirst = function (obj) {
    'use strict';
    var index = this.indexOf(obj);
    this.splice(index, 1);
};

/*
 * Returns the index of the first equal object
 * and uses the user-defined equals-function of
 * objects
 */
Array.prototype.indexOfEquals = function (obj) {
    'use strict';
    if (obj.equals === undefined) {
        console.log('indexOfEquals: equals - function is not defined');
    }
    var i,
		length = this.length;
    
    for (i = 0; i < length; i += 1) {
        if (this[i].equals(obj) === true) {
            return i;
        }
    }
};

var xmlHttp = null;
/*
 * Uses a XMLHttpRequest to retreive the answer
 * of a given URL
 */
function loadStringFromFile (filename) {
	'use strict';
	
    var result;
    if (xmlHttp === null) {
        try {
            // Mozilla, Opera, Safari sowie Internet Explorer (ab v7)
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            try {
                // MS Internet Explorer (ab v6)
                xmlHttp  = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    // MS Internet Explorer (ab v5)
                    xmlHttp  = new ActiveXObject("Msxml2.XMLHTTP");
                } catch(e) {
                    xmlHttp  = null;
                }
            }
        }
    }
    
    if (xmlHttp) {
        //xmlHttp.open('GET', 'shader/Pos4_Normal4_VS.glsl',false);
        xmlHttp.open('GET', filename, false); //synchron
        xmlHttp.overrideMimeType("text/plain; charset=x-user-defined");
        xmlHttp.send(null);
        result = xmlHttp.responseText;
    } else {
        alert('Failure while opening a file');
    }
    
    return result;
}