//system.js - functions relating to player actions, player inputs, and background content generation
/*
    =========================================================
    |     Global Actions - commands and functions           |
    =========================================================
*/
//SCOPE: Global - actions that are available while player is roaming around
//list of available commands on a system level
var sysActions = ['survey', 'help', 'about', 'stats', 'inspect', 'use', 'drop', 'go', 'equip', 'attack'];
//parallel array for running the commands of the above list
var sysEffects = [survey, help, about, stats, inspect, use, drop, go, equip, attack];
//parallel array for basic help descriptions
var sysDescriptions = [
	'provides all kinds of useful room info',
	'prints a short description of all basic actions to console',
	'basic information about the game itself',
	'prints current character statistics like health, money, and inventory',
	'can by used alone to see everything visible in a room, or in combination with an item name to more thoroughly examine it',
	'can be used alone to view everything in player\'s backpack, or to use a particular backpack item',
	'can be used to drop a particular item from your backpack. Don\'t worry! It will stay in the room you dropped it in',
	'can be used alone to list all directions you can visit from current room, or with a direction to move player to that room',
	'can be used alone to list all possible weapons in player backpack, or with a specific weapon to boost player attack stats',
	'can be used alone to list all enemies in the current room, or one enemy in particular to engage in combat!'
];

//SCOPE: Shop - actions available while player is in a shop
var shopActions = ['buy', 'sell', 'leave', 'help'];
//parallel array for running the commands in the above list
var shopEffects = [buyItem, sellItem, leaveShop, help];
//parallel array for basic help descriptions
var shopDescriptions = [
	'used in conjunction with an item name available in the store, will attempt to purchase with existing player funds',
	'used in conjunction with an item in your backpack to exchange it for item value',
	'exits the shop environment and brings you back to your current player location',
	'provides help documentation for shop actions'
];

//the actual code for the effects
/*
	PURPOSE: Repeats the description of the room, as if the Player is surveying it.
*/
function survey() {
	basicEcho(curRoom.desc + '\n');
	//add code to show all available specific room actions and items
	inspect("");
	basicEcho('');
	attack('');
	basicEcho('');
	//specific room actions
	if(curRoom.actions.length > 0) {
		basicEcho("Special actions here include: ");
		for(i = 0; i < curRoom.actions.length; i++) {
        	//just for the sake of flowy-ness - prevents 'Start' from being listed as a valid command going forward
			if(curRoom.actions[i] != 'start') {
				basicEcho(curRoom.actions[i]);
			}
		}
	}
};
/*
	PURPOSE: To list all available commands in the current room to the Player
*/
function help() {
	basicEcho('possible commands at this point are: ');
	basicEcho('----------------');
	var availActions = sysActions;
	var helpTexts = sysDescriptions;
	var specialActions = curRoom.actions;
	if(scope === 'shop') {
		availActions = shopActions;
		specialActions = [];
		helpTexts = shopDescriptions;
	}
    for(i = 0; i < availActions.length; i++) {
    	basicEcho(`[${availActions[i]}]: ${helpTexts[i]}`);
    	basicEcho('----------------');
    }
    for(j = 0; j < specialActions.length; j++) {
    	if(specialActions[j] != 'start') {
    		basicEcho(`[${specialActions[j]}]: room specific action. Try it and see!`);
    		basicEcho('----------------');
    	}
    }
    basicEcho('For further assistance please refer to included documentation or press buttons until something happens.');
};
/*
	PURPOSE: Prints some simple "About the Game" information
*/
function about() {
    basicEcho('Welcome to "Road Trip", A Text-Adventure about Saving the World from ane evil AI...');
    basicEcho('VER: 1.0  DATE: Dec 2019');
    //setGraphic("city.gif");
};
/*
	PURPOSE: Lists the current player statistics relevant to advancement
*/
function stats() {
	basicEcho(player.playerStats());
};
/*
	Purpose: general tutor for items in an array using 3-case system, returns index of found thing
	SIDE EFFECTS: Prints failure to find cases to console
	RETURNS: index of found thing, -1 if thing not found, -2 if either first two cases trigger
	NOTES: named is an optional parameter so tutor can work with arrays of objects with names or arrays of strings
	NOTES: if r2 is empty, assumes you don't want to list all the things available for that command
*/
function tutor(args, things, r1, r2, named = true) {
	var ls = things;
	var lsVisible = things;
	if(named) {
		lsVisible = things.filter(x => !x.isSecret).map(x => x.name);
		ls = things.map(x => x.name);
	}
	if(ls.length < 1) {
		basicEcho(r1);
		return -2;
	}
	//Case 2: no additional arguements supplied with command
	else if(args === '') {
		if(r2 !== '') {
			basicEcho(r2);
			for(i = 0; i < lsVisible.length; i++) {
				basicEcho(lsVisible[i]);
			}
		} else {
			basicEcho('Your search returns nothing of interest');
		}
		return -2;
	}
	else {
		for(i = 0; i < ls.length; i++) {
			var thingName = ls[i];
			if(thingName.toUpperCase() === args.toUpperCase()) {
				return i;
			}
		}
		return -1;
	}
};

