class Constants  {   // want to make sure messages we send matches messages we're listening for
    constructor() {
        this.SET_SCORE = "setScore"; // sets score
        this.UP_POINTS = "upPoints"; // adds points
        this.SCORE_UPDATED = "scoreUpdated"; // constant broadcast from the model
        this.PLAY_SOUND = "playSound"; // enables sounds to be played from anywhere
        this.MUSIC_CHANGED = "musicChanged";
        this.TOGGLE_SOUND = "toggleSound";
    }
}