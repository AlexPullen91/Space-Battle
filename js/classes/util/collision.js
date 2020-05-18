class Collision {
    static checkCollide(obj1, obj2) { // check positions of the two objects against each other
        var distX = Math.abs(obj1.x - obj2.x); // subtract object1's x from the the x of onject 2 and take off negative sign if there is one
        var distY = Math.abs(obj1.y - obj2.y); // if something is postive or negative 10px away its still only 10px away

        if (distX < obj1.width / 2) { // going for the center of the object
            if (distY < obj1.height / 2) {
                return true;
            }
        }
        return false;
    }
}