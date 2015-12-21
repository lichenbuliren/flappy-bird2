var FlappyBird = FlappyBird || {};

FlappyBird.Play = function() {
    this.bg = null;
    this.bird = null;
    this.ground = null;
    this.pipeGroup = null;
    this.gameSpeed = 200; // 游戏速度
    this.gameIsOver = false; // 游戏是否结束
    this.hasHitGround = false; // 是否撞击地面
    this.hasStarted = false;
    this.score = 0; // 初始得分
};

FlappyBird.Play.prototype = {
    init: function() {

    },
    preload: function() {

    },
    create: function() {
        //当作背景的 tileSprite
        this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        this.pipeGroup = this.add.group();
        this.pipeGroup.enableBody = true; //对所有组内创建的对象启用物理引擎

        this.bird = this.add.sprite(50, 150, 'bird');
        this.bird.animations.add('fly');
        this.bird.animations.play('fly', 12, true);
        this.bird.anchor.setTo(0.5);
        // 开启鸟的物理引擎
        this.physics.enable(this.bird, Phaser.Physics.ARCADE);
        this.bird.body.gravity.y = 0; // 初始化鸟的重力加速度为0，不然鸟会掉下来

        this.ground = this.add.tileSprite(0, this.world.height - 112, this.world.width, 112, 'ground');
        this.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true; //让地面在物理环境中固定不动

        this.soundFly = this.add.audio('fly_sound');
        this.soundScore = this.add.audio('score_sound');
        this.soundHitPipe = this.add.audio('hit_pipe_sound');
        this.soundHitGound = this.add.audio('hit_ground_sound');
        this.scoreText = this.add.bitmapText(this.world.centerX - 20, 30, 'flappy_font', '0', 36);

        this.readyText = this.add.image(this.world.centerX, 40, 'ready_text');
        this.readyText.anchor.setTo(0.5, 0);
        this.playTip = this.add.image(this.world.centerX, this.world.centerY, 'play_tip'); //提示点击屏幕的图片
        this.playTip.anchor.setTo(0.5);
        this.time.events.loop(900, this.generatePipes, this);
        this.time.events.stop(false);

        this.input.onDown.addOnce(this.startGame, this);
        // 等待音频加载完全
        // this.sound.setDecodedCallback([
        //     this.soundFly, this.scoreSound, this.hitPipeSound, this.hitGoundSound
        // ],function(){

        // },this);
    },
    startGame: function() {
        this.hasStarted = true;
        this.bg.autoScroll(-(this.gameSpeed / 10), 0); // 背景移动
        this.ground.autoScroll(-(this.gameSpeed / 20), 0);
        this.bird.body.gravity.y = 1150; // 设置鸟的重力
        this.playTip.destroy();
        this.readyText.destroy();
        this.input.onDown.add(this.fly, this); // 绑定点击事件
        this.time.events.start(); // 启动时钟事件，开始制造管道
    },
    fly: function() {
        this.bird.body.velocity.y = -350; // 飞翔，实质上是给鸟设置一个向上的速度
        this.add.tween(this.bird).to({
            angle: -20
        }, 100, null, true, 0, 0, false); // 上升时头朝上的动画
        this.soundFly.play();
    },
    generatePipes: function(gap) {
        // 生成管道
        gap = gap || 100; //上下管道之间的缝隙宽度
        var position = (505 - 320 - gap) + Math.floor((505 - 112 - 30 - gap - 505 + 320 + gap) * Math.random()); //计算出一个上下管道之间的间隙的随机位置
        var topPipeY = position - 360; // 上方管道位置
        var bottomPipeY = position + gap; // 下方管道位置

        if (this.resetPipe(topPipeY, bottomPipeY)) return; // 如果超出边界的管道，则重置他们

        var topPipe = this.add.sprite(this.world.width, topPipeY, 'pipe', 0, this.pipeGroup);
        // topPipe.immovable = true;
        var bottomPipe = this.add.sprite(this.world.width, bottomPipeY, 'pipe', 1, this.pipeGroup);
        // bottomPipe.immovable = true;
        this.pipeGroup.setAll('checkWorldBounds', true); // 边界监测
        this.pipeGroup.setAll('outOfBoundsKill', true); // 超出边界自动kill
        this.pipeGroup.setAll('body.velocity.x', -this.gameSpeed); // 设置管道的运动的速度
    },
    resetPipe: function(topPipeY, bottomPipeY) {
        var i = 0;
        this.pipeGroup.forEachDead(function(pipe) {
            console.log(pipe);
            if (pipe.y <= 0) {
                pipe.reset(this.world.width, topPipeY);
                pipe.hasScored = false;
            } else {
                pipe.reset(this.world.width, bottomPipeY); // 重置到初始位置
            }

            pipe.body.velocity.x = -this.gameSpeed;
            i++;
        }, this);
        return i == 2;
    },
    update: function() {
        if (!this.hasStarted) return;
        this.physics.arcade.collide(this.bird, this.ground, this.hitGound, null, this);
        this.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this);
        if(this.bird.angle < 90) this.bird.angle += 2.5; //下降时头朝下
        this.pipeGroup.forEachExists(this.checkScore,this); //分数检测和更新
    },
    hitPipe: function() {
        if (this.gameIsOver) return;
        this.soundHitPipe.play();
        this.gameOver();
    },
    hitGround: function() {
        if (this.hasHitGround) return;
        this.hasHitGround = true;
        this.soundHitGound.play();
        this.gameOver(true);
    },
    gameOver: function(show_text) {
        this.gameIsOver = true;
        this.stopGame();
        if (show_text) this.showGameOverText();
    },
    stopGame: function(){
        this.bg.stopScroll();
        this.ground.stopScroll();
        this.pipeGroup.forEachExists(function(pipe){
            pipe.body.velocity.x = 0;
        }, this);
        this.bird.animations.stop('fly', 0);
        this.input.onDown.remove(this.fly,this);
        this.time.events.stop(true);
    },
    showGameOverText: function() {
        this.scoreText.destroy();
        this.bestScore = this.bestScore || 0;
        if (this.score > this.bestScore) {
            this.bestScore = this.score; // 最好分数
        }

        this.gameOverGrounp = this.add.group(); //添加一个组
        var gameOverText = this.gameOverGrounp.create(this.world.centerX, 0, 'game_over');
        var scoreBoard = this.gameOverGrounp.create(this.world.centerX, 70, 'score_board');
        var currentScoreText = this.add.bitmapText(this.world.centerX + 60, 105, 'flappy_font', this.score + '', 20, this.thisOverGroup); //当前分数
        var bestScoreText = this.add.bitmapText(this.world.centerX + 60, 153, 'flappy_font', this.bestScore + '', 20, this.gameOverGroup); //最好分数
        var replayBtn = this.add.button(this.world.centerX, 210, 'btn', function() { //重玩按钮
            this.state.start('play');
        }, this, null, null, null, null, this.gameOverGroup);
        gameOverText.anchor.setTo(0.5, 0);
        scoreboard.anchor.setTo(0.5, 0);
        replayBtn.anchor.setTo(0.5, 0);
        this.gameOverGroup.y = 30;
    },
    checkScore: function(pipe) {
        if (!pipe.hasScored && pipe.y <= 0 && pipe.x <= this.bird.x - 17 - 54) {
            pipe.hasScored = true;
            this.scoreText.text = ++this.score;
            this.soundScore.play();
            return true;
        }
        return false;
    }
}