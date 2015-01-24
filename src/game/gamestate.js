var gamePhase = -1 //one less than first phase

mainConfig.prototype.nextState = function(){
	gamePhase +=1;
		switch(gamePhase)
	{
		case 0:  // phase 0 -splash
			break;
		case 1:  // phase 1 - forest view
		    this.map = game.add.tilemap('map');
		    this.map.addTilesetImage('VillageOverworldTiles', 'tileset');

		    this.map.setCollision(2);
		    this.map.setCollision(8);
		    this.map.setCollisionBetween(4,6);
		    this.map.setCollisionBetween(21,36);

		    this.layer = this.map.createLayer('Overworld');
		    this.layer.resizeWorld();

		    // Create a player sprite
		    this.player = game.add.sprite(game.width/2 - 40, game.height/2 - 60, 'player');
		    this.player.anchor.setTo(.5, .5);

		    this.playerAttack = game.add.sprite(this.player.position.x - 16, this.player.position.y, 'player');
		    this.playerAttack.anchor.setTo(.5, .5);

		    //Add Villagers
		    this.girl = game.add.sprite(800, 660, 'girl');
		    this.girl.anchor.setTo(.5, .5);

		    // Add physics to the player
		    game.physics.arcade.enable(this.player);
		    game.physics.arcade.enable(this.playerAttack);
			game.physics.arcade.enable(this.girl);

		    // Make player collide with world boundaries so he doesn't leave the stage
		    this.player.body.collideWorldBounds = true;

		    // Set player maximum movement speed
		    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, 
		    this.playerAttack.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, 

		    this.player.animations.add('left', [2, 3], 10, true);
		    this.player.animations.add('right', [4, 5], 10, true);
		    this.playerAttack.animations.add('attack', [8], 10, true);
		    // this.girl.animation.add('girl_speak', [0, 1], 10, true);

		    this.nextText();
		    break;
	}
};

mainConfig.prototype.stateUpdate = function(){
	switch(gamePhase)
	{
		case 0:  // phase 0 -splash
			break;
		case 1:  // phase 1 - forest view
		    game.physics.arcade.collide(this.player, this.layer);

		    this.player.body.velocity.x = 0;
		    this.player.body.velocity.y = 0;

		    if (lastPosition == 'right') {
		        this.playerAttack.position.x = this.player.position.x + 64;
		    } else {
		        this.playerAttack.position.x = this.player.position.x - 64;
		    };

		    this.playerAttack.position.y = this.player.position.y;

		    this.checkXMovement();
		    this.checkYMomvment();
		    break;
	}
};
