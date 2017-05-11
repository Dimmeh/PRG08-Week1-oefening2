/// <reference path="car.ts"/>
/// <reference path="rock.ts"/>

class Game {

    private car : Car;
    //private cars: Array<Car>;
    //private rocks: Array<Rock>;
    private rock : Rock;
    private static instance : Game;

    constructor() {
        let container = document.getElementById("container");
        this.car = new Car(this);
        //this.cars = new Array<Car>();
        //this.rocks = new Array<Rock>();
        // let numCars =  Math.floor(Math.random() * 8) + 1;

        /*for(let i = 0; i < numCars ; i++){
            this.cars.push(new Car(container));
        }*/

        // let numRocks =  Math.floor(Math.random() * 8) + 1;

        /*for(let i = 0; i < numRocks ; i++){
            this.cars.push(new Rock(container));
        }*/
        this.rock = new Rock(this.car);
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
    /*
     * for(let car of this.cars){
        car.move()
     }
       */

        // if(Util.checkCollision(this.car, this.rock)){
        //     console.log("Hit");
        //     this.rock.move();
        // }

    /*for(car){for(rock){
    * if(Util.checkCollision(car, rock)){
    *   //this.car.stop();
    *   //this.gameOver(0);
    * }}}
    *
    * */

        this.car.move();
        this.rock.move();
        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame(){
        document.getElementById("score").innerHTML = "Score : 0";
    }

    public carCrashed(carSpeed:number){
        this.rock.crashed(carSpeed);
    }
} 


// load
window.addEventListener("load", function() {
    let g:Game = Game.getInstance();
});