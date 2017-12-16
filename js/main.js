/*
    ====================================================
    |       Classes Necessary for Object Creation      |
    ====================================================
*/
/*
    @name:String        name of item
    @desc:String        description of item
    @takeable:boolean   can I put the item in my backpack
    @cond:boolean		Condition when this item is usable
	@use:function		What this Item will do if cond is met...
*/
class Item {
    constructor(name, desc, takeable, cond, use) {
        this.name = name;
        this.desc = desc;
        this.takeable = takeable;
		this.cond = cond;
		this.use = use;
    }
};

/*
    @name:String        name of Room
    @desc:String        description of Room
    @items:Array<Item>  items in room
    @actions:Array<String> list of available actions in room
    @effects:Array<function> actions available
*/
class Room {
    constructor(name, desc, items, actions, effects) {
        this.name = name;
        this.desc = desc;
        this.items = items;
        this.actions = actions;
        this.effects = effects;
    }
};

/*
    @name:String        name of Player
	@pronoun:String		pronoun of Player
    @backpack:Array<Item> a list of carried items
	@money:Int			total money of player
	@health:Int			total health of player
*/
class Player {
    constructor(name, backpack, location, money, health) {
        this.name = name;
		this.pronoun = pronoun;
        this.backpack = backpack;
		this.money = money;
		this.health = health;
    }
};

/*
    =========================================================
    |     System Actions - commands and functions           |
    =========================================================
*/
//list of available commands on a system level
var sysActions = ['survey', 'help', 'about', 'stats', 'inspect', 'use'];
//parallel array for running the commands of the above list
var sysEffects = [survey, help, about, stats, inspect, use];
//the actual code for the effects
/*
	PURPOSE: Repeats the description of the room, as if the Player is surveying it.
*/
function survey(term) {
	term.echo(curRoom.desc, {keepWords: true});
};
/*
	PURPOSE: To list all available commands in the current room to the Player
*/
function help(term) {
    term.echo('possible commands at this point are: ', {keepWords: true});
    for(i = 0; i < actions.length; i++) {
        //just for the sake of flowy-ness - prevents 'Start' from being listed as a valid command going forward
		if(actions[i] != 'start') {
			term.echo(actions[i], {keepWords: true});
		}
    }
    term.echo('For further assistance please refer to included documentation or press buttons until something happens.', {keepWords: true});
};
/*
	PURPOSE: Prints some simple "About the Game" information
*/
function about(term) {
    term.echo('Welcome to "Snowfall", a text adventure focused on Cold War tensions of the early 1990s.', {keepWords: true});
    term.echo('This game also serves as a technical demo to deepen my understanding of JavaScript and to produce further interactivity with the site as a whole.', {keepWords: true});
    term.echo('DESIGNED BY: CHEV ELDRID', {keepWords: true});
    term.echo('DATE: 2017', {keepWords: true});
};
/*
	PURPOSE: Lists the current player statistics relevant to advancement
*/
function stats(term) {
	term.echo('CURRENT STATS FOR: ' + player.name +'\n MONEY: $' + player.money + '\n HEALTH: ' + player.health + '\n BACKPACK CONTAINS: ', {keepWords: true});
	if(player.backpack.length < 1) {
		term.echo('  nothing', {keepWords: true});
	}
	else {
		for(i = 0; i < player.backpack.length; i++) {
			term.echo('  ' + player.backpack[i].name);
		}
	}
};

/*
	PURPOSE: Allows player to inspect items in the room and if possible, add them to Player's collection
	SIDE EFFECTS: Adding items to Player's backpack
*/
function inspect(term, args) {
	//This function is broken up into Cases:
	var things = curRoom.items;
	//Case 1: The room has no items in it
	if(things.length < 1) {
		basicEcho('There\'s nothing worth investigating here', term);
	}
	//Case 2: There were no additional arguments supplied with 'inspect' so function will list all Items in the room
	else if(args === '') {
		term.echo('You see: ');
		for(i = 0; i < things.length; i++) {
			term.echo(things[i].name, {keepWords: true});
		}
	}
	//Case 3: Checks to see if room contains Item named by @args, if not returns a simple message
	//if it is in room, displays description and tries to take item
	else {
		var exists = false;
		for(i = 0; i < things.length; i++) {
			var thingName = things[i].name;
			if(thingName.toUpperCase() === args.toUpperCase()) {
				basicEcho(things[i].desc, term);
				exists = true;
				if(things[i].takeable) {
					basicEcho('You put the ' + thingName + ' into your bag for later.', term);
					player.backpack.push(things[i]);
				}
			}
		}
		if(!exists){
			term.echo(args + ' isn\'t in this room', {keepWords: true});
		}
	}
};
/*
	PURPOSE: Use an item in your backpack
	SIDE EFFECTS: Whatever the item does, and will be removed from package
*/
function use(term, args) {
	var things = player.backpack;
	//Case 1:Player backpack is empty
	if(things.length < 1) {
		term.echo('There\'s nothing in your backpack');
	}
	//Case 2: There were no additional arguments supplied with 'use' so function will list all backpack items
	else if(args == '') {
		term.echo('You rummage around and find: ');
		for(i = 0; i < things.length; i++) {
			term.echo(things[i].name);
		}
		term.echo('Maybe one can be of use?');
	}
	//Case 3: Checks to see if backpack contains item named by @args, if not returns a standard message
	else {
		var exists = false;
		for(i = 0; i < things.length; i++) {
			var thingName = things[i].name.toUpperCase();
			if(thingName == args.toUpperCase()) {
				exists = true;
				if(things[i].cond) {
					things[i].use(term);
					player.backpack.splice(i, 1);
				}
				else {
					term.echo('That\'s not useful right now!');
				}
			}
		}
		if(!exists) {
			term.echo('You don\'t have any ' + args + ' in your backpack');
		}
	}
};

