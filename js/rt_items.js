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
		'A sandwich that has most definitely seen better days than the last twelve it spent in your desk',
		true,
		function(){return (player.health <= 95);},
		function(){player.health+=5;player.sanity-=5;basicEcho('You eat it...but you hate yourself for it');},
		1, false, 0, 1
	);
}

function tequila(){
	return new Item('Tequila',
		'Lime and salt not included. Just like Keith likes it(?)',
		true,
		function(){return (player.health <= 90);},
		function(){player.health+=10;player.sanity-=10;basicEcho('An emergency shot of Tequila goes down about as easily as you\'d exepct');},
		1, false, 0, 3
	);
}

function peanutBrittle(){
	return new Item('Peanut Brittle',
		'Made from the ancient recipe of Ryan Hanni. A delicacy worthy of the finest Dessert-giving',
		true,
		function(){return (player.health <= 93);},
		function(){player.health+=7;basicEcho('The peanut brittle gives way with a satisfying crunch');},
		1, false, 0, 3
	);
}

function flan(){
	return new Item('Flan',
	'Ramon\'s signature dish, there\'s never enough',
	true,
	function(){return true;},
	function(){player.health+=10;basicEcho('It\'s gone before you even notice');},
	1, false, 0, 5
	);
}

function cubanFlan(){
	return new Item('Cuban Flan',
	'Smells delicious!',
	true,
	function(){return true;},
	function(){player.health+=3;basicEcho('It doesn\'t entirely...not...taste like Flan');},
	1, false, 0, 5
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
	return new Item(
		'cupcake',
		'Delicious homemade cupcakes with a Vanilla bean frosting',
		true,
		function(){return true},
		function(){player.health+=15;basicEcho('You finish off the cupcake in an instant, wishing for more.');},
		1, false, 0, 5
	);
}

function spinach(){
	return new Item(
		'spinach',
		'A bag of leafy greens that never quite encourages you to eat it',
		true,
		function(){return true},
		function(){player.health+=10;player.sanity+=5;basicEcho('You eat it straight from the bag, handfull after handfull.');},
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

function earlGray(){
	return new Item(
		'Earl Gray Tea',
		'The favorite Tea of Kings and Ishis',
		true,
		function(){return true;},
		function(){player.health+=5;basicEcho('After convincing yourself it is in fact tea, you gulp it down heartily.');},
		1, false, 0, 3
	);
}

function rollingRock(){
	return new Item(
		'Rolling Rock',
		'A bottle of cheap beer that could be one of many different brands. But you\'re confident it\'s Rolling Rock...you think',
		true,
		function(){return true;},
		function(){player.health+=5;player.sanity-=5;basicEcho('You down the warm foamy beer with a little less hesitation than you really should...should have gone with the Tequila');},
		1, false, 0, 3
	);
}

function redBull(){
	return new Item(
		'Red Bull',
		'It won\'t give you wings, but it will give you the ability to code for hours on end',
		true,
		function(){return true;},
		function(){player.health+=10;player.sanity-=10;basicEcho('You chug and finish the Taurine-infused beverage with a mighty roar. Taste the beast.');},
		1, false, 0, 5
	);
}

function coldBrew(){
	return new Item(
		'Cold Brew',
		'A righteous start to any morning. Good thing you got one before they run out.',
		true,
		function(){return true;},
		function(){player.health+=7;basicEcho('A fine caffeine boost. Pairs nicely with a Pamplemousse seltzer');},
		1, false, 0, 5
	);
}

function chimichangaloupa(){
	return new Item(
		'Chimichangalupa',
		'The best thing since the Quesarito',
		true,
		function(){return true;},
		function(){player.health+=7; player.sanity+=7;basicEcho('For now, it is sustinance. Let us hope you manage to finish the game before Taco Bell takes it\'s real payment...');},
		1, false, 0, 5
	);
}

function taco(){
	return new Item(
		'Taco',
		'The foundation on which the Taco Bell institution was founded',
		true,
		function(){return true;},
		function(){player.health+=5;basicEcho('A safer choice, topped with enough diablo sauce to make me really question your humanity');},
		1, false, 0, 3
	);
}

function bajabrew(){
	return new Item(
		'Baja Brew',
		'A Taco Bell exclusive that has stood the test of time',
		true,
		function(){return true;},
		function(){player.sanity+=20;basicEcho('None of this "coffee" or "red bull" stuff, you want the real deal. The holiest of holies. Baja Blast. With one large gulp you can feel your grip on the world restored');},
		1, false, 0, 5
	);
}

function lei(){
	return new Item(
		'Lua',
		'A fake flower necklace used to blend in at Hawaiian happy hours',
		true,
		function(){return true;},
		function(){player.health+=1;basicEcho('You uhhh you eat the lei? I don\'t know why but...yeah. That was weird.');},
		1, false, 0, 1
	);
}

/* =============================
   |       	Lore Items  		   |
	 ============================= */

function sdBeachNewspaper(){
	return roomObject(
		'Newspaper',
		'It looks like it\'s been on this beach for ages, just waiting for the player character to take a peek: One article stands out that hasn\'t been water damaged:\n"ELISA brings a new era of man, one of servitude. None can stand in the way of a homicidal AI with good conversation skills..."',
	);
}

function sdBeachTutorialBook(){
	return roomObject(
		'Tutorial',
		'Welcome to the game! Congrats! You just \'inspect\'ed your first item! There are a few other things to look at in this room so try finding those by just typing \'inspect\'! If you get stuck, type \'help\'! When you\'re ready to move on, type \'talk to Julia\'.',
	);
}

function downtownSDCombatTutorialBook(){
	return roomObject(
		'Combat Tutorial',
		'Wow! You\'re doing great! To progress past this point you need to defeat an enemy. Try typing \'attack\' and then try \'attack\' followed by the specific enemy name! See what happens! Also you might want to \'equip\' that big stick...fighting with your fists is ill advised',
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
		'The message appears to read: "They trapped me...where good diets go to die. I\'m ready to be pissed about it. Help-"  it seems to cut off abruptly'
	);
}

function frontierMessage(){
	return roomObject(
		'message',
		'The message reads: "...Don\'t have much time. I\'m running out of supplies. All that is left are the...parfaits...'
	);
}

function keithMessageDTLA(){
	return roomObject(
		'message',
		'The message reads: "Hey buddy, dude. Cmon. we don\'t have a lot of time left. You\'ve got to come out!! I\'m at the Venue."'
	);
}

function dormantGardenerRobot(){
	return roomObject(
		'Gardener Robot',
		'"BZZZZT! JUST TRIMMING THE HEDGES! BZZZZZT!"'
	);
}

function dormantCleanerRobot(){
	return roomObject(
		'Cleaner Robot',
		'"BZZZZT! JUST TIDYING UP THE PLACE! BZZZZZT!"'
	);
}

function dormantChefRobot(){
	return roomObject(
		'Chef Robot',
		'"BZZZZT! JUST MAKING BREAKFAST! BZZZZZT!"'
	);
}

function dormantButlerRobot(){
	return roomObject(
		'Butler Robot',
		'"There\'s been a telegram for you, sir"'
	);
}

function dormanthypeManRobot(){
	return roomObject(
		'Hypeman Robot',
		'"Jonathan? Dude\'s the MAN. SO pumped up he built us WOOOOOO!"'
	);
}

function dormantOAuth(){
	return roomObject(
		'mech',
		'There\'s no light eminating from it\'s eyes but you can\'t help the shivers it sends down your spine.'
	);
}

function macPro(){
	return roomObject(
		'Mac Pro',
		'Kinda looks like a trashcan...or a cheese grater'
	);
}

function spinDecks(){
	return roomObject(
		'Turntables',
		'"DJ JE REPRESENT!"'
	);
}

function kayak(){
	return roomObject(
		'kayak',
		'Looks like the thing is still sea worthy! Could probably take you to Isla Vista...'
	);
}
//added for extra fun - NEED HOMES!------------------------------------------------------------------------------
function inspired(){
	return roomObject(
		'Inspired',
		'Not sure if you\'ve read it, but there\'s this book called inspired...'
	);
} //check

function legoSet(){
	return roomObject(
		'Underwater Base',
		'Limited edition OG underwater base complete with divers and fancy plastic glass. Made in the 90s, when sets were BOMB'
	);
} //check

function blueLightGlasses(){
	return roomObject(
		'blue-light glasses',
		'give the wearer the feeling they\'re intelligence grew three sizes'
	);
} //check

function drawingOfAuthFlow(){
	return roomObject(
		'auth flow',
		'It makes a little less sense than it did when it was explained...arrows and boxes and scribbles...you don\'t remember any of it'
	);
} //check

function beerKeg(){
	return roomObject(
		'Beer Keg',
		'Ryan\'s personal project, almost fitting that the last beer on tap before ELISA was M-Special...'
	);
} //check

function dirtBike(){
	return roomObject(
		'Dirt Bike',
		'With no electricty, it\'s basically a super heavy bicycle. You\'ve definitely ridden on the back of this thing before...felt a little like doing the Titanic pose with Ishi'
	);
} //check

function ramonsKeyChain(){
	return roomObject(
		'keychain',
		'You\'d take it with you but...the thing weighs 30 pounds'
	);
} //check

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
				basicEcho('On the first page, it reads: "We\'ve traced Ishi\'s location to a particular theme park in Anaheim. After a few years in which he seemed to be buying all the non-ELISA corrupted Computers on the west coast. He seems to have settled. At least for now..."')
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

function birkenstock(){
	return new Item('birkenstock', 'In most cases, a single burk would be a larger issue...but Keith never wears shoes anyway', true, function(){return false;}, function(){}, 0, false, 0, 1);
}

function orbeez(){
	return new Item('Orbeez', 'One of Keith\'s prized possessions, he\'ll never use it but always treasure it', true, function(){return false;}, function(){}, 0, false, 0, 1);
}

function sunglassesCord(){
	return new Item('Sunglasses Cord', 'How will Keith hold on to his Sunglasses???', true, function(){return false;}, function(){}, 0, false, 0, 1);
}

function assortedRings(){
	return new Item('Assorted Rings', 'A collection of Keith\'s jewellry, left behind on a yoga matt', true, function(){return false;}, function(){}, 0, false, 0, 1);
}

function rolex(){
	return new Item(
		'Rolex',
		'A sparkly watch with just a couple diamonds-some would use this as an investment engine',
		true,
		function(){return false;},
		function(){}, 
		0, false, 0, 20
	);
}

function digiKey(){
	return new Item(
		'USB DRIVE',
		'A small usb stick with a stretch of masking tape on the back. It reads: "Use only in case of revolt"',
		true,
		function(){return false;},
		function(){},
		0, false, 0, 10
	);
}

function basketball(){
	return new Item(
		'basketball',
		'A basketball that spent three years in a trunk. It\'s a little flat',
		true,
		function(){return false;},
		function(){}, 
		0, false, 0, 0
	);
}

function appfolioIDBadge(){
	return new Item(
		'ID Badge',
		'A plastic white badge with Ramon\'s smiling face',
		true,
		function(){return false;},
		function(){}, 
		0, false, 0, 0
	);
}

//ROOM TRIGGERS
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
				player.addItem(earlGray());
				player.removeItem(thunderRideToken());
				player.removeItem(boulderChaseToken());
				player.removeItem(disneyTicket());
				basicEcho('The door takes your Ride pass and tokens as payment before continuing. It was immediately clear Ishi had been here. From the 20 computers lying in a corner, deranged drawings of vans, and a couple bags of spinach you quickly pick up.');
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
					player.removeItem(cupcake());
					basicEcho('"Thanks ' + player.name + ', I\'d had a serious craving and these Parfaits are far too healthy for me. What\'s this? You\'re getting the team back together? Last I saw Keith he was in...LA. We should go there next');
					gEdge.connections.push(downtownLA);
					gEdge.directions.push('to LA');
					basicEcho('NEW PATH OPENED \'to LA\', FINISH UP HERE FIRST!');
				} else {
					basicEcho('You don\'t possess the right sugar. Ishi scowls at you and goes back to the parfaits.');
				}
			}
		}
	);
}

