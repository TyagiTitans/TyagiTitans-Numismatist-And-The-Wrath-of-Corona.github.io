
class LoadingScreen extends Phaser.Scene{
    constructor()
    {
        super("loadingScreen") 
        // key defined to refer this scene anywhere to refer this scene in different scene
    }

    preload()
    {
        this.load.image("bg0","Assets/images/sky.png");
        this.load.image("doller","Assets/images/doller.png");
        this.load.image("lifeimg","Assets/images/life.png");
        this.load.image("govr","Assets/images/gameover.png");
        this.load.image("bg1","Assets/images/bg1.png");
        this.load.image("bg2","Assets/images/bg2.png");
        this.load.image("bg3","Assets/images/bg3.png");
        this.load.image("bg4","Assets/images/bg4.png");
        this.load.image("bg5","Assets/images/bg5.jpg");
        this.load.image("skeleton","Assets/images/Skeleton.png");
        this.load.image("bush1","Assets/images/Bush (1).png");
        this.load.image("bush2","Assets/images/Bush (2).png");
        this.load.image("sun","Assets/images/sun.png");
        this.load.image("cloud","Assets/images/cloud.png");
        this.load.image("gameOver","Assets/images/gameover.png");
        this.load.image("corona","Assets/images/corona.png");
        this.load.image("platform","Assets/images/platform.png");
        this.load.audio("gameov", "Assets/audio/gameover.wav");
        this.load.audio("pain", "Assets/audio/dude_pain.mp3");
        this.load.audio("music", "Assets/audio/music.mp3");
        this.load.audio("jumpa", "Assets/audio/jump4.mp3");
        this.load.audio("collect", "Assets/audio/collect.mp3");
        this.load.spritesheet('player', 'Assets/images/dude.png', {frameWidth:32, frameHeight:48});
        this.load.spritesheet('coin', 'Assets/images/coin.png', {frameWidth:30, frameHeight:30});
        
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            
            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            
        
    }

    create()
    {        
        this.scene.start('gameScene');
    }
};

 
