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
	@roomItem:bool	if item is room Item, it is used immediately
	-------
	@isSecret:bool 	assigned at creation, if item value === -1 hides item from non-explicit searches: useful for hidden switches and the like
*/
class Item {
    constructor(name, desc, takeable, cond, use, durability, isWeapon, strength, value, roomItem = false) {
			this.name = name;
			this.desc = desc;
			this.takeable = takeable;
			this.cond = cond;
			this.use = use;
			this.durability = durability;
			this.isWeapon = isWeapon;
			this.strength = strength;
			this.value = value;
			this.roomItem = roomItem;
			//
			this.isSecret = this.value === -1;
    }
};

function roomObject(name, desc, value = 0) {
	return new Item(
		name,
		desc,
		false,
		function(){return false;},
		function(){},
		0,
		false,
		0,
		value,
	);
}

function roomTrigger(name, desc, use, value = 0) {
	return new Item(
		name,
		desc,
		false,
		function(){return true;},
		use,
		0,
		false,
		0,
		value,
		true
	);
}

function weapon(name, desc, strength, value) {
	return new Item(
		name,
		desc,
		true,
		function(){return false;},
		function(){},
		0,
		true,
		strength,
		value
	);
}
/*
	@name:String		name of Enemy
	@desc:String		quick description of Enemy
	@health:int			Enemy health
	@attack:int			Enemy attack strength
	@loot:Array<Item>	Potential loot drops
	@isReq:bool			if loot is required for character
	@onKill:func		event that triggers on enemy death
*/
class Enemy {
	constructor(name, desc, health, attack, loot, isReq, onKill) {
		this.name = name;
		this.desc = desc;
		this.health = health;
		this.attack = attack;
		this.loot = loot;
		this.isReq = isReq;
		this.onKill = onKill;
		this.isSecret = false;
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
		1, false, 0, 1
	);
}

function tequila(){
	return new Item('Tequila',
		'Lime and salt not included',
		true,
		function(){return (player.health <= 90);},
		function(){player.health+=10;player.sanity-=10;basicEcho('An emergency shot of Tequila goes down about as easily as you\'d exepct');},
		1, false, 0, 3
	);
}

function peanutBrittle(){
	return new Item('Peanut Brittle',
		'Homemade peanut brittle made with love',
		true,
		function(){return (player.health <= 93);},
		function(){player.health+=7;basicEcho('The peanut brittle gives way with a satisfying crunch');},
		1, false, 0, 3
	);
}

function greenEggsAndHam(){
	return new Item('Green Eggs and Ham',
		'Will you eat them in a house, will you eat them with a mouse? Will you eat them in a box, will you eat them with a fox?',
		true,
		function(){return (player.health <= 90);},
		function(){player.health+=10;basicEcho('You do! You do like green eggs and ham!');},
		1, false, 0, 5
	);
}

function catInTheHat(){
	return new Item('Cat in the Hat',
		'A small tabby cat wearing a tall striped top hat',
		true,
		function(){return false},
		function(){},
		1, false, 0, 10
	);
}

function sangria(){
	return new Item('Sangria', 
		'A glass of Fernando\'s Sangria. A true delicacy from before The Overtaking.',
		true,
		function(){return (player.health <= 95);},
		function(){player.health+=5;player.sanity-=5;basicEcho('You down the glass, eager for more.');},
		1, false, 0, 1
	);
}

function cupcake(){
	return new Item('cupcake',
		'Delicious homemade brownies with a Vanilla bean frosting',
		true,
		function(){return true},
		function(){player.health+=15;basicEcho('You finish off the cupcake in an instant, wishing for more.');},
		1, false, 0, 5
	);
}

function spinach(){
	return new Item(
		'spinach',
		'Leafy greens that make you sad inside',
		true,
		function(){return true},
		function(){player.health+=10; player.sanity+=5;basicEcho('You eat it straight from the bag, like an animal');},
		1, false, 0, 1
	);
}

function calamari(){
	return new Item(
		'calamari',
		'A delicacy to some among the pre-Oktopi invasion populice',
		true,
		function(){return (player.health <= 80);},
		function(){player.health+=20;player.sanity+=20;basicEcho('It brings you some kind of weird pleasure to eat the cousins of the opressors. You\'re a little sick');},
		1, false, 0, 5
	);
}

/* =============================
   |       	Lore Items  		   |
	 ============================= */

function sdBeachNewspaper(){
	return roomObject(
		'Newspaper',
		'One article stands out that hasn\'t been water damaged:\n"ELISA brings a new era of man, one of servitude. None can stand in the way of a homicidal AI with good conversation skills..."',
	);
}

