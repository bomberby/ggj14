var gamePhase = -1 //one less than first phase
var gameSubPhase = 0
mainConfig.prototype.nextState = function(){
	gamePhase +=1;
	gameSubPhase = 0;
	if (typeof(this.spr_bg)!= 'undefined')
		this.spr_bg.destroy();
	switch(gamePhase)
	{
		case 0:  // phase 0 -splash
			this.opening = game.add.sprite(0, -260, 'opening');
			break;
		case 1:
			this.map = game.add.tilemap('map1');
		    this.map.addTilesetImage('ThroneRoom', 'tileset1');

		    //this.map.setCollision(2);
		    this.map.setCollisionBetween(0,14);
		    this.map.setCollisionBetween(18,19);
			this.map.setCollisionBetween(23,24);
			this.map.setCollisionBetween(38,39);


		    this.layer = this.map.createLayer('Room');
		    this.layer = this.map.createLayer('Throne');
		    this.layer.resizeWorld();

		    // Create a player sprite
		    this.player = game.add.sprite(game.width/2 - 9, game.height/2 - 16, 'player');
		    this.player.anchor.setTo(.5, .5);

		    this.playerAttack = game.add.sprite(this.player.position.x - 16, this.player.position.y, 'player');
		    this.playerAttack.anchor.setTo(.5, .5);
		    this.playerAttack.visible = false;
		    this.playerAttack.renderable = true;
		    
		    // Add physics to the player
		    game.physics.arcade.enable(this.player);
		    game.physics.arcade.enable(this.playerAttack);

		    // Make player collide with world boundaries so he doesn't leave the stage
		    this.player.body.collideWorldBounds = true;

		    // Set player maximum movement speed
		    //this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, 
		    //this.playerAttack.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, 

		    //this.player.animations.add('left', [2, 3], 10, true);
		    //this.player.animations.add('right', [4, 5], 10, true);

		    this.nextText();
		    break;
	    case 2:
	    	this.handleAnimations(false);
		    this.spr_bg = this.game.add.graphics(0, 0);
	        this.spr_bg.beginFill(this.fadeColor, 1);
	        this.spr_bg.drawRect(0, 0, this.game.width, this.game.height);
	        this.spr_bg.alpha = 1;
	        this.spr_bg.endFill();

	        //this.player.position.x -= 120;
	        //this.player.position.y -= 120;
	    	this.nextText();
	    	break;
		case 3:  // phase 3 - forest view
			this.handleAnimations(false);
			this.map.destroy();
		    this.map = game.add.tilemap('map');
		    this.map.addTilesetImage('VillageOverworldTiles', 'tileset');

		    this.map.setCollision(2);
		    this.map.setCollision(8);
		    this.map.setCollisionBetween(4,6);
		    this.map.setCollisionBetween(21,36);

		    this.layer = this.map.createLayer('Overworld');
		    this.layer.resizeWorld();

		    // Create a player sprite
		    this.player = game.add.sprite(224, 160, 'player');
		    this.player.anchor.setTo(.5, .5);

		    this.playerAttack = game.add.sprite(this.player.position.x - 16, this.player.position.y, 'player');
		    this.playerAttack.anchor.setTo(.5, .5);

		    //Add Villagers
 			this.girl = game.add.sprite(225, 380, 'girl');
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

		    //this.nextText();
		    break;
	}
};

mainConfig.prototype.stateUpdate = function(){
	switch(gamePhase)
	{
		case 0:  // phase 0 -splash 
			if (this.opening.position.y <0)
			this.opening.position.y += 1;
			break;
		case 1:
			game.physics.arcade.collide(this.player, this.layer);
			if (gameSubPhase == 2)
				if (this.player.position.x > 511)
			    	this.player.body.acceleration.x = -this.ACCELERATION/30;
			    else if (this.player.position.y > 354){
			    	this.player.body.velocity.x = 0;
			    	this.player.body.acceleration.y = -this.ACCELERATION/50;}
			    	else {this.player.body.acceleration.y = 0;this.nextState();}

		    if (lastPosition == 'right') {
		        this.playerAttack.position.x = this.player.position.x + 16;
		    } else {
		        this.playerAttack.position.x = this.player.position.x - 16;
		    };

		    this.playerAttack.position.y = this.player.position.y;
		    if (gameSubPhase == 1)
				if (this.spr_bg.alpha>0)
			  		this.spr_bg.alpha -= 0.01
		  		else
		  		 	this.spr_bg.destroy();
		    //this.checkXMovement();
		    //this.checkYMomvment();
		    break;
		case 2:	
		 	this.player.body.velocity.x = 0;
		    this.player.body.velocity.y = 0;
		    this.player.body.position.x = 461;
		    this.player.body.position.y = 313;
			if (this.spr_bg.alpha>0)
			  this.spr_bg.alpha -= 0.005
			else
  		 		this.spr_bg.destroy();
  		 	break;

		case 3:  // phase 3 - forest view
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

		    if (gameSubPhase == 0)
		    	if (this.player.position.y > 350)
					this.player.body.acceleration.y = 0;
			if (gameSubPhase == 1)
				if (this.player.position.x > 370)
					this.player.body.acceleration.x = 0;
		    if (gameSubPhase == 2)
				if (this.spr_bg.alpha>0)
			  		this.spr_bg.alpha -= 0.01
		  		else
		  		 	this.spr_bg.destroy();
		    break;
	}
};


mainConfig.prototype.nextSubState = function(){
	gameSubPhase +=1;
	switch(gamePhase)
	{
		case 1:
			if (gameSubPhase == 1)
			{	
				this.spr_bg = this.game.add.graphics(0, 0);
		        this.spr_bg.beginFill(0xFF3300, 1);
		        this.spr_bg.drawRect(0, 0, this.game.width, this.game.height);
		        this.spr_bg.alpha = 1;
		        this.spr_bg.endFill();

				this.nextText();
			}
			else if (gameSubPhase == 3)
				this.nextState();
			break;
		case 2:
			this.nextState();break;
		case 3:
			if (gameSubPhase == 1)
				this.girl.destroy();
				//this.girl = game.add.sprite(800, 660, 'girl');
				this.rat1 = game.add.sprite(430, 440, 'rat');
				this.rat2 = game.add.sprite(430, 403, 'rat');
				this.rat3 = game.add.sprite(430, 370, 'rat');
				this.rat4 = game.add.sprite(493, 440, 'rat');
				this.rat5 = game.add.sprite(493, 403, 'rat');
				this.rat6 = game.add.sprite(493, 370, 'rat');
				//pop rats
			if (gameSubPhase == 2)
			{	//kill rats
				this.rat1.frame = 2;
				this.rat2.frame = 2;
				this.rat3.frame = 2;
				this.rat4.frame = 2;
				this.rat5.frame = 2;
				this.rat6.frame = 2;				
				this.spr_bg = this.game.add.graphics(0, 0);
		        this.spr_bg.beginFill(0xFF3300, 1);
		        this.spr_bg.drawRect(0, 0, this.game.width, this.game.height);
		        this.spr_bg.alpha = 1;
		        this.spr_bg.endFill();

				this.nextText();
			}

			break;
	}

}
