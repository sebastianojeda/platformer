game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x,y,settings){
        settings.image = "player1-spritesheet";
        settings.spritewidth = "72";
        settings.spriteheight = "97";
        settings.width = 72;
        settings.height = 97;
        this.parent(x,y,settings);
        
        this.collidable = true;
        
        this.renderable.addAnimation("idle", [3]); 
        this.renderable.addAnimation("run", [3,4,5,6,7,8,9,10,11,12,13,14]);
        this.renderable.addAnimation("up", [2]);
        this.renderable.setCurrentAnimation("idle");
        
        this.setVelocity(10, 21);
        
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); 
    },
       
    update: function(deltatime){
        if(me.input.isKeyPressed("right")){
            
            this.vel.x += this.accel.x * me.timer.tick;
        }
        else if(me.input.isKeyPressed("left")){
            
            this.vel.x -= this.accel.x * me.timer.tick;
        }
        
           else{
            this.vel.x =0;
             this.renderable.setCurrentAnimation("run");
        }
        
         if(me.input.isKeyPressed("up")){
            if(!this.jumping && !this.falling) {
            this.vel.y = -this.maxVel.y * me.timer.tick;
            this.renderable.setCurrentAnimation("up");
            this.jumping = true;
        }   
        }
        
     
        var collision = me.game.world.collide(this);
        this.updateMovement();
        this.parent(deltatime);
        return true;
    }
});

game.LevelTrigger = me.ObjectEntity.extend({
    init: function(x, y, settings){
       this.parent(x, y, settings); 
       this.collidable = true;
       this.level = settings.level;
    },
            
    onCollision: function(){
       this.collidable = false;
       me.levelDirector.loadLevel(this.level);
       me.state.current().resetPlayer();
    }
    
});

