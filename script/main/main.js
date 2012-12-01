//some shorter names for the Box2D stuff
var B2Vec2 = Box2D.Common.Math.b2Vec2,
	B2AABB = Box2D.Collision.b2AABB,
	B2BodyDef = Box2D.Dynamics.b2BodyDef,
	B2Body = Box2D.Dynamics.b2Body,
	B2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	B2Fixture = Box2D.Dynamics.b2Fixture,
	B2World = Box2D.Dynamics.b2World,
	B2MassData = Box2D.Collision.Shapes.b2MassData,
	B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	B2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	B2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	B2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

var world;

function initWorld() {
	'use strict';
	//                   gravity           allow sleep
	world = new B2World(new B2Vec2(0, 10), true);
	
	//defines the material properties of all objects
	var fixDef = new B2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	
	var bodyDef = new B2BodyDef;
	
	//create ground
	bodyDef.type = B2Body.b2_staticBody;
	bodyDef.position.x = 9;
	bodyDef.position.y = 13;
	fixDef.shape = new B2PolygonShape;
	fixDef.shape.SetAsBox(15, 0.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//create some objects
	bodyDef.type = B2Body.b2_dynamicBody;
	for (var i = 0; i < 10; ++i) {
		fixDef.shape = new B2PolygonShape;
		
		//                    half width           half height
		fixDef.shape.SetAsBox(Math.random() + 0.1, Math.random() + 0.1);
		
		bodyDef.position.x = Math.random() * 10 + 7;
		bodyDef.position.y = Math.random() * 10 - 5;
		world.CreateBody(bodyDef).CreateFixture(fixDef);
	}
	
};

function update() {
	//      frame-rate, velocity iterations, position iterations
	world.Step(1 / 60,  10,  10);
	world.DrawDebugData();
	world.ClearForces();
};

function main() {
	'use strict';
	
	initWorld();
	
	//setup debug draw
	var debugDraw = new B2DebugDraw();
	debugDraw.SetSprite(document.getElementById("TheCanvas").getContext("2d"));
	debugDraw.SetDrawScale(30.0);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
	
	world.SetDebugDraw(debugDraw);
	
	window.setInterval(update, 1000 / 60);
};