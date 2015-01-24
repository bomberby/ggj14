var canAttack = true;
var lastPosition = 'left';

mainConfig.prototype.activateAnimation = function(direction, attack) {
    this.playerAttack.visible = attack;
    this.playerAttack.render = attack;
    
    if (direction != 'stop') {
        this.player.animations.play(direction);
    } else {
        this.player.animations.stop();
    };

    if (attack == true) {
        if (lastPosition == 'left') {
            this.player.frame =  7;
            this.playerAttack.frame = 6;
        } else {
            this.player.frame = 8;
            this.playerAttack.frame = 9;
        };
    };
};

mainConfig.prototype.checkSpaceBar = function() {
    if (this.hasText())
    {
        this.clearText();
        this.activateAnimation(false);
    }
    else {
        if(canAttack){
            this.activateAnimation(true);
            
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

mainConfig.prototype.moveDown = function() {
    this.player.body.acceleration.y = this.ACCELERATION;
};

mainConfig.prototype.moveLeft = function() {
    this.player.body.acceleration.x = -this.ACCELERATION;

    this.player.scale.x = 1;
    this.activateAnimation(false, 'left');

    lastPosition = 'left';
};

mainConfig.prototype.moveRight = function() {
    this.player.body.acceleration.x = this.ACCELERATION;

    this.activateAnimation(false, 'right');
    lastPosition = 'right';
};

mainConfig.prototype.moveUp = function() {
    this.player.body.acceleration.y = -this.ACCELERATION;
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

mainConfig.prototype.stopXMovement = function() {
    this.player.body.acceleration.x = 0;
    this.player.body.velocity.x = 0;
    this.activateAnimation(false, 'stop');
};

mainConfig.prototype.stopYMovement = function() {
    this.player.body.acceleration.y = 0;
    this.player.body.velocity.y = 0;
};