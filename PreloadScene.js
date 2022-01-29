
class PreloadScene extends Phaser.Scene{
    constructor()
    {
        super("pregame")
    }

    preload()
    {
        this.load.image('logo',"Assets/images/dude.gif");
        this.load.image('corona',"Assets/images/corona.png");
        this.load.image('menubg',"Assets/images/menubg.png");
    }

    create()
    {
        this.add.image(0,0,"menubg").setOrigin(0,0).setScale(0.5,0.5);
        this.add.text(150,20,"NUMISMATIST",{
            fontSize:60,
            fontFamily:"Arial Black",
            stroke:"black",
            strokeThickness:5,
            fill:"red"
        })

        this.add.text(350,90,"AND",{
            fontSize:20,
            fontFamily:"Arial Black",
            stroke:"black",
            strokeThickness:5,
            fill:"red"
        })

        this.add.text(190,130,"THE WRATH OF CORONA",{
            fontSize:30,
            fontFamily:"Arial Black",
            stroke:"black",
            strokeThickness:5,
            fill:"red"
        })

        this.add.text(680,560,"TyagiTitans",{
            fontSize:15,
            fontFamily:"Arial Black",
            fill:"purple"
        })
        this.add.text(680,580,"version 1.5.1",{
            fontSize:15,
            fontFamily:"Arial Black",
            fill:"purple"
        })

        const title=this.add.text(400,420,"START NEW GAME",{
            fontSize:35,
            fontFamily:"Arial Black",
            stroke:"grey",
            strokeThickness:5,
            fill:"lightgreen"
        })
        title.setOrigin(0.5,0.5);
        this.add.image(360,280,'logo').setScale(0.8,0.8);
        this.add.image(460,280,'corona').setScale(2,2);
        const clk=this.add.text(400,500,"Click To Start",{
            fontSize:30,
            fontFamilly:"Arial Black",
            fill:"blue",
            stroke:"red",
            strokeThickness:1.5
        })
        clk.setOrigin(0.5,0.5);
        
        
        
        this.input.on("pointerdown",() => {
            this.scene.start('loadingScreen');
        });
       
        
    }
};