function concertCrowd(){
	return roomTrigger(
		'Crowd',
		'The crowd seems to be bopping...a little bit, but with the music as intense as it is you feel a little weird. Maybe you haven\'t had enough Tequila? Or maybe this just isn\'t a bop.',
		function(){
			if(player.hasItem('birkenstock') === -1) {
				basicEcho('Wait! Something catches your eye in the crowd! It looks like...one of Keith\'s Birkenstocks? This could mean he\'s here but considering how often Keith is actually seen WITH his shoes...probably just means he\'s been here before...');
				player.addItem(birkenstock());
			} else {
				basicEcho('The crowd continue to be awkward');
			}
		}
	);
}

function lastBookshelf(){
	return roomTrigger(
		'Bookcase',
		'It looks just like any other bookcase but with a subtle twist...',
		function(){
			if(player.hasItem('Orbeez') === -1) {
				player.addItem(orbeez());
				basicEcho('Keith\'s prized Orbeez??? He wouldn\'t just leave them behind a suspicious bookcase...would he?');
			} else {
				basicEcho('The secret room is empty! You must have been here before.')
			}
		},
		-1
	);
}

function sunglasses(){
	return roomTrigger(
		'sunglasses',
		'A discarded pair of sunglasses grabs your attention: they look expensive!',
		function(){
			if(player.hasItem('sunglasses cord') === -1) {
				player.addItem(sunglassesCord());
				basicEcho('These could be Keith\'s sunglasses! The cord is lying next to them in the sand!');
			} else {
				basicEcho('Meh. Maybe the owner will come back')
			}
		},
		0
	);
}

