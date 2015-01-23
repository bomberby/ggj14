/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */
var game

var map
var layer

var keys = {}

var player
var playerVelocity = 250

var state = {

    init: function() {
        // Delete this init block or replace with your own logic.

        // Create simple text display for current Phaser version
         //var text = "Phaser Version "+Phaser.VERSION + " works!";
         //var style = { font: "24px Arial", fill: "#fff", align: "center" };
         //var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
         //t.anchor.setTo(0.5, 0.5);
        
    },
    preload: function() {
        // STate preload logic goes here
        game.load.tilemap('caveMap', 'assets/maps/cave.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.image('caveTiles', 'assets/sprites/cave.png')
        game.load.spritesheet('player', 'assets/sprites/player.png', 32, 48)        
    },
    create: function(){
      // State create logic goes here
        map = game.add.tilemap('caveMap')
        map.addTilesetImage('cave', 'caveTiles')
        map.setCollisionBetween(1, 8); // wall tiles
        layer = map.createLayer('Cave');
        layer.debug = true

        // player
        player = game.add.sprite(game.world.width / 2 - 16, game.world.height / 2 + 64, 'player')

        // controls
        keys.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keys.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        keys.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        keys.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        keys.space = game.input.keyboard.addKey(Phaser.Keyboard.Space);


    },
    update: function() {
        // State Update Logic goes here.

        game.physics.collide(player, layer)

        // reset player velocity
        player.body.velocity.x = 0
        player.body.velocity.y = 0

        // player movement

        if (keys.w.isDown) {
            if(player.body.blocked.up === true)
              player.body.velocity.y = -playerVelocity
        } else if (keys.s.isDown) {
            if(player.body.blocked.down === true)
              player.body.velocity.y = playerVelocity
        }

        if (keys.a.isDown) {
          if(player.body.blocked.left === true)
            player.body.velocity.x = -playerVelocity
        } else if (keys.d.isDown) {
          if(player.body.blocked.right === true)
            player.body.velocity.x = playerVelocity
        }
        if (keys.space.isDown) {
          if (!player.animation_lock)
          {
            player.animation_lock = true;
            //TODO:attack logic
          }

        }
    }
};

var game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    state
);