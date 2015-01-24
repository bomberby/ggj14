mainConfig.prototype.checkSpaceBar = function() {
    if (this.hasText())
    {
        this.clearText();
    }
    else {
        // this.bubbleText("Booki is Primak in the BetShoeva");
    }
};

mainConfig.prototype.checkXMovement = function() {
    if (this.shouldMoveLeft()) {
        this.moveLeft();
    } else if (this.shouldMoveRight()) {
        this.moveRight();
    } else {
        this.stopXMovement();
    }
};

mainConfig.prototype.checkYMomvment = function() {
    if (this.shouldMoveUp()) {
        this.moveUp();
    } else if (this.shouldMoveDown()) {
        this.moveDown();
    } else {
        this.stopYMovement();
    }   
};

mainConfig.prototype.moveDown = function() {
    this.player.body.acceleration.y = this.ACCELERATION;
};

mainConfig.prototype.moveLeft = function() {
    this.player.body.acceleration.x = -this.ACCELERATION;
    this.player.scale.x = 1;
    this.player.animations.play("left");
};

mainConfig.prototype.moveRight = function() {
    this.player.body.acceleration.x = this.ACCELERATION;
    this.player.animations.play("right");
};

mainConfig.prototype.moveUp = function() {
    this.player.body.acceleration.y = -this.ACCELERATION;
};

mainConfig.prototype.shouldMoveDown = function() {
    var shouldMove = false;

    shouldMove = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.y < game.height*4);

    return shouldMove;
};

mainConfig.prototype.shouldMoveLeft = function() {
    var shouldMove = false;

    shouldMove = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.x < game.width/4);

    return shouldMove;
};

mainConfig.prototype.shouldMoveRight = function() {
    var shouldMove = false;

    shouldMove = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.x > game.width/2 + game.width/4);

    return shouldMove;
};

mainConfig.prototype.shouldMoveUp = function() {
    var shouldMove = false;

    shouldMove = this.input.keyboard.isDown(Phaser.Keyboard.UP);
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.y < game.height/4);

    return shouldMove;
};

mainConfig.prototype.stopXMovement = function() {
    this.player.body.acceleration.x = 0;
    this.player.body.velocity.x = 0;
    this.player.animations.stop();
};

mainConfig.prototype.stopYMovement = function() {
    this.player.body.acceleration.y = 0;
    this.player.body.velocity.y = 0;
};