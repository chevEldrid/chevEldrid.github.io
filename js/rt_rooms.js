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
		basicEcho('To Yang while enjoying this game...https://open.spotify.com/playlist/2uPl7Ds6tZrssZCn8WR1nr?si=iZttCLjNRLiG-7iN04iyVw');
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
	basicEcho('"Hey '+player.name + ', If you\'re ready It\'s time to bring operation: Take Back Appfolio to market. I\'ve already spoken to the resistance here, but we need help. It\'s time to bring Vendadores back together..."');
	basicEcho('"To get us all on the same page, I\'ve sent out a calendar invite for one week from today in Santa Barbara. We will need everyone if we\'re going to beat ELISA."');
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
	desc: 'One room, two rooms, red rooms, blue rooms! You\'ve entered the House of Seuss! The cat in the hat is lapping quietly at a bowl of milk while some green eggs and ham lay steaming on a counter. You see a truffula branch propped up against the wall.',
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
	basicEcho('Julia waves to you from the other side, "I\'ve managed to dig up some intel," she says');
	basicEcho('I\'ve left a dossier on everyones\' last locations in the San Diego office, but had to abandon it when the Copier turned evil? I need to do some other stuff around here, but I\'ll see you in Santa Barbara!"');
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
    basicEcho('"'+player.name+'? Is that you? It\'s me! Ryan! Oh man it\'s good to see you. Welcome to my shop! I cleared out my desk right before The Overtaking and am now selling whatever I found!"');
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

function crazyCopier(){
	basicEcho('The Copier goes down with a crash, spilling coins that must have jammed in the bottom drawer!');
	player.money += 10;
}

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
	var wares = [[cupcake(), 5], [tequila(), 10], [turkeyLeg(), 7], [cubanFlan(), 5]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"Hey '+player.name+'! Good to see you again! How\'d I get past the Copier? Oh...this game wasn\'t very well QA-ed and frankly didn\'t even make it through code review so there\'s a couple loopholes lying around"');
	basicEcho('"Buy something! I\'ve always got new stuff in stock, but you have to hurry-I\'ve got an interview in 10."');
	buildShop(wares);
};

var mainStreetDL = {
	name: 'Main Street',
	desc: 'You\'ve successfully made it to Anaheim! Somehow, magical music is playing from the park speakers but slowed down enough to not even be terrifying...just nausiating. The park is how you remember from a tech retreat long ago...you see a park ticket wedged between a few stones and somthing resembling a hidden mickey by a far tree...there also seems to be a weird message written on a wall.\nYou can also see a shop nearby!',
	items: [mainStreetHiddenMickey(), disneyTicket(), mainStreetMessage()],
	actions: ['shop'],
	effects: [openDLShop],
	directions: ['east'],
	connections: [centralHubDL],
	enemies: [alexa()]
};

var centralHubDL = {
	name: 'Central Square',
	desc: 'A statue of the late Walt stands before you, piercing you with his icy gaze. Judging you, as if you were not worthy to enter the house of mouse. Dost thou dare sodden the ground of the Happiest Place on Earth with your quest to save the World? There\'s a food stand within spitting distance that seems well stocked with Tequila and Sangria',
	items: [tequila(), sangria()],
	actions: [],
	effects: [],
	directions: ['west', 'north', 'east', 'south'],
	connections: [mainStreetDL, adventure, frontier, toontown],
	enemies: []
};

function rideBoulderchase(){
	if(player.hasItem('Park Ticket') > -1) {
		basicEcho('The ride is almost as you remember it, rugged buggies diving and swerving through an underground labrynth but none too crazy Chris couldn\'t handle it. You take the singles line to get several rides in before moving on. Doesn\'t matter that no one else is in line.');
		if(player.hasItem('Boulderchase Token') < 0) {
			basicEcho('YOU RECEIVED A RIDE TOKEN FROM BOULDERCHASE');
			player.addItem(boulderChaseToken());
		}
	} else {
		basicEcho('The low metal turnstyle appears insurmountable without a ticket to scan.');
	}
}

