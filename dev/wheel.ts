/// <reference path="gameObject.ts"/>

class Wheel extends GameObject{
                        
    constructor(parent:HTMLElement, x:number, y:number) {
        super("wheel", x, y, 22, 22);
        // het DOM element waar de div in geplaatst wordt:
        let car:HTMLElement = parent;

        car.appendChild(this.div);

        this.div.style.transform ="translate("+this.x+"px, "+this.y+"px)";
    }
}