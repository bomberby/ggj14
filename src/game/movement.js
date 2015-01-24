var canAttack = true;
var lastPosition = 'left';

mainConfig.prototype.checkOverlap = function(obstacle) {
    debugger
    var boundsA = this.player.getBounds();
    var boundsB = obstacle.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
};

mainConfig.prototype.checkSpaceBar = function() {
    //todo space is dependant of state in it's own phase
    if (gamePhase == 0)
    {
        this.nextState();
    };

    if (this.hasText())
    {
        this.clearText();
        this.handleAnimations(false);
    }
    else {
        switch (gamePhase)
        {
            case 1: this.nextSubState();break;
            case 2: this.nextSubState();break;
        }

        if(canAttack){
            this.handleAnimations(true);
            
            canAttack = false;
            game.time.events.add(300, (function() {
                canAttack = true;
            }), this);
        }
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

mainConfig.prototype.handleAnimations = function(attack) {
    if (attack == false) {
        this.playerAttack.visible = false;
        this.playerAttack.render = false;
    } else if (attack == true) {
        this.playerAttack.visible = true;
        this.playerAttack.render = true;

        if (lastPosition == 'left') {
            this.player.frame = 7;
            this.playerAttack.frame = 6;
        } else if (lastPosition == 'right') {
            this.player.frame = 11;
            this.playerAttack.frame = 12;
        };
    };
};

mainConfig.prototype.moveDown = function() {
    this.player.body.acceleration.y = this.ACCELERATION;
    this.handleAnimations(false);
};

mainConfig.prototype.moveLeft = function() {
    this.player.body.acceleration.x = -this.ACCELERATION;

    this.player.scale.x = 1;
    lastPosition = 'left';
    this.player.animations.play(lastPosition);
    this.handleAnimations(false);
};

mainConfig.prototype.moveRight = function() {
    this.player.body.acceleration.x = this.ACCELERATION;
    lastPosition = 'right';
    this.player.animations.play(lastPosition);
    this.handleAnimations(false);
};

mainConfig.prototype.moveUp = function() {
    this.player.body.acceleration.y = -this.ACCELERATION;
    this.handleAnimations(false);
};

mainConfig.prototype.shouldMoveDown = function() {
    var shouldMove = false;

    shouldMove = this.dpad.down.isDown;
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.y < game.height*4);

    return shouldMove;
};

mainConfig.prototype.shouldMoveLeft = function() {
    var shouldMove = false;

    shouldMove = this.dpad.left.isDown;
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.x < game.width/4);

    return shouldMove;
};

mainConfig.prototype.shouldMoveRight = function() {
    var shouldMove = false;

    shouldMove = this.dpad.right.isDown;
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.x > game.width/2 + game.width/4);

    return shouldMove;
};

mainConfig.prototype.shouldMoveUp = function() {
    var shouldMove = false;

    shouldMove = this.dpad.up.isDown;
    shouldMove |= (game.input.activePointer.isDown &&
        game.input.activePointer.y < game.height/4);

    return shouldMove;
};

mainConfig.prototype.stopPlayer = function() {
    this.stopXMovement();
    this.stopYMovement();
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