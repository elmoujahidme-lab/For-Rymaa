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
const loveMessages=[

"❤️ Every day with you is my favorite day.",

"🌹 You are my safest place.",

"💖 Thank you for being in my life.",

"🥹 Your smile makes everything better.",

"✨ I choose you. Every single day.",

"💕 You are my favorite notification.",

"🌸 I hope today makes you smile.",

"❤️ You are my little miracle.",

"🌹 Forever starts with you.",

"💌 Amine loves you more than words."

"❤️ Every day with you feels like a beautiful gift. Thank you for bringing happiness, warmth, and love into my life.",

"🌹 You are not just a person I love, you are the place where my heart feels safe and peaceful.",

"💖 Thank you for every smile, every moment, and every little thing you do that makes my world brighter.",

"🥹 Your smile has a special power. It can turn my worst days into moments I want to remember forever.",

"✨ I choose you today, tomorrow, and every day after. My heart always finds its way back to you.",

"💕 You are my favorite message, my favorite thought, and the person I want to share my beautiful moments with.",

"🌸 I hope you always remember how special you are and how much happiness your existence brings to my life.",

"❤️ You are my little miracle, the beautiful surprise that made my life more meaningful.",

"🌹 Forever is a long time, but I would still choose to spend every moment of it with you.",

"💌 Amine loves you more than words can explain. You are a precious part of my heart.",

"🌙 Even when we are far apart, you are always close to my heart and always in my thoughts.",

"💗 You make ordinary days feel magical just by being yourself. Never forget how amazing you are.",

"🌷 Your happiness matters to me more than anything. I always want to see you smiling.",

"❤️ If I could give you one thing, I would give you the ability to see yourself through my eyes, so you could understand how beautiful you truly are.",

"✨ You are the reason behind many of my smiles and one of the most beautiful chapters of my story.",

"🌹 No matter what happens, I will always appreciate the moments, memories, and feelings we share together.",

"💖 Your voice, your smile, and your presence have a way of making everything feel better.",

"🥰 I hope you know that someone out there is always thinking about you and wishing you happiness.",

"🌸 You are more than a dream. You are a beautiful reality that I am grateful for every day.",

"❤️ Loving you is not just a feeling, it is a choice I happily make again and again.",

"💌 Every memory with you is something I keep carefully in my heart because you make moments special.",

"🌹 You deserve all the love, kindness, and happiness that this world can offer.",

"✨ Thank you for being yourself. The real you is the person my heart admires the most.",

"💖 Sometimes I just stop and smile because I realize how lucky I am to have someone like you in my life.",

"🌙 You are the calm in my chaos, the light in my dark moments, and the smile in my heart.",

"❤️ I don't need perfect days. I just need beautiful moments with you.",

"🌷 Your presence makes my life softer, happier, and more beautiful than before.",

"🥹 I hope every day reminds you that you are loved, appreciated, and never forgotten.",

"💗 You are my favorite person, my sweetest thought, and a beautiful reason to keep smiling.",

"💌 No matter how many words I write, they will never be enough to describe how special you are to me."

];

const gift=document.getElementById("giftBox");

const msg=document.getElementById("giftMessage");

const timer=document.getElementById("countdown");

let waiting=false;

gift.onclick=function(){

if(waiting)return;

gift.classList.add("openGift");

setTimeout(()=>{

gift.classList.remove("openGift");

gift.innerHTML="💝";

msg.innerHTML=loveMessages[Math.floor(Math.random()*loveMessages.length)];
sendTelegram(
"🎁 Ryme opened Love Box ❤️\n\n" +
msg.innerText
);
createHearts();

},600);

waiting=true;

let t=10;

timer.innerHTML="Next gift in 10s";

let x=setInterval(()=>{

t--;

timer.innerHTML="Next gift in "+t+"s";

if(t<=0){

clearInterval(x);

gift.innerHTML="🎁";

timer.innerHTML="";

waiting=false;

}

},1000);

};

function createHearts(){

for(let i=0;i<25;i++){

let h=document.createElement("div");

h.innerHTML="❤️";

h.style.position="fixed";

h.style.left=Math.random()*100+"vw";

h.style.top="100vh";

h.style.fontSize=(20+Math.random()*20)+"px";

h.style.transition="3s";

document.body.appendChild(h);

setTimeout(()=>{

h.style.transform="translateY(-120vh)";

h.style.opacity="0";

},50);

setTimeout(()=>{

h.remove();

},3000);

}

}
// ===============================
// Ryme Message + Password
// ===============================

document.addEventListener("DOMContentLoaded", ()=>{

const sendBtn = document.getElementById("sendMessageBtn");
const messageBox = document.getElementById("rymeMessage");
const passwordBox = document.getElementById("passwordInput");
const status = document.getElementById("sendStatus");


if(sendBtn){

sendBtn.onclick = ()=>{

let message = messageBox.value;
let password = passwordBox.value;


if(password !== "ryma"){

status.innerHTML="❌ Wrong password";
return;

}


if(message.trim()==""){

status.innerHTML="✍️ Write a message";
return;

}


fetch(
"https://eotrmolcy1kaxd4.m.pipedream.net/?message="
+ encodeURIComponent("💌 Message from Ryme ❤️\n\n"+message)
)
.then(()=>{

status.innerHTML="✅ Message sent ❤️";

messageBox.value="";
passwordBox.value="";

})
.catch(()=>{

status.innerHTML="❌ opss Error sending";

});


};

}

});
document.getElementById("sendMessageBtn").onclick = function(){
    alert("Button works ❤️");
};
