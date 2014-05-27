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
         this.renderable.flipX(false);
         this.vel.x += this.accel.x * me.timer.tick;
 }
        else if(me.input.isKeyPressed("left")){
            this.renderable.flipX(true);
            this.vel.x -= this.accel.x * me.timer.tick;
 }
        
           else{
            this.vel.x =0;
            this.renderable.setCurrentAnimation("run");
 }
        
         if(me.input.isKeyPressed("jump")){
             this.jumping = true;
           this.mutipleJump = (this.vel.y === 0)?1:this.mutipleJump;
	 if (this.mutipleJump<=2) {
				// easy 'math' for double jump
	   this.vel.y -= (this.maxVel.y * this.mutipleJump++) * me.timer.tick;
            
  }   
  }
      
  {
        var collision = me.game.world.collide(this);
        this.updateMovement();
        this.parent(deltatime);
        return true;
 }
  

 }
 });

game.LevelTrigger = me.ObjectEntity.extend({
    init: function(x, y, settings){
       this.parent(x, y, settings); 
       this.collidable = true;
       this.level = settings.level;
       this.xSpawn = settings.xSpawn;
       this.ySpawn = settings.ySpawn;
    },
            
    onCollision: function(){
       this.collidable = false;
       var x = this.xSpawn;
       var y = this.ySpawn;  
       me.levelDirector.loadLevel(this.level);
       me.state.current().resetPlayer(x, y);
    }
    
});


game.SlimeEntity = me.ObjectEntity.extend({
    init: function(x,y,settings){
        settings.image = "slime-spritesheet";
        settings.spritewidth = "60";
        settings.spriteheight = "28";
        settings.width = 60;
        settings.height = 28;
        this.parent(x,y,settings);
        
        this.collidable = true;
        
        this.renderable.addAnimation("idle", [3]); 
        this.renderable.addAnimation("run", [3,4,5,6,7,8,9,10,11,12,13,14]);
        this.renderable.setCurrentAnimation("idle");
        
        this.setVelocity(10, 21);
        
      
    },
       
    update: function(deltatime){
    this.previousVelocity = this.cloneVel();
    
      
  {
        this.updateMovement();
        this.parent(deltatime);
        return true;
 }
  

 }
 });
 
 
 /*game.CoinEntity = me.CollectableEntity.extend({
    init: function(x, y){ 
       settings.image = "item-spritesheet";
       settings.spritewidth = "70";
       settings.spriteheight = "70";
        this.parent(x, y, settings);
        this.renderable.addAnimation("coin", [13,14,15]);
        this.renderable.setCurrentAnimation("coin");
    
    },
    
    onCollision: function(){
      game.data.score += 1;
      this.collidable = false;
      me.game.world.removeChild(this);

    }       
 });*/