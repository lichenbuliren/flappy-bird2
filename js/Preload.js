var FlappyBird = FlappyBird || {};

FlappyBird.Preload = function() {
    this.loadingSprite = null;
};

FlappyBird.Preload.prototype = {
    init: function() {
        console.log('this is Preload state');
        var style = {
            font: "16px Arial",
            fill: "#ffffff",
            align: "center"
        };
        this.text = this.add.text(this.world.centerX, this.world.centerY + 50, "Loading: 0%", style);
        this.text.anchor.x = 0.5;
    },
    preload: function() {
        // 创建一个加载动画精灵
        this.bird = this.add.sprite(this.world.centerX, this.world.centerY, 'bird');
        this.bird.animations.add('fly');
        this.add.tween(this.bird).to({
            y: this.world.centerY + 20
        },500,null,true,0,Number.MAX_VALUE, true);
        this.bird.anchor.setTo(0.5);

        //以下为要加载的资源
        this.load.image('background', './assets/background.png'); //游戏背景图
        this.load.image('ground', './assets/ground.png'); //地面
        this.load.image('title', './assets/title.png'); //游戏标题
        this.load.image('btn', './assets/start-button.png'); //按钮
        this.load.spritesheet('pipe', './assets/pipes.png', 54, 320, 2); //管道
        this.load.bitmapFont('flappy_font', './assets/fonts/flappyfont/flappyfont.png', './assets/fonts/flappyfont/flappyfont.fnt'); //显示分数的字体
        this.load.audio('fly_sound', './assets/flap.wav'); //飞翔的音效
        this.load.audio('score_sound', './assets/score.wav'); //得分的音效
        this.load.audio('hit_pipe_sound', './assets/pipe-hit.wav'); //撞击管道的音效
        this.load.audio('hit_ground_sound', './assets/ouch.wav'); //撞击地面的音效

        this.load.image('ready_text', './assets/get-ready.png'); //get ready图片
        this.load.image('play_tip', './assets/instructions.png'); //玩法提示图片
        this.load.image('game_over', './assets/gameover.png'); //gameover图片
        this.load.image('score_board', './assets/scoreboard.png'); //得分板

        this.load.onFileComplete.add(this.fileLoaded, this);
    },
    fileLoaded: function(progress) {
        this.text.text = "Loading: " + progress + "%";
    },
    loadUpdate: function() {
        this.bird.play('fly',12,true);
    },
    create: function() {
        this.state.start('Menu');
    }
};