
// https://phaser.io/tutorials/making-your-first-phaser-3-game/part1


class GameScene extends Phaser.Scene{
   
    constructor(player=null,cursor=null,platforms=null,coins=null,coronas=null,gameOver=null,score=null,scoreText=null,ccoin=null,gover=null,jmp=null,music=null,bush=null,mv2=null,mv1=null,mv3=null,p2=null,p1=null,p3=null,base=null,cbg=null,sbg=null,life=null,lifeText=null,pd=null,cnt=null,cbgimg=null,sun=null,cloud1=null,cloud2=null,pain=null,lifeimg1=null,lifeimg2=null,lifeimg3=null,levlspd=null,ngame=null,hsec=null,highscore=null,localStorageName=null,hiscore=null)
    {
      super('gameScene')
      this.player=player;
      this.cursor=cursor;
      this.platforms=platforms;
      this.coins=coins;
      this.coronas=coronas;
      this.gameOver=false;
      this.score=0;
      this.scoreText=scoreText;
      this.ccoin=ccoin;
      this.gover=gover;
      this.jmp=jmp;
      this.music=music;
      this.bush=bush;
      this.mv2=mv2;
      this.mv1=mv1;
      this.mv3=mv3;
      this.p2==p2;
      this.p1=p1;
      this.p3=p3;
      this.base=base;
      this.cbg=cbg;
      this.sbg=sbg;
      this.life=3;
      this.lifeText=lifeText;
      this.pd=pd;
      this.cnt=cnt;
      this.cbgimg=cbgimg;
      this.sun=sun;
      this.cloud1=cloud1;
      this.cloud2=cloud2;
      this.pain=pain;
      this.lifeimg1=lifeimg1;
      this.lifeimg2=lifeimg2;
      this.lifeimg3=lifeimg3;
      this.levlspd=levlspd;
      this.ngame=ngame;
      this.hsec=hsec;
      this.localStorageName="dudescore";
      this.highScore=highscore;
      this.hiscore=hiscore;
    }

    preload() 
    {
      this.life=3;
      this.score=0;
      this.levlspd=0;
      this.hsec=0;
      this.gameOver=false;
      this.localStorageName="dudescore";

      if(localStorage.getItem(this.localStorageName) == null) 
      {
        this.highScore = 0;
      } 
      else 
      {
        this.highScore = localStorage.getItem(this.localStorageName);
      }
     
    }

collectCoin(player,coin)
{
 this.ccoin.play();
 this.score++;
 this.scoreText.setText(""+ this.score)
 coin.disableBody(true,true); // disable/ not part of game, not visible 
 if(this.coins.countActive(true)==0)
 {
    // we will respawn all coins and add one more corona more for fun
     let p=30;
     this.levlspd+=20;
     this.coins.children.iterate((coin)=>{ // way to loop on group
     //  console.log(p);
      coin.enableBody(true,p,0,true,true).setDepth(1);
      p+=70;
    });
    this.sbg=-1;
    this.createCorona();
 }
}

seperte(player,corona)
{
  let cvel=corona.veclocityX+40;
  corona.VelocityX=-cvel;
}


createCorona()
{
  let x;
  if(this.player.x<400)
  {
    x=Phaser.Math.Between(400,800);
  }
  else
  {
    x=Phaser.Math.Between(0,400);
  }

  let corona=this.coronas.create(x,20,"corona").setScale(0.8,0.8).setDepth(1);

  corona.setBounce(0.99);
  corona.setCollideWorldBounds(true);
  corona.setVelocity(Phaser.Math.Between(-200,200),20);
}

