mainConfig.prototype.checkXMovement = function() {
    if (this.shouldMoveLeft()) {
        this.player.body.acceleration.x = -this.ACCELERATION;
        this.player.scale.x = 1;
    } else if (this.shouldMoveRight()) {
        this.player.body.acceleration.x = this.ACCELERATION;
        this.player.scale.x = -1;
    } else {
        this.player.body.acceleration.x = 0;
        this.player.body.velocity.x = 0;
    }
};

mainConfig.prototype.checkYMomvment = function() {
    if (this.shouldMoveUp()) {
        this.player.body.acceleration.y = -this.ACCELERATION;
    } else if (this.shouldMoveDown()) {
        this.player.body.acceleration.y = this.ACCELERATION;
    } else {
        this.player.body.acceleration.y = 0;
        this.player.body.velocity.y = 0;
    }   
};

mainConfig.prototype.checkSpaceBar = function() {
    if (this.shouldSpaceBar()) {
        if (this.hasText())
        {
            this.clearText();
        }
        else {
            this.bubbleText("Booki is Primak in the BetShoeva");
        }
    }
};

mainConfig.prototype.shouldSpaceBar = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);

    return isActive;
};

mainConfig.prototype.shouldMoveDown = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.y < game.height*4);

    return isActive;
};

mainConfig.prototype.shouldMoveLeft = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.x < game.width/4);

    return isActive;
};

mainConfig.prototype.shouldMoveUp = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.y < game.height/4);

    return isActive;
};

mainConfig.prototype.shouldMoveRight = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.x > game.width/2 + game.width/4);

    return isActive;
};