var adventure = {
	name: 'Adventureland',
	desc: 'You cross the threshold into a land of adventure. Without the constant irrigation and meticulous care of disney staff once lucious groves are reduced to the desert from whence they came. Rides are collapsing around you due to lack of maintenance. You notice the complete lack of Pineapple Dole Whip...probably the first thing to go. Except of course...Boulderchase. Care for a ride? Don\'t even need a Fastpass',
	items: [suspiciousCarpet()],
	actions: ['ride boulderchase'],
	effects: [rideBoulderchase],
	directions: ['south', 'north'],
	connections: [centralHubDL, frontier],
	enemies: []
};

function rideThunderRailroad(){
	if(player.hasItem('Park Ticket') > -1) {
		basicEcho('While the ride has gotten even more rickety in recent years, you manage to escape decapitation by adhering to the safety guidelines and not putting your arms in the air like you just don\'t care. Although that one board seems to be shaking a bit...');
		if(player.hasItem('Thunder Ride Token') < 0) {
			player.addItem(thunderRideToken());
			basicEcho('YOU RECEIVED A RIDE TOKEN FROM THUNDER RAILROAD');
		}
	} else {
		basicEcho('You\'d feel too guilty riding this without a proper ticket...');
	}
}

var frontier = {
	name: 'Frontierland',
	desc: 'Frontierland almost looks...unchanged. It helps that the desert environment matches the desert look of most of Southern California. Looking around you swear you see an entrance for the famous Club 34 hidden behind the now dilapidated Pirates ride. Up ahead looms the Thunder Railroad, looking a little worse for wear with debris littering the street',
	items: [debris(), clubThirtyFourEntrance(), frontierMessage()],
	actions: ['ride Thunder Railroad'],
	effects: [rideThunderRailroad],
	directions: ['south', 'west', 'east'],
	connections: [adventure, centralHubDL, gEdge],
	enemies: []
};

function mikeBossBattle() {
	basicEcho('With a final yell, MIKE collapses - twitching and speaking nonsense about how much more efficient the maintenance in the park could be if only they used a contact center to schedule different techs to different areas and while they\'re at it maybe a portal...');
	club34.connections.push(frontier);
	club34.directions.push('to Frontierland');
	basicEcho('----------')
	basicEcho('NEW PATH DISCOVERD. YOU MAY NOW \'GO to Frontierland\'. NEW ITEMS HAVE SPAWNED IN THIS LOCATION');
	club34.items.push(tequila());
	club34.items.push(magicPaintbrush());
}

var club34 = {
	name: 'Club34',
	desc: 'A long undisturbed relic of the elite. You can almost feel the Kanye. Unfortunately you don\'t have much time to take in the sights, apart from decadent table settings and the remains of a string quartet, Before you stands one of ELISA\'s top generals. MIKE. Good luck.',
	items: [],
	actions: [],
	effects: [],
	directions: [],
	connections: [],
	enemies: [mikeClubThirtyFour(mikeBossBattle)]
}

var toontown = {
	name: 'Toontown',
	desc: 'A weird fog hangs over the entire area, visibility is limited but you can clearly make out a door nestled in the side of a large fake mountain. Looks like one of those Pockets left from the Octopi invasion over Chicago last year...Ishi\'s bike is leaning against a wall',
	items: [toontownDoor(), calamari(), dirtBike()],
	actions: [],
	effects: [],
	directions: ['north', 'east'],
	connections: [centralHubDL, toontown],
	enemies: [tentacle()]
};