/*
	PURPOSE: Allows player to inspect items in the room and if possible, add them to Player's collection
	SIDE EFFECTS: Adding items to Player's backpack
*/
function inspect(args) {
	var things = curRoom.items;
	var r1 = "There\'s nothing worth investigating here";
	var r2 = 'You see:';
	var index = tutor(args, things, r1, r2);
	if(index > -1) {
		let curItem = things[index];
		basicEcho(curItem.desc);
		if(curItem.roomItem) {
			basicEcho('-------------');
			curItem.use();
		}
		if(curItem.takeable) {
			basicEcho('You put the ' + curItem.name + ' into your bag for later.');
			player.addItem(curItem);
			things.splice(index, 1);
		}
	}
	else if(index > -2) {
		basicEcho(args + ' isn\'t in this room');
	}
};
/*
	PURPOSE: Use an item in your backpack
	SIDE EFFECTS: Whatever the item does, durability will drop by one and if it hits zero-item will be removed
*/
function use(args) {
	var things = player.backpack;
	var r1 = "There\'s nothing in your backpack";
	var r2 = "You rummage around and find: ";
	var index = tutor(args, things, r1, r2);
	if(index > -1) {
		var curItem = things[index];
        if(!curItem.isWeapon) {
            if(curItem.cond()) {
                curItem.use();
                curItem.durability--;
                if(curItem.durability <= 0){
					player.removeItem(curItem);
                }
            }
            else{
                basicEcho('That\'s not useful right now!');
            }
        }
        else {
            basicEcho('That\'s a weapon, not a usable item!');
        }
	}
	else if(index > -2) {
        basicEcho('You don\'t have any ' + args + ' in your backpack');
    }
};
/*
    PURPOSE: removes the first instance of a particular item from your backpack
*/
function drop(args) {
	var things = player.backpack;
	var r1 = 'There\'s nothing in your backpack to remove';
	var r2 = 'You rummage around and find: ';
	var index = tutor(args, things, r1, r2);
	if(index > -1) {
		var curItem = things[index];
		//things.splice(index, 1);
		player.removeItem(curItem);
        //attempt to drop item into room you're in
        curRoom.items.push(curItem)
        basicEcho('You dropped '+curItem.name+' from your backpack, hope you don\'t need it!');
	}
	else if(index > -2) {
		basicEcho('You don\'t have any ' +args+ ' in your backpack to drop');
	}
};

/*
    PURPOSE: Allows player to traverse between rooms, based on unique array of connections from curRoom
*/
function go(args) {
    if(curRoom.isLocked) {
    	basicEcho('You can\'t leave this room right now! You\'re trapped!');
    } else {
    	var options = curRoom.directions;
	    var places = curRoom.connections;
	    var r1 = "It would appear...there isn\'t anywhere to go from here";
	    var r2 = "You can go: ";
	    var index = tutor(args, options, r1, r2, false);
	    if(index > -1) {
	    	var place = places[index];
				loadRoom(place);
				basicEcho('You\'ve entered: '+place.name);
				basicEcho('');
	    	basicEcho(place.desc);
	    }
	    else if(index > -2) {
	    	basicEcho('To go '+args+' isn\'t an option in this room...');
	    }
    }
};

