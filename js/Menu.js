var FlappyBird = FlappyBird || {};

FlappyBird.Menu = function() {
    this.bg = null;
    this.ground = null;
    this.titleGroup = null;
};

FlappyBird.Menu.prototype = {
    init: function() {
        console.log('this is Menu state');
    },
    preload: function() {
        //当作背景的 tileSprite
        this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        this.ground = this.add.tileSprite(0, this.world.height - 112, this.world.width, 112, 'ground');
        this.bg.autoScroll(-10, 0);
        this.ground.autoScroll(-100, 0);
    },
    create: function() {
        // 存放标题的组，由文字和小鸟组成
        this.titleGroup = this.add.group();
        this.titleGroup.create(0, 0, 'title');
        var bird = this.titleGroup.create(190, 10, 'bird');
        bird.animations.add('fly');
        bird.animations.play('fly', 12, true);
        this.titleGroup.x = this.world.centerX - this.titleGroup.width / 2;
        this.titleGroup.y = 50;
        // to(properties, duration, ease, autoStart, delay, repeat, yoyo)
        // properties :  一个js对象，里面包含着需要进行动画的属性，如上面代码中的 {y:120}
        // duration : 补间动画持续的时间，单位为毫秒
        // ease : 缓动函数，默认为匀速动画
        // autoStart : 是否自动开始
        // delay : 动画开始前的延迟时间，单位为毫秒
        // repeat : 动画重复的次数，如果需要动画永远循环，则把该值设为 Number.MAX_VALUE
        // yoyo : 如果该值为true,则动画会自动反转
        this.add.tween(this.titleGroup).to({
            y: 60
        }, 1500, null, true, 0, Number.MAX_VALUE, true); // 添加一个上下移动的动画，无限循环

        this.btn = this.add.button(this.world.centerX, this.world.centerY, 'btn', function() {
            this.game.state.start('Play');
        });

        this.btn.anchor.setTo(0.5);
    },
    render: function() {

    }
}