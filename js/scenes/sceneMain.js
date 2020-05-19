class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {}

  create() {
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();
    model.gameOver = false;

    this.shields = 100;
    this.eshields = 100;

    // gives us dead center of the game
    this.centerX = game.config.width / 2;
    this.centerY = game.config.height / 2;

    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(this.centerX, this.centerY, "ship");
    this.ship.body.collideWorldBounds = true;
    Align.scaleToGameW(this.ship, 0.125);

    // scales background with the ship
    this.background.scaleX = this.ship.scaleX;
    this.background.scaleY = this.ship.scaleY;
    // allows entire area of background to be used by rock objects
    this.physics.world.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );

    this.background.setInteractive(); // make background interactive
    // adds ability to move with long click which in turn still allows for ability to fire missiles
    this.background.on("pointerup", this.backgroundClicked, this); // bringing pointer up still activates background click which moves ship
    this.background.on("pointerdown", this.onDown, this);
    // scrolling background
    // determines where we can move the ship
    this.cameras.main.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );
    this.cameras.main.startFollow(this.ship, true);

    this.bulletGroup = this.physics.add.group(); // group to hold the bullets
    this.ebulletGroup = this.physics.add.group(); // group to hold enemy bullets
    this.rockGroup = this.physics.add.group();
    this.makeRocks();

    this.physics.add.collider(this.rockGroup); // makes rocks collide with one another
    this.physics.add.collider(
      this.bulletGroup,
      this.rockGroup,
      this.destroyRock,
      null,
      this
    ); // allows player bullets to destroy rocks
    this.physics.add.collider(
      this.ebulletGroup,
      this.rockGroup,
      this.destroyRock,
      null,
      this
    ); // allows enemy bullets to destroy rocks
    this.physics.add.collider(
      this.bulletGroup,
      this.eship,
      this.damageEnemy,
      null,
      this
    );
    this.physics.add.collider(
      this.ebulletGroup,
      this.ship,
      this.damagePlayer,
      null,
      this
    );
    // explosion animation
    var frameNames = this.anims.generateFrameNumbers("exp");

    // plays explosion animation from small to big and big to small
    var f2 = frameNames.slice();
    f2.reverse();

    var f3 = f2.concat(frameNames);

    this.anims.create({
      key: "boom",
      frames: f3,
      frameRate: 48,
      repeat: false,
    });
    // add bad guy to game
    this.eship = this.physics.add.sprite(this.centerX, 0, "eship");
    this.eship.body.collideWorldBounds = true;
    Align.scaleToGameW(this.eship, 0.25);

    this.makeInfo();
    this.setColliders();
  }

  makeRocks() {
    if (this.rockGroup.getChildren().length == 0) {
      // check to see if we're out of rocks
      // add rocks
      this.rockGroup = this.physics.add.group({
        // add sprites into the group
        key: "rocks",
        frame: [0, 1, 2],
        frameQuantity: 4, // 4 times for every frame
        bounceX: 1,
        bounceY: 1,
        angularVelocity: 1,
        collideWorldBounds: true,
      });
      this.rockGroup.children.iterate(
        function (child) {
          // randomly place the rock groups
          var xx = Math.floor(Math.random() * this.background.displayWidth);
          var yy = Math.floor(Math.random() * this.background.displayHeight);
          child.x = xx;
          child.y = yy;

          Align.scaleToGameW(child, 0.1);

          // to move rocks the following code gives -1, 0 or 1
          var vx = Math.floor(Math.random() * 2) - 1;
          var vy = Math.floor(Math.random() * 2) - 1;
          if (vx == 0 && vy == 0) {
            // ensures all rocks move at at least a rate of 1
            vx = 1;
            vy = 1;
          }
          // gives a speed somewhere between 10 and 200
          var speed = Math.floor(Math.random() * 200) + 10;
          child.body.setVelocity(vx * speed, vy * speed);
        }.bind(this)
      );
    }
  }

  setColliders() {
    this.physics.add.collider(this.rockGroup); // makes rocks collide with one another
    this.physics.add.collider(
      this.bulletGroup,
      this.rockGroup,
      this.destroyRock,
      null,
      this
    ); // allows player bullets to destroy rocks
    this.physics.add.collider(
      this.ebulletGroup,
      this.rockGroup,
      this.destroyRock,
      null,
      this
    ); // allows enemy bullets to destroy rocks
    this.physics.add.collider(
      this.bulletGroup,
      this.eship,
      this.damageEnemy,
      null,
      this
    );
    this.physics.add.collider(
      this.rockGroup,
      this.ship,
      this.rockHitPlayer,
      null,
      this
    );
    this.physics.add.collider(
      this.rockGroup,
      this.eship,
      this.rockHitEnemy,
      null,
      this
    );
  }

  makeInfo() {
    // player and enemy information
    this.text1 = this.add.text(0, 0, "Shields\n100", {
      fontSize: game.config.width / 30,
      align: "center",
      backgroundColor: "#000000",
    });
    this.text2 = this.add.text(0, 0, "Enemy Shields\n100", {
      fontSize: game.config.width / 30,
      align: "center",
      backgroundColor: "#000000",
    });

    this.text1.setOrigin(0.5, 0.5); // center text within the cell
    this.text2.setOrigin(0.5, 0.5); // center text within the cell

    this.uiGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    //this.uiGrid.showNumbers();
    //
    //
    this.uiGrid.placeAtIndex(2, this.text1); // position player info on the grid
    this.uiGrid.placeAtIndex(9, this.text2); // position enemy info on the grid

    this.icon1 = this.add.image(0, 0, "ship");
    this.icon2 = this.add.image(0, 0, "eship");
    Align.scaleToGameW(this.icon1, 0.05);
    Align.scaleToGameW(this.icon2, 0.05);

    this.uiGrid.placeAtIndex(1, this.icon1); // position player icon to the left of the info
    this.uiGrid.placeAtIndex(7, this.icon2); // position enemy icon to the left of the

    // point ship icons upwards
    this.icon1.angle = 270;
    this.icon2.angle = 270;

    // stops the icons and the text from scrolling
    // fix with the camera
    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.icon1.setScrollFactor(0);
    this.icon2.setScrollFactor(0);
  }

  downPlayer() {
    this.shields--;
    this.text1.setText("Shields\n" + this.shields);
  }

  downEnemy() {
    this.eshields--;
    this.text2.setText("Enemy Shields\n" + this.eshields);
  }

  rockHitPlayer(ship, rock) {
    var explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    rock.destroy();
    this.makeRocks();
    this.downPlayer();
  }

  rockHitEnemy(ship, rock) {
    var explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    rock.destroy();
    this.makeRocks();
    this.downEnemy();
  }

  damagePlayer(ship, bullet) {
    var explosion = this.add.sprite(this.ship.x, this.ship.y, "exp");
    explosion.play("boom");
    bullet.destroy();
    this.downPlayer();
  }

  damageEnemy(ship, bullet) {
    var explosion = this.add.sprite(bullet.x, bullet.y, "exp");
    explosion.play("boom");
    bullet.destroy();
    // when enemy ship is hit it speeds up and hunts down player
    var angle2 = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 100);
    angle2 = this.toDegrees(angle2);
    this.eship.angle = angle2;
    this.downEnemy();
  }

  destroyRock(bullet, rock) {
    bullet.destroy();
    var explosion = this.add.sprite(rock.x, rock.y, "exp");
    explosion.play("boom");
    rock.destroy();
    this.makeRocks();
  }

  getTimer() {
    // gives a number of seconds that can be measured
    var d = new Date();
    return d.getTime();
  }

  onDown() {
    this.downTime = this.getTimer();
  }

  backgroundClicked() {
    // measure time between the time down and the time up
    var elapsed = Math.abs(this.downTime - this.getTimer());

    console.log(elapsed);

    if (elapsed < 300) {
      // move if its a fast click, shoot if it otherwise
      var tx = this.background.input.localX * this.background.scaleX; // target x... where on the image it was clicked
      var ty = this.background.input.localY * this.background.scaleY; // target y... where on the image it was clicked
      this.tx = tx;
      this.ty = ty;

      var angle = this.physics.moveTo(this.ship, tx, ty, 100);
      angle = this.toDegrees(angle);
      this.ship.angle = angle;
      //
      //
      //
      // enemy ship won't track player if player is only turning
      var distX2 = Math.abs(this.ship.x - tx); // take ship's x and enemy ship's x
      var distY2 = Math.abs(this.ship.y - ty); // take ship's y and enemy ship's y
      if (distX2 > 30 && distY2 > 30) {
        // every time we make a move the baddie zeros in on our position
        var angle2 = this.physics.moveTo(
          this.eship,
          this.ship.x,
          this.ship.y,
          60
        );
        angle2 = this.toDegrees(angle2);
        this.eship.angle = angle2;
      }
    } else {
      this.makeBullet();
    }
  }

  makeBullet() {
    var dirObj = this.getDirFromAngle(this.ship.angle);
    console.log(dirObj);
    var bullet = this.physics.add.sprite(
      this.ship.x + dirObj.tx * 30,
      this.ship.y + dirObj.ty * 30,
      "bullet"
    );
    this.bulletGroup.add(bullet); // add bullet to the group
    bullet.angle = this.ship.angle;
    bullet.body.setVelocity(dirObj.tx * 200, dirObj.ty * 200);
  }

  fireEBullet() {
    // enemy bullet function
    var elapsed = Math.abs(this.lastEBullet - this.getTimer());
    if (elapsed < 500) {
      return;
    }
    this.lastEBullet = this.getTimer();
    var ebullet = this.physics.add.sprite(
      this.eship.x,
      this.eship.y,
      "ebullet"
    );
    this.ebulletGroup.add(ebullet); // enables destruction of rocks
    ebullet.body.angularVelocity = 10;
    this.physics.moveTo(ebullet, this.ship.x, this.ship.y, 100);
  }

  getDirFromAngle(angle) {
    var rads = (angle * Math.PI) / 180;
    var tx = Math.cos(rads);
    var ty = Math.sin(rads);
    return {
      tx,
      ty,
    };
  }

  toDegrees(angle) {
    // allows ships nose to turn to where it's headed
    return angle * (180 / Math.PI);
  }

  update() {
    var distX = Math.abs(this.ship.x - this.tx); // take ship's x and target's x
    var distY = Math.abs(this.ship.y - this.ty); // take ship's y and target's y
    if (distX < 10 && distY < 10) {
      this.ship.body.setVelocity(0, 0); // we are close enough to our target spot to stop the ship
    }

    // only allow bad guy to shoot if he is range of us
    var distX2 = Math.abs(this.ship.x - this.eship.x); // take ship's x and enemy ship's x
    var distY2 = Math.abs(this.ship.y - this.eship.y); // take ship's y and enemy ship's y
    if (distX2 < game.config.width / 5 && distY2 < game.config.height / 5) {
      this.fireEBullet();
    }
  }
}
