var TopDownGame = TopDownGame || {};
TopDownGame.Game = function(){};

var dirOverride = false;
var dirLeft;
var dirUp;
var dirRight;
var dirDown;
var spaceBar;
var swordAttack;

TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    this.map.addTilesetImage('atlasTileSet', 'gameTiles');

    this.backgroundlayer = this.map.createLayer('layer1');
    this.blockedLayer = this.map.createLayer('layer2');

    this.map.setCollisionBetween(1, 2000, true, 'layer2');

    // this.backgroundlayer.resizeWorld();

    // this.createItems();
    // this.createDoors();

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objects')
    this.tile = this.game.add.sprite(result[0].x,result[0].y, 'tile');
    this.tile.alpha = 0;
    this.player = this.game.add.sprite(result[0].x,result[0].y,'stand')
    this.player.scale.setTo(.25)
    this.player.anchor.setTo(.42,.62)
    this.game.physics.arcade.enable(this.tile);
    this.game.physics.arcade.enable(this.player);

    // this.game.camera.follow(this.player);

    // this.cursors = this.game.input.keyboard.createCursorKeys();

    this.move = [
      this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      this.game.input.keyboard.addKey(Phaser.Keyboard.S),
    ]
    this.dir = [
      this.game.input.keyboard.addKey(Phaser.Keyboard.J),
      this.game.input.keyboard.addKey(Phaser.Keyboard.I),
      this.game.input.keyboard.addKey(Phaser.Keyboard.L),
      this.game.input.keyboard.addKey(Phaser.Keyboard.K),
    ]
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.swing = false;
    this.moving = false;




//============================ SWORD ========
    this.swordAttack = [
      this.game.add.sprite(result[0].x,result[0].y,'swingLeft'),
      this.game.add.sprite(result[0].x,result[0].y,'swingLeftU'),
      this.game.add.sprite(result[0].x,result[0].y,'swingUp'),
      this.game.add.sprite(result[0].x,result[0].y,'swingRightU'),
      this.game.add.sprite(result[0].x,result[0].y,'swingRight'),
      this.game.add.sprite(result[0].x,result[0].y,'swingRightD'),
      this.game.add.sprite(result[0].x,result[0].y,'swingDown'),
      this.game.add.sprite(result[0].x,result[0].y,'swingLeftD'),
    ]
    this.swordAttackAnime = [
      this.swordAttack[0].animations.add('swingLeft'),
      this.swordAttack[1].animations.add('swingLeftU'),
      this.swordAttack[2].animations.add('swingUp'),
      this.swordAttack[3].animations.add('swingRightU'),
      this.swordAttack[4].animations.add('swingRight'),
      this.swordAttack[5].animations.add('swingRightDown'),
      this.swordAttack[6].animations.add('swingDown'),
      this.swordAttack[7].animations.add('swingLeftDown'),
    ]

    //set position of animation sprites
    this.swordAttack.forEach(function(el){
      el.scale.setTo(.25);
      el.anchor.setTo(.419,.62);
      el.alpha = 0;
    })

    this.swordAttack[0].anchor.setTo(.42,.62);
    this.swordAttack[1].anchor.setTo(.413,.62);

    this.swordAttackAnime.forEach(function(el){
      el.onStart.add(this.swingStarted,this)
      el.onComplete.add(this.swingComplete,this)
    }.bind(this))