/*
    =========================================================
    |     System Variables and Background Functions         |
    =========================================================
*/
//actions for current position, combination of room and sys
var actions = sysActions;
//effects for current position, combination of room and sys
var effects = sysEffects;
//Current Room of Player
var curRoom = null;
//Player
var player = null;
//INPUT VARIABLES
var command = "";
var arguments = "";
//A way to have multi-command prompts with game elements or whatnot
//Flag to switch from primary prompt behavior
var hijack = false;
//the previous action performed in the prompt
var prevAction = null;
//for multi-level interactions, a way to keep track of your place
var promptPos = 0;
//GAME FUNCTIONS
/*
	PURPOSE: Load the currently available actions and effects
	SIDE EFFECTS: changes the actions and effects variables to reflect current position of player
*/ 
function loadRoom(room) {
    var tempActions = [];
    var tempEffects = [];
    for (i = 0; i < sysActions.length; i++) {
        tempActions.push(sysActions[i]);
    }
    for (i = 0; i < room.actions.length; i++) {
        tempActions.push(room.actions[i]);
    }
    //alert(tempActions);
    actions = tempActions;

    for (i = 0; i < sysEffects.length; i++) {
        tempEffects.push(sysEffects[i]);
    }
    for (i = 0; i < room.effects.length; i++) {
        tempEffects.push(room.effects[i]);
    }
    effects = tempEffects;
    
    curRoom = room;
};
//basic parsing function
/*
	PURPOSE: Parses the input of the user into commands and arguments the program can understand
	SIDE EFFECTS: changes the value of @Command to current inputted command
	RETURNS: The extra arguments inputted after command
*/
function parseInput(input) {
	var inputs = input.split(" ");
	command = inputs[0];
	inputs.shift();
	arguments = inputs;
	var known = false;
	//
	for(i = 0; i < (arguments.length + 1) && !known; i++) {
		for(j = 0; j < actions.length; j++) {
			if(command.toUpperCase() === actions[j].toUpperCase()) {
				known = true;
				
			}
		}
		if(!known) {
			command = command + " " + arguments[0];
			arguments.shift();
		}
	}
	return arguments.join(" ");
};

/*
	PURPOSE: Create a basic player with starting values for health and money
*/
function createCharacter() {
	player = {
		name: 'Agent X',
		pronoun: 'they',
		backpack: [],
		money: 50,
		health: 100
	};
};

/*
	PURPOSE: Cut down on the needless functions that just print to term, given text and term. Prints text to term
*/
function basicEcho(text, term) {
	term.echo(text, {keepWords: true});
};
/*
	PURPOSE: Sets all variables that effect prompt hijacks back to baseline
	SIDE EFFECTS: sets hijack to false and resets promptPos
*/
function endHijack() {
	hijack = false;
	promptPos = 0;
}

