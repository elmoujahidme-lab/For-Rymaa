// ===============================
// Pages
// ===============================

const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>page.classList.remove("active"));

    document.getElementById(id).classList.add("active");

}

// ===============================
// Buttons
// ===============================

const happyBtn=document.getElementById("happyBtn");
const sadBtn=document.getElementById("sadBtn");

const continueBtn=document.getElementById("continueBtn");
const next1=document.getElementById("next1");
const next2=document.getElementById("next2");
const next3=document.getElementById("next3");
const next4=document.getElementById("next4");

happyBtn.onclick=()=>showPage("happy");

sadBtn.onclick=()=>showPage("sad");

continueBtn.onclick=()=>showPage("letter");

next1.onclick=()=>showPage("heartGame");

next2.onclick=()=>showPage("lessons");

next3.onclick=()=>showPage("memories");

next4.onclick=()=>showPage("final");


// ===============================
// Random Love Messages
// ===============================

const messages=[

"You are my favorite person ❤️",

"I smile every time I think about you.",

"My best memories always include you.",

"You make ordinary days feel special.",

"Thank you for being part of my life.",

"I'd choose you again and again.",

"You are my safe place.",

"You are the most beautiful chapter of my story.",

"You mean more to me than words can say.",

"Every day with you is a gift."

];

const loveMessage=document.getElementById("loveMessage");

loveMessage.innerHTML=messages[Math.floor(Math.random()*messages.length)];


// ===============================
// Counter
// ===============================

const startDate=new Date("September 10, 2025 00:00:00");

function updateCounter(){

const now=new Date();

const diff=now-startDate;

const days=Math.floor(diff/(1000*60*60*24));

const hours=Math.floor((diff/(1000*60*60))%24);

const minutes=Math.floor((diff/(1000*60))%60);

document.getElementById("days").textContent=days;

document.getElementById("hours").textContent=hours;

document.getElementById("minutes").textContent=minutes;

}

updateCounter();

setInterval(updateCounter,60000);


// ===============================
// Music
// ===============================

const music=document.getElementById("music");

const playMusic=document.getElementById("playMusic");

let playing=false;

playMusic.onclick=function(){

if(!playing){

music.play();

playMusic.innerHTML="⏸ Pause Our Song";

playing=true;

}else{

music.pause();

playMusic.innerHTML="🎵 Play Our Song";

playing=false;

}

};
// ===============================
// Heart Game
// ===============================

const brokenHeart = document.getElementById("brokenHeart");
const heartText = document.getElementById("heartText");

let fixed = false;

if (brokenHeart) {

    brokenHeart.onclick = function () {

        if (fixed) return;

        fixed = true;

        brokenHeart.innerHTML = "❤️";

        brokenHeart.style.transform = "scale(1.3)";

        heartText.innerHTML =
            "Thank you... ❤️<br>Even if you are not ready to forgive me today.";

    };

}


// ===============================
// Floating Hearts
// ===============================

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(15+Math.random()*25)+"px";

    heart.style.animationDuration=(5+Math.random()*5)+"s";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,400);


// ===============================
// Gallery Click Effect
// ===============================

const images=document.querySelectorAll(".gallery img");

images.forEach(img=>{

    img.addEventListener("click",()=>{

        img.style.transform="scale(1.15)";

        img.style.zIndex="999";

        setTimeout(()=>{

            img.style.transform="scale(1)";

            img.style.zIndex="1";

        },350);

    });

});


// ===============================
// Smooth Buttons
// ===============================

const buttons=document.querySelectorAll("button");

buttons.forEach(btn=>{

    btn.addEventListener("mousedown",()=>{

        btn.style.transform="scale(.96)";

    });

    btn.addEventListener("mouseup",()=>{

        btn.style.transform="scale(1)";

    });

});


// ===============================
// Welcome Animation
// ===============================

window.onload=function(){

    const box=document.querySelector(".welcome-box");

    if(box){

        box.style.opacity="0";

        box.style.transform="translateY(40px)";

        setTimeout(()=>{

            box.style.transition=".8s";

            box.style.opacity="1";

            box.style.transform="translateY(0)";

        },300);

    }

};


// ===============================
// Random Background Glow
// ===============================

setInterval(()=>{

    document.body.style.backgroundPosition=
        Math.random()*100+"% "+Math.random()*100+"%";

},5000);