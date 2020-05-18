class MediaManager {
    constructor(config) {
        this.scene = config.scene;
        emitter.on(G.PLAY_SOUND, this.playSound, this);
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }
    musicChanged() { // toggles music on or off
        if (this.background) {
            if (model.musicOn == false) {
                this.background.stop();
            } else {
                this.background.play();
            }
            
        }
    }

    playSound(key) { // key will be what is passed to play sound preloaded from the library
        if (model.soundOn == true) {
            var sound = this.scene.sound.add(key);
            sound.play();
        }
        
    }
    
    setBackgroundMusic(key) {
        if (model.musicOn == true) {
            this.background = this.scene.sound.add(key, {volume: .5, loop: true});
            this.background.play();
        }
        
    }
}