/* PURPOSE: Takes an item that is in your backpack and isWeapon and equips it to player
	SIDE-EFFECTS: Changes player character
*/
function equip(args) {
	var options = player.backpack.filter(item => item.isWeapon);
	//const result = words.filter(word => word.length > 6);
	var r1 = "There\'s nothing in your backpack to equip";
	var r2 = 'You are currently carrying these weapons: ';
	var index = tutor(args, options, r1, r2);
	if(index > -1) {
		var curItem = options[index];
        if(player.equip && curItem.name == player.equip.name.toUpperCase()){
            basicEcho('You already have that equipped!');
        }
        else {
            player.equipWeapon(curItem);
            basicEcho('You equipped the '+curItem.name);
        }				
	}
	else if(index > -2){
		basicEcho('You don\'t have any ' + args + ' in your arsenal');
	}
	
};
/* PURPOSE: Very simple combat where all attacks start with you, and you can run away at any time */
function attack(args) {
	var roomEnemies = curRoom.enemies;
	var r1 = 'There\'s nothing worth fighting here...';
	var r2 = 'The enemies you can make out from here are: ';
	var index = tutor(args, roomEnemies, r1, r2);
	if(index > -1) {
		var thisEnemy = roomEnemies[index];
		//strength of weapon + modifier based on player's sanity
		var attackPower = player.getAttackStrength();
		basicEcho('You attacked the '+thisEnemy.name+' for '+attackPower+' damage!');
		basicEcho('The '+thisEnemy.name+' attacked you for '+thisEnemy.attack+' damage!');				
		thisEnemy.health -= attackPower;
		player.health -= thisEnemy.attack;
		if(thisEnemy.health <= 0){
			basicEcho('You killed the '+thisEnemy.name+'!');
			thisEnemy.onKill && thisEnemy.onKill();
			roomEnemies.splice(i,1);
			//basic loot-dropping action...
			if(thisEnemy.loot) {
				//special case for if loot required
				if(thisEnemy.isReq) {
					lootDrop(thisEnemy.loot, 1);
				}
				else {
					lootDrop(thisEnemy.loot, 2);
				}							
			}
		}
	}
	else if(index > -2) {	
		basicEcho('There are no enemies by that name here');	
	}
};
//given an array of possible loot options from enemy, and odds of drop returns a loot if odds met
function lootDrop(possibilities, odds) {
	var numPos = possibilities.length;
	var chance = getRandomInt(1,odds);
	if(chance == 1 && numPos > 0) {
        var lootIndex = getRandomInt(1, numPos) - 1;
		var givenLoot = possibilities[lootIndex];
		player.backpack.push(givenLoot);
		basicEcho('Congratulations! You got a '+givenLoot.name+'!');
	}
}

//GAME FUNCTIONS - general purpose methods
/*
    =========================================================
    |     	Shop Actions - commands and functions           |
    =========================================================
*/
//PURPOSE: Generate Shop Interface
function buildShop(wares) {
	let interfaceWidth = 28;
	for(i = 0; i < wares.length; i++) {
		var spacing = "";
		var nameLength = wares[i][0].name.length;
		for(j = 0; j < (interfaceWidth - nameLength); j++) {
			spacing += "-";
		}
		basicEcho((wares[i][0].name + spacing + "$"+ wares[i][1]));
	}
	basicEcho('---');
	basicEcho('You have: $'+player.money);
};

//PURPOSE: See if Shop contains given input
function shopContains(input, wares) {
	var inputs = input.split(" ");
	shopItem = inputs[0];
	inputs.shift();
	rest = inputs;
	restLength = rest.length;
	for(i = 0; i < (restLength + 1); i++) {
		for(j = 0; j < wares.length; j++) {
			var ware = wares[j][0];
			if(shopItem.toUpperCase() === ware.name.toUpperCase()) {
				return j;
			}
		}
		shopItem = shopItem + " " + rest[0];
		rest.shift();
	}
	return -1;
};

//PURPOSE: Purchases good from store
function buyItem(args) {
	var itemIndex = shopContains(args, curShopWares);
	if(itemIndex > -1) {
		var ware = curShopWares[itemIndex];
		if(ware[1] <= player.money) {
			player.addItem(ware[0]);
			player.money -= ware[1];
			basicEcho('You receive '+ware[0].name);		
		}
		else {
			basicEcho("You can't afford that!");
		}
		basicEcho('"Anything else I can help you with?"');
		return 0;
	}
	basicEcho('"We don\'t carry that, try again!"');
};

//PURPOSE: Sells item from backpack for item value. 
//WARNING: Current implementation does not support buy-backs, but does support un-sellable items
function sellItem(args) {
	var itemIndex = player.hasItem(args);
	if(itemIndex > -1) {
		var curItem = player.backpack[itemIndex];
		if(curItem.value > 0) { //prevent selling of key items - make value below 0
			basicEcho(("You sold a " + curItem.name + " for $" + curItem.value));
			player.money += curItem.value;
			player.removeItem(curItem);
		}
		else {
			basicEcho("You can\'t sell that!");
		}
		basicEcho('"Anything else I can help you with?"');
	} else {
		basicEcho("You don\'t have one of those to sell!");
	}
};

//PURPOSE: Returns game to global scope and exits the shop
function leaveShop() {
	basicEcho("You leave the shop");
	scope = 'global';
	curShopWares = [];
};

/*
	PURPOSE: Return a random integer within the supplied range
*/
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.round(Math.random() * (max - min)) + min;
};

function loadCharacter() {
	console.log('call the function \'loadEnvironment\'');
	console.log('You need room, inventory[], name, health, money');
	console.log('THERE IS NO TYPE CHECKING SO KNOW WHAT YOU ARE DOING!');
};

function loadEnvironment(room, inventory, name, health, money) {
	loadRoom(room);
	player.name = name;
	player.backpack = inventory;
	player.health = health;
	player.money = money;
};
