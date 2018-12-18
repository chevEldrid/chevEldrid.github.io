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
function unlockGate(term) {
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
		if(parkEast.connections.length < 2) {
			parkEast.connections.push(treasureTrove);
			parkEast.directions.push('to gated area');
			removeItem('Half a Key');
			removeItem('Other half of a Key');
			removeItem('Och Key');
		}
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
		basicEcho('FINAL WORD OF WARNING: You have reached the Endgame. To proceed up the altar steps means no turning back. Make your peace with that.', term);
		if(parkExit.connections.length < 2) {
			parkExit.directions.push('to altar steps');
        	parkExit.connections.push(altarSteps);
		}
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

function battleSwordsman(term) {
	if(altarSteps.enemies.length == 0 && !altarSteps.bossAppeared) {
		basicEcho('With a roar, the four wounded arms are discarded and The Swordsman rushes forward', term);
		altarSteps.bossAppeared = true;
		enemies.push(swordsman);
	}
	else if(altarSteps.enemies.length == 0 && altarSteps.bossAppeared) {
		basicEcho('With The Swordsman vanquished, the path into the cathedral opens...', term);
		if(altarSteps.connections.length < 1) {
			altarSteps.directions.push('into cathedral');
			altarSteps.connections.push(cathedral);
		}
	}
	else {
		basicEcho('You dive for the door but find the path blocked by enemies', term);
	}
}

function talkToSwordsman(term) {
	if(altarSteps.enemies.length < 1 && altarSteps.bossAppeared) {
		basicEcho('You find the Swordsman pretty incapbale of converstaion at the current point in time', term);
	}
	else {
		basicEcho('"You have done well for a human, but your life has reached its pre-destined conclusion. We knew you would come, ' + player.name + ', the Philospher foretold it. So I have been dispatched to keep you at bay. You shall not pass farther into this holy ground. My blades and I are determined to keep you where you stand."', term);
	}
}
// ||Room 14 - Altar Steps
var altarSteps = {
    name: 'Steps of the Altar',
	desc: 'The steps give way to large stone plateau surrounded by ornate corinthian columns. Sounds reminiscent of nails on a chalkboard cry in unison as four great broadswords chisel their way towards you: each in the arm of a heavily armored Oktopi Warrior. It stands before you with an air of indifference, barring passage to the cathedral beyond.',
	items:[milk()],
    actions:['enter cathedral', 'talk to swordsman'],
    effects:[battleSwordsman, talkToSwordsman],
    enemies:[broadSwordA(), broadSwordB(), broadSwordC(), broadSwordD()],
    directions:[],
	connections:[],
	bossAppeared: false
};

function talkToPhilosopher(term, args) {
	if(promptPos == 0) {
		basicEcho('"Greetings, greetings '+player.name+', I\'ve been expecting you. Tell me, what do you seek here?"', term);
		hijack = true;
		promptPos++;
	}
	else if(promptPos == 1) {
		philosopherWords.push(args);
		basicEcho('"Mmm yes, and what has been your most efficient method of getting what you want so far?"', term);
		promptPos++;
	}
	else if(promptPos == 2) {
		philosopherWords.push(args);
		basicEcho('"Now, here\'s a fun one if you\'ll indulge me: What makes us able to conquor you like you conquored our cousins on this blue marble?"', term);
		promptPos++;
	}
	else if(promptPos == 3) {
		philosopherWords.push(args);
		basicEcho('"Thank you, I believe that\'s quite enough to get a good idea of your character.', term);
		//first response
		basicEcho('You\'ve decided that more than anything in the world. You want ' + philosopherWords[0], term);
		//second
		basicEcho('You might even do it by '+philosopherWords[1], term);
		//third
		basicEcho('And you think we can conquor you because we\'re just your superiors in every way. Is this your creed?" [y/n]', term);
		promptPos++;
	}
	else if(promptPos == 4) {
		var result = args.toUpperCase();
		if(result[0] == 'Y') {
			basicEcho('"Ah brilliant, brilliant! I can get behind someone with ideals like these. You may proceed to the antichamber"', term);
			if(cathedral.connections.length < 1) {
				cathedral.directions.push('to garden');
				cathedral.connections.push(garden);
			}
		}
		else {
			basicEcho('Well, now you\'ve just wasted my time. Come back when you\'re ready to talk...until then..." The Oktopi throws his chalice at your face, bruising you. You lose 10 life before it grabs another glass.', term);
			player.health -= 10;
		}
		endHijack();
	}
}

// ||Room 15 - Cathedral
var cathedral = {
	name: 'The Cathedral',
	desc: 'The air wafting in from the deep, dark halls begins to smell of brine and the sea. While this building does resemble a cathedral, there is a decidedly alien twist on the design. You continue to walk and eventually reach a small pool, teeming with fish and a lone Oktopi in the middle drinking heavily from a stone chalice.',
	items: [longIsland()],
	actions: ['talk to Oktopi'],
	effects: [talkToPhilosopher],
	enemies:[],
	directions:[],
	connections:[]
};
function maskOn(term) {
	basicEcho('You decide to trust the little fella and put the mask on. It waves at you before swimming speedily away...you start to feel sick...head pounding and stomach groaning with pain...but, it passes. Maybe you should lay off the moldy sandwiches?', term);
	if(garden.directions.length < 1) {
		basicEcho('A new path opens up. A path to the Throne Room', term);
		garden.directions.push('to Throne Room');
		garden.connections.push(throneRoom);
	}
}

function swimSurface(term) {
	basicEcho('You throw the mask into the depths and make a triumphant attempt to reach the surface. You don\'t need handouts...', term);
	if(player.health <= 50) {
		basicEcho('...but you should have taken the mask. Try as you might, you just can\'t reach the top and the depths swallow you. You are dead.', term);
		player.health = 0;
	}
	else {
		basicEcho('This time, you had the strength. After a long and arduous swim you make it: but at a heavy cost. You\'ve lost 50 health', term);
		player.health -= 50;
		if(garden.directions.length < 1) {
			basicEcho('A new path opens up. A path to the Throne Room', term);
			garden.directions.push('to Throne Room');
			garden.connections.push(throneRoom);
		}
	}
}
// ||Room 16 - The Garden
var garden = {
	name: 'The Garden',
	desc: 'The garden is unlike any you have ever seen. For starters, it\'s all underwater and you\'re unable to breath until a friendly creature swims by and gives you a mask. Sadly however, this eight-legged life form did not have time to study english before coming to Earth and therefore cannot tell you whether or not the mask will help or hurt you. Your choices are: [swim to surface] - take your chances without the mask? or [put on mask] - accept the gracious offering from your new friend?',
	items: [],
	actions: ['swim to surface', 'put on mask'],
	effects: [swimSurface, maskOn],
	enemies: [],
	directions: [],
	connections:[]
};

function timeWarp(term) {
	if(throneRoom.enemies.length < 1) {
		basicEcho('The Monarch having been dealt with, you head back to your apartment for some R&R. Everything in the game is how you left it-this is more just for kicks.', term);
		loadRoom(yourApartment);
	}
	else {
		basicEcho('The Monarch has a strict no warping policy. I don\'t make the rules', term);
	}
}

function instaDeath(term) {
	basicEcho('Squidward is one of the closest things the Oktopi have to a role model down here on earth (No, they don\'t know he\'s a squid) and the Monarch finds your impersonation highly insulting. You are smooshed like pancake.', term);
	player.health = 0;
}

// ||Room 17 - The Throne Room
var throneRoom = {
	name: 'Throne Room',
	desc: 'A magnificent amphitheater complete with regal depictions of proud and noble Oktopi. Their battles, the creation of their culture, and the crash-landing of the octopuses on Earth. Apparently that was a time of great peril for the Oktopi...The monarch stands before you. It makes its intentions known through a large bellow-but does not approach.',
	items: [deepDish(), milk(), bobRossTape()],
	actions: ['warp to beginning', 'impersonate squidward'],
	effects: [timeWarp, instaDeath],
	enemies: [oktopiMonarch()],
	directions: [],
	connections: []
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
    //loadRoom(cathedral);
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

