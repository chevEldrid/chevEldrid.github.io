//Adapted from original concept-snowfall: Dark Depths.
//I'd say spiritual successor...but really just a good ol' fashioned code smash n grab

/*
    =========================================================
    |           Specific Rooms and functions                |
    =========================================================
*/
// ||Starting Room - Your Apartment||

//Apartment specific functions
function startGame(term, args) {
	if(promptPos == 0) {
		hijack = true;
		basicEcho('After the Octopuses made contact with the Octopi...all bets were off. Humanity fell shortly after and anarchy reigned. You wake up, groggy, but functional. By the way...what\'s your name?', term);
		promptPos += 1;
	}
	else if(promptPos == 1) {
		createCharacter(args);
		basicEcho(args +' is it? Nice to meet you '+args+'. Your mission, to defeat the otherworldly opposition has now begun. If you\'re unsatisfied with your name choice, just type \'start\' again and it will reset.', term);
		basicEcho('', term);
		basicEcho(curRoom.desc, term);
		endHijack();
	}
};
//backstory TV
function watchTV(term) {
	basicEcho('There\'s a news blurb playing, something about the Oktopi...', term);
	basicEcho('"...WE\'VE FINALLY TRANSLATED THE INVADERS MISSION: TO SAVE THEIR OCTOPUS BRETHEREN..."', term);
	basicEcho("The broadcast goes on to mention the resistance effort in Boston and the fall of Los Angeles", term);
};

function firstRoomate(term) {
	basicEcho('"I mean, can\'t say I\'m surprised...the signs of an alien invasion were everywhere. I\'d do more but, my show is on. Mind picking up that sword and killing the tentacle outside? It\'s squishy..."', term);
}
//The Apartment itself
var yourApartment = {
	name:'Your Apartment',
	desc:'You stand in a relatively modern apartment, full of memerobilia that seems to have a lot to do with your life. This makes more sense than the monsters outside because, it is your apartment. In the corner a tv blathers on about the end of humanity while your roommate nervously chews their nails',
	items: [oldSword, fishFood()],
	actions: ['start', 'watch tv', 'talk to roomate'],
	effects: [startGame, watchTV, firstRoomate],
	directions: ['outside'],
	connections: [apartmentStreet],
	enemies: []
};

// ||Room 2 - Street Outside||
var apartmentStreet = {
	name: 'Ellis Ave',
	desc: 'Ellis Ave has fallen into disrepair: downed powerlines and burst pipes lend themselves well to a new adventure playground. A single tentacle looks up at you menacingly from the ground',
	items: [moldySandwich()],
	actions: [],
	effects: [],
	directions: ['inside', 'south', 'north'],
	connections: [yourApartment, apartmentTwoStreet, northernEllis],
	enemies:[tentacle()]
};
//unlimited calamari - this is on purpose
function talkPasserby(term) {
	basicEcho('"Woah, who ever knew the Calamari would strike back. Do you want some?"', term);
	player.backpack.push(calamari());
	basicEcho('You recieved CALAMARI', term);
}

// ||Room 3 - Down the Street||
var apartmentTwoStreet = {
	name: 'Ellis Ave South',
	desc: 'Where a proud and noble fast foot restaurant once stood-now only charred bricks remain. The Oktopi care not for fillet o\' fish. A passerby gawks.',
	items: [],
	actions:['talk to passerby'],
	effects:[talkPasserby],
	directions:['north', 'inside', 'south'],
	connections:[apartmentStreet, apartmentTwo, southernEllis],
	enemies: [tentacle()]
};

function apartmentNeighbor(term) {
	basicEcho('"I\'m sorry, but the fuck? This is my house? Could you have at least knocked like a normal person? Anyway, you look like you know what you\'re doing. Can you go kill the alien down the street? It\'s in front of the convenience store and I\'m out of ramen"', term);
}

// ||Room 4 - Neighboring Apartment||
var apartmentTwo = {
	name: 'Neighboring Apartment',
	desc: 'The Apocalypse has made you bold, as you have just broken into the apartment across the alley from your own. Your neighbor is not amused.',
	items:[milk(), fishFood()],
	actions:['talk to neighbor'],
	effects:[apartmentNeighbor],
	directions:['outside'],
	connections:[apartmentTwoStreet],
	enemies: []
};

