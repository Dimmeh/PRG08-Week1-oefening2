abstract class GameObject {
    public div:HTMLElement;
    public x:number;
    public y:number;
    public height:number;
    public width:number;

    constructor(tag:string, x:number, y:number, height:number, width:number){
        this.createDiv(tag, x, y, height, width)
    }

    private createDiv(tag:string, x:number, y:number, height:number, width:number){
        this.div = document.createElement(tag);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}