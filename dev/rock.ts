///<reference path="gameObject.ts"/>

class Rock extends GameObject{

    private _speed:number = 4;
    private g : number = 0;
    //

    constructor(i:number) {
        super('rock', 509, 209, 62, 62);

        let container:HTMLElement = document.getElementById('container');

        container.appendChild(this.div);
        this.y = i * (this.height + 10);
        this.x = 400 + (Math.random() * 150);
        this._speed = 0;
        this.move();
    }

    public move():void {
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
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+ this.x +"deg)";
    }

    public crashed(carSpeed:number) : void{
        this._speed = carSpeed;
        this.g = 9.81;
    }
}