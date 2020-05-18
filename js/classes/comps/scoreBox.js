class ScoreBox extends Phaser.GameObjects.Container {
    constructor(config) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }
        super(config.scene);
        this.scene = config.scene;
        //
        this.text1 = this.scene.add.text(0, 0, "SCORE:0"); // textbox to hold the score
        this.text1.setOrigin(0.5, 0.5); // places it in the center of the container
        this.add(this.text1); // add text box to scorebox container

        if (config.x) {
            this.x = config.x;
        }
        if (config.y) {
            this.y = config.y;
        }
        this.text1.setBackgroundColor("#000000");

        this.scene.add.existing(this); // adds container to the scene

        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this) // listen for event from model to be emitted
    }
    
    scoreUpdated() {
        this.text1.setText("SCORE:" + model.score); // update text with current score of the game
    }
}