/*
    =========================================================
    |           Specific Rooms and functions                |
    =========================================================
*/
//Starting Room - The Bar
//Items in Bar
var pokerChip = {
	name: 'poker chip',
	desc: 'a blue poker chip with a skull in the center',
	takeable: true,
	cond: false,
	use: function(term) {}
};
var ashTray = {
	name: 'ash tray',
	desc: 'a recently used glass dish with what looks like an old ship wheel etched into the bottom.',
	takeable: false,
};
var vodkaSoda = {
	name: 'Vodka Soda',
	desc: '2 oz Vodka, club soda to top.',
	takeable: false,
};
var matchBook = {
	name: 'match book',
	desc: 'a small book of matches with what looks like an old ship wheel on the front.',
	takeable: true,
	cond: false
};
//The Bar itself
var theBar = {
	name:'The Bar',
	desc:'You are in a raucus pub filled with good music and lively drinkers, a welcome distraction from the frigid temperatures outside. The Jukebox seems stuck on Prag Rock but that\'s never bothered you much. Taking your time on a Vodka Soda, you look around and see a guarded door towards the back of the room.',
	items: [pokerChip, ashTray, vodkaSoda, matchBook],
	actions: ['start', 'drink', 'order', 'leave', 'talk to barkeep'],
	effects: [
		function(term) {basicEcho(('Chapter 1: Tech Demo\n' + theBar.desc), term);},
		function(term) {basicEcho('You take a swig of your Vodka Soda and grimace, stronger than you would have liked.', term);},
		theBarOrder,
		theBarLeave,
		theBarBarkeep
	]
};
/*
	PURPOSE: Orders a drink for the player at the bar
	SIDE EFFECTS: If possible, decreases total money of Player by a given amount
*/
function theBarOrder(term) {
	if(player.money >= 5) {
		basicEcho('You down the rest of your drink and signal the barkeep for another Vodka Soda', term);
		player.money -= 5;
		player.health -=2;
		if(player.health <= 90) {
			basicEcho('"You might want to slow down and check on your health," the barkeep says to you warily', term);
		}
	} else {
		basicEcho('You can\'t afford another!', term);
	}
};
/*
	PURPOSE: Allows player to leave the bar and venture into the next room
	SIDE EFFECTS: Changes curRoom and therefore available actions
*/
function theBarLeave(term) {
	basicEcho('You decide to finally leave the barstool and investigate the back door, nodding to the hired muscle and pretending you belong. \nInside, a game is in mid-swing, it doesn\'t look like there\'s room to join...', term);
	basicEcho('"Hey, you," one of the players turns in your direction, cigar dangling from his cold grin. "I need another drink...why don\'t you play my hand?" He stands up, and presses the cards against your chest as he passes, "Don\'t lose my money."', term);
	basicEcho('The room finds this turn of events hilarious as you take the now vacant seat staring at the mountain of chips in front of it. "Well," another player asks, "What are you going to do?"', term);
	loadRoom(pokerRoom);
	basicEcho(curRoom.desc, term);
};

function theBarBarkeep(term, args) {
	if(promptPos == 0) {
		hijack = true;
		basicEcho('"Don\'t think I\'ve seen you around here before...Or maybe my memory just ain\'t what it used to be. What\'s your name friend?"', term);
		promptPos += 1;
	}
	else if(promptPos == 1) {
		player.name = args;
		basicEcho('"' + args + '? Nice to meet you ' + args + '"', term);
		basicEcho('"And what pronoun would you like to use?"', term);
		promptPos += 1;
		
	}
	else if(promptPos == 2) {
		player.pronoun = args;
		basicEcho('"' + args + '? Works for me"', term);
		endHijack();
	}
};
//Room 2 - Poker
var pokerCards = {
	name: 'hand of cards',
	desc: 'You glance sideways at the Jack and 2 in your hand. Not exactly the best pair...',
	takeable: false
};
var pokerCigarette = {
	name: 'cigarette',
	desc: 'You just kicked that habit. Really want to pick it back up again?',
	takeable: false
};
var pokerRoom = {
	name: 'Poker',
	desc: 'The table had probably been green at one point or another, but now cigarette burns marr the smooth surface. Smoke hangs in the air like a dense fog.',
	items: [pokerCards, pokerCigarette],
	actions: ['raise', 'call', 'back to bar'],
	effects: [pokerRaise, pokerCall, pokerBacktoBar]
};
/*
	PURPOSE: Story progression if you raise the stakes in the card game
	SIDE EFFECTS: Changes player money and removes poker chip from backpack if there.
*/
function pokerRaise(term) {
	basicEcho('You feel pretty confident about your hand, for some reason, and decide to have some fun while you\'re here: ', term);
	if(player.backpack.includes(pokerChip)) {
		basicEcho('"I\'ll raise $50," you say confidently, "and throw in this chip I found at the bar." You toss the blue poker chip onto the table as well before pushing a stack into the center',term);
		player.backpack.splice(player.backpack.findIndex(function(item) { return (item.name === "poker chip"); }), 1);
		player.money+=100;
	}
	else {
		basicEcho('"I\'ll raise $50," you say pushing a reasonable stack of chips into the center of the table.', term);
		player.money+=50;
	}
	basicEcho('Eventually. the fifth card in the center is flipped and you find among the cards two Jacks and a 2 staring back. Full House. You\'ve won! Deciding that\'s enough for one day you get up to leave...', term);
	pokerBacktoBar(term);
};

