let game;

let config= {
    width:800,
    height:600,
    type:Phaser.AUTO,
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y:300},
            // debug:true
        }
    },
    scene:[PreloadScene,LoadingScreen,GameScene]
}

game = new Phaser.Game(config);