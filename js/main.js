var game; // make game a global object
var model;
var emitter; // allows different parts of the game to talk and listen to each other
var G; // stands for game
var controller; 
var mediaManager;

window.onload = function() {

    var isMobile = navigator.userAgent.indexOf("Mobile"); // detects if user is on mobile
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet"); // detects if user is on tablet
    }
    //
    //
    if (isMobile == -1) { // this means we're on laptop or desktop
        var config = { // config object containing info on how to set up the game
            type: Phaser.AUTO, // graphics mode, AUTO lets browser decide between Canvas or WebGL
            width: 480, // width of the game
            height: 640, // height of the game
            parent: 'phaser-game', // place the game anywhere you want in HTML code
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scene: [LoadMenu, MainMenu, Intro, FirstBoss, SecondBoss, FinalBoss, GameOver] // game scenes to be loaded 
        };
    } else {
       var config = { // this makes the game fill the screen whatever size the device is
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scene: [LoadMenu, MainMenu, Intro, FirstBoss, SecondBoss, FinalBoss, GameOver]
        };

    }
    G = new Constants();
    model = new Model();
    model.isMobile = isMobile;
    game = new Phaser.Game(config); // create game object
}