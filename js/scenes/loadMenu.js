class LoadMenu extends Phaser.Scene {
    constructor() {
        super('LoadMenu');
    }

    preload() {

        // loading bar
        this.bar = new Bar({scene: this, x: game.config.width / 2, y: game.config.height / 2,})
        this.progText = this.add.text(game.config.width / 2, game.config.height / 2, "0%", {color: "#ffffff", fontSize: game.config.width / 20});
        this.progText.setOrigin(0.5, 0.5);
        this.load.on("progress", this.onProgress, this);

        this.load.image("button1", "images/ui/buttons/2/1.png");

        this.load.audio("explode", ["audio/explode.wav", "audio/explode.ogg"]);
        this.load.audio("enemyShoot", ["audio/enemyShoot.wav", "audio/enemyShoot.ogg"]);
        this.load.audio("laser", ["audio/laser.wav", "audio/laser.ogg"]);
        this.load.audio("backgroundMusic", ["audio/background.mp3", "audio/background.ogg"]);

        this.load.image("toggleBack", "images/ui/toggles/1.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");

        this.load.image("purpleship", "images/purpleship.png");

        this.load.image("background", "images/background.jpg");

        this.load.spritesheet("rocks", "images/asteroids.png", { frameWidth: 125, frameHeight: 100 });
        this.load.spritesheet("exp", "images/exp.png", { frameWidth: 64, frameHeight: 64 });

        this.load.image("bosslaser1", "images/bosslaser1.png");
        this.load.image("bosslaser2", "images/bosslaser2.png");
        this.load.image("bosslaser3", "images/bosslaser3.png");
        this.load.image("plaser", "images/plaser.png");
        
        this.load.image("whiteboss", "images/whiteboss.png");
        this.load.image("tanboss", "images/tanboss.png");
        this.load.image("blueboss", "images/blueboss.png");


    }

    onProgress(value) {
        this.bar.setPercent(value);
        var per = Math.floor(value * 100)
        this.progText.setText(per + "%");
    }
    
    create() {
        // explosion animation
        var frameNames = this.anims.generateFrameNumbers("exp");

        // plays explosion animation from small to big and big to small
        var f2 = frameNames.slice(); // make a copy of the array
        f2.reverse(); // reverse the array

        var f3 = f2.concat(frameNames); // put to frame arrays together

        this.anims.create({
            key: "boom",
            frames: f3,
            frameRate: 32,
            repeat: false,
        });
        
        this.scene.start("MainMenu");
    }
}