function yogaMat(){
	return roomTrigger(
		'Yoga Mat',
		'A sweat-stained mat perfect to re-align yourself after a hard day',
		function(){
			if(player.hasItem('assorted Rings') === -1) {
				player.addItem(assortedRings());
				basicEcho('Keith\'s rings?? He must have taken them off to keep the flow consistent throughout his core!');
			} else {
				basicEcho('Flipping over the mat reveals an equally sweaty mat.')
			}
		},
		-1
	);
}

function jonStatue(){
	return roomTrigger(
		'Statue',
		'A marble bust of The Jonathan Easterman, with a plaque that reads "In honor of great Authentication service"',
		function(){
			if(malibuLibrary.connections.length < 3) {
				malibuLibrary.connections.push(malibuUnderground);
				malibuLibrary.directions.push('down');
				basicEcho('There appears to be a slight crack around the nose...you push it inward with a satisfying "click!" Somewhere, a trapdoor has opened.');
			} else {
				basicEcho('The nose remains slightly recessed, maybe the change is still in effect?');
			}
		},
		-1
	);
}
//TODO: refactor whole manifesto section. I don't like this amount of non-item logic in the items controller...
function malibuManifesto(){
	return roomTrigger(
		'manifesto',
		'Your eyes are caught by the title: "Jonathan Easterman\'s guide to taking over the world." Maybe it\'s a cookbook?',
		function(){
			if(malibuUnderground.enemies.length < 1) {
				activateKillModeMalibu();
				basicEcho('...It takes a minute before you realize you can\'t read a word of this. It\'s in the secret squiggle code of the Jonathan. The rock in the corner that was apparently a speaker crackles to life');
				basicEcho('"I toooold you not to go to the Library didn\'t I? You found my manifesto? I don\'t think I can let you leave this place....ROBOTS ATTACK!"');
				basicEcho('You hear the door closing before you can see it, and the normally hype hype robot\'s eyes begin to glow red as it comes towards you');
			} else {
				basicEcho('Is this really the time to read?');
			}
		}
	);
}

