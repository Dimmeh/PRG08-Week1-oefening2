class Util{
    public static checkCollision(g1: GameObject, g2: GameObject):boolean{

        if(g1.x < g2.x + g2.width &&
            g1.x + g1.width > g2.x &&
            g1.y < g2.y + g2.height &&
            g1.height + g1.y > g2.y){
            return true;
        }
    }
}