// ||Room 5 - Southernmost Ellis
var southernEllis = {
	name: 'Ellis Ave End',
	desc: 'The end of the road. Literally. Below you can see the subway tracks and debris that must have collapsed in the first assault on the city. Some troops seem to still be in the area',
	items:[],
	actions:[],
	effects:[],
	directions:['north'],
	connections:[apartmentTwoStreet],
	enemies:[oktopiSouthFootSoldier]
};
//checks to see if your back contains 'Oktopi battle armor'. If it does, creates next connection 
function openPark(term){
	if(hasItem('Oktopi Battle Armor')){
		removeItem('Oktopi Battle Armor');
		basicEcho('"Woah! Real Battle Armor? Your destiny awaits beyond...but this shall be of no use to you on your journey. Allow me to take it off your hands and I will open the path forward."', term);
		northernEllis.directions.push('into park');
		northernEllis.connections.push(parkPath);
	}
	else{
		basicEcho('"You have not the object I seek. Come back with a true Oktopi artifact."', term);
	}
}

// ||Room 6 - Northernmost Ellis
var northernEllis = {
	name: 'Ellis Street North',
	desc: 'On the northern edge of Ellis, the road continues deeper into the heart of the city currently in an epic battle for its survival. Your gaze shifts towards the park and the strange man standing in front of the gate.',
	items:[],
	actions:['talk to man'],
	effects:[openPark],
	directions:['south'],
	connections:[apartmentStreet],
	enemies:[]
};

function talkToProfessor(term) {
	basicEcho('"Ah shit, I just had this dry-cleaned. Hey, pick up that stop sign over there and clean out the park will ya? I\'ll take the rest of the street there."', term);
}
// ||Room 7 - Park Path
var parkPath = {
	name:'Park Path',
	desc:'The path into the park is studded with gravel and discarded groceries. A nearby Professor lets out a gutteral yell before skewering an Oktopi soldier up to the hilt on her katana.',
	items:[deepDish(), stopSign()],
	actions:['talk to professor'],
	effects:[talkToProfessor],
	directions:['to exit', 'through park gate'],
	connections:[northernEllis, parkEntrance],
	enemies:[]
};
//attempt to render a map
function readParkMap(term) {
	basicEcho('The sign reads: "You are at the star"\n|    [x]--[x]\n|    /    /\n|--[*]  [x]\n|    \\    \\\n|    [x]--[x]--', term);
}

// ||Room 8 - Park Entrance
var parkEntrance = {
	name: 'Park Entrance',
	desc: 'As you step into the park, the changes are noticable right away. All the statues have had four extra arms grafted on and lakes are overflowing their manacured sides. A sign with a map of the park stands in front of you.',
	items: [longIsland()],
	actions:['read the sign'],
	effects:[readParkMap],
	directions:['back', 'north', 'south'],
	connections:[parkPath, parkNorth, parkSouth],
	enemies:[tentacle(), oktopiFootSoldier()]
};

//Let's try and build a store...
function openShop(term, args) {
    var cmd = args.toUpperCase();
	if(promptPos == 0) {
		hijack = true;
		basicEcho('"How-how did you see me? No matter, welcome to the best shop you\'re going to find out here. Browse my wares? Type either the name of the good you want to buy or type \'leave\' to exit the shop and continue on your travels"', term);
		basicEcho('milk------------------------1 fish food\nBook of Squidward-----------1 fish food\nHalf a Key------------------1 fish food', term);
		promptPos += 1;
	}
	else if(promptPos == 1) {
		if(cmd == 'LEAVE'){
			basicEcho('Thanks for stopping by!', term);
			endHijack();
		}
		else if(cmd == 'MILK') {
			shopPurchase(milk(), term);
		}
		else if(cmd == 'BOOK OF SQUIDWARD') {
			shopPurchase(bookOfSquidward(),term);
		}
		else if(cmd == 'HALF A KEY') {
			shopPurchase(halfAKey(), term);
		}
		else {
			basicEcho('"Whoah I don\'t think we\'ve ever stocked that...Or if we did it was with different capitalization', term);
			basicEcho('"Anything else I can help you with?"', term);
		}
	}
};
//helper method to check and make sure player has fishfood. if they do, take one and give item
function shopPurchase(item, term) {
	var canpay = hasItem('Fish Food');
	basicEcho('"'+item.name+'? Fine choice!"', term);
	if(canpay) {
		player.backpack.push(item);
		removeItem('Fish Food');
		basicEcho('You hand over one Fish Food can and receive '+item.name, term);
		basicEcho('"Anything else I can help you with?"', term);
	}
	else {
		basicEcho('"...but you can\'t pay! come back with more fish food!"', term);
	}
}

