class Intro extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload() {
        
    }

    create() {
        emitter = new Phaser.Events.EventEmitter(); // allows us to talk globally to other parts of our game
        controller = new Controller(); // instance of emitter has to exist before use of controller because its used inside the controller
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this}); // adds grid to the scene
        //this.alignGrid.showNumbers();

        
        // Align.scaleToGameW(title, .8); // scales down the title
        // this.alignGrid.placeAtIndex(27, title); // places it central

       // var myText = game.add.text(x,y,text);
        //var someText = this.add.text(0,0,"Way out on the seldom seen fringes of the Andromeda galaxy a ragtag band of fearsome pirates have become separated from the rest of their crew. Having been in hot pursuit of stragglers from a recently ambushed trade convoy en route to one of the deep space mining colonies, they have now found themselves perilously off the beaten path. The trail's gone cold. Reluctantly they decide it's time to cut their losses and turn to head back, when suddenly radar alerts them to incoming projectiles. They're under attack! Never one to back down from a fight they divert power to weapons systems and turn to engage their mysterious foes head on.").setOrigin(0.5, 0.5);
        
        var myText = "Way out on the seldom seen fringes of the Andromeda galaxy a ragtag band of fearsome pirates have become separated from the rest of their crew. Having been in hot pursuit of stragglers from a recently ambushed trade convoy en route to one of the deep space mining colonies, they have now found themselves perilously off the beaten path. The trail's gone cold. Reluctantly they decide it's time to cut their losses and turn to head back, when suddenly radar alerts them to incoming projectiles. They're under attack! Never one to back down from a fight they divert power to weapons systems and turn to engage their mysterious foes head on.";
        var style = {
            'color': 'white',
            'fontSize': '24px',
            'wordWrap': {
                'width': this.sys.game.config.width
            }
        }
        this.tw = new TypeWriter({
            'scene': this,
            'text': myText,
            'speed': .5,
            'style': style
        });

        this.alignGrid.placeAtIndex(12, myText)


        // button to start the game
        var btnStart = new FlatButton({scene: this, key: 'button1', text: 'start', event: 'start_game'})
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this); // listen for start game event
        var mediaManager = new MediaManager({scene: this});

        var sb = new SoundButtons({scene: this});
    }

    startGame() {
        this.scene.start('FirstBoss');
    }

    update() {

    }
}