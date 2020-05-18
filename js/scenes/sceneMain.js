class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    
    preload() {
        
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        model.gameOver = false;
        model.score = 0; // score is reset to this every time play again is pressed

        var soundButtons = new SoundButtons({scene: this});

        this.alignGrid = new AlignGrid({scene: this, rows: 5, cols: 5});
        // this.alignGrid.showNumbers(); // defines alignGrid class instance
        // this.alignGrid.placeAtIndex();

        // gives us dead center of the game
        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;
        
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
        Align.scaleToGameW(this.ship, .125);

        // scales background with the ship
        this.background.scaleX = this.ship.scaleX;
        this.background.scaleY = this.ship.scaleY;

        this.background.setInteractive(); // make background interactive
        this.background.on('pointerdown', this.backgroundClicked, this);
        // scrolling background
        // determines where we can move the ship
        this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.ship, true);
        // add rocks
        this.rockGroup = this.physics.add.group({ // add sprites into the group
            key: 'rocks',
            frame: [0, 1, 2],
            frameQuantity: 4, // 4 times for every frame
            bounceX: 1,
            bounceY: 1,
            angularVelocity: 1,
            colliderWorldBounds: true
        });
        this.rockGroup.children.iterate(function(child){ // randomly place the rock groups
            var xx = Math.floor(Math.random() * this.background.displayWidth);
            var yy = Math.floor(Math.random() * this.background.displayHeight);
            child.x = xx;
            child.y = yy;

            Align.scaleToGameW(child, .1);

            // to move rocks the following code gives -1, 0 or 1
            var vx = Math.floor(Math.random() * 2) - 1;
            var vy = Math.floor(Math.random() * 2) - 1;
            // gives a speed somewhere between 10 and 200
            var speed = Math.floor(Math.random() * 200) + 10;
            child.body.setVelocity(vx * speed, vy * speed);

        }.bind(this));
    }

    backgroundClicked() {
        var tx = this.background.input.localX * this.background.scaleX; // target x... where on the image it was clicked
        var ty = this.background.input.localY * this.background.scaleY; // target y... where on the image it was clicked
        this.tx = tx;
        this.ty = ty;

        var angle = this.physics.moveTo(this.ship, tx, ty, 60);
        angle = this.toDegrees(angle);
        this.ship.angle = angle;
    }

    toDegrees(angle) { // allows ships nose to turn to where it's headed
        return angle * (180 / Math.PI);
    }
    
    update() {
        var distX = Math.abs(this.ship.x - this.tx); // take ship's x and target's x
        var distY = Math.abs(this.ship.y - this.ty); // take ship's y and target's y
        if (distX < 10 && distY < 10) {
            this.ship.body.setVelocity(0, 0); // we are close enough to our target spot to stop the ship
        }
    }
}