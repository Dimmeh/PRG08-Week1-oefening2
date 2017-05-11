/// <reference path="wheel.ts"/>
/// <reference path="gameObject.ts"/>

class Car extends GameObject{

    private speed:number;
    private braking:boolean;
    private wheelsLeft: Wheel;
    private wheelsRight: Wheel;
    private crashed: boolean ;
    private game: Game;

    constructor(g:Game) {
        super("car", 0, 220, 45, 145);
        // het DOM element waar de div in geplaatst wordt:
        let container:HTMLElement = document.getElementById("container");

        container.appendChild(this.div);
        this.wheelsLeft = new Wheel(this.div, 15, 30);
        this.wheelsRight = new Wheel(this.div, 100, 30);
        this.speed = 4;

        this.game = g;

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        //
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));

        // alvast goed zetten

        this.move();
    }

    public move():void {
        // hier de snelheid verlagen als we aan het afremmen zijn
        //

        if(this.braking == true){
            this.speed *= 0.98;
            let score = Math.floor(this.x);
            document.getElementById("score").innerHTML = "Score : " + score;
        }

        // hier kijken of de x waarde hoger is dan de x van de rots (335)
        //

        if(this.x < 370){
            this.x += this.speed;
        }

        if(this.x > 370){
            if(!this.crashed){
                this.game.carCrashed(this.speed);
                this.stop();
            }
            this.crashed = true;
        }

        // tekenen
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

    //
    // hier een method maken voor on key press
    //

    private stop(){
        this.speed = 0;
        Game.getInstance().endGame();
    }

    private onKeyDown(e){
        if(e.keyCode){
            this.halted();
        }
    }

    private halted(){
        this.braking = true;
    }
}