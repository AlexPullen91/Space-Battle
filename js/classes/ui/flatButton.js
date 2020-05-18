class FlatButton extends Phaser.GameObjects.Container {
    constructor(config) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }
        if (!config.key) { // key for the button
            console.log("missing key");
            return;
        }
        super(config.scene);

        this.config = config // takes local variable and makes reference to it at class level
        this.scene = config.scene; // reference to the scene
        this.back = this.scene.add.image(0, 0, config.key); // adds in the button

        this.add(this.back); // adds back to the container

        if (config.text) { // incase we're not making a blank button then we add a text field
            if (config.textConfig) {
                this.text1 = this.scene.add.text(0, 0, config.text, config.textConfig);
            } else {
                this.text1 = this.scene.add.text(0, 0, config.text);
            }
            
            this.text1.setOrigin(0.5, 0.5); // sets text right in the dead center of the button
            this.add(this.text1); // add the text over the button
        }
        if (config.x) {
            this.x = config.x;
        }
        if (config.y) {
            this.y = config.y;
        }

        this.scene.add.existing(this); // adds button to the scene as an existing object

        if (config.event) { // check to see if config has an event
            this.back.setInteractive(); // make it accept events
            this.back.on('pointerdown', this.pressed, this)
        }
        if (model.isMobile == -1) { // means we're on desktop or laptop
            this.back.on("pointerover", this.over, this);
            this.back.on("pointerout", this.out, this);
        }
    }
    over() {
        this.y -= 5;
    }

    out() {
        this.y += 5;
    }
    
    pressed() {
        if (this.config.params) {
            emitter.emit(this.config.event, this.config.params)
        } else {
            emitter.emit(this.config.event);
        }
        
    }
}