//========================== RUN =======
    // this.runH = [
    //   this.game.add.sprite(result[0].x,result[0].y,'runLeftH'),
    // ]
    // this.runHAnime = [
    //   this.runH[0].animations.add('runLeftH'),
    // ]


    // this.runHAnime.forEach(function(el){
    //   el.onStart.add(this.runStarted,this)
    //   el.onComplete.add(this.runComplete,this)
    // }.bind(this))



  },
  swingStarted: function(sprite,animation){
    this.swing = true;
    this.swordAttack.forEach(function(el,index){
      if(this.player.frame === index){
        el.alpha = 1;
        this.player.alpha = 0;
      }
    }.bind(this))
  },
  swingComplete: function(){
    this.swing = false;
    this.swordAttack.forEach(function(el,index){
      if(this.player.frame === index){
        el.alpha = 0;
        this.player.alpha = 1;
      }
    }.bind(this))
  },
  runStarted: function(sprite,animation){
    // this.runH.forEach(function(el,index){
      // if(this.player.frame === index){
        this.runH[0].alpha = 1;
        this.player.alpha = 0;
      // }
    // }.bind(this))
  },
  runComplete: function(){
    // this.runH.forEach(function(el,index){
      // if(this.player.frame === index){
        this.runH[0].alpha = 0;
        this.player.alpha = 1;
      // }
    // }.bind(this))
  },
  // //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.tile, this.blockedLayer);
    // this.game.physics.arcade.overlap(this.tile, this.items, this.collect, null, this);
    // this.game.physics.arcade.overlap(this.tile, this.doors, this.enterDoor, null, this);

    //player movement

    //player movement
    this.tile.speed = 90
    this.tile.body.velocity.y = 0;
    this.tile.body.velocity.x = 0;

    //left
    if(this.move[0].isDown) {
      this.moving = true;
      this.player.frame = 0;
      this.tile.body.velocity.x -= this.tile.speed;
    }
    //up
    if(this.move[1].isDown) {
      this.moving = true;
      this.player.frame = 2;
      this.tile.body.velocity.y -= this.tile.speed;
    }
    //right
    if(this.move[2].isDown) {
      this.moving = true;
      this.player.frame = 4;
      this.tile.body.velocity.x += this.tile.speed;
    }
    //down
    if(this.move[3].isDown) {
      this.moving = true;
      this.player.frame = 6;
      this.tile.body.velocity.y += this.tile.speed;
    }

    //left up
    if(this.move[0].isDown && this.move[1].isDown){
      this.moving = true;
      this.player.frame = 1;
    }
    //right up
    if(this.move[2].isDown && this.move[1].isDown){
      this.moving = true;
      this.player.frame = 3;
    }
    //right down
    if(this.move[2].isDown && this.move[3].isDown){
      this.moving = true;
      this.player.frame = 5;
    }
    //left down
    if(this.move[0].isDown && this.move[3].isDown){
      this.moving = true;
      this.player.frame = 7;
    }

    this.player.x = this.tile.x;
    this.player.y = this.tile.y;

    this.swordAttack.forEach(function(el){
      el.x = this.player.x;
      el.y = this.player.y;
    }.bind(this))

    // this.runH.forEach(function(el){
    //   this.runHAnime[0].x = this.player.x;
    //   this.runHAnime[0].y = this.player.y;
    // }.bind(this))

    function dir(){
      if(this.dir[0].isDown && !this.swing){this.player.frame = 0}
      if(this.dir[1].isDown && !this.swing){this.player.frame = 2}
      if(this.dir[2].isDown && !this.swing){this.player.frame = 4}
      if(this.dir[3].isDown && !this.swing){this.player.frame = 6}

      if(this.dir[0].isDown && this.dir[1].isDown && !this.swing){this.player.frame = 1}
      if(this.dir[2].isDown && this.dir[1].isDown && !this.swing){this.player.frame = 3}
      if(this.dir[2].isDown && this.dir[3].isDown && !this.swing){this.player.frame = 5}
      if(this.dir[0].isDown && this.dir[3].isDown && !this.swing){this.player.frame = 7}
    };
    dir.call(this);

    this.swordAttackAnime.forEach(function(el,index){
      if(this.spaceBar.onDown && this.player.frame === index){
        el.play(12, false);
      }
    }.bind(this))


    // if(this.move[1].isDown){
    //   this.runHAnime[0].play(12,true);
    // }

    // this.runHAnime.forEach(function(el,index){
    //   if(this.move[0].isDown && this.player.frame === index){
    //     el.play(12, true);
    //   }
    // }.bind(this))
  },
  // //create a sprite from an object
  // createFromTiledObject: function(element, group) {
  //   var sprite = group.create(element.x, element.y, element.properties.sprite);
  //
  //     //copy all properties to the sprite
  //     Object.keys(element.properties).forEach(function(key){
  //       sprite[key] = element.properties[key];
  //     });
  // },
  // collect: function(player, collectable) {
  //   console.log('yummy!');
  //
  //   //remove sprite
  //   collectable.destroy();
  // },
  // enterDoor: function(player, door) {
  //   console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  // },
  // createItems: function() {
  //   //create items
  //   this.items = this.game.add.group();
  //   this.items.enableBody = true;
  //   var item;
  //   result = this.findObjectsByType('item', this.map, 'objects');
  //   result.forEach(function(element){
  //     this.createFromTiledObject(element, this.items);
  //   }, this);
  // },
  // createDoors: function() {
  //   //create doors
  //   this.doors = this.game.add.group();
  //   this.doors.enableBody = true;
  //   result = this.findObjectsByType('door', this.map, 'objects');
  //
  //   result.forEach(function(element){
  //     this.createFromTiledObject(element, this.doors);
  //   }, this);
  // },
  //
};
