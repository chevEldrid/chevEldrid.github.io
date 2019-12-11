/*
    ====================================================
    |       Class Necessary for Object Creation      |
    ====================================================
*/

/*
	@name:String        		name of Room
	@desc:String        		description of Room
	@items:Array<Item>  		items in room
	@actions:Array<String> 		list of available actions in room
	@effects:Array<function> 	actions available
	@enemies:Array<Enemy>		list of enemies in the room
	---navigation---
	@directions:Array<String>   Directions from room to travel
	@connections:Array<Room>    Rooms connected to directions
*/
class Room {
    constructor(name, desc, items, actions, effects, enemies, directions, connections) {
			this.name = name;
			this.desc = desc;
			this.items = items;
			this.actions = actions;
			this.effects = effects;
			this.enemies = enemies;
			this.directions = directions;
			this.connections = connections
    }
};

/*
    =========================================================
    |           Specific Rooms and functions                |
    =========================================================
*/
// ||Starting Room - Your Apartment||

//Apartment (Start) specific functions
/*
	Easy way to do an intro text if you want the player to start somewhere- make it a function of that room
*/
function startGame(args) {
	if(promptPos == 0) {
		hijack = true;
		basicEcho('It started simply enough..."build a chat bot" they said. "It will revolutionize our relationships with customers"');
		basicEcho('It\'s never that simple with the machines...you left for a work trip to San Diego and while you were gone. ELISA took over.');
		basicEcho('Three years have passed since ELISA conquored all telecommunications and you\'ve been stranded in SD, until now.');
		basicEcho('By the way, what\'s your name?');
		promptPos += 1;
	}
	//loads initial content and displays room information
	else if(promptPos == 1) {
		player = createCharacter(args);
		basicEcho('"' + args +' is it? Nice to meet you '+args+'. Please, save the world. Or type \'start\' again to reset."');
		basicEcho('');
		basicEcho(curRoom.desc);
		endHijack();
	}
};
//function for action associated with command 'eat cereal'
function talkToJulia() {
	basicEcho('"'+player.name + ', If you\'re ready to stop wallowing, It\'s time to activate the operation. It\'s time to bring Vendadores back together..."');
	basicEcho('"I\'ve sent out a calendar invite for one week from today in Santa Barbara. We need to beat ELISA."');
};

/*
	Typical room. 
	Special actions aside listed with associated functions written above
	(Special consideration for 'start' since it's a special fucntion)
	also items listed that are generated in items.js
	Items are functions. I'm not sure I remember why
	Directions are loaded in system, where you can walk from here

*/
var sdBeach = {
	name:'The Beach',
	desc:'You lie in the sand, watching the waves slowly roll in as a shadow clouds your view. Lying around you are a glass of Sangria and a Newspaper. Looking up, you can see Julia walking toward you.',
	items: [sangria(), sdBeachNewspaper()],
	actions: ['start', 'talk to Julia'],
	effects: [startGame, talkToJulia],
	directions: ['south', 'east'],
	connections: [seuss, downtownSD],
	enemies: []
};

// ||Room 2 - House of Seuss||
var seuss = {
	name: 'House of Seuss',
	desc: 'One room, two rooms, red rooms, blue rooms! You\'ve entered the House of Seuss',
	items: [catInTheHat(), greenEggsAndHam(), truffulaBranch()],
	actions: [],
	effects: [],
	directions: ['north'],
	connections: [sdBeach],
	enemies:[tentacle()]
};
//unlimited calamari - this is on purpose
function talkPasserby() {
	basicEcho('"LOOK OUT! IT\'S AN ELISA BOT! KILL IT!"');
}

function crossStreet() {
	if(downtownSD.enemies.length > 0) {
		basicEcho('You must defeat the enemy here first!');
	} else {
		basicEcho('Julia waves to you from the other side, "You have to go the San Diego Office," she says');
		basicEcho('I\'ve left a dossier on everyones\' last locations. I\'ll see you in Santa Barbara');
		downtownSD.connections.push(gaslamp);
		downtownSD.directions.push('south');
		basicEcho('A NEW PATH HAS OPENED!');
	}
}

// ||Room 3 - Downtown San Diego||
var downtownSD = {
	name: 'Downtown San Diego',
	desc: 'The city is much as it\'s always been, aside from the bloodthirsty robots',
	items: [bigStick()],
	actions:['talk to passerby', 'cross the street'],
	effects:[talkPasserby, crossStreet],
	directions:['west'],
	connections:[sdBeach],
	enemies: [alexa()]
};

//Let's try and build a store...
function openSDShop() {
    var wares = [[peanutBrittle(), 5], [tequila(), 10]];
    scope = 'shop';
    curShopWares = wares;
    basicEcho('"'+player.name+'? Is that you? It\'s me! Ryan! Oh man it\'s good to see you. Welcome to my shop! I cleared out my desk right before The Overtaking and am now selling whatever I found"');
    basicEcho('"This is the first shop I\'ve opened after our HQ in Shrieveport. There was so little there ELISA didn\'t even bother conquoring it! It\'s perfect!"');
	basicEcho('Type either the name of the good you want to buy or type \'leave\' to exit the shop and continue on your travels"');
    buildShop(wares);
};

// ||Room 3 - Downtown San Diego||
var gaslamp = {
	name: 'Gaslamp district',
	desc: 'The Gaslamp district, once full of restaurants and bars...now full of sadness',
	items: [],
	actions:['shop'],
	effects:[openSDShop],
	directions:['north', 'east'],
	connections:[downtownSD, officeSD],
	enemies: []
};

function pickUpDossier() {
	if(officeSD.enemies.length > 0) {
		basicEcho('The corrupted Copier blocks your way! It shoots paper in your direction causing minor cuts.');
		player.health -= 1;
	} else {
		basicEcho('The copier defeated, you\'re finally able to pick up the dossier and begin your quest.');
		//add new stuff about location
		basicEcho('NEW LOCATION ADDED! NEW ITEMS ADDED TO BACKPACK!');
	}
}

var officeSD = {
	name: 'San Diego Office',
	desc: 'The office has fallen into disrepair. Most machines have been tainted by ELISA and have left to form it\'s vast army. One however, stayed.',
	items: [cupcake(), locationDossier()],
	actions:['pick up dossier'],
	effects:[pickUpDossier],
	directions:['west'],
	connections:[gaslamp],
	enemies: [copierGoneWild()]
};

/*
    PURPOSE: To connect rooms at runtime and not throw super errors
*/
function loadRoomConnections() {
    sdBeach.connections = [seuss, downtownSD];
	seuss.connections = [sdBeach];
	downtownSD.connections = [sdBeach];
	gaslamp.connections = [downtownSD, officeSD];
	officeSD.connections = [gaslamp];
}
