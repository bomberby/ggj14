var mainConfig = function(game) {
};

var game = new Phaser.Game(400, 240, Phaser.AUTO, 'gameDiv');
var pixel = { scale: 4, canvas: null, context: null, width: 0, height: 0 }

var layer;
var map;

mainConfig.prototype.init = function() {

    //  Hide the un-scaled game canvas
    game.canvas.style['display'] = 'none';

    //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
    pixel.canvas = Phaser.Canvas.create(game.width * pixel.scale, game.height * pixel.scale);

    //  Store a reference to the Canvas Context
    pixel.context = pixel.canvas.getContext('2d');

    //  Add the scaled canvas to the DOM
    Phaser.Canvas.addToDOM(pixel.canvas);

    //  Disable smoothing on the scaled canvas
    Phaser.Canvas.setSmoothingEnabled(pixel.context, false);

    //  Cache the width/height to avoid looking it up every render
    pixel.width = pixel.canvas.width;
    pixel.height = pixel.canvas.height;
}

// This function will be executed at the beginning     
// That's where we load the game's assets
mainConfig.prototype.preload = function() { 

    game.stage.backgroundColor = '#71c5cf';

    game.load.tilemap('map', 'assets/gfx/tiles/Overworld.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/gfx/tiles/VillageOverworldTiles.png');
    
    game.load.spritesheet("player", "/assets/gfx/sprites/All.png", 16, 16);
};

// This function is called after the preload function     
// Here we set up the game, display sprites, etc.  
mainConfig.prototype.create = function() { 

    // Define movement constants
    this.MAX_SPEED = 3500; // pixels/second
    this.ACCELERATION = 3500; // pixels/second/second

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('VillageOverworldTiles', 'tileset');

    this.map.setCollision(2);
    this.map.setCollision(8);
    this.map.setCollisionBetween(4,6);
    this.map.setCollisionBetween(21,36);

    this.layer = this.map.createLayer('Overworld');
    this.layer.resizeWorld();

    // Create a player sprite
    this.player = game.add.sprite(game.width/2, game.height/2, 'player');
    this.player.anchor.setTo(.5,.5);
    
    // Add physics to the player
    game.physics.arcade.enable(this.player);

    // Make player collide with world boundaries so he doesn't leave the stage
    this.player.body.collideWorldBounds = true;

    // Set player maximum movement speed
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, 

    this.player.animations.add('left', [2, 3], 10, true);
    this.player.animations.add('right', [4, 5], 10, true);
    this.player.animations.add('attack', [7, 6], 10, true);

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

    this.nextText();
};

// This function is called 60 times per second    
// It contains the game's logic 
mainConfig.prototype.update = function() {
  this.stateUpdate()
};

mainConfig.prototype.render = function() {

    //  Every loop we need to render the un-scaled game canvas to the displayed scaled canvas:
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
}

game.state.add('game', mainConfig, true);