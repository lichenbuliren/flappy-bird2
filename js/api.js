/**
 * Created by Heaven on 12/22/15.
 */
/**
 * 创建一个游戏世界,这是整个游戏发生的舞台
 * @param width number | string 舞台的宽度,如果给的是字符串,则必须是0到100直接的,它将作为父容器的百分比计算
 * @param height number | string 同上,作为舞台的高度
 * @param renderer 渲染模式,可选Phaser.AUTO(程序自动判断),Phaser.CANVAS,Phaser.WEBGL,Phaser.HEADLESS(no rendering at all)
 * @param state 状态,继承至Phaser.State的状态,默认null
 * @param transparent boolean 是否使用透明的CANVAS背景,默认false
 * @param antialias 是否开启抗锯齿,默认true
 * @param physicsConfig 物理引擎类型,默认null
 * @type {Game}
 */
var game = new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

/**
 * 加载一个动画精灵
 * @param key 唯一key值
 * @param url 资源地址,如果为Null或者undefined,则会默认认为是key.png,
 * @param frameWidth 精灵一帧的宽度
 * @param frameHeight 精灵一帧的高度
 * @param frameMax 精灵动画最大帧数,也就是我们的精灵动画的帧数,根据实际的spite图来确定
 * @param margin 每一帧之间的外边距
 * @param spacing 每一帧的空白边距
 *
 */
game.load.spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing);

/**
 * 加载一个图片资源文件
 * @param key string 唯一key值
 * @param url string 资源地址
 * @param overwrite boolean 是否覆盖,当加载队列当中找了了和key值相同的队列任务且还未加载时,如果overwrite为true,则当前队列任务会覆盖原来相同key值的任务
 */
game.load.image(key,url,overwrite);