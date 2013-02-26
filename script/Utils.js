var xmlHttp = null;
/*
* Uses a XMLHttpRequest to retreive the answer
* of a given URL
*/
var loadStringFromFile = function (filename) {
    'use strict';
    
    var result;
    if (xmlHttp === null) {
        try {
            // Mozilla, Opera, Safari sowie Internet Explorer (ab v7)
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            try {
                // MS Internet Explorer (ab v6)
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                try {
                    // MS Internet Explorer (ab v5)
                    xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e) {
                    xmlHttp = null;
                }
            }
        }
    }
    
    if (xmlHttp) {
        xmlHttp.open('GET', filename, false); //synchron
        xmlHttp.overrideMimeType('text/plain; charset=x-user-defined');
        xmlHttp.send(null);
        result = xmlHttp.responseText;
    } else {
        alert('Failure while opening a file');
    }
    
    return result;
};