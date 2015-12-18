var FlappyBird = FlappyBird || {};

FlappyBird.Preload = function(){
    this.loadingSprite = null;
};

FlappyBird.Preload.prototype = {
    init: function(){
        console.log('this is Preload state');
    },
    preload: function(){
        // 创建一个进度条精灵
        this.loadingSprite = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'loading');
        this.loadingSprite.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.loadingSprite);

        //以下为要加载的资源
        this.load.image('background','./assets/background.png'); //游戏背景图
        this.load.image('ground','./assets/ground.png'); //地面
        this.load.image('title','./assets/title.png'); //游戏标题
        this.load.spritesheet('bird','./assets/bird.png',34,24,3); //鸟
        this.load.image('btn','./assets/start-button.png');  //按钮
        this.load.spritesheet('pipe','./assets/pipes.png',54,320,2); //管道
        this.load.bitmapFont('flappy_font', './assets/fonts/flappyfont/flappyfont.png', './assets/fonts/flappyfont/flappyfont.fnt');//显示分数的字体
        this.load.audio('fly_sound', './assets/flap.wav');//飞翔的音效
        this.load.audio('score_sound', './assets/score.wav');//得分的音效
        this.load.audio('hit_pipe_sound', './assets/pipe-hit.wav'); //撞击管道的音效
        this.load.audio('hit_ground_sound', './assets/ouch.wav'); //撞击地面的音效

        this.load.image('ready_text','./assets/get-ready.png'); //get ready图片
        this.load.image('play_tip','./assets/instructions.png'); //玩法提示图片
        this.load.image('game_over','./assets/gameover.png'); //gameover图片
        this.load.image('score_board','./assets/scoreboard.png'); //得分板
    },
    create: function(){
        this.state.start('Menu');
    }
};