var gEdge = {
	name: 'The Edge of the Galaxy',
	desc: 'You\'ve made it to the edge of the park. Messages like the ones you\'ve seen throughout the park are much more focused here, all asking for some form of help or rescue from personal attacks. All signs seem to lead to the cantina in the back, surrounded by robots.',
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
	desc: 'Tom greets you outside his Keyah. "I\'ve lost Keith! He left me a note about meeting up but when I tried to find him-he was gone! So here we are in Downtown LA and we need to find Keith!" He continues to moan a bit. A Rolling Rock lies discarded in the street. Still good!',
	items: [rollingRock(), keithMessageDTLA()],
	actions: [],
	effects: [],
	directions: ['east'],
	connections: [concertVenue],
	enemies: []
};

var concertVenue = {
	name: 'Concert Venue',
	desc: 'After finally getting through security, you make it into the Venue. Loud music is blasting from all directions, but no one seems to be moving...honestly it\'s kind of awkward, and you wonder how long you want to stay with the motionless crowd. The bar is only stocked with Tequila',
	items: [tequila(), concertCrowd()],
	actions: [],
	effects: [],
	directions: ['west','south', 'east'],
	connections: [downtownLA, bookShop, yogaStudio],
	enemies: []
};

function openLAStore() {
	var wares = [[tequila(), 10], [turkeyLeg(), 7], [cupcake(), 5], [flan(), 5]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"Welcome back! Ugh, California is kind of getting to me...it might be time to head back to Shrieveport! Have you ever been? Lovely people! Man, the draft from that bookcase is driving me crazy!"');
	buildShop(wares);
};

var bookShop = {
	name: 'Last Bookstore',
	desc: 'It\'s a long walk to the Last Bookstore, After dropping most of your supplies with the consierge...which you can\'t believe they still have in the apocalypse...you begin to walk around through the craziest bookstore you\'ve ever seen. Ryan waves to you from his shop',
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
		basicEcho('"Keith? Never heard of him...maybe if you had more of his things to help jog my memory..."')
	}
}

var beachLA = {
	name: 'Beach',
	desc: 'The sunlight blinds as you step onto the bech, and you find yourself wishing you had sunglasses on this sunny day. Waves casually roll in as the lifeguard waves to you',
	items: [sunglasses()],
	actions: ['talk to lifeguard'],
	effects: [talkToLifeguard],
	directions: ['west', 'north'],
	connections: [bookShop, yogaStudio],
	enemies: []
};

var yogaStudio = {
	name: 'Yoga Studio',
	desc: 'You stumble into \'Hidden Power\', Keith\'s favorite local yoga studio here in LA. The mats are mostly full, from waaay towards the front you can see someone guiding everyone through the tree pose. You try to act the part and stand on the empty yoga mat while looking for clues. It doesn\'t seem completely flat...',
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

/* ==============================
   |       		Malibu 		    |
   ============================== */

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
	basicEcho('Jonathan gives you a mean mug expression and a head tilt that seems to imply: \'sup\'. "Pretty nifty huh?" Jonathan says with a wide grin, "After ELISA took over I thought I\'d hole up here in Malibu. No distractions, no one bothering me with Oauth, it\'s peaceful"');
	basicEcho('"So here I was just chilling, making beats, and it hit me that we could have fully automated the portal back in the day with some serious AI juice. What if we built robots who do all the work? Then we can directly interface them with the portal!"');
	basicEcho('"Also I can\'t exactly maintain a mansion by myself. Even my desk at work was always covered in junk like peanut butter. So, I built a robot arm-workers. Built robot contractors."');
	basicEcho('"Yeah they\'re pretty harmless. Julia called ahead and said you\'re trying to get the Vendadores back together, I\'m so in. I\'ll be ready to leave with you guys for Santa Barbara in just a few hours. I need to finish some stuff up here first, feel free to explore...Just don\'t go into the Library!"');
}

