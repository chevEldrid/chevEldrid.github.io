/*
    @name:String        name of Player
    @backpack:Array<Item> a list of carried items
	@sanity:Int			total sanity of player
    @health:Int			total health of player
    @money:Int          total money of player
	@equip:Item			Current Item equipped by player to attack
*/
class Player {
    constructor(name, backpack, sanity, health, money, equip) {
        this.name = name;
        this.backpack = backpack;
		this.sanity = sanity;
        this.health = health;
        this.money = money;
		this.equip = equip;
    }

    //PURPOSE: Checks if this player has a weapon equipped
    isEquipped() {
        return this.equip;
    }

    //PURPOSE: Equips a weapon to this player
    equipWeapon(weapon) {
        this.equip = weapon;
    }
    /*
	PURPOSE: Adds modifier to equipped weapon attack based on player's current sanity, attack is 1 if no weapon equipped
    */
    getAttackStrength() {
        if(this.isEquipped()) {
            var baseStrength = this.equip.strength;
            var totalPower = 0;
            if(this.sanity < 30) {
                totalPower = getRandomInt(Math.floor(baseStrength * 0.5), baseStrength);
            }
            else if(this.sanity < 60){
                totalPower = getRandomInt(Math.floor(baseStrength * 0.7), baseStrength);
            }
            else if(this.sanity < 99){
                totalPower = baseStrength;
            }else {
                totalPower = getRandomInt(baseStrength, Math.ceil(baseStrength * 1.2));
            }
            return totalPower;
        }
        else {
            return 1;
        }  
    }
    //PURPOSE: Checks if backpack contains a particular item name, returns index
    hasItem(itemName) {
        for(i = 0; i < this.backpack.length; i++) {
            if(this.backpack[i].name.toUpperCase() === itemName.toUpperCase()) {
                return i;
            }
        }
        return -1;
    }

    //PURPOSE: Adds Item to player's backpack
    addItem(item) {
        this.backpack.push(item);
    }
    
    /*
        PURPOSE: Removes first occurance of named item from backpack, returning index
        SIDE EFFECTS: If item found, removed from backpack
    */
    removeItem(item) {
       let index = this.hasItem(item.name);
        if(index > -1) {
            this.backpack.splice(index, 1);
        }
        return index;
    }

    //PURPOSE: String of relevant player statistics
    playerStats() {
        var temp = "";
        temp += ('CURRENT STATS FOR: ' + this.name +'\n SANITY: ' + this.sanity + '\n HEALTH: ' + this.health + '\n MONEY: ' + this.money + '\n BACKPACK CONTAINS: \n');
        if(this.backpack.length < 1) {
            temp+="  nothing\n";
        }
        else {
            for(i = 0; i < this.backpack.length; i++) {
                temp+=("  " + this.backpack[i].name + '\n');
            }
        }
        temp+=('------\n');
        if(this.isEquipped()){
            temp+=(this.equip.name + ' is currently equipped');
        }
        else{
            temp+=('You currently have no weapon equipped');
        }
        return temp;
    }
};

/*
	PURPOSE: returns a basic player with starting values for health and sanity
*/
function createCharacter(playerName) {
	return new Player(
        playerName,
        [],
        50,
        50,
        10,
        null
    );
};

function createTemplateCharacter() {
	return new Player(
        "Nobody",
        [],
        50,
        50,
        10,
        null
    );
};
function createKCodeCharacter() {
    return new Player(
        "Hax0r",
        [],
        100,
        100,
        100,
        null
    );
};