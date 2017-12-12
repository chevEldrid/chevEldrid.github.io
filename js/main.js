/*
    ====================================================
    |       Classes Necessary for Object Creation      |
    ====================================================
*/
/*
    @name:String        name of item
    @desc:String        description of item
    @takeable:boolean   can I put the item in my backpack
    @value:String       not really sure
*/
class Item {
    constructor(name, desc, takeable, value) {
        this.name = name;
        this.desc = desc;
        this.takeable = takeable;
        this.value = value;
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
    @backpack:Array<Item> a list of carried items
    @location:Room      current player location
*/
class Player {
    constructor(name, backpack, location) {
        this.name = name;
        this.backpack = backpack;
        this.location = location;
    }
};

/*
    =========================================================
    |     System Actions - commands and functions           |
    =========================================================
*/
//list of available commands on a system level
var sysActions = ['inspect', 'help', 'about'];
//parallel array for running the commands of the above list
var sysEffects = [inspect, help, about];
//the actual code for the effects
function inspect(term) {
	term.echo(curRoom.desc);
}

function help(term) {
    term.echo('possible commands at this point are: ');
    for(i = 0; i < actions.length; i++) {
        term.echo(actions[i]);   
    }
    term.echo('For further assistance please refer to included documentation or press buttons until something happens.');
}

function about(term) {
    term.echo('Welcome to "Snowfall", a text adventure focused on Cold War tensions of the early 1990s.');
    term.echo('This game also serves as a technical demo to deepen my understanding of JavaScript and to produce further interactivity with the site as a whole.');
    term.echo('DESIGNED BY: CHEV ELDRID');
    term.echo('DATE: 2017');
}
/*
    =========================================================
    |     System Variables and Background Functions         |
    =========================================================
*/
//actions for current position, combination of room and sys
var actions = sysActions;
//effects for current position, combination of room and sys
var effects = sysEffects;
//makes sure rooms are only introduced once
var visited = false;
//Current Room of Player
var curRoom = SPoker;
//GAME FUNCTIONS
//effects: changes the actions and effects variables to reflect current position of player
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

/*
    =========================================================
    |      Specific Instances of rooms and function         |
    =========================================================
*/
//Room 1 - Poker Parlor
var SPokerItems = {
    name: 'cards', 
    desc: 'a Jack and a 2', 
    takeable: true, 
    value: 5
};
var SPoker = {
    name: 'Poker',
    desc: 'The table had probably been green at one point or another, but now cigarette burns marred the smooth surface. Smoke hung in the air like a dense fog. To your left, a certain mob boss fiddled with a pair of Queens. To your right, a fellow Operative just raised the pot. What will you do?',
    items: SPokerItems,
    actions: ['call','bluff','check cards'],
    effects: [SPokerCall, SPokerBluff, SPokerCheckCards]
};
function SPokerCall(term) {
    term.echo('"I\'ll call," you say with far more conviction than you feel. The dealer raises an eyebrow.\n');
    SPokerResult(term);
    
};
              
function SPokerBluff(term) {
    term.echo('"I\'ll raise," you say with confidence, "All in." A collective gasp rises from the table.\n');
    SPokerResult(term);
};

function SPokerResult(term) {
    term.echo('The table has a Jack, a Queen, An Ace, and a Two. It\'s time for the final card...\n Another Two. Somehow, you\'ve won the hand. You decide that\'s enough shady gambling for one day and say goodbye to a chorus of grumbles from the rest of the crowd.\nYou return to HQ: \n');
    loadRoom(hQ);
    term.echo(curRoom.desc);
};
    
function SPokerCheckCards(term) {
    term.echo('You look down, Jack and a 2. There\'s no way you can make anything of this hand.');
};
//Room 2 - HQ
var hQItems = [];
var hQ = {
    name: 'Headquarters',
    desc: 'A hollowed-out enclave deep under London full of state-of-the-art equipment capable of amazing things. Agents bustle in every direction, each on their own mission to save the world.',
    items: hQItems,
    actions: ['report', 'call home', 'leave'],
    effects: [hQItemsReport, hQItemsCallHome, hQItemsLeave]
};

function hQItemsReport(term) {
    term.echo('You reach the office of Agent X, pause for a moment to collect yourself outside, and proceed with some apprehension. Surely she\'ll want to hear about Nicaragua...');
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
	//attempt at array of commands
    loadRoom(SPoker);
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = "https://github.com/chevEldrid/chevEldrid.github.io/blob/master/js/main.js";
    } else {
		//this holds the interpreter function...where we figure out what to do with the text
		$('#term').terminal(function(input) {
			//need some parsing work going on
			var known = false;
			for(i = 0; i < actions.length; i++) {
				if(input == actions[i]) {
					known = true;
					effects[i](this);
					break;
				}
			}
			if(!known) {
				this.echo('unknown command, if you\'re stuck, type "help" for options!');
			}
		}, {
		//this is the second: descriptors
        greetings: 'Welcome to Snowfall! Type "inspect" to get started!',
        prompt: '> '
    });
    }
});
