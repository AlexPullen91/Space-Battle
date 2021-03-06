class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image("button1", "assets/images/ui/buttons/2/1.png");
    	this.load.image("title", "assets/images/Deep-Space.png")
    }

    create() {
        emitter = new Phaser.Events.EventEmitter(); // allows us to talk globally to other parts of our game
        controller = new Controller(); // instance of emitter has to exist before use of controller because its used inside the controller
        
        this.add.image(0, 0, 'background1').setOrigin(0, 0); // add background image to scene
        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this}); // adds grid to the scene
        //this.alignGrid.showNumbers();

        var title = this.add.image(0, 0, 'title'); // inserts title image
        Align.scaleToGameW(title, .8); // scales down the title
        this.alignGrid.placeAtIndex(27, title); // places it central

        // add and scale player ship
        var ship = this.add.image(0, 0, 'purpleship');
        this.alignGrid.placeAtIndex(60, ship)
        Align.scaleToGameW(ship, .125);

        // play instructions
        var howToMove = this.add.text(0, 0, "Click or touch where you want to move the ship").setOrigin(0.5, 0.5);
        this.alignGrid.placeAtIndex(82, howToMove);
        var howToShoot = this.add.text(0, 0, "Hold to shoot").setOrigin(0.5, 0.5);
        this.alignGrid.placeAtIndex(93, howToShoot);

        // button to start the game
        var btnStart = new FlatButton({scene: this, key: 'button1', text: 'start', event: 'start_game'})
        this.alignGrid.placeAtIndex(104, btnStart);

        emitter.on('start_game', this.startGame, this); // listen for start game event
        mediaManager = new MediaManager({scene: this});

        var sb = new SoundButtons({scene: this});
    }

    startGame() {
        this.scene.start('Intro');
    }

    update() {

    }
}