/// <reference path="car.ts"/>
/// <reference path="rock.ts"/>

class Game {

    private car : Car;
    private rock : Rock;
    private static instance : Game;

    constructor() {
        let container = document.getElementById("container");
        this.car = new Car();
        this.rock = new Rock("rock", container);
        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop(){
        this.car.move();
        this.rock.move();
        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame(){
        document.getElementById("score").innerHTML = "Score : 0";
        console.log("KAAABOEM");
    }
} 


// load
window.addEventListener("load", function() {
    let g:Game = Game.getInstance();
});