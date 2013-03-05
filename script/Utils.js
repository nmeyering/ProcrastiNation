var xmlHttp = null;
var tweetArray = null;
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

TweetManager = function(baseUrl, query){
	'use strict';
	
	var filename = baseUrl + query;
		
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
        
        // ready function
        xmlHttp.onreadystatechange = function () {
	        if (xmlHttp.readyState == 4) {
	        	this.queryResult = JSON.parse(xmlHttp.responseText);
	        	
    			tweetArray = new Array(this.queryResult.results.length);
		
				for(var i=0; i<this.queryResult.results.length; i++){
					var newTweet = new Tweet;
					newTweet.author = this.queryResult.results[i].from_user_name;
					newTweet.content = this.queryResult.results[i].text;
					
					if(this.queryResult.results[i].metadata.recent_retweets != undefined)
						newTweet.retweetCount = this.queryResult.results[i].metadata.recent_retweets;
					else
						newTweet.retweetCount = 0;						
					
					tweetArray[i] = newTweet;
					
					// Testing
					newTweet.evaluatePoints(query);
					newTweet.compareTo(tweetArray[0]); 		
				}	
			        	
	            console.log(this.queryResult.results.length + " Tweets loaded and parsed! :)")
	            var director = cc.Director.getInstance();
	            if(director.getRunningScene().myLayer != undefined)
	            	director.getRunningScene().myLayer.addNewTextLabel(tweetArray[1].author);
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
