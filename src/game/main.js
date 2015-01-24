var mainConfig = function(game) {
};

var game = new Phaser.Game(1280, 960, Phaser.AUTO, 'gameDiv');

var layer;
var map;


// This function will be executed at the beginning     
// That's where we load the game's assets
mainConfig.prototype.preload = function() { 

    game.stage.backgroundColor = '#71c5cf';

    game.load.tilemap('map1', 'assets/gfx/tiles/Throne_Room.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset1', 'assets/gfx/tiles/CastleTiles.png');

    game.load.tilemap('map', 'assets/gfx/tiles/Overworld.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/gfx/tiles/VillageOverworldTiles.png');

    game.load.spritesheet("player", "/assets/gfx/sprites/All.png", 64, 64);
    game.load.spritesheet("girl", "/assets/gfx/sprites/Girl.png", 64, 64);
    game.load.spritesheet("rat", "/assets/gfx/sprites/RAT.png", 64, 64);
    game.load.spritesheet("opening", "/assets/gfx/opening.jpg", 1811, 1280);
};

// This function is called after the preload function     
// Here we set up the game, display sprites, etc.  
mainConfig.prototype.create = function() { 

    // Define movement constants
    this.MAX_SPEED = 12500; // pixels/second
    this.ACCELERATION = 12500; // pixels/second/second

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.Arcade);

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
    ]);

    this.dpad = this.game.input.keyboard.createCursorKeys();
    this.attackButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    parent = this;
    game.input.keyboard.onUpCallback = function( e ){
            if(e.keyCode == Phaser.Keyboard.SPACEBAR){
                parent.checkSpaceBar();
            }
        };
    this.nextState()
};

// This function is called 60 times per second    
// It contains the game's logic 
mainConfig.prototype.update = function() {
  this.stateUpdate()
};

game.state.add('game', mainConfig, true);