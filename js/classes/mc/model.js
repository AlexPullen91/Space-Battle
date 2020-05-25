class Model { // central storage locaton for all of the games data
    constructor() { // where all of the variables and data for the game will go
        this.soundOn = true;
        this._musicOn = true;
        //this.gameOver = false;
    }

    set musicOn(val) {
        this._musicOn = val;
        console.log("music changed");
        //emitter.emit(G.MUSIC_CHANGED);
        mediaManager.musicChanged();
    }

    get musicOn() {
        return this._musicOn;
    }
}