/*
    @name:String        name of item
    @desc:String        description of item
    @takeable:boolean   can I put the item in my backpack
    @cond:boolean		Condition when this item is usable
    @use:function		What this Item will do if cond is met...
	@durability:int     how many times item can be used before breaking
	@weapon:bool		is this item a weapon/can be used to attack
	@strength:int		if item is weapon, its attack strength
	@value:Int			value of item in game currency
*/
class Item {
    constructor(name, desc, takeable, cond, use, durability, isWeapon, strength, value) {
        this.name = name;
        this.desc = desc;
        this.takeable = takeable;
		this.cond = cond;
		this.use = use;
		this.durability = durability;
		this.isWeapon = isWeapon;
		this.strength = strength;
		this.value = value;
    }
};
/*
	@name:String		name of Enemy
	@desc:String		quick description of Enemy
	@health:int			Enemy health
	@attack:int			Enemy attack strength
	@loot:Array<Item>	Potential loot drops
	@isReq:bool			if loot is required for character
*/
class Enemy {
	constructor(name, desc, health, attack, loot, isReq) {
		this.name = name;
		this.desc = desc;
		this.health = health;
		this.attack = attack;
		this.loot = loot;
		this.isReq = isReq;
	}
};

/* =============================
   |       Generic Items       |
   ============================= */

function moldySandwich(){
	return new Item('Moldy Sandwich', 
		'A sandwich that has most definitely seen better days',
		true,
		function(){return (player.health <= 95);},
		function(){player.health+=5;player.sanity-=5;basicEcho('You eat it...but you hate yourself for it');},
		1,
		false,
		0,
		1
	);
}

function tequila(){
	return new Item('Tequila',
		'Lime and salt not included',
		true,
		function(){return (player.health <= 90);},
		function(){player.health+=10;player.sanity-=10;basicEcho('An emergency shot of Tequila goes down about as easily as you\'d exepct');},
		1,
		false,
		0,
		3
	);
}

function peanutBrittle(){
	return new Item('Peanut Brittle',
		'Homemade peanut brittle made with love',
		true,
		function(){return (player.health <= 93);},
		function(){player.health+=7;basicEcho('The peanut brittle gives way with a satisfying crunch');},
		1,
		false,
		0,
		3
	);
}

function greenEggsAndHam(){
	return new Item('Green Eggs and Ham',
		'Will you eat them in a house, will you eat them with a mouse? Will you eat them in a box, will you eat them with a fox?',
		true,
		function(){return (player.health <= 90);},
		function(){player.health+=10;basicEcho('You do! You do like green eggs and ham!');},
		1,
		false,
		0,
		5
	);
}

function catInTheHat(){
	return new Item('Cat in the Hat',
		'A small tabby cat wearing a tall striped top hat',
		true,
		function(){return false},
		function(){},
		1,
		false,
		0,
		10
	);
}

function sangria(){
	return new Item('Glass of Sangria', 
		'A glass of Fernando\'s Sangria. A true delicacy from before The Overtaking.',
		true,
		function(){return (player.health <= 95);},
		function(){player.health+=5;player.sanity-=5;basicEcho('You down the glass, eager for more.');},
		1,
		false,
		0,
		1
	);
}

function cupcake(){
	return new Item('cupcake',
		'Delicious homemade brownies with a Vanilla bean frosting',
		true,
		function(){return true},
		function(){player.health+=15;basicEcho('You finish off the cupcake in an instant, wishing for more.');},
		1,
		false,
		0,
		5
	);
}

function calamari(){
	return new Item(
		'calamari',
		'A delicacy to some among the pre-Oktopi invasion populice',
		true,
		function(){return (player.health <= 80);},
		function(){player.health+=20;player.sanity+=20;basicEcho('It brings you some kind of weird pleasure to eat the cousins of the opressors. You\'re a little sick');},
		1,
		false,
		0,
		5
	);
}

/* =============================
   |       Special Items       |
   ============================= */

//weapons
function truffulaBranch(){
	return new Item(
		'Truffula Branch',
		'It\'s rare to find a Truffula that hasn\'t been turned into a Thneed...use it well',
		true,
		function() {return false;},
		function() {},
		0,
		true,
		5,
		5
	);
}

function bigStick(){
	return new Item(
		'Big Stick',
		'A large branch in a convenient location',
		true,
		function() {return false;},
		function() {},
		0,
		true,
		3,
		2
	);
}

/* =============================
   |     Special Enemies       |
   ============================= */

   function copierGoneWild() {
   	return new Enemy('Tainted Copier',
   		'A brute of a machine made even more hostile than normal by the rogue AI',
   		50,
   		7,
   		[],
   		false);
   }

/* =============================
   |     Generic Enemies       |
   ============================= */

function tentacle() {
	return new Enemy('Tentacle', 
	'Looking slightly more threatening than a wet noodle',
	5,
	0,
	[moldySandwich()],
	false);
}

function alexa() {
	return new Enemy('Alexa Speaker',
		'A smart speaker corrupted by ELISA. About as threatening as a stationary hockey puck',
		5,
		1,
		[sangria(), moldySandwich()],
		false
	);
}