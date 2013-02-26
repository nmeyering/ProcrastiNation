var MyFirstApp = cc.Layer.extend({
	init : function() {
		this._super();


		// Hotfix: Dummy TweetArray with none-dynamic content
		var JsonResult = {
			"completed_in" : 0.004,
			"max_id" : 0,
			"max_id_str" : "0",
			"page" : 1,
			"query" : "oscar",
			"results" : [{
				"created_at" : "Mon, 25 Feb 2013 00:20:46 +0000",
				"from_user" : "Harry_Styles",
				"from_user_id" : 181561712,
				"from_user_id_str" : "181561712",
				"from_user_name" : "Harry Styles",
				"geo" : null,
				"id" : 305834688113676288,
				"id_str" : "305834688113676288",
				"iso_language_code" : "en",
				"metadata" : {
					"recent_retweets" : 17,
					"result_type" : "popular"
				},
				"profile_image_url" : "http:\/\/a0.twimg.com\/profile_images\/2937565237\/73671368fc4fd24b206cd91d8a86053e_normal.jpeg",
				"profile_image_url_https" : "https:\/\/si0.twimg.com\/profile_images\/2937565237\/73671368fc4fd24b206cd91d8a86053e_normal.jpeg",
				"source" : "&lt;a href=&quot;http:\/\/twitter.com\/download\/iphone&quot;&gt;Twitter for iPhone&lt;\/a&gt;",
				"text" : "Jennifer Lawrence needs to win an Oscar tonight..",
				"to_user" : null,
				"to_user_id" : 0,
				"to_user_id_str" : "0",
				"to_user_name" : null
			}, {
				"created_at" : "Mon, 25 Feb 2013 04:23:10 +0000",
				"from_user" : "_Snape_",
				"from_user_id" : 304185486,
				"from_user_id_str" : "304185486",
				"from_user_name" : "Professor Snape",
				"geo" : null,
				"id" : 305895690633093120,
				"id_str" : "305895690633093120",
				"iso_language_code" : "en",
				"metadata" : {
					"recent_retweets" : 14,
					"result_type" : "popular"
				},
				"profile_image_url" : "http:\/\/a0.twimg.com\/profile_images\/1387717498\/snape_normal.jpg",
				"profile_image_url_https" : "https:\/\/si0.twimg.com\/profile_images\/1387717498\/snape_normal.jpg",
				"source" : "&lt;a href=&quot;http:\/\/twitter.com\/&quot;&gt;web&lt;\/a&gt;",
				"text" : "Just a friendly reminder that Harry Potter never won an Oscar. Apparently, inspiring an entire generation isn't good enough. #Oscars2013",
				"to_user" : null,
				"to_user_id" : 0,
				"to_user_id_str" : "0",
				"to_user_name" : null
			}, {
				"created_at" : "Mon, 25 Feb 2013 04:03:16 +0000",
				"from_user" : "1LoganHenderson",
				"from_user_id" : 108538006,
				"from_user_id_str" : "108538006",
				"from_user_name" : "Logan Henderson",
				"geo" : null,
				"id" : 305890681086431232,
				"id_str" : "305890681086431232",
				"iso_language_code" : "en",
				"metadata" : {
					"recent_retweets" : 12,
					"result_type" : "popular"
				},
				"profile_image_url" : "http:\/\/a0.twimg.com\/profile_images\/3126719019\/f0460e1b4a217a9a41998cf716bdc108_normal.jpeg",
				"profile_image_url_https" : "https:\/\/si0.twimg.com\/profile_images\/3126719019\/f0460e1b4a217a9a41998cf716bdc108_normal.jpeg",
				"source" : "&lt;a href=&quot;https:\/\/itunes.apple.com\/us\/app\/mullerphoto\/id585740073?mt=8&amp;uo=4&quot;&gt;MullerPhoto on iOS&lt;\/a&gt;",
				"text" : "The fellas @glennmccuen @codylongo hangin at the Elton John Oscar Party! http:\/\/t.co\/q6gwRbRRxG",
				"to_user" : null,
				"to_user_id" : 0,
				"to_user_id_str" : "0",
				"to_user_name" : null
			}],
			"results_per_page" : 15,
			"since_id" : 0,
			"since_id_str" : "0"
		};

		var tweetArray = new Array(JsonResult.results.length);
		
		for(var i=0; i<JsonResult.results.length; i++){
			var newTweet = new Tweet;
			newTweet.author = JsonResult.results[i].from_user_name;
			newTweet.content = JsonResult.results[i].text;
			tweetArray[i] = newTweet;
		};
		
		

		var s = cc.Director.getInstance().getWinSize();

		var layer1 = cc.LayerColor.create(new cc.Color4B(255, 255, 0, 255), 600, 600);
		layer1.setAnchorPoint(new cc.Point(0.5, 0.5));

		var helloLabel = cc.LabelTTF.create(tweetArray[1].author, "Arial", 30);   // see here how to use tweetArray
		helloLabel.setPosition(new cc.Point(s.width / 2, s.height / 2));
		helloLabel.setColor(new cc.Color3B(255, 0, 0));
		var rotationAmount = 0;
		var scale = 1;

		helloLabel.schedule(function() {
			this.setRotation(rotationAmount++);
			if (rotationAmount > 360) {
				rotationAmount = 0;
			}
			this.setScale(scale);
			scale += 0.05;
			if (scale > 10) {
				scale = 1;
			}
		});

		layer1.addChild(helloLabel);
		this.addChild(layer1);

		return true;
	}
});

var MyFirstAppScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		var layer = new MyFirstApp();
		layer.init();
		this.addChild(layer);
	}
});

