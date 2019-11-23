var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var itsMe = new Image();
var bg = new Image();
var dasar = new Image();
var atas = new Image();
var bawah = new Image();
var sndtr = new Audio();
var hap = new Audio();

itsMe.src = "/Bahan/image/asd.png";
bg.src = "/Bahan/image/bg1.jpg";
dasar.src = "/Bahan/image/gr.png";
atas.src = "/Bahan/image/atas.png";
bawah.src = "/Bahan/image/bawah.png";
sndtr.src = "/Bahan/sound/soundtrack.ogg"
hap.src = "/Bahan/sound/hap.mp3"

var gap = 85;
var constant;
var gX = 10;
var gY = 30;
var gravity = 0.85;
var score = 0;


document.addEventListener("keydown",moveUp);


function moveUp(){
    gY -= 20;
}

var obs = [];

obs[0] = {
    x : cvs.width,
    y : -150
};

function play(){
    sndtr.play()
    
    ctx.drawImage(bg,0,0);
    


    for(var i = 0; i < obs.length; i++){
        
        constant = atas.height+gap;
        ctx.drawImage(atas,obs[i].x,obs[i].y);
        ctx.drawImage(bawah,obs[i].x,obs[i].y+constant);
             
        obs[i].x--;
        
        if( obs[i].x == cvs.width/1.5){
            obs.push({
                x : cvs.width,
                y : Math.floor(Math.random()*(atas.height/2))-atas.height
            }); 
        }

        // Game over 
        
        if( gX + itsMe.width >= obs[i].x && gX <= obs[i].x + atas.width && (gY <= obs[i].y + atas.height || gY+itsMe.height >= obs[i].y+constant) || gY + itsMe.height >=  cvs.height - dasar.height){
            var gameOver = confirm('Skor Kamu : '+ score + '\n' + "To Play Again Click Ok then Cancel");
            if (gameOver == true){
              window.location.reload();
            } else {
                
            }
        }
        
        if(obs[i].x == 5){
            hap.play();
            score++;
        }
        
    }

    ctx.drawImage(dasar,0,cvs.height - dasar.height);
    
    ctx.drawImage(itsMe,gX,gY);
    
    gY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(play);
    
}

play();