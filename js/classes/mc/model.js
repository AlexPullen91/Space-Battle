class Model { // central storage locaton for all of the games data
    constructor() { // where all of the variables and data for the game will go
        this._score = 0;
        this.soundOn = true;
        this._musicOn = true;
        //this.gameOver = false;
    }

    set musicOn(val) {
        this._musicOn = val;
        console.log("music changed");
        emitter.emit(G.MUSIC_CHANGED);
        //mediaManager.musicChanged(); potential audio fix
    }

    get musicOn() {
        return this._musicOn;
    }

    set score(val) { // lets me know when the score is updated
        this._score = val; // sets score locally
        console.log("Score updated!");
        emitter.emit(G.SCORE_UPDATED); // emits event whenever score is updated
    }
    
    get score() {
        return this._score;
    }
}