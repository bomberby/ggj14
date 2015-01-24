var gamePhase = 1

mainConfig.prototype.nextState = function(){
	gamePhase +=1;
		switch(gamePhase)
	{
		case 0:  // phase 0 -splash
			break;
		case 1:  // phase 1 - forest view
			break;
	}
}
mainConfig.prototype.stateUpdate = function(){
	switch(gamePhase)
	{
		case 0:  // phase 0 -splash
			break;
		case 1:  // phase 1 - forest view
			game.physics.arcade.collide(this.player, this.layer);

		    this.player.body.velocity.x = 0;
		    this.player.body.velocity.y = 0;

		    this.checkXMovement();
		    this.checkYMomvment();
		    break;
	}
}

	
