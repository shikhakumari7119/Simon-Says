
//simon game
let gameSeq=[];
let userSeq=[];

let btns=["red","green","yellow","purple"];

let started = false;
let level = 0;

let h2=document.querySelector("h2");
document.querySelector("#start-btn").addEventListener("click",function(){
if(started == false){
   this.style.display="none";
   console.log("game start");
   started = true;
levelUp();
}
});

function gameFlash(btn){

btn.classList.add("flash");
setTimeout(function(){
   btn.classList.remove("flash");
}, 250);
}
function userFlash(btn){
btn.classList.add("userflash");
setTimeout(function(){
   btn.classList.remove("userflash");
}, 250);
}
function levelUp(){
   userSeq=[];
   level++;
   h2.innerText= `Level ${level}`;

   let randIdx=Math.floor(Math.random()*4);
   let randColor=btns[randIdx];
   let randBtn=document.querySelector(`.${randColor}`);
   gameSeq.push(randColor);
   console.log(gameSeq);
   gameFlash(randBtn);
}

function checkAns(idx){
  //console.log("curr level :",level);
if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
      setTimeout(levelUp,1000);
    }
   
  }else{ 
   h2.innerHTML=`Game over!Your score was <b>${level*10}</b><br>Click play now to Restart .`;
   document.querySelector("body").style.backgroundColor = "red";
   setTimeout(function(){
      document.querySelector("body").style.backgroundColor = "rgb(117, 113, 109)";
   },150);
   reset();
   playWrong();
   document.querySelector("#start-btn").style.display="inline-block";
  }
}
function btnPress(){
   
   let btn=this;
   userFlash(btn);

   userColor=btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
   btn.addEventListener("click",btnPress);
}
function reset(){
   started= false;
   gameSeq=[];
   userSeq=[];
   level=0;
}
ScrollReveal({ 
    reset: true ,
    distance:'80px',
    duration:2000,
    delay:200
});
ScrollReveal().reveal('h1', { origin: 'top' });
ScrollReveal().reveal('h2', { origin: 'bottom' });
//sound
const sounds={
   red:new Audio("Sounds/sound.wav"),
   green:new Audio("Sounds/sound.wav"),
yellow:new Audio("Sounds/sound.wav"),
  purple:new Audio("Sounds/sound.wav"), 
};
const wrongSound=new Audio("Sounds/sound2.wav");

document.querySelectorAll(".btn").forEach(btn => {
   btn.addEventListener("click",()=>{
const color =btn.id;
playSound(color);
   });
});
function playSound(color){
   if(sounds[color]){
      sounds[color].currentTime=0;
      sounds[color].play();
   }
}
function playWrong(){
    wrongSound.currentTime=0;
     wrongSound.play();
     
}
