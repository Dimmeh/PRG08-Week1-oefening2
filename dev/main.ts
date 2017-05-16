/// <reference path="car.ts"/>
/// <reference path="rock.ts"/>

class Game {

    private cars: Array<Car>;
    private rocks: Array<Rock>;
    private static instance : Game;

    constructor() {
        let container = document.getElementById("container");
        this.cars = new Array<Car>();
        this.rocks = new Array<Rock>();

        let colors = ["geel", "groen", "blauw", "roze", "paars"];
        let numCars =  Math.floor(Math.random() * 8) + 1;

        for(let i = 0; i < numCars ; i++){
            let colorIndex = Math.floor(Math.random() * 5);
            let color = colors[colorIndex];
            this.cars.push(new Car(this, i, color));
        }

        let numRocks =  Math.floor(Math.random() * 8) + 1;

        for(let i = 0; i < numRocks ; i++){
            this.rocks.push(new Rock(i));
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop(){
        // van elke car de move aanspreken

         for(let car of this.cars){
            car.move()
         }

         for(let rock of this.rocks){
            rock.move()
         }

        for(let car of this.cars){
             for(let rock of this.rocks){
                 if(Util.checkCollision(car, rock)){
                     rock.move();
                     car.hitDetection(rock);
                 }
             }

        }

        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame(){
        document.getElementById("score").innerHTML = "Score : 0";
    }

    public carCrashed(carSpeed:number, r:Rock){
        r.crashed(carSpeed);
    }
} 


// load
window.addEventListener("load", function() {
    let g:Game = Game.getInstance();
});