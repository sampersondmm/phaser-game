var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('level1', 'tilemaps/full.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'images/atlasTileSet.png');
    this.load.image('demon', 'images/demon.png');
    this.load.image('tile', 'images/tile.png');
    this.load.spritesheet('stand', 'images/stand.png', 900, 900, 8);
    this.load.spritesheet('swingLeft', 'images/swingLeft2.png', 900, 900,12);
    this.load.spritesheet('swingLeftU', 'images/swingLeftU2.png', 900, 900, 12);
    this.load.spritesheet('swingUp', 'images/swingUp2.png', 900, 900, 12);
    this.load.spritesheet('swingRightU', 'images/swingRightU2.png', 900, 900, 12);
    this.load.spritesheet('swingRight', 'images/swingRight2.png', 900, 900, 12);
    this.load.spritesheet('swingRightD', 'images/swingRightD2.png', 900, 900, 12);
    this.load.spritesheet('swingDown', 'images/swingDown2.png', 900, 900, 12);
    this.load.spritesheet('swingLeftD', 'images/swingLeftD2.png', 900, 900, 12);

    this.load.spritesheet('runLeftH', 'images/runLeftH.png', 900, 900, 8);

  },
  create: function() {
    this.state.start('Game');
  }
};
