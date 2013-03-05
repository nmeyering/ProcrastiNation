var PTM_RATIO = 32;
var SMALL_SPRITE_MANAGER = 1;
var BIG_SPRITE_MANAGER = 2;

PhysicsLayer = cc.Layer.extend({
    
    world:null,
    
    ctor:function () {
        this._super();
        
        this.setMouseEnabled(true);
        
        // var layer1 = cc.LayerColor.create(new cc.Color4B(0, 255, 0, 255), 600, 600);
//         
        // this.addChild(layer1);
        
        // typedefs
        var b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2World = Box2D.Dynamics.b2World
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
        
        var screenSize = cc.Director.getInstance().getWinSize();
        
        this.world = new b2World(new b2Vec2(0, -10), true);
        this.world.SetContinuousPhysics(true);
        
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;
        
        var bodyDef = new b2BodyDef;
        
        console.log('World Count 1: ' + this.world.GetBodyCount());
        
        // create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(20, 2);
        
        // upper
        bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        // bottom
        bodyDef.position.Set(10, -1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        fixDef.shape.SetAsBox(2, 14);
        // left
        bodyDef.position.Set(-1.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // right
        bodyDef.position.Set(33.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        console.log('World Count2: ' + this.world.GetBodyCount());
        
        //Set up sprite

        var smallSpriteManager = cc.SpriteBatchNode.create("resources/block.png", 150);
        this.addChild(smallSpriteManager, 0, SMALL_SPRITE_MANAGER);
        var bigSpriteManager = cc.SpriteBatchNode.create("resources/big_tweet.png", 150);
        this.addChild(bigSpriteManager, 0, BIG_SPRITE_MANAGER);

		for (var i = 0; i < 1; i++) {
	        this.addNewSpriteWithCoords(cc.p(screenSize.width / 4, screenSize.height / 2));			
		}

        // this.addNewSpriteWithCoords(cc.p( 2 * screenSize.width / 4, screenSize.height / 2));
        // this.addNewSpriteWithCoords(cc.p( 3 * screenSize.width / 4, screenSize.height / 2));
        // this.addNewSpriteWithCoords(cc.p( 2 * screenSize.width / 4, screenSize.height / 2));  
              
        var label = cc.LabelTTF.create("Tap screen", "Marker Felt", 32);
        this.addChild(label, 0);
        label.setColor(cc.c3b(0, 0, 255));
        label.setPosition(cc.p(screenSize.width / 2, screenSize.height - 50));

        this.scheduleUpdate();
        
        console.log('World Count3: ' + this.world.GetBodyCount());
    },

    addNewSpriteWithCoords:function (p, big) {
        //UXLog(L"Add sprite %0.2f x %02.f",p.x,p.y);
        var batch = this.getChildByTag(BIG_SPRITE_MANAGER);

        //We have a 64x64 sprite sheet with 4 different 32x32 images.  The following code is
        //just randomly picking one of the images
        var idx = (Math.random() > .5 ? 0 : 1);
        var idy = (Math.random() > .5 ? 0 : 1);
        
        //get an image
        var sprite = cc.Sprite.createWithTexture(batch.getTexture());
        batch.addChild(sprite);

        //sprite.setPosition(cc.p(p.x, p.y));

        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        
        console.log("x pos: " + (p.x / PTM_RATIO) + " y pos: " + (p.y / PTM_RATIO));
        
        bodyDef.userData = sprite;
        var body = this.world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        // if (big) {
            // dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box
        // } else {
            dynamicBox.SetAsBox(150 / PTM_RATIO, 40 / PTM_RATIO);
        // } 

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        fixtureDef.restitution = 0.0;
        body.CreateFixture(fixtureDef);

    },
    
    explosion : function (location) {
    	var b2Vec2 = Box2D.Common.Math.b2Vec2,
            b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body;
    	
    	// Boolean doSuction = new Boolean(true);
    	
    	for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
    		if (b.GetType() !== b2Body.b2_staticBody) {
    			var touchPosition = new b2Vec2(location.x / PTM_RATIO, location.y / PTM_RATIO);
    			var bodyPosition = new b2Vec2(b.GetPosition().x, b.GetPosition().y);
    			
    			bodyPosition.Subtract(touchPosition);
    			distance = bodyPosition.Length();
    			console.log('Distance: ' + distance);
    			
    			var maxDistance = 9;
    			var maxForce = 40;
    			
    			var distance = -1;
    			var strength = -1;
    			var force = -1;
    			var angle = -1;
    			
    			if (distance > maxDistance) {
    				distance = maxDistance - 0.01;
    			}
    			
    			strength = (maxDistance - distance) / maxDistance;
    			force = strength * maxForce;
    			angle = Math.atan2(bodyPosition.y - touchPosition.y, bodyPosition.x - touchPosition.x);
    			
    			var impulseVec = new b2Vec2(Math.cos(angle) * force, Math.sin(angle) * force);
    			b.ApplyImpulse(impulseVec, b.GetPosition());
    		}
    	}
    },
    
    update:function (dt) {
        //It is recommended that a fixed time step is used with Box2D for stability
        //of the simulation, however, we are using a variable time step here.
        //You need to make an informed choice, the following URL is useful
        //http://gafferongames.com/game-physics/fix-your-timestep/

        var velocityIterations = 8;
        var positionIterations = 1;

        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);

        //Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData();
                myActor.setPosition(cc.p(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
                //console.log(b.GetAngle());
            }
        }

    },
    
    checkCollisionAndDelete: function (location) {
        
        var newX = location.x / PTM_RATIO;
        var newY = location.y / PTM_RATIO; 
        // var newX = location.x;
        // var newY = location.y; 
        
        var b2Vec2 = Box2D.Common.Math.b2Vec2;
        var	b2Transform = Box2D.Common.Math.b2Transform;
         
        var foundBody = null;
        var foundSprite = null;
        // console.log("World Body Length: " + this.world.GetBodyCount());
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            for (var f = b.GetFixtureList(); f; f = f.GetNext()) {
    	        var touchPoint = new b2Vec2(newX, newY);
        		// console.log('TouchPoint : ' + touchPoint.x);
                if (f.TestPoint(touchPoint) === true) {
                     console.log("say hello");
                     foundBody = b;
                     foundSprite = b.GetUserData();
                }
            }            
        }
        
        var batch = this.getChildByTag(BIG_SPRITE_MANAGER);
        
        if (foundBody !== null && foundSprite !== null) {
        	this.world.DestroyBody(foundBody);
        	batch.removeChild(foundSprite);
        }
    },
    
    onMouseUp:function (event) {
        var location = event.getLocation();
//         
        // console.log(location);
        // this.addNewSpriteWithCoords(location);
        // this.checkCollisionAndDelete(location);
        this.explosion(location);
    }
});

PhysicsTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PhysicsLayer();
        // layer.ctor();
        this.addChild(layer);
    }
});