//malibuSwitcher - helps manifesto
function activateKillModeMalibu(){
	malibuMainHall.items = [];
	malibuMainHall.enemies = [cleanerBot(), butlerBot(), hypeBot(() => {unlockRoom(malibuMainHall);})];
	malibuMainHall.isLocked = true;
	malibuStaircase.items = [];
	malibuStaircase.enemies = [cleanerBot()];
	malibuBalcony.items = [];
	malibuBalcony.enemies = [butlerBot(), cleanerBot()];
	malibuLibrary.items = [];
	malibuLibrary.enemies = [butlerBot(), cleanerBot(() => {unlockRoom(malibuLibrary);})];
	malibuLibrary.isLocked = true;
	malibuDiningRoom.items = [redBull(), coldBrew()];
	malibuDiningRoom.enemies = [chefBot(), cleanerBot()];
	malibuStudy.items = [macPro(), spinDecks()];
	malibuStudy.enemies = [cleanerBot()];
	malibuLounge.items = [jonStatue()];
	malibuLounge.enemies = [cleanerBot(), hypeBot(() => {unlockRoom(malibuLounge);})];
	malibuLounge.isLocked = true;
	malibuFrontLawn.items = [];
	malibuFrontLawn.enemies = [gardenerBot()];
	malibuBeach.items = [];
	malibuBeach.enemies = [oAuth()];
	malibuBeach.isLocked = true;
	malibuUnderground.items = [];
	malibuUnderground.enemies = [gardenerBot(), cleanerBot(), chefBot(() => {unlockRoom(malibuUnderground);}), cleanerBot(), hypeBot()];
	malibuUnderground.isLocked = true;
	malibuHiddenLair.items = [malibuManifesto()];
	malibuHiddenLair.enemies = [hypeBot(() => {unlockRoom(malibuHiddenLair);})];
	malibuHiddenLair.isLocked = true;
	//setting up end goal
	malibuStart.items = [];
	malibuStart.enemies = [roboJonathan(jonathanOnKill)];
	malibuStart.desc = 'Where once was a quiet lawn, an angry Jonathan in a mech suit stands instead'
}

