/// <reference path="wheel.ts"/>
/// <reference path="gameObject.ts"/>

class Car extends GameObject{

    private speed:number;
    private braking:boolean;
    private wheelsLeft: Wheel;
    private wheelsRight: Wheel;
    private crashed: boolean ;
    private game: Game;

    constructor(g:Game, i:number, color:string) {
        super("car", 0, 220, 45, 145);
        // het DOM element waar de div in geplaatst wordt:
        let container:HTMLElement = document.getElementById("container");

        container.appendChild(this.div);
        this.wheelsLeft = new Wheel(this.div, 15, 30);
        this.wheelsRight = new Wheel(this.div, 100, 30);
        this.speed = 2 + (Math.random() * 2);
        this.y = i * (this.height + 27);

        switch (color){
            case "geel":
                this.div.style.filter = 'hue-rotate(20deg)';
                break;
            case "groen":
                this.div.style.filter = 'hue-rotate(40deg)';
                break;
            case "blauw":
                this.div.style.filter = 'hue-rotate(140deg)';
                break;
            case "roze":
                this.div.style.filter = 'hue-rotate(250deg)';
                break;
            case "paars":
                this.div.style.filter = 'hue-rotate(200deg)';
                break;
        }

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

        if(this.x < window.innerWidth){
            this.x += this.speed;
        }

        if(this.braking == true){
            this.speed *= 0.98;
            let score = Math.floor(this.x);
            document.getElementById("score").innerHTML = "Score : " + score;
        }

        // hier kijken of de x waarde hoger is dan de x van de rots (335)
        //
        // tekenen
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

    public hitDetection(r:Rock){
        if(!this.crashed){
            this.game.carCrashed(this.speed, r);
            this.stop();
        }
        this.crashed = true;
    }

    //
    // hier een method maken voor on key press
    //

    public stop(){
        this.speed = 0;
        Game.getInstance().endGame();
    }

    private onKeyDown(e){
        if(e.keyCode){
            this.halted();
            console.log("PUSHED")
        }
    }

    private halted(){
        this.braking = true;
    }
}