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

TweetManager = function(filename){
	'use strict';
		
	this.queryResult;
	
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
    	console.log("Started loading Tweets...")
        xmlHttp.open('GET', filename, true); //asynchron
        xmlHttp.overrideMimeType('text/plain; charset=x-user-defined');
        xmlHttp.onreadystatechange = function () {
	        if (xmlHttp.readyState == 4) {
	        	this.queryResult = JSON.parse(xmlHttp.responseText);
	            console.log("Tweets loaded and parsed! :)")
	            var director = cc.Director.getInstance();
	            if(director.getRunningScene().myLayer != undefined)
	            	director.getRunningScene().myLayer.addNewTextLabel("Test!");
            	else{
            		console.log("undefined");
            	}
	        }
		};
        xmlHttp.send(null);
    } else {
        alert('Failure while opening a file');
    }
};