  caughtCorona(player,corona)
  {
    if(this.hsec<40)
    {
      return;
    }
    this.hsec=0;
    if(this.life==3)
    {
      this.lifeimg3.setActive(false).setVisible(false);
    }
    else if(this.life==2)
    {
      this.lifeimg2.setActive(false).setVisible(false);
    }
    else
    {
      this.lifeimg1.setActive(false).setVisible(false);
    }
    this.life--;
    this.cnt=0;
    this.cbgimg.setTint(0xff0000);
    // this.lifeText.setText("Life : "+ this.life);
    if(this.life>0)
    {
      this.pain.play();
    }

    this.seperte(player,corona);

    if(this.life<=0)
    {
      this.player.setTint(0xff0000);
      this.physics.pause();
      this.gameOver=true;
      this.gover.play();
      this.cbgimg.setTint(0x696969);
      this.base.setTint(0x696969);
      this.coins.setTint(0x696969);
      this.cloud1.setTint(0x696969);
      this.cloud2.setTint(0x696969);
      this.sun.setTint(0x696969);
      const gg=this.add.image(380,300,"govr").setDepth(5);
      gg.setOrigin(0.5,0.5);

      const clk=this.add.text(400,500,"Click To Play Again!!",{
        fontSize:40,
        fontFamilly:"Arial Black",
        fill:"yellow",
        stroke:"yellow",
        strokeThickness:2
    })
      clk.setOrigin(0.5,0.5).setDepth(5);
      this.input.on('pointerdown',() => {
      this.input.keyboard.enabled = true;
      this.scene.start('pregame');
      })
    }
  }

// create krna matlb game introduce , assets , entities



