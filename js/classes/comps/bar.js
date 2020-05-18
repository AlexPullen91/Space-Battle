class Bar extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        if (!config.color) {
            config.color = 0xff0000; // default bar color
        }
        if (!config.width) { // default width
            config.width = 200;
        }
        if (!config.height) { // default height
            config.height = config.width / 4;
        }
        // draw the bar
        this.graphics = this.scene.add.graphics(); // place the information into a graphics object
        this.graphics.fillStyle(config.color, 1); // no transparency
        this.graphics.fillRect(0, 0, config.width, config.height); 
        this.add(this.graphics); // add graphics to the container
        // center it in the container
        this.graphics.x =- config.width / 2;
        this.graphics.y =- config.height / 2;

        // set container's x and y to the config x and y
        if (config.x) {
            this.x = config.x;
        }
        if (config.y) {
            this.y = config.y;
        }
        this.scene.add.existing(this); // add container to the scene
    }

    setPercent(per) { // set percentage on the bar
        this.graphics.scaleX = per;
    }
}