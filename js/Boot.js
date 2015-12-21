var FlappyBird = FlappyBird || {};

FlappyBird.Boot = function(){};

FlappyBird.Boot.prototype = {
    init: function(){
        console.log('this is Boot state');
    },
    preload: function(){
        // this.load.image('loading','../assets/preloader.gif');
        this.load.spritesheet('bird','./assets/bird.png',34,24,3); //鸟
    },
    create: function(){
        // 设置舞台背景色
        this.game.stage.backgroundColor = '#0d0222';
        // 设置全屏适配模式
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // 强制竖屏
        this.scale.forcePortrait = true;
        // 开启Physics.ARCADE物理引擎
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Preload');
    }
};