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

        this.alignGrid = new AlignGrid({scene: this, rows: 5, cols: 5});
        // this.alignGrid.showNumbers(); // defines alignGrid class instance
        // this.alignGrid.placeAtIndex();

        var soundButtons = new SoundButtons({scene: this});
    
    
    }
    
    update() {
        
    }
}