var malibuMainHall = {
	name: 'Main Hall',
	desc: 'As you step into the main hall, you\'re greeted by a very smug looking Jonathan Easterman. Robots continue to buzz around you as he beckons you over, dressed to the 9s as always in some nice blue-light glasses',
	items: [dormantCleanerRobot(), dormantButlerRobot(), dormanthypeManRobot()],
	actions: ['talk to Jonathan'],
	effects: [talkToJonathanMainHall],
	directions: ['west', 'east', 'north', 'south'],
	connections: [malibuStart, malibuStaircase, malibuStudy, malibuDiningRoom],
	enemies: []
}

var malibuStaircase = {
	name: 'Staircase',
	desc: 'You walk up to the beautifully ornate staircase, golden bannisters continuously being polished by one of the many robot staff and covered in a rug that really ties the thing together',
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
	desc: 'A glimpse into Jonathan\'s private life since The Overtaking. ...It looks similar to how you\'d expect. The bed is a bit of a mess, with a loose rolex and usb drive among the pile. Something moves in the bag to your right...but you ignore it.',
	items: [rolex(), digiKey()],
	actions: [],
	effects: [],
	directions: ['north'],
	connections: [malibuBalcony],
	enemies: []
}

var malibuLibrary = {
	name: 'Library',
	desc: 'Books line every wall, things ranging from Philosophy and the foley of man...to O\'Reilly books on Tensorflow gotten from a Euro trip ages ago. It truely is an impressive collection that would take many years to finish. Lying on the varnished coffee table, are Jonathan\'s favorite spectacles',
	items: [dormantButlerRobot(), dormantCleanerRobot(), blueLightGlasses()],
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
	desc: 'This is where the magic happens, you can see a $53,000 mac pro in one corner of the room and a set of decks in the other. Framed on the wall, is Jonathan\'s most proud drawing.',
	items: [dormantCleanerRobot(), macPro(), spinDecks(), drawingOfAuthFlow()],
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
	basicEcho('"Hey '+player.name+'! Check it out, we\'re having a \'yard sale\'! Ever since we containerized my shop I can set up a new one almost anywhere, it\'s incredibly convenient! So don\'t be a stranger!');
	basicEcho('"Buy something!"');
	buildShop(wares);
};

var malibuFrontLawn = {
	name: 'Front Lawn',
	desc: 'The lawn sprawls for what seems like miles, so much golden grass and even a little Gazebo. Ryan seems to have set up shop here between the diamond crusted corn-hole set and the croquet display',
	items: [dormantGardenerRobot()],
	actions: ['shop'],
	effects: [openMalibuShop],
	directions: ['east', 'south'],
	connections: [malibuLounge, malibuStart],
	enemies: []
}

var malibuBeach = {
	name: 'Beach',
	desc: 'You can hear the gentle waves crash against the beach, a half buried mech looks on menacingly from right on the ocean edge. Even affter you confirm it\'s not a half-buried Statue of Liberty and you\'re not Charlton Heston...you\'re not remotely put at ease. It\'s definitely menacing, right?',
	items: [dormantOAuth()],
	actions: [],
	effects: [],
	directions: ['west'],
	connections: [malibuLounge],
	enemies: []
}

var malibuUnderground = {
	name: 'Underground',
	desc: 'After dropping from the trap door, you come into a room filled with the many different robots scattered around the property. Rows and rows just lying dormant, waiting for their commands. Considering this dank underground cavern doesn\'t have anything to clean or cook...seems highly suspicious',
	items: [dormantGardenerRobot(), dormantCleanerRobot(), dormantChefRobot(), dormantCleanerRobot(), dormanthypeManRobot()],
	actions: [],
	effects: [],
	directions: ['west', 'up'],
	connections: [malibuHiddenLair, malibuLibrary],
	enemies: []
}

var malibuHiddenLair = {
	name: 'Hidden Lair',
	desc: 'You squirm your way through an almost hidden passage-way, you emerge into a large stone cavern carved by water eons ago. Now, furnished for what could be a rather insidious purpose. It stands empty except for the lone robot and the pedestal holding a manifesto in the direct center of the room. Even still, vibes feel off man',
	items: [dormanthypeManRobot(), malibuManifesto()],
	actions: [],
	effects: [],
	directions: ['east'],
	connections: [malibuUnderground],
	enemies: []
}

