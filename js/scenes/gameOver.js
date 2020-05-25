class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.add.image(0, 0, 'background3').setOrigin(0, 0);
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this}); // adds grid to the scene
        //this.alignGrid.showNumbers();

        var title = this.add.image(0, 0, 'title'); // inserts title image
        Align.scaleToGameW(title, .8); // scales down the title
        this.alignGrid.placeAtIndex(16, title); // places it near the top

        this.winnerText = this.add.text(0, 0, "WINNER", {fontSize: game.config.width / 10, color:'#3FE213'});
        this.winnerText.setOrigin(0.5, 0.5);
        this.alignGrid.placeAtIndex(38, this.winnerText);

        if (model.playerWon == true) { 
            this.winner = this.add.image(0, 0, "purpleship"); // add player ship icon if they won
        } else {
            this.winner = this.add.image(0, 0, "whiteboss"); // add enemy ship icon if they won
        }
        Align.scaleToGameW(this.winner, .25);
        this.winner.angle = 270;
        this.alignGrid.placeAtIndex(60, this.winner);

        // button to re-start the game
        var btnStart = new FlatButton({scene:this, key:'button1', text:'Play Again!', event:'start_game'})
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this); // listen for re-start game event

        var sb = new SoundButtons({scene: this});
    }

    startGame() {
        this.scene.start('MainMenu');
    }

    update() {

    }
}