// ||Room 9 - Northern Corner
var parkNorth = {
	name:'Northern Corner of the Park',
	desc:'The land is marshy, all the hoses have been turned on and are seeping into the soil at record amounts. When all this is over, the Oktopi are going to have one hell of a water bill...an Oktopi merchant can be seen using its camoflauge to try and be a tree.',
	items: [],
	actions: ['talk to merchant'],
	effects: [openShop],
	directions:['south', 'east'],
	connections:[parkEntrance, parkEast],
	enemies:[]
};
//the most complex interaction in game to date: depending on what keys you have and state of Och Ness Monster 
function unlockGate(term, args) {
	var hasKeyOne = hasItem('Half a Key');
	var hasKeyTwo = hasItem('Other half of a Key');
    var hasKeyThree = hasItem('Och Key');
    var hasEnemyAppeared = parkEast.enemyAppeared;
    //you have the two key parts and the monster has not emerged
	if(hasKeyOne && hasKeyTwo && !hasKeyThree && !hasEnemyAppeared) {
		basicEcho('Something dark stirs in the lake...A splash takes you by surprise. Not a small splash. A big one. There\'s a really big creature now standing between you and the gate', term);
        parkEast.enemies.push(ochNessMonster());
        parkEast.enemyAppeared = true;
    }
    //the monster has now emerged (to prevent from two monsters showing up)
    else if(hasKeyOne && hasKeyTwo && !hasKeyThree  && hasEnemyAppeared) {
        basicEcho('You make a move for the gate, but a massive tentacle blocks your path', term);
    }
    //attempting to unlock the gate with no key
    else if(!hasKeyOne && !hasKeyTwo) {
        basicEcho('You go to open the gate...but notice a key-hole you don\'t have a key for', term);
    }
    //attempting to unlock the gate with half a key
	else if((hasKeyOne && !hasKeyTwo) || (!hasKeyOne && hasKeyTwo)) {
		basicEcho('You\'re missing half the key! Come back with more of it', term);
    }
    //once the monster is defeated and you have the whole key...
    else if(hasKeyOne && hasKeyTwo && hasKeyThree) {
        basicEcho('With a last gutteral yell, the creature slips defeated deep into the murky water. You unlock the gate, revealing a new path.', term);
		parkEast.connections.push(treasureTrove);
		parkEast.directions.push('to gated area');
		removeItem('Half a Key');
		removeItem('Other half of a Key');
		removeItem('Och Key');
	}
}

// ||Room 10 - Eastern Corner
var parkEast = {
	name:'Eastern Corner of the Park',
	desc:'What was once a beautiful pond feature with high banks and a dazzling sprinkler in the summer time...has been transformed into a deep and murky lake. Even the Oktopi don\'t come here-the shuttle containing their dangerous beasts crashed shortly before they arrived. A locked gate beckons.',
	items:[],
	actions: ['unlock gate'],
	effects: [unlockGate],
	directions:['west'],
	connections:[parkNorth],
    enemies:[],
    //okay let's try with a custom variable
    enemyAppeared:false
};

