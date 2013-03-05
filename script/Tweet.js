//
// Tweet.js
// holds all data for a Tweet
//

Tweet = function(){
	'use strict';
	
	this.author = "TestAuthor";
	this.content = "TestContent";
	this.retweetCount = 0;
	this.pointValue = 0;
}

Tweet.prototype.compareTo = function (tweet2){
	'use strict';
	
	var similarityCount = 0;
	var StringArrayOrigin = this.content.split(/\s/g); 
	var StringArray = tweet2.content.split(/\s/g); 
	var regExp = new RegExp(/[\.,#-\/!$%\^&\*;:{}=\-_`~()]/g);
	//console.log(StringArrayOrigin);
	
	for(var i=0; i<StringArrayOrigin.length; i++){		
		var searchString1 = StringArrayOrigin[i].replace(regExp, '').toLowerCase();
		//console.log(searchString1);
		for(var j=0; j<StringArray.length; j++){
			var searchString2 = StringArray[j].replace(regExp, '').toLowerCase();
			//console.log(searchString2);
			if(searchString1.length > 0 && searchString2.length > 0 && searchString1 == searchString2)
				similarityCount++
		}
		//console.log(searchString + " found! At Line: " + tweet2.content.indexOf(searchString));
	}	
	console.log("Similarity Count of '" + this.content + "' and '" + tweet2.content + "' is: " + similarityCount);
}

Tweet.prototype.evaluatePoints = function (query){
	'use strict';
	this.pointValue = 0;
	
	if(this.content.indexOf(query) != -1){
		this.pointValue = 100;	// TODO: sinnvoller machen ;-)
	}
		
}




