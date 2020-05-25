class BossOneDown extends Phaser.Scene {
    constructor() {
        super('BossOneDown');
    }

    create() {
        emitter = new Phaser.Events.EventEmitter(); // allows us to talk globally to other parts of our game
        controller = new Controller(); // instance of emitter has to exist before use of controller because its used inside the controller
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this}); // adds grid to the scene
        //this.alignGrid.showNumbers();
        
        var bossDown = "With that final crushing blow the enemy ship's onslaught comes to an end as it succumbs to the pirate's superior piloting skills. They scour the area looking for any sign of loot to try and make this deadly skirmish worth while when they suddenly realise another blip on their radar closing in...";
       
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
        this.scene.start('BossTwo');
    }

}