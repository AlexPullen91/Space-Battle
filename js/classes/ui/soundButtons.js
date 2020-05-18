class SoundButtons extends Phaser.GameObjects.Container {
	constructor(config) {

        super(config.scene);
        
		this.scene = config.scene;

		 this.musicButton = new ToggleButton({scene:this.scene, backKey:'toggleBack', onIcon:'musicOn', offIcon:'musicOff', event:G.TOGGLE_MUSIC});
		 this.sfxButton = new ToggleButton({scene:this.scene, backKey:'toggleBack', onIcon:'sfxOn', offIcon:'sfxOff', event:G.TOGGLE_SOUND});

		 this.add(this.musicButton); // add button to the container
		 this.add(this.sfxButton); // add button to the container

        // aligns sprites with origin of 0.5, 0.5 to top left corner of the screen
		 this.musicButton.y = this.musicButton.height / 2; 
		 this.musicButton.x = this.musicButton.width / 2;
        // places sfx button on opposite side
		 this.sfxButton.x = game.config.width - this.sfxButton.width / 2;
		 this.sfxButton.y = this.musicButton.y;

        this.sfxButton.setScrollFactor(0);
        this.musicButton.setScrollFactor(0);

        // this detects if the music of sound is already off in the model
        if (model.musicOn == false) {
            this.musicButton.toggle();
        }
        if (model.soundOn == false) {
            this.sfxButton.toggle();
        }

		 this.scene.add.existing(this);
	}
}