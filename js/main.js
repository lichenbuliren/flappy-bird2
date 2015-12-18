var FlappyBird = FlappyBird || {};

FlappyBird.game = new Phaser.Game(288,505,Phaser.CANVAS);
FlappyBird.game.state.add('Boot',FlappyBird.Boot);
FlappyBird.game.state.add('Preload',FlappyBird.Preload);
FlappyBird.game.state.add('Menu',FlappyBird.Menu);
FlappyBird.game.state.add('Play',FlappyBird.Play);

FlappyBird.game.state.start('Boot');