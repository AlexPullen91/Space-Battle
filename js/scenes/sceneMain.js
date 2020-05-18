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

        this.background.setInteractive(); // make background interactive
        this.background.on('pointerdown', this.backgroundClicked, this);
    }

    backgroundClicked() {
        var tx = this.background.input.localX; // target x... where on the image it was clicked
        var ty = this.background.input.localY; // target y... where on the image it was clicked

        var angle = this.physics.moveTo(this.ship, tx, ty, 60);
        angle = this.toDegrees(angle);
        this.ship.angle = angle;
    }

    toDegrees(angle) {
        return angle * (180 / Math.PI);
    }
    
    update() {
        
    }
}