var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var itsMe = new Image();
var bg = new Image();
var dasar = new Image();
var atas = new Image();
var bawah = new Image();

itsMe.src = "/Bahan/image/asd.png";
bg.src = "/Bahan/image/bg1.jpg";
dasar.src = "/Bahan/image/gr.png";
atas.src = "/Bahan/image/atas.png";
bawah.src = "/Bahan/image/bawah.png";


// some variables

var gap = 85;
var constant;

var gX = 10;
var gY = 30;

var gravity = 0.85;

var score = 0;

// audio files



// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    gY -= 20;
    // fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : -150
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = atas.height+gap;
        ctx.drawImage(atas,pipe[i].x,pipe[i].y);
        ctx.drawImage(bawah,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == cvs.width/1.5){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*(atas.height/2))-atas.height
            }); 
        }

        // Game over 
        
        if( gX + itsMe.width >= pipe[i].x && gX <= pipe[i].x + atas.width && (gY <= pipe[i].y + atas.height || gY+itsMe.height >= pipe[i].y+constant) || gY + itsMe.height >=  cvs.height - dasar.height){
            var r = confirm("To Play Again Click Ok then Cancel");
            if (r == true){
              window.location.reload();
            }
        }
        
        if(pipe[i].x == 5){
            score++;
        }
        
        
    }

    ctx.drawImage(dasar,0,cvs.height - dasar.height);
    
    ctx.drawImage(itsMe,gX,gY);
    
    gY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();