/* ==============================
   |       Santa Barbara 	    |
   ============================== */

var sbStart = {
	name: 'State Street',
	desc: 'You\'ve barely made it on to state street when you can see the changes ELISA has made: everything is automated and kinda like Terminator. No life, no sound. Deathly still. Scattered human supplies lie at your feet. The public bus system is still running though! Confirming your suspicion they exist outside the normal flow of time. This is a stop for the 6 and 11.',
	items: [coldBrew(), redBull()],
	actions: [],
	effects: [],
	directions: ['south', 'to IV', 'to Goleta', 'to Appfolio'],
	connections: [sbFunkZone, sbIVTrigo, sbGoletaKellogg, sbAppfolioHall],
	enemies: []
}

var sbFunkZone = {
	name: 'Funk Zone',
	desc: 'The once vibrantly intoxicated area now stands as a testament to how often sentient robots go out to drink: rarely.',
	items: [tequila(), rollingRock()],
	actions: [],
	effects: [],
	directions: ['north', 'south'],
	connections: [sbStart, sbRockGym],
	enemies: []
}

function talkToRamon(){
	basicEcho('"'+player.name+'!!!!!! What\'s up, man? Just trying to get this blue v3. Oh what\'s that? You want to go against ELISA? I don\'t know...you say you\'ve got the team back together?"');
	basicEcho('"Okay, okay. If I\'m the last one on the list..I\'ll help out if you can get Jonathan to play basketball. Deal?"\n');
	if(player.hasItem('basketball') > -1) {
		basicEcho('"Sweet! Only took the apocalypse to get him to play...okay I\'ll give you my badge and be there in a minute okay? Just finishing up."');
		basicEcho('"Oh and if you\'re planning for the final assault, you might want to go to Old Town. Best place to stock up in this area. Best Software Developer from Appfolio makes his home there as well..."')
		player.addItem(appfolioIDBadge());
	} else {
		basicEcho('You call Jonathan, asking if he\'s game for a round of basketball. Big Basketball.');
		basicEcho('"Hmmm alright alright I\'ll play, but I have to deal with one of my robots in IV. It must have escaped the mansion and can\'t have ELISA getting access to my designs...they\'re leagues above hijacked alexas and minis"');
		basicEcho('"Also," says Ramon, "Let me give you a new map of places to visit. Things have changed since I last updated my website..."');
		basicEcho('"...Oh wait, this is a text adventure. Graphics are difficult. Basically there are four areas: Downtown (where we are), IV, Goleta, and Appfolio. Public transit will take you to and from each location at one particular point. I\'d offer to drive but...you used all your free ride credits last time."');
	}
}

var sbRockGym = {
	name: 'Santa Barbara Rock Gym',
	desc: 'The gym looks much as you remember it..except of course the complete lack of people. You might be able to climb more often than once every 10 minutes! You swear you can make out Ramon attempting a v3 in the corner, he waves you over. You can see his keychain creating its own gravitational pull on the ground',
	items: [ramonsKeyChain()],
	actions: ['talk to Ramon'],
	effects: [talkToRamon],
	directions: ['north', 'south'],
	connections: [sbFunkZone, sbBeach],
	enemies: []
}

var sbBeach = {
	name: 'Santa Barbara Beach',
	desc: 'It\'s actually kind of calming to see the beach free of families and noisy drones. You wouldn\'t be caught saying you like the beach now more than before The Overtaking...but...a lone kayak seems to have washed up complete with paddles and a vest!',
	items: [kayak()],
	actions: [],
	effects: [],
	directions: ['north', 'to Isla Vista'],
	connections: [sbRockGym, sbIVBeach],
	enemies: []
}

