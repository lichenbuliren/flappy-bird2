var FlappyBird = FlappyBird || {};

FlappyBird.Play = function(){
    this.bg = null;
    this.bird = null;
    this.ground = null;
    this.pipeGroup = null;

};

FlappyBird.Play.prototype = {
    init: function(){
        console.log('this is Play state');
    },
    preload: function(){
        //当作背景的 tileSprite
        this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        this.pipeGroup = this.add.group();
        this.pipeGroup.enableBody = true;   //对所有组内创建的对象启用物理引擎

        this.bird = this.add.sprite(50,150,'bird');
        this.bird.animations.add('fly');
        this.bird.animations.play('fly',12,true);
        this.bird.anchor.setTo(0.5);
        // 开启鸟的物理引擎
        this.physics.enable(this.bird,Phaser.Physics.ARCADE);
        this.bird.body.gravity.y = 0;   // 初始化鸟的重力加速度为0，不然鸟会掉下来

        this.ground = this.add.tileSprite(0, this.world.height - 112, this.world.width, 112, 'ground');
        this.physics.enable(this.ground,Phaser.Physics.ARCADE);
        this.ground.body.immovable = true; //让地面在物理环境中固定不动

        this.readyText = this.add.image(this.world.centerX,40,'ready_text');
        this.readyText.anchor.setTo(0.5,0);
        this.playTip = this.add.image(this.world.centerX,this.world.centerY,'play_tip'); //提示点击屏幕的图片
        this.playTip.anchor.setTo(0.5);
        this.hasStarted = false; // 游戏是否启动
    },
    create: function(){

    },
    render: function(){

    }
}