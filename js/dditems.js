/*
    @name:String        name of item
    @desc:String        description of item
    @takeable:boolean   can I put the item in my backpack
    @cond:boolean		Condition when this item is usable
    @use:function		What this Item will do if cond is met...
	@durability:int     how many times item can be used before breaking
	@weapon:bool		is this item a weapon/can be used to attack
	@strength:int		if item is weapon, its attack strength
*/
class Item {
    constructor(name, desc, takeable, cond, use, durability, isWeapon, strength) {
        this.name = name;
        this.desc = desc;
        this.takeable = takeable;
		this.cond = cond;
		this.use = use;
		this.durability = durability;
		this.isWeapon = isWeapon;
		this.strength = strength;
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
   |  Character Specific Items |
   ============================= */
//Grace
function sterekFanfic(){
    return new Item(
        'Sterek Fanfic',
        'Everyone knows this is how it should have gone...',
        true,
        function(){return true;},
        function(term) {player.health+= 10; player.sanity+= 20; basicEcho('You read another chapter, and feel empowered to continue. It\'s what they\'d want you to do', term);},        
        3,
        false,
        0    
    );
}

/* =============================
   |       Generic Items       |
   ============================= */

function moldySandwich(){
	return new Item('Moldy Sandwich', 
	'A sandwich that has most definitely seen better days',
	true,
	function(){return (player.health <= 95);},
	function(term){player.health+=5;player.sanity-=5;basicEcho('You eat it...but you hate yourself for it', term);},
	1,
	false,
	0);
}

function milk(){
	return new Item(
	'milk',
	'Ultra-pasturized and ultra-homogeonized: Wherever you find it, it\'s probably okay to drink...',
	true,
	function(){return (player.health <= 95);},
	function(term){player.health+=5;player.sanity+=5;basicEcho('You drink it...moo', term);},
	1,
	false,
	0);
}

function longIsland(){
	return new Item(
	'Long Island Iced Tea',
	'You can barely taste the alcohol!',
	true,
	function(){return true;},
	function(term){player.health-=5;player.sanity+=10;basicEcho('You take a sip...', term);},
	2,
	false,
	0);
}

function calamari(){
	return new Item(
		'calamari',
		'A delicacy to some among the pre-Oktopi invasion populice',
		true,
		function(){return (player.health <= 80);},
		function(term){player.health+=20;player.sanity+=20;basicEcho('It brings you some kind of weird pleasure to eat the cousins of the opressors. You\'re a little sick', term);},
		1,
		false,
		0);
}

function bobRossTape(){
	return new Item(
		'Bob Ross Tape',
		'A calming portal into the world of Bob Ross',
		true,
		function(){return true;},
		function(term){player.sanity+=10;basicEcho('You take a breath, it\'s going to be okay', term);},
		1,
		false,
		0);
}

function deepDish(){
	return new Item(
		'Deep Dish Pizza',
		'One of the only foods the Oktopi found worthy to keep around. No one can hate Deepdish.',
		true,
		function(){return (player.health <= 80);},
		function(term){player.health+=20;basicEcho('A delicious bite fills you with warmth and happiness', term);},
		2,
		false,
		0);
}

function chiliFinger(){
	return new Item(
		'Chili Finger',
		'THE Chili finger',
		true,
		function(){return true;},
		function(term){player.health+=20;player.sanity-=20;basicEcho('...why?', term);},
		1,
		false,
		0);
}
/* =============================
   |       Special Items       |
   ============================= */
function oktopiBattleArmor(){
	return new Item(
		'Oktopi Battle Armor',
		'Coral-printed driftwood protection',
		true,
		function(){return false},
		function(){return false},
		1,
		false,
		0
	);
}

function fishFood(){
	return new Item(
		'Fish Food',
		'A can of generic fish food. Might be handy later',
		true,
		function(){return false;},
		function(){return false;},
		1,
		false,
		0
	);
}

function bookOfSquidward(){
	return new Item(
		'The Book of Squidward',
		'Truly the guide to pessimism while surrounded by Atlantis',
		true,
		function(){return false;},
		function(){return false;},
		1,
		false,
		0
	);
}

function oswaldTape(){
	return new Item(
		'Oswald\'s Tape',
		'Blue tape featuring the titular Octopus celebrity',
		true,
		function(){return false;},
		function(){return false;},
		1,
		false,
		0
	);
}

function halfAKey(){
	return new Item(
		'Half a key',
		'The snapped remains of a locker key',
		true,
		function(){return false;},
		function(){return false;},
		1,
		false,
		0
	);
}

function otherHalfKey(){
	return new Item(
		'Other half of a Key',
		'The other half of the locker key',
		true,
		function(){return false;},
		function(){return false;},
		1,
		false,
		0
	);
}

function ochKey(){
	return new Item(
		'Och Key',
		'Some small fragment must have been eaten by this incredible beast. The Third half of the key.',
		true,
		function(){return false;},
		function(){return false;},
		1,
		false,
		0
	);
}

//weapons
var oldSword = {
	name: 'Old Sword',
	desc: 'your old sword from the fandom wars, a little rusty but probably still packs a punch.',
	takeable: true,
	cond: function() {return false;},
	use: function(term) {},
	durability: 0,
	isWeapon: true,
	strength: 5
};

function stopSign(){
	return new Item(
		'Stop Sign',
		'A large Octagonal metal object ripped from its post. Hit \'em with geometry',
		true,
		function(){return false;},
		function(){return false;},
		1,
		true,
		7
	);
}

function ochSpear(){
	return new Item(
		'Och Spear',
		'An ancient spear used to hunt Och Ness Monsters on Oktopolis',
		true,
		function(){return false;},
		function(){return false;},
		1,
		true,
		15
	);
}

function meanWords(){
	return new Item(
		'Mean Words',
		'Your mother always told you to keep harsh words to yourself...they can do serious damage',
		true,
		function(){return false;},
		function(){return false;},
		1,
		true,
		10
	);
}

function mysteryMeat(){
	return new Item(
		'Mystery Meat',
		'No one wants to get hit with mystery meat',
		true,
		function(){return false;},
		function(){return false;},
		1,
		true,
		8
	);
}

/* =============================
   |     Special Enemies       |
   ============================= */
//located on southern-most stretch of Ellis Ave. room 5
var oktopiSouthFootSoldier = {
	name:'Oktopi Foot Soldier',
	desc:'A somewhat menacing shock trooper',
	health: 10,
	attack: 10,
	loot: [oktopiBattleArmor()],
	isReq: true
};

function ochNessMonster(){
	return new Enemy(
		'Och Ness Monster',
		'A creature so fearsome, it would draw few crowds back on Oktopolis...onlookers were frequently eaten',
		50,
		10,
		[ochKey()],
		true
	);
}

/* =============================
   |     Generic Enemies       |
   ============================= */

function oktopiFootSoldier() {
	return new Enemy(
		'Oktopi Foot Soldier',
		'A somewhat menacing shock trooper',
		10,
		10,
		[longIsland(), fishFood()],
		false
	);
}

function tentacle() {
	return new Enemy('Tentacle', 
	'Looking slightly more threatening than a wet noodle',
	5,
	0,
	[moldySandwich(), milk()],
	false);
}

function oktopiHeavy() {
    return new Enemy(
        'Oktopi Heavy',
        'A massive brute of an Oktopi',
        20,
        15,
        [],
        false
    );
}