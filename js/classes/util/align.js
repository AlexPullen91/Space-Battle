class Align { // static function to scale images
    static scaleToGameW(obj,per) {
        obj.displayWidth = game.config.width * per; // takes object and change the display width to the games width * the percentage
        obj.scaleY = obj.scaleX; // makes it scale proportionally
    }

    static center(obj) { // short cut to center objects
        obj.x = game.config.width / 2;
        obj.y = game.config.height / 2;
    }

    static centerH(obj) { // centers objects horizontally
        obj.x = game.config.width / 2;
    }

    static centerV(obj) { // centers objects vertically
        obj.y = game.config.width / 2;
    }
}