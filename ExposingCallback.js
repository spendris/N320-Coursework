class Trigger {
    constructor(){
        this.state = "idle";
    }

    pullTrigger() {
        this.state = "pulled"
        if(this.state = "pulled") {
            this.activatedCallback();
        }
    }
}

class Gun {
    constructor(triggerInstance){
        triggerInstance.activatedCallback = this.fire;
    }

    fire() {
        console.log("Bang!");
    }
}