function sdBeachTutorialBook(){
	return roomObject(
		'Tutorial',
		'Welcome to the game! Congrats! You just \'inspect\'ed your first item! There are a few other things to look at in this room so try finding those! If you get stuck, type \'help\'!',
	);
}

function downtownSDCombatTutorialBook(){
	return roomObject(
		'Combat Tutorial',
		'Wow! You\'re doing great! To progress past this point you need to defeat an enemy. Try typing \'attack\' and then try \'attack\' followed by the specific enemy name! See what happens! Also you might want to \'equip\' that big stick...',
	);
}

function gaslampShopTutorialBook(){
	return roomObject(
		'Shop Tutorial',
		'Last tutorial you should have to deal with...Another cool part of this game is the ability to buy and sell items from a shop. Type \'shop\' to check it out!',
	);
}

function mainStreetMessage(){
	return roomObject(
		'message',
		'The message appears to read: "They trapped me...they trapped me where good diets go to die. Help-"  it seems to cut off abruptly'
	);
}

function frontierMessage(){
	return roomObject(
		'message',
		'The message reads: "...Don\'t have much time. I\'m running out of supplies. All that is left are the...parfaits...'
	);
}
/* =============================
   |       Special Items       |
	 ============================= */

function locationDossier(){
	return roomTrigger(
		'Dossier',
		'A list of last seen locations for all previous Vendadores.',
		function() {
			if(officeSD.enemies.length > 0) {
				basicEcho('The Corrupted Copier blocks your way! It shoots paper in your direction causing minor cuts.');
				player.health -= 1;
			} else {
				basicEcho('The Copier defeated, you\'re finally able to pick up the dossier and begin your quest.');
				basicEcho('On the first page, it reads: "We\'ve traced Ishi\'s location to a particular theme park in Anaheim. After a few years in which he seemed to be buying all the non-ELISA corrupted Vans on the west coast. He seems to have settled. At least for now..."')
				officeSD.connections.push(mainStreetDL);
				officeSD.directions.push('to Anaheim');
				basicEcho('----------------')
				basicEcho('A NEW PATH HAS OPENED: To Anaheim! You may now "go to Anaheim" from this location!');
				basicEcho('Be sure you\'re ready to continue, there\'s no coming back...');
			}
		}
	);
}

function disneyTicket(){
	return new Item(
		'Park Ticket',
		'A ticket to access the rides in the park',
		true,
		function(){return false;},
		function(){},
		0, false, 0, 15
	);
}

function clubThirtyFourPin(){
	return new Item(
		'Club 34 pin',
		'A specially encoded pin that gives access to the exclusive club 34',
		true,
		function(){return false;},
		function(){}, 
		0, false, 0, 10
	);
}

function thunderRideToken(){
	return new Item('Thunder Ride Token', 'A commemorative token for riding Mountain of Thunder', true, function(){return false;}, function(){}, 0, false, 0, 1);
}

function boulderChaseToken(){
	return new Item('Boulderchase Token', 'A commemorative token for riding Boulderchase', true, function(){return false;}, function(){}, 0, false, 0, 1);
}

function mainStreetHiddenMickey(){
	return roomTrigger(
		'hidden mickey',
		'A cleverly hidden mouse head tucked behind a tree on the main drag',
		function(){
			if(player.hasItem('Club 34 pin') === -1) {
				player.addItem(clubThirtyFourPin());
				basicEcho('Tucked behind the symbol is a pin to access Club 34! You put it in your backpack for later');
			} else {
				basicEcho('You look behind the symbol, but don\'t see anything!');
			}
		},
		-1
	);
}

function suspiciousCarpet(){
	return roomTrigger(
		'suspicious carpet',
		'A tastefully ornate Arabian carpet',
		function(){
			player.health -= 10;
			basicEcho('Why did you step on a suspicious carpet?! Your health takes a plunge as you fall into a deep pit...eventually managing to get back out.');
		}
	);
}

function debris(){
	return roomTrigger(
		'debris',
		'A pile of broken fake rock and dirt from years of neglect',
		function(){
			var chance = getRandomInt(1,10);
			if(chance === 2) {
				basicEcho('What in tarnation??? There\'s something here in this pile!');
				player.addItem(tequila());
				basicEcho('You found some Tequila! You put it into your bag for later');
			} else {
				basicEcho('Alas, nothing but pebbles');
			}
		}
	);
}

