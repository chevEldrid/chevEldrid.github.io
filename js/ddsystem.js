/*
    ====================================================
    |       Classes Necessary for Object Creation      |
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
    @name:String        name of Player
    @backpack:Array<Item> a list of carried items
	@sanity:Int			total sanity of player
	@health:Int			total health of player
	@equip:Item			Current Item equipped by player to attack
*/
class Player {
    constructor(name, backpack, sanity, health, equip) {
        this.name = name;
        this.backpack = backpack;
		this.sanity = sanity;
		this.health = health;
		this.equip = equip;
    }
};


/*
    =========================================================
    |     System Actions - commands and functions           |
    =========================================================
*/
//list of available commands on a system level
var sysActions = ['survey', 'help', 'about', 'stats', 'inspect', 'use', 'drop', 'go', 'equip', 'attack'];
//parallel array for running the commands of the above list
var sysEffects = [survey, help, about, stats, inspect, use, drop, go, equip, attack];
//the actual code for the effects
/*
	PURPOSE: Repeats the description of the room, as if the Player is surveying it.
*/
function survey(term) {
	term.echo(curRoom.desc, {keepWords: true});
	//add code to show all available specific room actions and items
	inspect(term,"");
	//specific room actions
	term.echo("Special actions here include: ", {keepWords: true});
	for(i = 0; i < curRoom.actions.length; i++) {
        //just for the sake of flowy-ness - prevents 'Start' from being listed as a valid command going forward
		if(curRoom.actions[i] != 'start') {
			term.echo(curRoom.actions[i], {keepWords: true});
		}
	}
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
    term.echo('Welcome to "Dark Depths", A Text-Adventure surrounding a mysterious group of outer-space Octopuses...', {keepWords: true});
    term.echo('MERRY CHRISTMAS!', {keepWords: true});
    term.echo('VER: 1  DATE: Dec 2018', {keepWords: true});
};
/*
	PURPOSE: Lists the current player statistics relevant to advancement
*/
function stats(term) {
	term.echo('CURRENT STATS FOR: ' + player.name +'\n SANITY: ' + player.sanity + '\n HEALTH: ' + player.health + '\n BACKPACK CONTAINS: ', {keepWords: true});
	if(player.backpack.length < 1) {
		term.echo('  nothing', {keepWords: true});
	}
	else {
		for(i = 0; i < player.backpack.length; i++) {
			term.echo('  ' + player.backpack[i].name);
		}
	}
	term.echo('------');
	if(player.equip){
		term.echo(player.equip.name + ' is currently equipped');
    }
    else{
        basicEcho('You currently have no weapon equipped', term);
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
					things.splice(i,1);
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
	SIDE EFFECTS: Whatever the item does, durability will drop by one and if it hits zero-item will be removed
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
        var itemIndex = (containsItem(args));
        //if item exists in backpack...
        if(itemIndex >= 0) {
            var curItem = things[itemIndex];
            if(!curItem.isWeapon) {
                if(curItem.cond()) {
                    curItem.use(term);
                    curItem.durability--;
                    if(curItem.durability <= 0){
                        player.backpack.splice(i, 1);
                    }
                }
                else{
                    basicEcho('That\'s not useful right now!', term);
                }
            }
            else {
                basicEcho('That\'s a weapon, not a usable item!', term);
            }
        }
        else {
            basicEcho('You don\'t have any ' + args + ' in your backpack', term);
        }
    }
};
/*
    PURPOSE: removes the first instance of a particular item from your backpack
*/
function drop(term, args) {
	var things = player.backpack;
	//Case 1:Player backpack is empty
	if(things.length < 1) {
		term.echo('There\'s nothing in your backpack to remove');
	}
	//Case 2: There were no additional arguments supplied with 'use' so function will list all backpack items
	else if(args == '') {
		term.echo('You rummage around and find: ');
		for(i = 0; i < things.length; i++) {
			term.echo(things[i].name);
		}
		term.echo('Did you want to remove one of those?');
	}
	//Case 3: Checks to see if backpack contains item named by @args, if not returns a standard message
	else {
        var itemIndex = (containsItem(args));
        //if item exists in backpack...
        if(itemIndex >= 0) {
            var curItem = things[itemIndex];
            player.backpack.splice(itemIndex, 1);
            basicEcho('You dropped '+curItem.name+' from your backpack, hope you don\'t need it!', term);
                
        }
		else {
			term.echo('You don\'t have any ' + args + ' in your backpack');
		}
	}
};
/*
    PURPOSE: Allows player to traverse between rooms, based on unique array of connections from curRoom
*/
function go(term, args) {
    var options = curRoom.directions;
    var places = curRoom.connections;
    //Case 1:No directions from current room
    if(options.length < 1) {
        basicEcho('It would appear...there isn\'t anywhere to go from here', term);
    }
    //Case 2:No specific direction connected to command
    else if(args == '') {
        basicEcho('You can go: ', term);
        for(var i = 0; i < options.length; i++) {
            basicEcho(options[i] + " ", term);
        }
    }
    //Case 3:specific direction was mentioned
    else {
        var exists = false;
        for(var i = 0; i < options.length; i++){
            var optionName = options[i];
            var place = curRoom.connections[i];
            if(optionName.toUpperCase() === args.toUpperCase()) {
                exists = true;
                loadRoom(place);
                basicEcho(place.desc, term);
            }
        }
        if(!exists) {
            basicEcho('To go '+args+' isn\'t an option in this room...', term);
        }
    }
};
/* PURPOSE: Takes an item that is in your backpack and isWeapon and equips it to player
	SIDE-EFFECTS: Changes player character
*/
function equip(term, args) {
	var things = player.backpack;
	//Case 1:Player backpack is empty
	if(things.length < 1) {
		term.echo('There\'s nothing in your backpack to equip');
	}
	//Case 2: There were no additional arguments supplied with 'equip' so function will list all backpack items that are weapons
	else if(args == '') {
		term.echo('You are currently carrying: ');
		for(i = 0; i < things.length; i++) {
			if(things[i].isWeapon) {
				term.echo(things[i].name);
			}			
		}
		term.echo('Maybe one of these would be a good weapon?');
	}
	//Case 3: Checks to see if backpack contains weapon named by @args, if not returns a standard message
	else {
        var itemIndex = (containsItem(args));
        if(itemIndex >= 0) {
            var curItem = things[itemIndex];
            if(curItem.isWeapon) {
                if(player.equip && curItem.name == player.equip.name.toUpperCase()){
                    term.echo('You already have that equipped!');
                }
                else {
                    player.equip = curItem;
                    term.echo('You equipped the '+curItem.name);
                }				
            }
            else {
                term.echo('That\'s not a weapon!');
            }
        }
		else {
			term.echo('You don\'t have any ' + args + ' in your backpack');
		}
	}
};
/* PURPOSE: Very simple combat where all attacks start with you, and you can run away at any time */
function attack(term, args) {
	var roomEnemies = curRoom.enemies;
	//Case 1:No enemies in the room
	if(player.equip){
		if(roomEnemies.length < 1) {
			term.echo('There\'s nothing worth fighting here...');
		}
		//Case 2: There were no additional arguments supplied with 'attack' so function will list all enemies in the room
		else if(args == '') {
			term.echo('You scan the area and see: ');
			for(i = 0; i < roomEnemies.length; i++) {
				term.echo(roomEnemies[i].name);			
			}
		}
		//Case 3: Checks to see if room contains enemy named by @args, if not returns a standard message
		else {
			var exists = false;
			for(i = 0; i < roomEnemies.length; i++) {
				var thingName = roomEnemies[i].name.toUpperCase();
				if(thingName == args.toUpperCase()) {
					exists = true;
					var thisEnemy = roomEnemies[i];
					//strength of weapon + modifier based on player's sanity
					var attackPower = getAttackStrength();
					term.echo('You attacked the '+thisEnemy.name+' for '+attackPower+' damage!');
					term.echo('The '+thisEnemy.name+' attacked you for '+thisEnemy.attack+' damage!');				
					thisEnemy.health -= attackPower;
					player.health -= thisEnemy.attack;
					if(thisEnemy.health <= 0){
						term.echo('You killed the '+thisEnemy.name+'!');
						roomEnemies.splice(i,1);
						//basic loot-dropping action...
						if(thisEnemy.loot) {
							//special case for if loot required
							if(thisEnemy.isReq) {
								lootDrop(thisEnemy.loot, 1, term);
							}
							else {
								lootDrop(thisEnemy.loot, 2, term);
							}							
						}
					}
					
				}
			}
			if(!exists) {
				term.echo('There are no enemies by that name here');
			}
		}
	}
	else{
		term.echo('You don\'t have a weapon equipped!');
	}
	
};
//given an array of possible loot options from enemy, and odds of drop returns a loot if odds met
function lootDrop(possibilities, odds, term) {
	var numPos = possibilities.length;
	var chance = getRandomInt(1,odds);
	if(chance == 1) {
        var lootIndex = getRandomInt(1, numPos) - 1;
		var givenLoot = possibilities[lootIndex];
		player.backpack.push(givenLoot);
		basicEcho('Congradulations! You got a '+givenLoot.name+'!', term);
	}
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
	system action for checking backpack for item. useful for npcs
*/
function hasItem(itemName) {
	return rummageBackpack(itemName, false);
}

/*
	PURPOSE: Removes item with given name from player backpack
*/
function removeItem(itemName) {
	return rummageBackpack(itemName, true);
}

/*
    PURPOSE: Iterate through player.backpack, to find if particular item exists
    SIDE EFFECTS: If REMOVE == true, removes first instance of item from backpack
*/
function rummageBackpack(itemName, remove) {
    var things = player.backpack;
    for(i = 0; i < things.length; i++){
        var thingName = things[i].name.toUpperCase();
        if(thingName == itemName.toUpperCase()) {
            if(remove) {
                player.backpack.splice(i, 1);
            }
            return true;
        }
    }
    return false;
}

/*
    PURPOSE: Iterate through player.backpack, return index of given item
    --hoping to replace rummageBackpack with this in all cases
*/
function containsItem(itemName) {
    var things = player.backpack;
    for(i = 0; i < things.length; i++){
        var thingName = things[i].name.toUpperCase();
        if(thingName == itemName.toUpperCase()) {
            return i;
        }
    }
    return -1;
}
/*
	PURPOSE: Create a basic player with starting values for health and sanity
*/
function createCharacter(playerName) {
	var grace = playerName.localeCompare('Grace');
	var test = playerName.localeCompare('Chev');
	if(grace == 0) {
		player = {
			name: 'Grace',
			backpack: [sterekFanfic(), longIsland()],
			sanity: 30,
			health: 80
		};
	}
	else if(test == 0) {
		player = {
			name: 'Chev',
			backpack: [stopSign(), milk(), calamari()],
			sanity:100,
			health:100,
			equip: oldSword
		};
	}
	else {
		player = {
			name: playerName,
			backpack: [],
			sanity: 50,
			health: 100
		};
	}
};

function createTemplateCharacter() {
	player = {
		name: 'Nobody',
		backpack: [],
		sanity: 50,
		health: 50
	};
};
function createKCodeCharacter() {
    player = {
        name: 'Hax0r',
        backpack: [mysteryMeat(), milk(), calamari()],
        sanity: 100,
        health: 100,
    };
}
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
	PURPOSE: Return a random integer within the supplied range
*/
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.round(Math.random() * (max - min)) + min;
};
/*
	PURPOSE: Adds modifier to attack based on player's current sanity
*/
function getAttackStrength() {
	var sanity = player.sanity;
	var baseStrength = player.equip.strength;
	var totalPower = 0;
	if(sanity < 30) {
		totalPower = getRandomInt(Math.floor(baseStrength * 0.5), baseStrength);
	}
	else if(sanity < 60){
		totalPower = getRandomInt(Math.floor(baseStrength * 0.7), baseStrength);
	}
	else if(sanity < 99){
		totalPower = baseStrength;
	}else {
		totalPower = getRandomInt(baseStrength, Math.ceil(baseStrength * 1.2));
	}
	return totalPower;
}
/*
    PURPOSE: To connect rooms at runtime and not throw super errors
*/
function loadRoomConnections() {
    yourApartment.connections = [apartmentStreet];
	apartmentStreet.connections = [yourApartment, apartmentTwoStreet, northernEllis];
	apartmentTwoStreet.connections = [apartmentStreet, apartmentTwo, southernEllis];
	apartmentTwo.connections = [apartmentTwoStreet];
	southernEllis.connections = [apartmentTwoStreet];
	northernEllis.connections = [apartmentStreet];
	parkPath.connections = [northernEllis, parkEntrance];
	parkEntrance.connections = [parkPath, parkNorth, parkSouth];
	parkNorth.connections = [parkEntrance, parkEast];
    parkEast.connections = [parkNorth];
    treasureTrove.connections = [parkEast, exitPark];
    parkSouth.connections = [parkEntrance, parkExit];
    parkExit.connections = [parkSouth];
    altarSteps.connections = [parkExit];

}