// ||Room 11 - Treasure Trove
var treasureTrove = {
	name:'Treasure Trove',
	desc:'It would appear as if the monster was hoarding something...or lots of somethings',
	items:[deepDish(), oswaldTape(), meanWords()],
	actions: [],
	effects: [],
	directions:['east', 'south'],
	connections:[parkEast, exitPark],
	enemies:[]
};

function talkToCleric(term, args) {
	if(promptPos == 0) {
		basicEcho('"And thus, the Flying Spaghetti Monster spoke \'Forget not your failings, bretheren, for they will undue you\'. Hello traveler, if you\'d like I can upgrade your currently equipped weapon with Oswald Tape if you type \'upgrade\', or \'leave\' to leave."', term);
		hijack = true;
		promptPos += 1;
	}
	else if(promptPos == 1){
		if(args.toUpperCase() == 'UPGRADE') {
			if(hasItem('Oswald\'s Tape')) {
				basicEcho('"Oh marvelous! just one moment..."', term);
				removeItem('Oswald\'s Tape');
				player.equip.strength += 5;
				basicEcho('Your '+player.equip.name+' has had its strength upgraded by five', term);
				basicEcho('Here you go! Now be off', term);
				endHijack();
			}
			else {
				basicEcho('"I like the enthusiasm, but come back with tape!"', term);
			}
		}
		else if(args.toUpperCase() == 'LEAVE') {
			basicEcho('"Very well, be off!"', term);
			endHijack();
		}
		else {
			basicEcho('"What you said makes no sense to me...try saying something else"', term);
		}
	}
}

// ||Room 12 - Southern Corner
var parkSouth = {
	name:'Southern Corner of the Park',
	desc:'A relatively untouched gazebo sits amidst a field of marsh flowers, some body parts littered throughout. An Oktopi Cleric sits within the wooden hut.',
	items:[mysteryMeat(), otherHalfKey(), fishFood()],
	actions: ['talk to cleric'],
	effects: [talkToCleric],
	enemies:[oktopiFootSoldier()],
	directions:['north', 'east'],
	connections:[parkEntrance, parkExit]
};

function exitPark(term){
    if(curRoom.enemies.length > 0) {
        basicEcho('You make a move towards the exit, but a very large creature that resembles a Cthulu on steroids blocks your path with a meaty tentacle', term);
    }
    else {
        basicEcho('The heavy having been defeated, a path opens to the altar...', term);
        parkExit.directions.push('to altar steps');
        parkExit.connections.push(altarSteps);
    }
}

// ||Room 13 - Park Exit
var parkExit = {
    name:'Park Exit',
    desc: 'The once proud park exit into the greater Chicago metropolitan area now stands as a testament to how quickly the Oktopi picked up on the idea of "graffeti"',
    items:[],
    actions:['exit park'],
    effects:[exitPark],
    enemies:[oktopiHeavy()],
    directions:['west'],
    connections:[parkSouth]
};

var altarSteps = {
    name: 'Steps of the Altar',
    desc:'So funny story...this room is actually kind of under construction...so it\'s not actually finished yet. I hope you enjoyed the journey so far!',
    items:[milk()],
    actions:[],
    effects:[],
    enemies:[],
    directions:['back to park'],
    connections:[parkExit]
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
    loadRoom(yourApartment);
    //loadRoom(parkEast);
	//Creates a generic character
    createTemplateCharacter();
    //createKCodeCharacter();
	//loads room connections
	loadRoomConnections();
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = "https://github.com/chevEldrid/chevEldrid.github.io/blob/master/js/main.js";
    } else {
		//this holds the interpreter function...where we figure out what to do with the text
		$('#term').terminal(function(input) {
			//"If you're currently not dead..."
			if(player.health > 0) {
				//"If you are currently not in the middle of doing something else..."
				if(!hijack) {
					//TO PUT SOME SPACE IN THE TERMINAL AND BREAK IT UP A LITTLE
					this.echo(' ');
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
			}
			else {
				this.echo('Well, you\'re dead. That kinda blows. Press [F5] to try again!', {keepWords: true});
			}
		}, {
		//this is the second: descriptors
        greetings: 'Welcome to Dark Depths! Type "start" to begin!',
        prompt: '> '
    });
    }
});

