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
	@isLocked:bool              If set to true, can't leave room using go
*/
class Room {
    constructor(name, desc, items, actions, effects, enemies, directions, connections, isLocked) {
			this.name = name;
			this.desc = desc;
			this.items = items;
			this.actions = actions;
			this.effects = effects;
			this.enemies = enemies;
			this.directions = directions;
			this.connections = connections;
			this.isLocked = isLocked;
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
	enemies: [],
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
	var wares = [[cupcake(), 5], [tequila(), 10], [turkeyLeg(), 7]];
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

function rideBoulderchase(){
	if(player.hasItem('Park Ticket') > -1) {
		basicEcho('The ride is almost as you remember it, rugged buggies diving and swerving through an underground labrynth');
		player.addItem(boulderChaseToken());
		basicEcho('YOU RECEIVED A RIDE TOKEN FROM BOULDERCHASE');
	} else {
		basicEcho('You can\'t ride this without a ticket!');
	}
}

var adventure = {
	name: 'Adventureland',
	desc: 'You cross the threshold into a land of adventure. Without the constant irrigation of disney staff once lucious groves are now reduced to the desert from whence they came. Rides are collapsing around you due to lack of maintenance. Except of course...Boulderchase. Care for a ride?',
	items: [suspiciousCarpet()],
	actions: ['ride boulderchase'],
	effects: [rideBoulderchase],
	directions: ['south', 'north'],
	connections: [centralHubDL, frontier],
	enemies: []
};

function rideThunderRailroad(){
	if(player.hasItem('Park Ticket') > -1) {
		basicEcho('While the ride has gotten even more rickety in recent years, you manage to escape decapitation by adhering to the safety guidelines and not putting your arms in the air like you just don\'t care');
		player.addItem(thunderRideToken());
		basicEcho('YOU RECEIVED A RIDE TOKEN FROM THUNDER RAILROAD');
	} else {
		basicEcho('You can\'t ride this without a ticket!');
	}
}

var frontier = {
	name: 'Frontierland',
	desc: 'Frontierland almost looks...unchanged. It helps that the desert environment matches the desert environment of most of Southern California. Looking around you swear you see an entrance for the famous Club 34. Up ahead looms the Thunder Railroad, looking a little worse for ware with debris littering the street',
	items: [debris(), clubThirtyFourEntrance(), frontierMessage()],
	actions: ['ride Thunder Railroad'],
	effects: [rideThunderRailroad],
	directions: ['south', 'west', 'east'],
	connections: [adventure, centralHubDL, gEdge],
	enemies: []
};

function mikeBossBattle() {
	basicEcho('With a final yell, MIKE collapses - twitching and speaking nonsense about how much more efficient the maintenance in the park could be...');
	club34.connections.push(frontier);
	club34.directions.push('to Frontierland');
	basicEcho('----------')
	basicEcho('NEW PATH DISCOVERD. YOU MAY NOW \'GO to Frontierland\'. NEW ITEMS HAVE SPAWNED IN THIS LOCATION');
	club34.items.push(tequila());
	club34.items.push(magicPaintbrush());
}

var club34 = {
	name: 'Club34',
	desc: 'A long undisturbed relic of the elite. You can almost feel the Kanye. Unfortunately you don\'t have much time to take in the sights. Before you stands one of ELISA\'s top generals. MIKE. Good luck.',
	items: [],
	actions: [],
	effects: [],
	directions: [],
	connections: [],
	enemies: [mikeClubThirtyFour(mikeBossBattle)]
}

var toontown = {
	name: 'Toontown',
	desc: 'A weird fog hangs over the entire area, visibility is limited but you can clearly make out a door nestled in the side of a large fake mountain',
	items: [toontownDoor()],
	actions: [],
	effects: [],
	directions: ['north', 'east'],
	connections: [centralHubDL, toontown],
	enemies: [tentacle()]
};

var gEdge = {
	name: 'The Edge of the Galaxy',
	desc: 'You\'ve made it to the edge of the park. Scratchings cover the walls asking for help, claiming personal attacks, and the unmistakable mark of the Ishi: "N\'aight". All signs point to the cantina in the back, surrounded by robots.',
	items: [spinach(), gEdgeCantina()],
	actions: [],
	effects: [],
	directions: ['west'],
	connections: [frontier],
	enemies: [tentacle(), alexa(), googHome(), miniMac()]
};

/* =============================
   |       			LA  			     |
	 ============================= */

var downtownLA = {
	name: 'Downtown Los Angeles',
	desc: 'Tom greets you outside his Keyah. "I\'ve lost Keith! He just left me a note about meeting up when I tried to find him-he was gone and not answering his phone! So here we are in Downtown LA and we need to find Keith!" A Rolling Rock lies discarded in the street. Still good!',
	items: [rollingRock(), keithMessageDTLA()],
	actions: [],
	effects: [],
	directions: ['east'],
	connections: [concertVenue],
	enemies: []
};

var concertVenue = {
	name: 'Concert Venue',
	desc: 'Loud music is blasting from all directions, but no one seems to be moving...honestly it\'s kind of awkward, and you wonder how long you want to stay with the motionless crowd. The bar is only stocked with Tequila',
	items: [tequila(), concertCrowd()],
	actions: [],
	effects: [],
	directions: ['west','south', 'east'],
	connections: [downtownLA, bookShop, yogaStudio],
	enemies: []
};

function openLAStore() {
	var wares = [[tequila(), 10], [turkeyLeg(), 7], [cupcake(), 5]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"Welcome back! Ugh, California is kind of getting to me...it might be time to head back to Shrieveport! Have you ever been? Lovely people! Man, the draft from that bookcase is driving me crazy!"');
	buildShop(wares);
};

var bookShop = {
	name: 'Last Bookstore',
	desc: 'After dropping most of your supplies with the consierge...which you can\'t believe they still have in the apocalypse...you begin to walk around through the craziest bookstore you\'ve ever seen. Ryan waves to you from his shop',
	items: [lastBookshelf()],
	actions: ['shop'],
	effects: [openLAStore],
	directions: ['north', 'east'],
	connections: [concertVenue, beachLA],
	enemies: []
};

function talkToLifeguard() {
	if(player.hasItem('birkenstock') > -1 && player.hasItem('orbeez') > -1 && player.hasItem('sunglasses cord') > -1 && player.hasItem('assorted rings') > -1) {
		basicEcho('"OHHHHH THAT GUY! Yeah I remember him, he\'s all up and down the beach making friends. Check by the Volleyball courts!"');
		beachLA.connections.push(volleyballCourt);
		beachLA.directions.push('to Volleyball courts');
		basicEcho('NEW PATH OPENED FROM THIS LOCATION! \'Go to volleyball courts\'');
	} else {
		basicEcho('"Keith? Never heard of him...maybe if you had more things to help jog my memory..."')
	}
}

var beachLA = {
	name: 'Beach',
	desc: 'The sunlight blinds, and you find yourself wishing you had sunglasses on the pristine beach. Waves casually roll in as the lifeguard waves to you',
	items: [sunglasses()],
	actions: ['talk to lifeguard'],
	effects: [talkToLifeguard],
	directions: ['west', 'north'],
	connections: [bookShop, yogaStudio],
	enemies: []
};

var yogaStudio = {
	name: 'Yoga Studio',
	desc: 'The mats are mostly full, from waaay towards the front you can see someone guiding everyone through the tree pose. You try to act the part and stand on the empty yoga mat while looking for clues',
	items: [yogaMat()],
	actions: [],
	effects: [],
	directions: ['south', 'west'],
	connections: [beachLA, concertVenue],
	enemies: []
};

function talkToKeith() {
	basicEcho('"Oh no way? You\'re getting the Vens back together? For sure I\'ll join! Let me just finish this game."');
	basicEcho('------------');
	basicEcho('You go back to Tom to bring him the good news, Keith has been found! He tells you about seeing Jonathan in a mansion up near Malibu...');
	volleyballCourt.connections.push(malibuStart);
	volleyballCourt.directions.push('to Malibu');
	basicEcho('A NEW PATH HAS OPENED! \'Go to Malibu\', FINISH STUFF UP HERE!');
}

var volleyballCourt = {
	name: 'Volleyball Court',
	desc: 'Keith is mid game when he spots you, and comes running over',
	items: [],
	actions: ['talk to Keith'],
	effects: [talkToKeith],
	directions: ['west'],
	connections: [beachLA],
	enemies: []
}

/* =============================
   |       		Malibu 			     |
	 ============================= */

var malibuStart = {
	name: 'Mansion Entrance',
	desc: 'You\'ve made it to Jonathan\'s last known location. Before you stands an incredible Mansion, made vacant by the end days but...it appears to be teeming with something, if not life. Robots are buzzing around in every direction',
	items: [],
	actions: [],
	effects: [],
	directions: ['east', 'north'],
	connections: [malibuMainHall, malibuFrontLawn],
	enemies: []
}

function talkToJonathanMainHall() {
	basicEcho('"Pretty nifty seeee? After ELISA took over I thought I\'d hole up here in Malibu. No distractions, no one bothering me with Oauth, it\'s peaceful"');
	basicEcho('"Oh, the robots? Well I can\'t exactly maintain a mansion by myself. Even my desk at work was always covered in junk like peanut butter. So, I built a robot arm-workers. Built robot workers."');
	basicEcho('"Yeah they\'re pretty harmless, go say hi! I\'ll be ready to leave with you guys for Santa Barbara in just a few hours. I need to finish some stuff up here first...Just don\'t go into the Library!"');
}

var malibuMainHall = {
	name: 'Main Hall',
	desc: 'As you step into the main hall, you\'re greeted by a very smug looking Jonathan Easterman. Robots continue to buzz around you as he beckons you over',
	items: [dormantCleanerRobot(), dormantButlerRobot(), dormanthypeManRobot()],
	actions: ['talk to Jonathan'],
	effects: [talkToJonathanMainHall],
	directions: ['west', 'east', 'north', 'south'],
	connections: [malibuStart, malibuStaircase, malibuStudy, malibuDiningRoom],
	enemies: []
}

var malibuStaircase = {
	name: 'Staircase',
	desc: 'You walk up to the beautifully ornate staircase, covered in a rug that really ties the thing together',
	items: [dormantCleanerRobot()],
	actions: [],
	effects: [],
	directions: ['west', 'upstairs'],
	connections: [malibuMainHall, malibuBalcony],
	enemies: []
}

var malibuBalcony = {
	name: 'Balcony',
	desc: 'The balcony gives you a view over the entire interior of the house. You\'ve never seen so many robots before. Could they all be necessary for cleaning? Deep Techno music can be heard from behind a door to the south',
	items: [dormantButlerRobot(), dormantCleanerRobot()],
	actions: [],
	effects: [],
	directions: ['downstairs', 'south'],
	connections: [malibuStaircase, malibuBedroom],
	enemies: []
}

var malibuBedroom = {
	name: 'Bedroom',
	desc: 'A glimpse into Jonathan\'s private life since The Overtaking. ...It looks similar to how you\'d expect. The bed is a bit of a mess, with a loose rolex and usb drive among the pile',
	items: [rolex(), digiKey()],
	actions: [],
	effects: [],
	directions: ['north'],
	connections: [malibuBalcony],
	enemies: []
}

var malibuLibrary = {
	name: 'Library',
	desc: 'Library',
	items: [dormantButlerRobot(), dormantCleanerRobot()],
	actions: [],
	effects: [],
	directions: ['north', 'west'],
	connections: [malibuStaircase, malibuDiningRoom],
	enemies: []
}

var malibuDiningRoom = {
	name: 'Dining Room',
	desc: 'The table looks large enough to feed a small army, if they too could survive on a healthy diet of cold brew, red bull, and seltzer',
	items: [dormantChefRobot(), dormantCleanerRobot(), redBull(), coldBrew()],
	actions: [],
	effects: [],
	directions: ['east', 'north'],
	connections: [malibuLibrary, malibuMainHall],
	enemies: []
}

var malibuStudy = {
	name: 'Study',
	desc: 'This is where the magic happens, you can see a $53,000 mac pro in one corner of the room and a set of decks in the other',
	items: [dormantCleanerRobot(), macPro(), spinDecks()],
	actions: [],
	effects: [],
	directions: ['south', 'north'],
	connections: [malibuMainHall, malibuLounge],
	enemies: []
}

var malibuLounge = {
	name: 'Lounge',
	desc: 'A more relaxed approach to a study, one could almost...lounge here. If it weren\'t for the oddly intimidating statue of Jonathan...',
	items: [dormantCleanerRobot(), dormanthypeManRobot(), jonStatue()],
	actions: [],
	effects: [],
	directions: ['south', 'west', 'east'],
	connections: [malibuStudy, malibuFrontLawn, malibuBeach],
	enemies: []
}

function openMalibuShop() {
	var wares = [[cupcake(), 5], [tequila(), 10], [turkeyLeg(), 7]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"Hey '+player.name+'! Check it out, we\'re having a \'yard sale\'!');
	buildShop(wares);
};

var malibuFrontLawn = {
	name: 'Front Lawn',
	desc: 'The lawn sprawls for what seems like miles, so much golden grass and even a little Gazebo. Looks like someone set up shop too!',
	items: [dormantGardenerRobot()],
	actions: ['shop'],
	effects: [openMalibuShop],
	directions: ['east', 'south'],
	connections: [malibuLounge, malibuStart],
	enemies: []
}

var malibuBeach = {
	name: 'Beach',
	desc: 'You can hear the gentle waves crash against the beach, a half buried mech looks on menacingly from right on the ocean edge. It\'s definitely off, right?',
	items: [dormantOAuth()],
	actions: [],
	effects: [],
	directions: ['west'],
	connections: [malibuLounge],
	enemies: []
}

var malibuUnderground = {
	name: 'Underground',
	desc: 'The room is filled with the many different robots scattered around the property. Considering this dank underground cavern doesn\'t have anything to clean or cook...seems highly suspicious',
	items: [dormantGardenerRobot(), dormantCleanerRobot(), dormantChefRobot(), dormantCleanerRobot(), dormanthypeManRobot()],
	actions: [],
	effects: [],
	directions: ['west', 'up'],
	connections: [malibuHiddenLair, malibuLibrary],
	enemies: []
}

var malibuHiddenLair = {
	name: 'Hidden Lair',
	desc: 'You come out into a large, stone cavern. Empty except for the lone robot and the pedestal in the direct center of the room. It seems to be holding a manifesto?',
	items: [dormanthypeManRobot(), malibuManifesto()],
	actions: [],
	effects: [],
	directions: ['east'],
	connections: [malibuUnderground],
	enemies: []
}

/*
    PURPOSE: To connect rooms at runtime and not throw super errors
*/
function loadRoomConnections() {
	//San Diego
	sdBeach.connections = [seuss, downtownSD];
	seuss.connections = [sdBeach];
	downtownSD.connections = [sdBeach];
	gaslamp.connections = [downtownSD, officeSD];
	officeSD.connections = [gaslamp];
	//Anaheim
	mainStreetDL.connections = [centralHubDL];
	centralHubDL.connections = [mainStreetDL, adventure, frontier, toontown];
	adventure.connections = [centralHubDL, frontier];
	frontier.connections = [adventure, centralHubDL, gEdge];
	toontown.connections = [centralHubDL, toontown];
	gEdge.connections = [frontier];
	//Los Angeles
	downtownLA.connections = [concertVenue];
	concertVenue.connections = [downtownLA, bookShop, yogaStudio];
	bookShop.connections = [concertVenue, beachLA];
	beachLA.connections = [bookShop, yogaStudio];
	yogaStudio.connections = [beachLA, concertVenue];
	volleyballCourt.connections = [beachLA];
	//Malibu
	malibuStart.connections = [malibuMainHall, malibuFrontLawn];
	malibuMainHall.connections = [malibuStart, malibuStaircase, malibuStudy, malibuDiningRoom];
	malibuStaircase.connections = [malibuMainHall, malibuBalcony];
	malibuBalcony.connections = [malibuStaircase, malibuBedroom];
	malibuBedroom.connections = [malibuBalcony];
	malibuDiningRoom.connections = [malibuLibrary, malibuMainHall];
	malibuLibrary.connections = [malibuStaircase, malibuDiningRoom];
	malibuUnderground.connections = [malibuHiddenLair, malibuLibrary];
	malibuHiddenLair.connections = [malibuUnderground];
	malibuStudy.connections = [malibuMainHall, malibuLounge];
	malibuLounge.connections = [malibuStudy, malibuFrontLawn, malibuBeach];
	malibuFrontLawn.connections = [malibuLounge, malibuStart];
	malibuBeach.connections = [malibuLounge];
}