/*
	PURPOSE: Story progression if you call the bet in the card game
	SIDE EFFECTS: player will either lose health or money
*/	
function pokerCall(term) {
	basicEcho('"I\'ll call," you say dropping $45 worth of chips into the center.\nThe final card is flipped and you find among the ones staring back two Jacks and a 2. Full House. The player to your left reveals two Aces complimenting the pair on the table. You\'ve lost.', term); 
	basicEcho('"I hope you have the money to cover that, \'cause if not..." the voice behind you warns, fresh drink in hand.', term);
	if(player.money >= 45) {
		basicEcho('Luckily, you manage to scrounge up $45 and hand it over before vacating your seat and heading for the door', term);
		player.money -= 45;
	}
	else {
		basicEcho('You do not have the money. Upon realizing this, the man who gave you his seat slams your head onto the table whispering a string of threats into your left ear. You decide it\'s time to go...', term);
		player.health -= 10;
	}
	pokerBacktoBar(term);
};
/*
	PURPOSE: Progress the story out of the Poker room
*/
function pokerBacktoBar(term) {
	basicEcho('"' + player.name + ', isn\'t it?" A voice asks smuggly. "You were in Lebanon 5 years ago. I remember. The scar keeps it fresh"', term);
	basicEcho('"I\'m not sure what you mean," you try to cover for yourself but it seems like the voice is beyond comvincing. A bag is pulled over your head.\n', term);
	basicEcho('You awake to a muffled yelp and a rather loud thump. The bag is still over your eyes, but you turn in the direction of the sound as footsteps approach. The ziptie digging into your wrists is cut and the bag thrown off.', term); 
	basicEcho('"Better hurry up, they\'re not going to be gone long," says the woman responsible for saving you. "You coming?"', term);
	player.health -= 5;
	loadRoom(warehouse);
	basicEcho(curRoom.desc, term);
};
//Room 3 - Warehouse
var warehouseBandages = {
	name: 'bandages',
	desc: 'Some gauze and medical tape',
	takeable: true,
	cond: function() {return (player.health <= 90);},
use: function(term) { player.health += 10; basicEcho('You wrap the guaze around your stomach, wincing through the process but feeling better for it', term);}
};

var warehouse = {
	name: 'Warehouse',
	desc: 'The Warehouse smells faintly of oil and rust. It\'s been a long time since the days it probebly housed a car assembly line, but the stains on the floor indicate it hasn\'t been unoccupied',
	items: [warehouseBandages],
	actions: ['follow her'],
	effects: [leaveWarehouse]
};

function leaveWarehouse(term) {
	loadRoom(hQ);
};
//Room 5 - HQ
var hQItems = [];
var hQ = {
    name: 'Headquarters',
    desc: 'A hollowed-out enclave deep under London full of state-of-the-art equipment capable of amazing things. Agents bustle in every direction, each on their own mission to save the world.',
    items: hQItems,
    actions: ['report', 'call home', 'leave'],
    effects: [hQItemsReport, hQItemsCallHome, hQItemsLeave]
};

function hQItemsReport(term) {
    term.echo('You reach the office of Agent Y, pause for a moment to collect yourself outside, and proceed with some apprehension. Surely she\'ll want to hear about Nicaragua...');
};

function hQItemsCallHome(term) {
    term.echo('You decide to spend a moment phoning home. After all, it has been a while. Ever since the robbery...');
};

function hQItemsLeave(term) {
    term.echo('You\'ve done all you came here to do. Now time to scedaddle.');
};
/*
    =========================================================
    |                  Actual Terminal                      |
    =========================================================
*/
//Let us begin

jQuery(document).ready(function($) {
	//GAME INITIALIZERS
	//loads starting room
    loadRoom(theBar);
	//Creates a generic character
	createCharacter();
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = "https://github.com/chevEldrid/chevEldrid.github.io/blob/master/js/main.js";
    } else {
		//this holds the interpreter function...where we figure out what to do with the text
		$('#term').terminal(function(input) {
			//"If you are currently not in the middle of doing something else..."
			if(!hijack) {
				//calls parsing function
				//literally no idea why I have to do this...by this I mean the saving the extras as args
				var args = parseInput(input);
				var known = false;
				for(i = 0; i < actions.length; i++) {
					if(command.toUpperCase() === actions[i].toUpperCase()) {
						known = true;
						effects[i](this, args);
						//storing previous command for potential hijack
						prevAction = effects[i];
						break;
					}
				}
				if(!known) {
					this.echo('unknown command, if you\'re stuck, type "help" for options!', {keepWords: true});
				}
			}
			else {
				prevAction(this, input);
			}
		}, {
		//this is the second: descriptors
        greetings: 'Welcome to Snowfall! Type "start" to get started!',
        prompt: '> '
    });
    }
});
