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
        // allows entire area of background to be used by rock objects
        this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);

        this.background.setInteractive(); // make background interactive
        // adds ability to move with long click which in turn still allows for ability to fire missiles
        this.background.on('pointerup', this.backgroundClicked, this); // bringing pointer up still activates background click which moves ship
        this.background.on('pointerdown', this.onDown, this);
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
            collideWorldBounds: true
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
            if (vx == 0 && vy == 0) { // ensures all rocks move at at least a rate of 1
                vx = 1;
                vy = 1;
            }
            // gives a speed somewhere between 10 and 200
            var speed = Math.floor(Math.random() * 200) + 10;
            child.body.setVelocity(vx * speed, vy * speed);

        }.bind(this));

        this.physics.add.collider(this.rockGroup); // makes rocks collide with one another
    }

    getTimer() { // gives a number of seconds that can be measured
        var d = new Date();
        return d.getTime();
    }

    onDown() {
        this.downTime = this.getTimer();
    }

    backgroundClicked() {
        // measure time between the time down and the time up
        var elapsed = Math.abs(this.downTime - this.getTimer());

        console.log(elapsed);
        
        if (elapsed < 300) { // move if its a fast click, shoot if it otherwise
            var tx = this.background.input.localX * this.background.scaleX; // target x... where on the image it was clicked
            var ty = this.background.input.localY * this.background.scaleY; // target y... where on the image it was clicked
            this.tx = tx;
            this.ty = ty;

            var angle = this.physics.moveTo(this.ship, tx, ty, 60);
            angle = this.toDegrees(angle);
            this.ship.angle = angle;
        } else {
            console.log("FIRE!");
        }
       
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