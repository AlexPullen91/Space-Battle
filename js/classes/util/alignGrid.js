class AlignGrid {
    constructor(config) {
        this.config = config;
        if (!config.scene) {
            console.log("missing scene"); // error message if there's no scene found
            return;
        }
        if (!config.rows) {
            config.rows = 5; // default value if they are missing from config object
        }
        if (!config.cols) {
            config.cols = 5; // default value if they are missing from config object
        }
        if (!config.height) {
            config.height = game.config.height;
        }
        if (!config.width) {
            config.width = game.config.width;
        }
        
        this.scene = config.scene; //make a class level reference to the scene
        
        this.cw = config.width / config.cols; // taking width of the game and dividing by number of cols to define cell width
        this.ch = config.height / config.rows; // taking height of the game dividing by number of rows to define cell height
    }

    show() { // show the grid to make planning easier
        this.graphics = this.scene.add.graphics(); // give us an object to draw on
        this.graphics.lineStyle(2, 0xff0000); // red line with thickness of 2
        
        for (var i = 0; i < this.config.width; i += this.cw) { // draw vertical lines
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }
        
        for (var i = 0; i < this.config.height; i += this.ch) { // draw horizontal lines
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.config.width, i);
        }
        this.graphics.strokePath(); // draws the lines
    }

    placeAt(xx, yy, obj) {
        // calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }

    placeAtIndex(index, obj) {
        var yy = Math.floor(index / this.config.cols); // divides index by number of cols and returns an integer
        var xx = index - (yy * this.config.cols); // subtracts the row and multiplies by number of cols to get left over number
        this.placeAt(xx, yy, obj);
    }
    
    showNumbers() { // shows us the number of each cell
        this.show();
        var count = 0;
        for (var i = 0; i < this.config.rows; i++) { // loop from 0 to the number of rows
            for (var j = 0; j < this.config.cols; j++) { // loop from 0 to the number of cols
                var numText = this.scene.add.text(0, 0, count, { // make a text field with value of each cell
                    color: '#ff0000'
                });
                numText.setOrigin(0.5, 0.5); // centers the text
                this.placeAtIndex(count, numText); // places it on the grid
                count++;
            }
        }
    }
}