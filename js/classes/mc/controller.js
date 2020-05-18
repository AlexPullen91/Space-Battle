class Controller { // allows us to listen to main events
    constructor() {  // where we listen to events from the emitter
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_POINTS, this.upPoints); 
        emitter.on(G.TOGGLE_SOUND, this.toggleSound);
        emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
    }

    toggleSound(val) {
        model.soundOn = val;
    }

    toggleMusic(val) {
        model.musicOn = val;
    }

    setScore(score) { 
        model.score = score; // allow us to directly set score in the model
    }
    
    upPoints(points) {
        var score = model.score;
        score += points; // triggers setter in the model
        model.score = score;
    }
}