function clubThirtyFourEntrance(){
	return roomTrigger(
		'Club 34 Entrance',
		'Just behind a replica of a New Orleans Speakeasy you find the door for Club 34...',
		function(){
			if(player.hasItem('Club 34 pin') > -1) {
				basicEcho('You flash your pin to the automatic door security, opening a path from Frontierland');
				basicEcho('NEW PATH UNLOCKED, YOU MAY NOW \'GO TO CLUB 34\'');
				frontier.connections.push(club34);
				frontier.directions.push('to Club 34');
			} else {
				basicEcho('The door does its best impression of a door telling you to piss off');
			}
		}
	);
}

function toontownDoor(){
	return roomTrigger(
		'Door',
		'Carved out of plastic rock from before the era of ELISA',
		function(){
			if(player.hasItem('Thunder Ride Token') > -1 && player.hasItem('Boulderchase Token') > -1) {
				player.addItem(spinach());
				basicEcho('It was immediately clear Ishi had been here. From the 20 computers lying in a corner, deranged drawings of vans, and a couple bags of spinach you quickly pick up.');
			} else {
				basicEcho('The door remains closed. Try enjoying the park a little more...');
			}
		}
	);
}

function gEdgeCantina(){
	return roomTrigger(
		'Cantina',
		'Never have you seen a more wretched home of scum and villainy',
		function(){
			if(gEdge.enemies.length > 0) {
				basicEcho('The Cantina remains surrounded by enemies. You can\'t get through!');
			} else {
				basicEcho('After wiping your weapon clean from the busted electronics, you enter the dark fast food restaurant looking for your long lost PM...');
				basicEcho('Huddling over a collection of parfait containers: You see him. A little scragglier than you remember, but it\'s definitely Ishi. You call out.');
				basicEcho('Ishi stops, turns, recognizing you saying one word: "SUUUUUUUGAR"');
				if(player.hasItem('cupcake') > -1) {
					basicEcho('You give Ishi your cupcake which he quickly demolishes before coming around to his old self');
					player.removeItem('cupcake');
					basicEcho('"Thanks' + player.name + ', I\'d had a serious craving and these Parfaits are far too healthy for me. What\'s this? You\'re getting the team back together? Last I saw Keith he was in...LA. We should go there next');
					gEdge.connections.push(downtownLA);
					gEdge.directions.push('to LA');
					basicEcho('NEW PATH OPENED \'to LA\', FINISH UP HERE FIRST!');
				} else {
					basicEcho('You don\'t possess the right sugar. Ishi scowls at you and goes back to the parfaits.');
				}
			}
		}
	)
}

//weapons
function truffulaBranch(){
	return weapon(
		'Truffula Branch',
		'It\'s rare to find a Truffula that hasn\'t been turned into a Thneed...use it well',
		5, 5
	);
}

function bigStick(){
	return weapon(
		'Big Stick',
		'A large branch in a convenient location',
		3, 2
	);
}

function magicPaintbrush(){
	return weapon(
		'Magic Paintbrush',
		'Magic might be a strong word, but it\'s a large and very durable fake paintbrush',
		6, 4
	);
}

function turkeyLeg(){
	return weapon(
		'Turkey Leg',
		'Originally created as a piece of food, after it showed no signs of going bad over three years...it was decided this might be better as a weapon',
		5, 4
	);
}


/* =============================
   |     Special Enemies       |
   ============================= */

   function copierGoneWild(onKill) {
   	return new Enemy('Corrupted Copier',
   		'A brute of a machine made even more hostile than normal by the rogue AI',
   		25, 7, [], false, onKill);
   }

   function mikeClubThirtyFour(onKill) {
   	return new Enemy('MIKE',
   		'A more rough around the edges AI just recently given life in Sunny Santa Barbara',
   		40, 7, [], false, onKill);
   }

/* =============================
   |     Generic Enemies       |
   ============================= */

function tentacle(onKill) {
	return new Enemy(
		'Tentacle', 
		'Looking slightly more threatening than a wet noodle',
		5,
		0,
		[moldySandwich()],
		false,
		onKill
	);
}

function alexa(onKill) {
	return new Enemy('Alexa Speaker',
		'A smart speaker corrupted by ELISA. About as threatening as a stationary hockey puck',
		5,
		1,
		[sangria(), moldySandwich()],
		false,
		onKill
	);
}

function googHome(onKill) {
	return new Enemy('Home Mini',
		'A smart speaker corrupted by ELISA. About as threatening as a stationary hockey puck',
		5,
		1,
		[spinach()],
		false,
		onKill
	);
}

function miniMac(onKill) {
	return new Enemy('Mac Mini',
		'A more formiddable opponent than your typical puck. The mini can overheat and scald your shins',
		10,
		3,
		[],
		false,
		onKill
	);
}
//HELPER FUNCTIONS
/*
	PURPOSE: Return a random integer within the supplied range
*/
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.round(Math.random() * (max - min)) + min;
};