function talkToCiarra(){
	basicEcho('"Weeeeeeee! Wait are you going to fight ELISA? At Appfolio? Can I come???"');
	basicEcho('"Are you taking the bus? Why don\'t you bike ride anymore?" ...you don\'t have a good response');
}

var sbIVTrigo = {
	name: 'Trigo Street',
	desc: 'Aside from the roaming kill bot squads, IV seems more dead than the week after finals...Trigo looks relatively unchanged from the chaos you remember, Ciarra still seems to be around riding her bike. She pulls up to talk for a minute. The public bus stops here on the 11 line.',
	items: [],
	actions: ['talk to Ciarra'],
	effects: [talkToCiarra],
	directions: ['south', 'to Downtown', 'to Goleta'],
	connections: [sbIVDP, sbStart, sbGoletaKellogg],
	enemies: []
}

function loneHypeBotKill(){
	basicEcho('You hear a mighty roar as Jonathan comes charging down the street behind the wheel of The Zombie Smasher, completely obliterating the remains of his escaped hypebot');
	basicEcho('"Honestly, I\'m kinda bummed you got here before me, never had more fun in this car than right now mowing down all the loose robots. Anyway, I found this basketball in the back. Tell Ramon I\'ll play right after we deal with ELISA"');
	basicEcho('And with that, Jonathan goes roaring off into the sunset, techno shaking the very ground on which you walk.');
	player.addItem(basketball());
}

var sbIVDP = {
	name: 'DP',
	desc: 'Once proud party institutions lay vacant, having been abandoned by even the most stubborn frat bros years ago. You look around and see something that looks a little out of place: a hypebot, curteousy of JE enterprises',
	items: [],
	actions: [],
	effects: [],
	directions: ['north', 'south'],
	connections: [sbIVTrigo, sbIVBeach],
	enemies: [hypeBot(loneHypeBotKill)]
}

var sbIVBeach = {
	name: 'Sands',
	desc: 'looming cliffs barely hold the houses that already looked unsteady three years ago. Erosion has done them no favors...',
	items: [],
	actions: [],
	effects: [],
	directions: ['north', 'to downtown'],
	connections: [sbIVDP, sbBeach],
	enemies: []
}