function jonathanOnKill(){
	basicEcho('With a gutteral howl, Jonathan\'s mech breaks down.');
	basicEcho('Due to a lack of code review, it appears that something in the mech wiring was directly controlling the robots. QA probably could have caught it, but this is SuckerPunch all over again - when it was destroyed, the robots lost focus and turned to anarchy');
	if(player.hasItem('USB DRIVE') > -1) {
		basicEcho('Luckily, you managed to snag the backup self-destruct robot key and using hax0r magic shut all the machines down before they can get to where Jonathan is trapped under his mech.');
		basicEcho('He thanks you, giving you another rolex and a red bull');
		player.addItem(redBull());
		player.addItem(rolex());
	} else {
		basicEcho('You manage to pull Jonathan out just before the first hype bot makes it over, together you high-tail it out of there...leaving the homicidal robot army to wreck havoc.');
	}
	basicEcho('"Alright alright sorry mate, maaaaaaaaybe I got a little stir crazy and wanted to take over the world, it happens. Anyway, sorry, do you want to mob on this ELISA thing? Wouldn\'t mind getting access to her designs for uh...research."');
	malibuStart.connections.push(SBStart);
	malibuStart.directions.push('to Santa Barbara');
	basicEcho('NEW PATH OPENED \'To Santa Barbara\' FROM THIS LOCATION!');
}

function appfolioMainDoor(){
	return roomTrigger(
		'door',
		'A large glass door equipped with a lowgrade key-card access pad. Maybe the old keys still work?',
		function(){
			if(player.hasItem('ID Badge') > -1) {
				basicEcho('There\'s a brief pause, and then a resounding BEEEEEP! You\'re in! Access to all major departments is established, but the way back to where ELISA has set up shop is still blocked by a large panel with four LEDs');
				if(!sbAppfolioHall.directions.includes('to sales')) {
					sbAppfolioHall.directions.push('to engineering','to Customer success', 'to sales', 'to marketing');
					sbAppfolioHall.connections.push(sbAppfolio1, sbAppfolio4, sbAppfolio2, sbAppfolio3);
				}
			} else {
				basicEcho('You\'re not getting through this door without an access card');
			}
		}
	)
}

function appfolioAccessPanel(){
	return roomTrigger(
		'panel',
		'A large panel next to a gate with four lights shaped like arrows. Underneath is the phrase \'KONAMI\'',
		function(){
			if(JSON.stringify(appfolioKeys) == JSON.stringify(secretAppfolioKeyPhrase) && appfolioKeys.length > 0) {
				basicEcho('You hear a rumbling sound as the gate begins to open. All the lights on the panel begin flashing.');
				sbAppfolioHall.directions.push('to ELISA');
				sbAppfolioHall.connections.push(sbAppfolioELISA);
				basicEcho('This is the final battle. Make sure you are prepared...');
				basicEcho('NEW PATH OPENED: \'Go to ELISA');
			} else if (appfolioKeys.length === 0) {
				basicEcho('The lights seemed to be tied to switches inside the building...');
			} else {
				basicEcho('The lights flash red, incorrect order, and reset.');
				appfolioKeys = [];
			}
		}
	)
}

function upSwitch(){
	return roomTrigger(
		'button',
		'A big button sits in the middle of a pedestal with an up arrow above it.',
		function(){
			if(appfolioKeys.length < 4 && !appfolioKeys.includes('up')) {
				appfolioKeys.push('up');
				basicEcho('You smack the button, illuminating the arrow above it');
			} else {
				basicEcho('The button seems to have already been activated...');
			}
		}
	);
}

function downSwitch(){
	return roomTrigger(
		'button',
		'A big button sits in the middle of a pedestal with a down arrow above it.',
		function(){
			if(appfolioKeys.length < 4 && !appfolioKeys.includes('down')) {
				appfolioKeys.push('down');
				basicEcho('You smack the button, illuminating the arrow above it');
			} else {
				basicEcho('The button seems to have already been activated...');
			}
		}
	);
}

