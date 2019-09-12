class Monster {
    constructor(name,origin,weight,alignment){
        this.name = name;
        this.origin = origin;
        this.weight = weight;
        this.alignment = alignment;
    }
}



class Vampire extends Monster {
    constructor(name,origin,weight,alignment){
        super(name,origin,weight,alignment)
        this.kind = "Vampire";
    }
    syphonBlood() {
        console.log(name + "sucks the blood of an innocent victim in " + origin + "!");
    }
}

var MyVampire = new Vampire("Dracula","Transylvannia",120,"Evil");
MyVampire.syphonBlood();



class Werewolf extends Monster{
    constructor(name,origin,weight,alignment){
        super(name,origin,weight,alignment);
        this.kind = "Werewolf";
    }
    terrorizeVillage(){
        console.log(name + "terrorizes a village in " + origin + "!");
    }
}

var MyWErewolf = new Werewolf("Boris","Eastern Europe",230,"Neutral");
MyWerewolf.terrorizeVillage();