function openGoletaShop() {
	var wares = [[cupcake(), 5], [tequila(), 10], [turkeyLeg(), 7], [cubanFlan(), 3], [flan(), 5], [peanutBrittle(), 5], [sangria(), 3]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"Hey '+player.name+'! What do you think about the location? I\'ve been thinking about re-opening M-Special right around here...');
	basicEcho('"Anyway, get what you can before the final battle! I\'m about to head back to Shrieveport when this is all done!"\n');
	buildShop(wares);
};

var sbGoletaKellogg = {
	name: 'Old Town',
	desc: 'The vibrant community of Old town provides the greatest resistance against ELISA this close to its hub. Stores have become bunkers lining the street, signs written like ReCAPTCHA prompts continue to confound the robot oppressors. One particular sign reads: \'sH0p\'. The 6 and 11 lines stop here',
	items: [],
	actions: ['shop'],
	effects: [openGoletaShop],
	directions: ['south', 'to Downtown', 'to Appfolio', 'to IV'],
	connections: [sbGoletaImperial, sbStart, sbAppfolioHall, sbIVTrigo],
	enemies: []
}

function openBar() {
	var wares = [[tequila(), 5], [rollingRock(), 3], [sangria(), 5]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"What do ya want?"');
	buildShop(wares);
};

var sbGoletaImperial = {
	name: 'The Imperial',
	desc: 'A local watering hole for all those who have survived the robotic assault. After a hard day of work on the streets of Goleta, all retire to this swanky (machine-gun equipped) drinking place. You can get almost anything you want...provided it\'s not a Long Island',
	items: [],
	actions: ['shop'],
	effects: [openBar],
	directions: ['north', 'east'],
	connections: [sbGoletaKellogg, sbGoletaTacoBell],
	enemies: []
}

function openTacoBell() {
	var wares = [[chimichangaloupa(), 5], [taco(), 3], [bajabrew(), 5]];
	scope = 'shop';
	curShopWares = wares;
	basicEcho('"Welcome to Taco Bell, may I take your order?"');
	buildShop(wares);
};

var sbGoletaTacoBell = {
	name: 'Taco Bell',
	desc: 'An oasis in this messed up world. Somehow this Taco bell has become neutral turf with both man and machine enjoying the atmosphere of Fairview Taco bell, and indulging in the sweet sweet deliciousness of a Chimichangalupa',
	items: [],
	actions: ['shop'],
	effects: [openTacoBell],
	directions: ['west'],
	connections: [sbGoletaImperial],
	enemies: []
}

var sbAppfolio1 = {
	name: 'Engineering',
	desc: 'The open floorplan is making it slightly difficult to get around...A large button stands in the middle of the old Los V bay, right next to Chev\'s old desk. There\'s so much stuff here from before The Overtaking...feels almost like December, 2019',
	items: [upSwitch(), chevsDesk(), legoSet(), beerKeg()],
	actions: [],
	effects: [],
	directions: ['to hall'],
	connections: [sbAppfolioHall],
	enemies: []
}

function leaveSales(){
	basicEcho('With that, the robot falls and so open your paths of exit.');
	sbAppfolio2.isLocked = false;
}

var sbAppfolio2 = {
	name: 'Sales',
	desc: 'Sectioned desks complete with personal dividers give a kind of caged impression. A large button towers over nearby desks, and you can feel an eager Sales bot close in behind you...',
	items: [downSwitch()],
	actions: [],
	effects: [],
	directions: ['to hall'],
	connections: [sbAppfolioHall],
	enemies: [salesBot(leaveSales)],
	isLocked: true
}

var sbAppfolio3 = {
	name: 'Marketing',
	desc: 'You finally make it over to the marketing department, took long enough. A large button stands silently in the middle of the area, not entirely un-near Julia\'s desk',
	items: [leftSwitch(), juliasDesk()],
	actions: [],
	effects: [],
	directions: ['to hall'],
	connections: [sbAppfolioHall],
	enemies: []
}

function leaveCS(){
	basicEcho('The mech falls to one knee, before you deliver the killing blow it swears undying revenge but...we\'ll deal with that in the sequel.');
	basicEcho('The fight has also revealed some food lying around! Proceed with caution!');
	sbAppfolio4.items.push(cupcake(), peanutBrittle(), sangria());
	sbAppfolio4.isLocked = false;
}

var sbAppfolio4 = {
	name: 'Customer Success',
	desc: 'Between you and the button stands a mech you thought you destroyed hours ago in Disneyland. It\'s back for more?!',
	items: [rightSwitch()],
	actions: [],
	effects: [],
	directions: ['to hall'],
	connections: [sbAppfolioHall],
	enemies: [mikeCustomerSuccess(leaveCS)],
	isLocked: true
}

var sbAppfolioHall = {
	name: 'Appfolio Main Entrance',
	desc: 'The entire campus has been completely fortified to protect the AI inside. Luckily, looks like the old door still works. To your right, you see a large metal panel blocking the way around back. On the ground, you see the Appfolio bible. It feels fitting to return. You can almost picture everyone running around the office...Matt sitting in the kitchen ready to hit you with some knowledge first thing in the moring. You can access the 6 bus from here!',
	items: [appfolioMainDoor(), appfolioAccessPanel(), inspired()],
	actions: [],
	effects: [],
	directions: ['to Goleta', 'to Downtown'],
	connections: [sbGoletaKellogg, sbStart],
	enemies: []
}

function finishedIt(){
	sbAppfolioELISA.isLocked = false;
	basicEcho('...And with that. The AI is no more. Considering this whole thing only took a couple days, seems like you didn\'t exactly have to wait 3 years huh? Jeez, the story department really should have seen that one...');
	basicEcho('You\'ve defeated the monster, with the help of your fellow Los Vendadores (who showed up during the battle we swear), and wild cheer goes through the crowd');
	basicEcho('All around the world, ELISA controlled robots are falling dead now that they no longer are receiving communications from the mother server.');
	basicEcho('"WAIT!" Yells Jonathan, "Isn\'t ELISA\'s code hosted on AWS? This whole defeating its server thing makes no sense..."');
	basicEcho('"Maybe," says Ramon, "Or maybe it was ready to die...');
	basicEcho('Jonathan looks up into the air, thinking, before going "Naaaaaah, this kid just wanted to make sure they had sequel material" He looks down at you and shakes his head, as if his standing desk was above yours');
	basicEcho('--------');
	basicEcho('NEW PATH OPENED FROM HERE. \'Go to Endgame\'');
	sbAppfolioELISA.directions.push('to Endgame');
	sbAppfolioELISA.connections.push(endgame);
}

var sbAppfolioELISA = {
	name: 'ELISA',
	desc: 'The gate closes behind you with an almighty thud. Before you stands the largest of all servers. The...mother server. ELISA is in there, you can feel it. Time to end this.',
	items: [],
	actions: [],
	effects: [],
	directions: ['to hall'],
	connections: [sbAppfolioHall],
	enemies: [ELISA(finishedIt)],
	isLocked: true
}

function goodbyeAppfolio() {
	basicEcho('Thanks so much for everyone at Appfolio who made my experience a really great one. All of you guys are awesome and I hope you guys liked this game, or if you didn\'t hopefully you laughed once.');
	basicEcho('If you didn\'t even do that...well...next August gonna be awkward. I know I couldn\'t fit every moment or personal attack into a single game, but I did my best to chose some of the things I\'ll miss most when I go back to school.');
	basicEcho('You\'re all amazing people, have a fantastic 2/3 year, look forward to seeing y\'all make that cheddar. Peace out.');
}

var endgame = {
	name: 'Endgame',
	desc: 'You did it! You finished the game! Whether it was out of obligation or actual enjoyment...we\'re glad you\'re here! There\'s one final command from here, type \'goodbye\'. Now go off and have a celebratory beer',
	items: [],
	actions: ['goodbye'],
	effects: [goodbyeAppfolio],
	directions: [],
	connections: [],
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
	//Santa Barbara
	sbStart.connections = [sbFunkZone, sbIVTrigo, sbGoletaKellogg, sbAppfolioHall];
	sbFunkZone.connections = [sbStart, sbRockGym];
	sbRockGym.connections = [sbFunkZone, sbBeach];
	sbBeach.connections = [sbRockGym, sbIVBeach];
	//
	sbGoletaKellogg.connections = [sbGoletaImperial, sbStart, sbAppfolioHall, sbIVTrigo];
	sbGoletaImperial.connections = [sbGoletaKellogg, sbGoletaTacoBell];
	sbGoletaTacoBell.connections = [sbGoletaImperial];
	//
	sbIVTrigo.connections = [sbIVDP, sbStart, sbGoletaKellogg];
	sbIVDP.connections = [sbIVTrigo, sbIVBeach];
	sbIVBeach.connections = [sbIVDP, sbBeach];
	//
	sbAppfolioHall.connections = [sbGoletaKellogg, sbStart];
	sbAppfolio1.connections = [sbAppfolioHall];
	sbAppfolio2.connections  = [sbAppfolioHall];
	sbAppfolio3.connections  = [sbAppfolioHall];
	sbAppfolio4.connections  = [sbAppfolioHall];
	sbAppfolioELISA.connections  = [sbAppfolioHall];
}
