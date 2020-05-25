class BossTwoDown extends Phaser.Scene {
    constructor() {
        super('BossTwoDown');
    }

    create() {
        emitter = new Phaser.Events.EventEmitter(); // allows us to talk globally to other parts of our game
        controller = new Controller(); // instance of emitter has to exist before use of controller because its used inside the controller
        this.add.image(0, 0, 'background2').setOrigin(0, 0);
        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this}); // adds grid to the scene
        //this.alignGrid.showNumbers();
       
        var bossDown = "Another one bites the dust. A few more scrapes this time around but you don't gain a reputation for bruising and pillaging without getting your hands dirty. The pirate has barely exhaled before they notice yet another even more sizable blip pinging on radar. Casting their gaze outwards past the nose of their ship they see the the increasingly large and ominous outline of what must be another relentless foe.";
        
        var style = {
            'color': 'white',
            'fontSize': '24px',
            'wordWrap': {
                'width': this.sys.game.config.width
            }
        }
        this.twBossDown = new TypeWriter({
            'scene': this,
            'text': bossDown,
            'speed': .2,
            'style': style
        });

        // button to start the game
        var btnStart = new FlatButton({scene: this, key: 'button1', text: 'continue', event: 'start_game'})
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this); // listen for start game event
        mediaManager = new MediaManager({scene: this});
        mediaManager.setBackgroundMusic("backgroundMusic");
        var sb = new SoundButtons({scene: this});
    }

    startGame() {
        this.scene.start('FinalBoss');
    }
}