  create() 
  {
    this.cbgimg=this.add.image(0,0,"bg0").setOrigin(0,0);
    this.sun=this.add.image(650,0,"sun").setOrigin(0,0).setScale(0.5,0.5);
    this.cloud1=this.add.image(100,250,"cloud").setOrigin(0,0).setScale(0.5,0.5).setDepth(0);
    this.add.image(5,18,"doller").setOrigin(0,0).setScale(0.02,0.02).setDepth(10);
    this.cloud2=this.add.image(370,120,"cloud").setOrigin(0,0).setScale(0.5,0.5);
    this.add.image(668,518,"skeleton").setOrigin(0,0).setScale(0.5,0.5);
    this.base=this.physics.add.image(50,590,"platform").setScale(2,0.7).setImmovable(true).setDepth(1);
    this.base.body.setAllowGravity(false);
    this.player=this.physics.add.sprite(250,200,"player").setDepth(1);
    this.player.setFrame(4);
    
    
    this.p1=this.physics.add.image(245,130,"platform").setScale(0.2,0.3).setImmovable(true).setDepth(1);
    this.p1.body.setAllowGravity(false);

    this.p2=this.physics.add.sprite(140,400,"platform").setScale(0.2,0.3).setImmovable(true).setDepth(1);
    this.p2.body.setAllowGravity(false);

    this.p3=this.physics.add.sprite(600,260,"platform").setScale(0.2,0.3).setImmovable(true).setDepth(1);
    this.p3.body.setAllowGravity(false);


    this.bush=this.physics.add.staticGroup();
    this.bush.create(35,530,"bush1").setScale(0.5,0.5).refreshBody();
    // this.bush.create(330,110,"bush1").setScale(0.2,0.3).refreshBody();
    // this.bush.create(200,360,"bush2").setScale(0.4,0.4).refreshBody();
    // this.bush.create(670,220,"bush2").setScale(0.4,0.4).refreshBody();

    // *************************animations of player********************
    this.anims.create({
        key:"left",
        frames:this.anims.generateFrameNames("player",{start:0,end:3}),
        frameRate:7,
        repeat:-1
    })

    // player.anims.play("left");

    this.anims.create({
        key:"right",
        frames:this.anims.generateFrameNames("player",{start:5,end:8}),
        frameRate:7,
        repeat:-1
    })

    this.anims.create({
        key:"idle",
        frames:[{
            key:"player",
            frame:4
          }],
          frameRate:7
    })

    this.anims.create({
        key:"ljump",
        frames:[{
            key:"player",
            frame:1
          }],
          frameRate:7
    })

    this.anims.create({
        key:"rjump",
        frames:[{
            key:"player",
            frame:6
          }],
          frameRate:7
    })

    //************************* life  **********************
    this.lifeimg1=this.add.sprite(1,70,"lifeimg").setOrigin(0,0).setScale(0.04,0.04).setDepth(15);
    this.lifeimg2=this.add.sprite(35,70,"lifeimg").setOrigin(0,0).setScale(0.04,0.04).setDepth(15);
    this.lifeimg3=this.add.sprite(70,70,"lifeimg").setOrigin(0,0).setScale(0.04,0.04).setDepth(15);  
  
    // player.anims.play("right");

    //************input from keyboard****************

    // for input in cursor
    this.cursor=this.input.keyboard.createCursorKeys();
    // console.log(cursor);
    //************ Score ****************

    this.scoreText=this.add.text(45,15,"0",{
      fontSize:35,
      fontFamily:"Arial Black",
      stroke:"red",
      strokeThickness:5,
      fill:"yellow"
     }).setDepth(15);

     this.hiscore=this.add.text(5,110,"HighScore: " + this.highScore,{
      fontSize:20,
      fontFamily:"Arial Black",
      stroke:"blue",
      strokeThickness:5,
      fill:"orange"
     }).setDepth(15);

    // this.lifeText=this.add.text(18,45,"LIFE: 3",{fontSize:"16px",fill:"black"}).setDepth(1);

    // ************* coins ad its animations ***************
    this.coins=this.physics.add.group({
      key:"coin",
      repeat:10,
      setXY:{x:20,y:0,stepX:70},
      setCollideWorldBounds:true
    })
    
    this.anims.create({
      key:"shinecoin",
      frames:this.anims.generateFrameNames("coin",{start:0,end:9}),
      frameRate:7,
      repeat:-1
    })
    
    this.coins.playAnimation("shinecoin");   
    

    // ************* corona *****************
    
    this.coronas=this.physics.add.group();
    this.createCorona();
    
    
    
    //*****************music**********************
    this.jumpa=this.sound.add("jumpa",{loop:false});
    this.ccoin=this.sound.add("collect",{loop:false});
    this.gover=this.sound.add("gameov",{loop:false});
    this.music=this.sound.add("music",{loop:true});
    this.pain=this.sound.add("pain",{loop:false});
    this.music.play();

    // *********************** collision **************************
      
    this.player.setCollideWorldBounds(true);
    
    this.physics.add.collider(this.player,this.p2,this.friCollide,null,this);
    this.physics.add.collider(this.player,this.p1,this.friCollide,null,this);
    this.physics.add.collider(this.player,this.p3,this.friCollide,null,this);

    this.physics.add.collider(this.coins,this.p2,this.friCollide,null,this);
    this.physics.add.collider(this.coins,this.p1,this.friCollide,null,this);
    this.physics.add.collider(this.coins,this.p3,this.friCollide,null,this);

    this.physics.add.collider(this.coins,this.base,this.zvel,null,this);
    this.physics.add.collider(this.base,this.player);
    this.physics.add.collider(this.base,this.coronas);

    this.physics.add.collider(this.p2,this.coronas);
    this.physics.add.collider(this.p1,this.coronas);
    this.physics.add.collider(this.p3,this.coronas);
    this.physics.add.collider(this.player,this.coins,this.collectCoin,null,this);
    this.physics.add.collider(this.player,this.coronas,this.caughtCorona,null,this);

    // coins.setCollideWorldBounds(true);
   
}


friCollide(dude,plat)
{
 dude.VelocityX=(plat.veclocityX);
}

zvel(coin,plat)
{
  coin.setVelocityX(0);
}

// update ye baar baar chalega
update() 
{

  if(this.gameOver == true)
  {
    this.hsec=0;
    this.input.keyboard.enabled = false;
    this.music.pause();
    this.preload();
  }

  this.highScore = Math.max(this.score,this.highScore);
  localStorage.setItem(this.localStorageName,this.highScore);

  this.hiscore.setText("HighScore: "+ this.highScore)

  this.hsec++; //hit-sec with corona

  if(this.sbg==-1)
  {
   let a=0,b=5;
   let p=( Math.round(a + (b - a) * Math.random()));
   this.cbgimg=p;
   // console.log(p);
   this.sbg=0;
   if(p==0)
   {
     this.cbgimg=this.add.image(0,0,"bg0").setOrigin(0,0);
     this.add.image(650,0,"sun").setOrigin(0,0).setScale(0.5,0.5);
    //  this.add.image(0,0,"cloud").setOrigin(0,0).setScale(0.5,0.7).setDepth(0);
     this.add.image(370,120,"cloud").setOrigin(0,0).setScale(0.5,0.5);
   }
   else if(p==1)
   {
     this.cbgimg=this.add.image(0,0,"bg1").setOrigin(0,0).setDepth(0);
     this.sun.setDepth(-1);
    //  this.cloud1.setDepth(-1);
     this.cloud2.setDepth(-1);
   }
   else if(p==2)
   {
     this.cbgimg=this.add.image(0,0,"bg2").setOrigin(0,0).setDepth(0);
     this.sun.setDepth(-1);
     this.cloud1.setDepth(-1);
     this.cloud2.setDepth(-1);
   }
   else if(p==3)
   {
     this.cbgimg=this.add.image(0,0,"bg3").setOrigin(0,0).setDepth(0);
     this.sun.setDepth(-1);
     this.cloud1.setDepth(-1);
     this.cloud2.setDepth(-1);
   }
   else if(p==4)
   {
     this.cbgimg=this.add.image(0,0,"bg4").setOrigin(0,0).setDepth(0);
     this.sun.setDepth(-1);
     this.cloud1.setDepth(-1);
     this.cloud2.setDepth(-1);
   }
   else
   {
     this.cbgimg=this.add.image(0,0,"bg5").setOrigin(0,0).setDepth(0);
     this.sun.setDepth(-1);
     this.cloud1.setDepth(-1);
     this.cloud2.setDepth(-1);
   }
  }

  if(this.cursor.left.isDown)
  {
     this.player.setVelocityX(-130-this.levlspd);

     if(this.player.body.touching.down)
     {  
       this.player.anims.play("left",true);
     }
     else
     {
       this.player.anims.play("ljump",true);
     }
  }
  else if(this.cursor.right.isDown)
  {
     this.player.setVelocityX(130+this.levlspd);
     if(this.player.body.touching.down)
     {  
      this.player.anims.play("right",true);
     }
     else
     {
       this.player.anims.play("rjump",true);
     }
    
  }
  else if(this.cursor.up.isDown && this.player.body.touching.down)
  {
    this.jumpa.play();
    this.player.setVelocityY(-340);  
  }
  else
  {
    this.player.setVelocityX(0);
    this.player.anims.play("idle",true);
  }


  if(this.mv2==0)
   {
     this.p2.setVelocityX(-50-this.levlspd);

     if(this.p2.body.position.x<=10)
     {
       this.mv2=1;
     }
   }
   else
   {
     this.p2.setVelocityX(50+this.levlspd);
     if(this.p2.body.position.x>=300)
     {
       this.mv2=0;
     }
   }

   if(this.mv3==0)
   {
     this.p3.setVelocityX(-50-this.levlspd);

     if(this.p3.body.position.x<=300)
     {
       this.mv3=1;
     }
   }
   else
   {
     this.p3.setVelocityX(50+this.levlspd);
     if(this.p3.body.position.x>=600)
     {
       this.mv3=0;
     }
   }

   if(this.mv1==0)
   {
     this.p1.setVelocityX(-70-this.levlspd);

     if(this.p1.body.position.x<=10)
     {
       this.mv1=1;
     }
   }
   else
   {
     this.p1.setVelocityX(70+this.levlspd);
     if(this.p1.body.position.x>=600)
     {
       this.mv1=0;
     }
   }

   this.cnt++;
   if(this.cnt>=20)
   {
     if(this.life>0)
     this.cbgimg.clearTint();
     this.cnt=0;
   }

   this.zvel(this.coins,this.base);

}


};






