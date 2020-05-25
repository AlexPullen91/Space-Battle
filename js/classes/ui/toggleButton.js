class ToggleButton extends Phaser.GameObjects.Container {
	constructor(config) {

		super(config.scene);
		this.scene = config.scene;

		this.back = this.scene.add.image(0, 0, config.backKey); // background of the button
		this.onIcon = this.scene.add.image(0, 0, config.onIcon);  // adds on icon
		this.offIcon = this.scene.add.image(0, 0, config.offIcon); // adds off icon

		Align.scaleToGameW(this.back, .1); // scales background down
		Align.scaleToGameW(this.onIcon, .05); // scales on icon down
		Align.scaleToGameW(this.offIcon, .05); // scales off icon down

		this.add(this.back); // add background to the container
		this.add(this.onIcon);  // add on icon to the container
		this.add(this.offIcon); // add off icon to the container

		if (!config.value) {
			config.value = true;
		}

		this.value = config.value;

		if (config.event) {
			this.event = config.event;
		}

		this.setIcons();

		this.back.setInteractive(); // makes it so it can be clicked
		this.back.on('pointerdown', this.toggle, this); // adds the listener

		if (config.x) {
			this.x = config.x;
		}
		if (config.y) {
			this.y = config.y;
		}
		this.setSize(this.back.displayWidth, this.back.displayHeight); // puts height and width properties in the toggle button
		
		this.scene.add.existing(this);
    }

    setNoScroll() { // allow icons to follow the camera movement rather than stay fixed in place
        this.back.setScrollFactor(0);
        this.onIcon.setScrollFactor(0);
        this.offIcon.setScrollFactor(0);
    }
    
	toggle() { // flip everything round
		this.value = !this.value;
		this.setIcons();
		if (this.event) {
			emitter.emit(this.event, this.value);
		}
    }
    
	setIcons() { // turn the right icons on or off
		if (this.value == true) {
			this.onIcon.visible = true;
			this.offIcon.visible = false;
		} else {
			this.onIcon.visible = false;
			this.offIcon.visible = true;
		}
	}
}