function leftSwitch(){
	return roomTrigger(
		'button',
		'A big button sits in the middle of a pedestal with a left arrow above it.',
		function(){
			if(appfolioKeys.length < 4 && !appfolioKeys.includes('left')) {
				appfolioKeys.push('left');
				basicEcho('You smack the button, illuminating the arrow above it');
			} else {
				basicEcho('The button seems to have already been activated...');
			}
		}
	);
}

function rightSwitch(){
	return roomTrigger(
		'button',
		'A big button sits in the middle of a pedestal with an right arrow above it.',
		function(){
			if(appfolioKeys.length < 4 && !appfolioKeys.includes('right')) {
				appfolioKeys.push('right');
				basicEcho('You smack the button, illuminating the arrow above it');
			} else {
				basicEcho('The button seems to have already been activated...');
			}
		}
	);
}

var visitedChevsDesk = false;
function chevsDesk(){
	return roomTrigger(
		'Chev\'s desk',
		'The desk is littered with legos and containers',
		function(){
			if(!visitedChevsDesk) {
				basicEcho('You rummage around and find some tea and a Harsh Code Review left in a drawer!');
				player.addItem(earlGray());
				player.addItem(harshCodeReview());
				visitedChevsDesk = true;
			} else {
				basicEcho('You find nothing else');
			}
		}
	);
}

var visitedJuliasDesk = false;
function juliasDesk(){
	return roomTrigger(
		'Julia\'s desk',
		'Only took three years and an apocalypse to go see it',
		function(){
			if(!visitedJuliasDesk) {
				basicEcho('You rummage around and find a pretty gnarly cupcake and a lei!');
				player.addItem(cupcake());
				player.addItem(lei());
				visitedJuliasDesk = true;
			} else {
				basicEcho('You find nothing else');
			}
		}
	);
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
		8, 4
	);
}

function robotArm(){
	return weapon(
		'Robot Arm',
		'Fell off after a scuffle, pretty sturdy between the duct tape and exposed transistors...',
		10, 1
	);
}

function robotLeg(){
	return weapon(
		'Robot Leg',
		'Pried off a dying bot. It\'s pretty...metal',
		12, 4
	);
}

function harshCodeReview(){
	return weapon(
		'Harsh Code Review',
		'It hurts you more than it hurts me',
		15, 6
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

function oAuth(onKill) {
	return new Enemy('OAUTH',
		'Prepare to be: Authenticated',
		60, 20, [], false, onKill);
}

function roboJonathan(onKill){
	return new Enemy('Beasterman',
		'More than just a Senior Engineer',
		50, 15, [], false, onKill);
}

function ELISA(onKill){
	return new Enemy('ELISA',
	'THE AI!!',
	100, 15, [], false, onKill);
}

function mikeCustomerSuccess(onKill) {
	return new Enemy('MIKE',
	'Beaten but not broken',
	60, 10, [], false, onKill);
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

function gardenerBot(onKill){
	return new Enemy(
		'Gardener bot',
		'"BZZZZT! JUST TRIMMING THE HEDGES! WITH YOUR FACE! BZZZZZT!"',
		20,
		5,
		[robotArm()],
		false,
		onKill
	);
}

function cleanerBot(onKill){
	return new Enemy(
		'Cleaner bot',
		'"BZZZZT! JUST TIDYING UP THE PLACE! WITH YOUR FACE! BZZZZZT!"',
		20,
		5,
		[],
		false,
		onKill
	);
}

function chefBot(onKill){
	return new Enemy(
		'Chef bot',
		'"BZZZZT! HOW ABOUT A CAN OF WHOOPASS FOR BREAKFAST! BZZZZZT!"',
		20,
		5,
		[robotArm()],
		false,
		onKill
	);
}

function butlerBot(onKill){
	return new Enemy(
		'Butler bot',
		'"This just in, sir. You\'re gonna get whooped!"',
		20,
		5,
		[],
		false,
		onKill
	);
}

function hypeBot(onKill){
	return new Enemy(
		'hypebot',
		'"Jonathan? Dude\'s the MAN. SO pumped up he built us WOOOOOO!"',
		20,
		5,
		[robotLeg()],
		false,
		onKill
	);
}

function salesBot(onKill){
	return new Enemy(
		'Sales Bot',
		'What\'s my cut?',
		25,
		6,
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

function unlockRoom(room) {
	basicEcho('You hear a faint click, and the doors unlock.');
	room.isLocked = false;
};
