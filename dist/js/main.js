var Wheel = (function () {
    function Wheel(parent) {
        var car = parent;
        var wheelLeft = document.createElement("wheel");
        var wheelRight = document.createElement("wheel");
        car.appendChild(wheelLeft);
        car.appendChild(wheelRight);
        wheelLeft.style.transform = "translate(15px, 30px)";
        wheelRight.style.transform = "translate(100px, 30px)";
    }
    return Wheel;
}());
var Car = (function () {
    function Car() {
        var container = document.getElementById("container");
        this.div = document.createElement("car");
        container.appendChild(this.div);
        this.wheels = new Wheel(this.div);
        this.speed = 4;
        this.x = 0;
        this.y = 220;
        this.move();
    }
    Car.prototype.move = function () {
        if (this.braking == true) {
            this.speed *= 0.9;
            console.log(this.x);
        }
        if (this.x < 370) {
            this.x += this.speed;
        }
        if (this.x > 370) {
            this.speed = 0;
            Game.getInstance().endGame();
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Car.prototype.OnKeyPress = function (e) {
        var keyboard = window.event ? window.event : e;
        if (keyboard) {
            this.halted();
        }
    };
    Car.prototype.halted = function () {
        this.braking = true;
    };
    return Car;
}());
var Rock = (function () {
    function Rock(tag, parent) {
        var container = parent;
        var rock = document.createElement(tag);
        container.appendChild(rock);
        rock.style.transform = "translate(509px, 209px)";
        this.speed = 0;
        this.move();
    }
    Rock.prototype.move = function () {
    };
    return Rock;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        this.car = new Car();
        this.rock = new Rock("rock", container);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.move();
        this.rock.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        document.getElementById("score").innerHTML = "Score : 0";
        console.log("KAAABOEM");
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
//# sourceMappingURL=main.js.map