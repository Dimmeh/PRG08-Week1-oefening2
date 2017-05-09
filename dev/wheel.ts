class Wheel {
                        
    constructor(parent:HTMLElement) {
        // het DOM element waar de div in geplaatst wordt:
        let car:HTMLElement = parent;

        let wheelLeft = document.createElement("wheel");
        let wheelRight = document.createElement("wheel");
        car.appendChild(wheelLeft);
        car.appendChild(wheelRight);

        wheelLeft.style.transform ="translate(15px, 30px)";
        wheelRight.style.transform ="translate(100px, 30px)";
    }
}