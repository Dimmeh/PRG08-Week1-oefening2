///<reference path="gameObject.ts"/>

class Rock extends GameObject{

    private _speed:number;
    private car: Car;

    private g : number = 0;
    //
    // public set speed(s:number){
    //     this._speed = s;
    //     console.log("THIS SPEED IS: " + this._speed);
    // }

    constructor(c: Car) {
        super('rock', 509, 209, 62, 62);

        this.car = c;

        let container:HTMLElement = document.getElementById('container');

        container.appendChild(this.div);
        // this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";

        this._speed = 0;
        this.move();
    }

    public move():void {
        // console.log(this.x);
        // console.log(this.y);
        // speed optellen zo lang we niet de bodem raken
        this.x += this._speed;
        this.y += this.g;
        this._speed *= 0.98;

        // speed wordt hoger dan 0 zodra de auto de rots raakt
        if(this.y +62 > document.getElementById('container').clientHeight){
            this._speed = 0;
            this.g = 0;
        }
        //teken de div op de juiste positie
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }

    public crashed(carSpeed:number) : void{
        this._speed = carSpeed;
        this.g = 9.81;
    }
}