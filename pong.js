//Created by Bhuvanesh(1001410051) on Sep 20, 2017
var paddle;
var intfunction;
var msg;
var speed;
var tDash; var lDash;
var courtLeft, courtRight, courtTop, courtBottom;
var ball;
var court;
var strike;
var maxscore=0;
var strikeSpan;
var maxSpan;
setSpeed(0);

function initialize() {
    
    
    msg = document.getElementById("messages");
    ball = document.getElementById("ball");
    tDash = getRandomInt(0,300);
    ball.style.top=tDash+"px";
    lDash = 5;

    courtLeft = 0;
    courtRight = 780;
    courtTop = -80;
    courtBottom = 395;
    paddle = document.getElementById("paddle");
    paddle.addEventListener("mousemove", movePaddle, true);

    
    strike=0;
    strikeSpan=document.getElementById("strikes");
    strikeSpan.innerHTML=strike;
    maxSpan=document.getElementById("score");

}

//Moves the paddle based on the Y axis
function movePaddle(event) {
    var Ydash = event.clientY - 170;

    if (Ydash < 400 && Ydash > 0) {
        paddle.style.top = Ydash + "px";
        // msg.innerHTML="P Y"+paddle.style.top;
    }
    else if (Ydash <= 0) {
        paddle.style.top = "0px";
        // msg.innerHTML="P 1Y"+paddle.style.top;
    }
    else if (Ydash >= 400) {
        paddle.style.top = "400px";
        // msg.innerHTML="P 2Y"+paddle.style.top;
    }
}

function startGame() {
    var ldecr = false; tdecr = false;
    intfunction = setInterval(function () {

        
        var pTop = parseInt(paddle.style.top.replace(/[^\d]/g, ""));
        var pLeft = parseInt(paddle.style.left.replace(/[^\d]/g, ""));
        var bTop = parseInt(ball.style.top.replace(/[^\d-]/g, ""));
        var bLeft = parseInt(ball.style.left.replace(/[^\d]/g, ""));

        //If the ball goes beyond the paddle, end the game..
        if (bLeft > pLeft + 15) {
            msg.innerHTML = "Game Over!!! Press Start to play again.";//+ball.style.left + paddle.style.left + bLeft + pLeft;
            resetGame();

        }  
        //If the ball touches the area of the paddle, increase the score and deflect the ball..
        else if (bTop <= pTop && bTop >= pTop-100 && bLeft == pLeft && bLeft < pLeft + 5) {
            msg.innerHTML = "Come on.. You can beat your max score.. ";// + ball.style.top + " B Left " + ball.style.left + "P Left " + paddle.style.left + "P Top " + paddle.style.top;
            strike=strike+1;
            strikeSpan.innerHTML=strike;
            if (tdecr == false) {
                tdecr = true;
                tDash = tDash - 5;
                ball.style.top = (tDash) + "px";
            }
            else { 
                tDash = tDash + 5;
                ball.style.top = (tDash) + "px";
            }
            if (ldecr == false) {
                ldecr = true;
                lDash = lDash - 5;
                ball.style.left = (lDash) + "px";
            }
            else {
                lDash = lDash + 5;
                ball.style.left = (lDash) + "px";
            }
        }
        
        //Normal movement of the ball that bounces of the court
        else {
            //when it moves from top to bottom border of the court, increase the pixels otherwise decrease it.
            if (tDash <= courtBottom && tDash >= courtTop) {

                if (tDash < courtBottom&&tDash>=courtTop && !tdecr) {
                    tDash = tDash + 5;
                    ball.style.top = (tDash) + "px";
                }
                else {
                    tdecr = true;
                    tDash = tDash - 5;
                    ball.style.top = (tDash) + "px";
                }
                if (tDash <= courtTop)
                    tdecr = false;
                if(tDash>courtBottom) {
                        tdecr=false;
                        tDash=courtBottom;
                    }
            }
            //when it moves from left to right border of the court, increase the pixels otherwise decrease it.
            if (lDash <= courtRight && lDash >= courtLeft) {
                if (lDash >= courtLeft && lDash < courtRight && !ldecr) {
                    lDash = lDash + 5;
                    ball.style.left = (lDash) + "px";
                }
                else {
                    ldecr = true;
                    lDash = lDash - 5;
                    ball.style.left = (lDash) + "px";
                }
                if (lDash >= courtRight)
                    ldecr = false;
                if (lDash < courtLeft) {
                    ldecr = false;
                    lDash = courtLeft;
                }
            }
        }

       



    }, speed);

}


function resetGame() {
    if(maxscore<=strike)
    {
        maxscore=strike;
        maxSpan.innerHTML=maxscore;
    }
    clearInterval(intfunction);
    ball.style.top=0;
    ball.style.left=0;
    initialize();
    
}

function setSpeed(sp) {
    if (sp == 0)
        speed = 50;
    if (sp == 1)
        speed = 25;
    if (sp == 2)
        speed = 10;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}