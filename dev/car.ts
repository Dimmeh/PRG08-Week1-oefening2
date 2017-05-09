/// <reference path="wheel.ts"/>

class Car {

    private speed:number;
    private div:HTMLElement;
    private braking:boolean;
    private wheels: Wheel;
    private x: number;
    private y: number;
   // private game:Game;
            
    constructor() {
        // het DOM element waar de div in geplaatst wordt:
        let container:HTMLElement = document.getElementById("container");
       // this.game = Game.getInstance();

        this.div = document.createElement("car");
        container.appendChild(this.div);
        this.wheels = new Wheel(this.div);
        this.speed = 4;

        this.x = 0;
        this.y = 220;

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        //

        // alvast goed zetten

        this.move();
    }

    public move():void {
        // hier de snelheid verlagen als we aan het afremmen zijn
        //

        // hier kijken of de x waarde hoger is dan de x van de rots (335)
        //
        if(this.braking == true){
            this.speed *= 0.9;
            console.log(this.x);
        }
        if(this.x < 370){
            this.x += this.speed;
        }

        if(this.x > 370){
            this.speed = 0;
            Game.getInstance().endGame();
        }

        // tekenen
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

    private OnKeyPress(e){
        let keyboard = window.event ? window.event : e;

        if(keyboard){
            this.halted();
        }
    }

    private halted(){
        this.braking = true;
    }
    //
    // hier een method maken voor on key press
    //
}

//
// window.addEventListener("keypress", function(){
//     Car.braking()
// });

