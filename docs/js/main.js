var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, x, y, height, width) {
        this.createDiv(tag, x, y, height, width);
    }
    GameObject.prototype.createDiv = function (tag, x, y, height, width) {
        this.div = document.createElement(tag);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    return GameObject;
}());
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(parent, x, y) {
        var _this = _super.call(this, "wheel", x, y, 22, 22) || this;
        var car = parent;
        car.appendChild(_this.div);
        _this.div.style.transform = "translate(" + _this.x + "px, " + _this.y + "px)";
        return _this;
    }
    return Wheel;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(g, i, color) {
        var _this = _super.call(this, "car", 0, 220, 45, 145) || this;
        var container = document.getElementById("container");
        container.appendChild(_this.div);
        _this.wheelsLeft = new Wheel(_this.div, 15, 30);
        _this.wheelsRight = new Wheel(_this.div, 100, 30);
        _this.speed = 2 + (Math.random() * 2);
        _this.y = i * (_this.height + 27);
        switch (color) {
            case "geel":
                _this.div.style.filter = 'hue-rotate(20deg)';
                break;
            case "groen":
                _this.div.style.filter = 'hue-rotate(40deg)';
                break;
            case "blauw":
                _this.div.style.filter = 'hue-rotate(140deg)';
                break;
            case "roze":
                _this.div.style.filter = 'hue-rotate(250deg)';
                break;
            case "paars":
                _this.div.style.filter = 'hue-rotate(200deg)';
                break;
        }
        _this.game = g;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        _this.move();
        return _this;
    }
    Car.prototype.move = function () {
        if (this.x < window.innerWidth) {
            this.x += this.speed;
        }
        if (this.braking == true) {
            this.speed *= 0.98;
            var score = Math.floor(this.x);
            document.getElementById("score").innerHTML = "Score : " + score;
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Car.prototype.hitDetection = function (r) {
        if (!this.crashed) {
            this.game.carCrashed(this.speed, r);
            this.stop();
        }
        this.crashed = true;
    };
    Car.prototype.stop = function () {
        this.speed = 0;
        Game.getInstance().endGame();
    };
    Car.prototype.onKeyDown = function (e) {
        if (e.keyCode) {
            this.halted();
            console.log("PUSHED");
        }
    };
    Car.prototype.halted = function () {
        this.braking = true;
    };
    return Car;
}(GameObject));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(i) {
        var _this = _super.call(this, 'rock', 509, 209, 62, 62) || this;
        _this._speed = 4;
        _this.g = 0;
        var container = document.getElementById('container');
        container.appendChild(_this.div);
        _this.y = i * (_this.height + 10);
        _this.x = 400 + (Math.random() * 150);
        _this._speed = 0;
        _this.move();
        return _this;
    }
    Rock.prototype.move = function () {
        this.x += this._speed;
        this.y += this.g;
        this._speed *= 0.98;
        if (this.y + 62 > document.getElementById('container').clientHeight) {
            this._speed = 0;
            this.g = 0;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.x + "deg)";
    };
    Rock.prototype.crashed = function (carSpeed) {
        this._speed = carSpeed;
        this.g = 9.81;
    };
    return Rock;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        this.cars = new Array();
        this.rocks = new Array();
        var colors = ["geel", "groen", "blauw", "roze", "paars"];
        var numCars = Math.floor(Math.random() * 8) + 1;
        for (var i = 0; i < numCars; i++) {
            var colorIndex = Math.floor(Math.random() * 5);
            var color = colors[colorIndex];
            this.cars.push(new Car(this, i, color));
        }
        var numRocks = Math.floor(Math.random() * 8) + 1;
        for (var i = 0; i < numRocks; i++) {
            this.rocks.push(new Rock(i));
        }
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
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            car.move();
        }
        for (var _b = 0, _c = this.rocks; _b < _c.length; _b++) {
            var rock = _c[_b];
            rock.move();
        }
        for (var _d = 0, _e = this.cars; _d < _e.length; _d++) {
            var car = _e[_d];
            for (var _f = 0, _g = this.rocks; _f < _g.length; _f++) {
                var rock = _g[_f];
                if (Util.checkCollision(car, rock)) {
                    rock.move();
                    car.hitDetection(rock);
                }
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        document.getElementById("score").innerHTML = "Score : 0";
    };
    Game.prototype.carCrashed = function (carSpeed, r) {
        r.crashed(carSpeed);
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (g1, g2) {
        if (g1.x < g2.x + g2.width &&
            g1.x + g1.width > g2.x &&
            g1.y < g2.y + g2.height &&
            g1.height + g1.y > g2.y) {
            return true;
        }
    };
    return Util;
}());
//# sourceMappingURL=main.js.map