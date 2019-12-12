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

/* =============================
   |     	  San Diego		       |
	 ============================= */

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
	desc:'You lie in the sand, watching the waves slowly roll in as a shadow clouds your view. Lying around you are a glass of Sangria and a Newspaper. Looking up, you can see Julia walking toward you. To get started, try \'inspect tutorial\'',
	items: [sangria(), sdBeachNewspaper(), sdBeachTutorialBook()],
	actions: ['start', 'talk to Julia'],
	effects: [startGame, talkToJulia],
	directions: ['south', 'east'],
	connections: [seuss, downtownSD],
	enemies: []
};

// ||Room 2 - House of Seuss||
var seuss = {
	name: 'House of Seuss',
	desc: 'One room, two rooms, red rooms, blue rooms! You\'ve entered the House of Seuss! A cat in a hat is lapping quietly at a bowl of milk while some green eggs and ham lay steaming on a counter. You see a truffula branch propped up against the wall.',
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

function defeatedDtSdSpeaker() {
	basicEcho('-------------');
	basicEcho('Julia waves to you from the other side, "You have to go the San Diego Office," she says');
	basicEcho('I\'ve left a dossier on everyones\' last locations. I\'ll see you in Santa Barbara');
	downtownSD.connections.push(gaslamp);
	downtownSD.directions.push('south');
	basicEcho('A NEW PATH HAS OPENED TO THE SOUTH!');
}

// ||Room 3 - Downtown San Diego||
var downtownSD = {
	name: 'Downtown San Diego',
	desc: 'The city is much as it\'s always been, aside from the bloodthirsty robots. An Alexa bot stands in front of you, ready to kill. By your feet you see a dusty book called \'combat tutorial\'. A passerby is passing by, shouting.',
	items: [bigStick(), downtownSDCombatTutorialBook()],
	actions:['talk to passerby'],
	effects:[talkPasserby],
	directions:['west'],
	connections:[sdBeach],
	enemies: [alexa(defeatedDtSdSpeaker)]
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
	desc: 'The Gaslamp district, once full of restaurants and bars...now full of sadness. A book called \'Shop Tutorial\' lies on the ground, and you can see someone you vaguely recognize waving to you from behind a shop booth',
	items: [gaslampShopTutorialBook()],
	actions:['shop'],
	effects:[openSDShop],
	directions:['north', 'east'],
	connections:[downtownSD, officeSD],
	enemies: []
};

var officeSD = {
	name: 'San Diego Office',
	desc: 'The office has fallen into disrepair. Most machines have been tainted by ELISA and have left to form it\'s vast army. One however, stayed. A corrupted Copier looms-spewing ink and joking about your desctruction. It is standing directly between you and the Dossier',
	items: [cupcake(), locationDossier()],
	actions:[],
	effects:[],
	directions:['west'],
	connections:[gaslamp],
	enemies: [copierGoneWild()]
};

/* =============================
   |       		Anaheim  		     |
	 ============================= */

//Let's try and build a store...
function openDLShop() {
	var wares = [[cupcake(), 5], [tequila(), 10]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"Hey '+player.name+'! Good to see you again! How\'d I get past the Copier? Oh, well...this game wasn\'t very well QA-ed so there\'s a couple loopholes lying around"');
	basicEcho('"Buy something! I\'ve always got new stuff in stock!"');
	buildShop(wares);
};

var mainStreetDL = {
	name: 'Main Street',
	desc: 'You\'ve successfully made it to Anaheim! The park is how you remember from a tech retreat long ago...you see a park ticket wedged between a few stones and somthing resembling a hidden mickey by a far tree...there also seems to be a weird message written on a wall.\nYou can also see a shop nearby!',
	items: [mainStreetHiddenMickey(), disneyTicket(), mainStreetMessage()],
	actions: ['shop'],
	effects: [openDLShop],
	directions: ['east'],
	connections: [centralHubDL],
	enemies: [alexa()]
};

var centralHubDL = {
	name: 'Central Hub',
	desc: 'A statue of the late Walt stands before you, piercing you with his icy gaze. Judging you, as if you were not worthy to enter the house of mouse. There\'s a food stand within spitting distance that seems well stocked with Tequila and Sangria',
	items: [tequila(), sangria()],
	actions: [],
	effects: [],
	directions: ['west', 'north', 'east', 'south'],
	connections: [mainStreetDL, adventure, frontier, toontown],
	enemies: []
};

var adventure = {
	name: 'Adventureland',
	desc: 'You cross the threshold into a land of adventure. Without the constant irrigation of disney staff once lucious groves are now reduced to the desert from whence they came. Rides are collapsing around you due to lack of maintenance. Except of course...Boulderchase. Care for a ride?',
	items: [],
	actions: [],
	effects: [],
	directions: ['south', 'north'],
	connections: [centralHubDL, frontier],
	enemies: []
};

var frontier = {
	name: 'Frontierland',
	desc: 'Frontierland',
	items: [],
	actions: [],
	effects: [],
	directions: ['south', 'west', 'east'],
	connections: [adventure, centralHubDL, gEdge],
	enemies: []
};

var toontown = {
	name: 'Toontown',
	desc: 'Toontown',
	items: [],
	actions: [],
	effects: [],
	directions: ['north'],
	connections: [toontown],
	enemies: []
};

var tomorrow = {
	name: 'Tomorrowland',
	desc: 'Tomorrowland',
	items: [],
	actions: [],
	effects: [],
	directions: [],
	connections: [],
	enemies: []
}

var gEdge = {
	name: 'The Edge of the Galaxy',
	desc: 'A wretched hive of scum and villainy',
	items: [],
	actions: [],
	effects: [],
	directions: ['west'],
	connections: [frontier],
	enemies: []
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
	mainStreetDL.connections = [centralHubDL];
	centralHubDL.connections = [mainStreetDL, adventure, frontier, toontown];
	adventure.connections = [centralHubDL, frontier];
	frontier.connections = [adventure, centralHubDL, gEdge];
	toontown.connections = [toontown];
	tomorrow.connections = [];
	gEdge.connections = [frontier];
}
