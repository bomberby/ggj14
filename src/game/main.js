var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the game's assets

        // Change the background color of the game
        game.stage.backgroundColor = '#71c5cf';

        // Load the player sprite
        //game.load.image('player', 'assets/gfx/player.png');   

        game.load.spritesheet("player", "/assets/gfx/character.gif", 32, 32);
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  

        // Define movement constants
        this.MAX_SPEED = 500; // pixels/second
        this.ACCELERATION = 1500; // pixels/second/second

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create a player sprite
        this.player = game.add.sprite(game.width/2, game.height/2, 'player');

        // Add physics to the player
        game.physics.arcade.enable(this.player);

        // Make player collide with world boundaries so he doesn't leave the stage
        this.player.body.collideWorldBounds = true;

        // Set player maximum movement speed
        this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, 

        // Capture certain keys to prevent their default actions in the browser.
        // This is only necessary because this is an HTML5 game. Games on other
        // platforms may not need code like this.
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);
        },

        update: function() {
            // This function is called 60 times per second    
            // It contains the game's logic 

            // Collide the player with the ground
            // game.physics.arcade.collide(this.player, this.ground);

            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;

            if (this.shouldMoveLeft()) {
                // If the LEFT key is down, set the player velocity to move left
                this.player.body.acceleration.x = -this.ACCELERATION;
            } else if (this.shouldMoveRight()) {
                // If the RIGHT key is down, set the player velocity to move right
                this.player.body.acceleration.x = this.ACCELERATION;
            } else {
                // Stop the player from moving horizontally
                this.player.body.acceleration.x = 0;
                this.player.body.velocity.x = 0;
            }

            if (this.shouldMoveUp()) {
                // If the LEFT key is down, set the player velocity to move left
                this.player.body.acceleration.y = -this.ACCELERATION;
            } else if (this.shouldMoveDown()) {
                // If the RIGHT key is down, set the player velocity to move right
                this.player.body.acceleration.y = this.ACCELERATION;
            } else {
                // Stop the player from moving horizontally
                this.player.body.acceleration.y = 0;
                this.player.body.velocity.y = 0;
            }   

            // If the player is out of the world (too high or too low), call the 'restartGame' function
            if (this.player.inWorld == false)
                this.restartGame();  
        },

    shouldMoveUp: function() {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
        isActive |= (game.input.activePointer.isDown &&
            game.input.activePointer.y < game.height/4);

        return isActive;
    },

    shouldMoveDown: function() {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
        isActive |= (game.input.activePointer.isDown &&
            game.input.activePointer.y < game.height*4);

        return isActive;
    },

    shouldMoveLeft: function() {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        isActive |= (game.input.activePointer.isDown &&
            game.input.activePointer.x < game.width/4);

        return isActive;
    },

    shouldMoveRight: function() {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        isActive |= (game.input.activePointer.isDown &&
            game.input.activePointer.x > game.width/2 + game.width/4);

        return isActive;
    },

    // Restart the game
    restartGame: function() {  
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
};

game.state.add('main', mainState);  
game.state.start('main'); 