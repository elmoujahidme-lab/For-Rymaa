// ============================================================
// LOVE WEBSITE - CLEANED & FIXED JAVASCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // Pages
    // ============================================================

    const pages = document.querySelectorAll(".page");

    function showPage(id) {
        pages.forEach(page => page.classList.remove("active"));

        const targetPage = document.getElementById(id);

        if (targetPage) {
            targetPage.classList.add("active");
        }
    }

    // ============================================================
    // Navigation Buttons
    // ============================================================

    const happyBtn = document.getElementById("happyBtn");
    const sadBtn = document.getElementById("sadBtn");
    const continueBtn = document.getElementById("continueBtn");

    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");
    const next3 = document.getElementById("next3");
    const next4 = document.getElementById("next4");

    if (happyBtn) {
        happyBtn.addEventListener("click", () => showPage("happy"));
    }

    if (sadBtn) {
        sadBtn.addEventListener("click", () => showPage("sad"));
    }

    if (continueBtn) {
        continueBtn.addEventListener("click", () => showPage("letter"));
    }

    if (next1) {
        next1.addEventListener("click", () => showPage("heartGame"));
    }

    if (next2) {
        next2.addEventListener("click", () => showPage("lessons"));
    }

    if (next3) {
        next3.addEventListener("click", () => showPage("memories"));
    }

    if (next4) {
        next4.addEventListener("click", () => showPage("final"));
    }

    // ============================================================
    // Random Love Message
    // ============================================================

    const messages = [
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

    const loveMessage = document.getElementById("loveMessage");

    if (loveMessage) {
        loveMessage.textContent =
            messages[Math.floor(Math.random() * messages.length)];
    }

    // ============================================================
    // Relationship Counter
    // ============================================================

    const startDate = new Date("September 27, 2025 00:00:00");

    function updateCounter() {
        const yearEl = document.getElementById("year");
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (
            !yearEl &&
            !daysEl &&
            !hoursEl &&
            !minutesEl &&
            !secondsEl
        ) {
            return;
        }

        const now = new Date();

        if (now < startDate) {
            if (yearEl) yearEl.textContent = "0";
            if (daysEl) daysEl.textContent = "0";
            if (hoursEl) hoursEl.textContent = "0";
            if (minutesEl) minutesEl.textContent = "0";
            if (secondsEl) secondsEl.textContent = "0";
            return;
        }

        let years = now.getFullYear() - startDate.getFullYear();

        const anniversary = new Date(startDate);
        anniversary.setFullYear(startDate.getFullYear() + years);

        if (anniversary > now) {
            years--;
            anniversary.setFullYear(startDate.getFullYear() + years);
        }

        const remaining = now - anniversary;

        const days = Math.floor(
            remaining / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (remaining / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (remaining / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (remaining / 1000) % 60
        );

        if (yearEl) yearEl.textContent = years;
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);

    // ============================================================
    // Music
    // ============================================================

    const music = document.getElementById("music");
    const playBtn = document.getElementById("playMusic");
    const progress = document.getElementById("progress");
    const volume = document.getElementById("volume");
    const cover = document.querySelector(".music-cover");

    function updatePlayButton() {
        if (!playBtn) return;

        if (music && !music.paused) {
            playBtn.innerHTML = "⏸ Pause";

            if (cover) {
                cover.classList.add("playing");
            }
        } else {
            playBtn.innerHTML = "▶️ Play";

            if (cover) {
                cover.classList.remove("playing");
            }
        }
    }

    if (playBtn && music) {
        playBtn.addEventListener("click", async () => {
            try {
                if (music.paused) {
                    await music.play();
                } else {
                    music.pause();
                }

                updatePlayButton();

            } catch (error) {
                console.warn(
                    "Music could not be played:",
                    error
                );
            }
        });

        music.addEventListener("play", updatePlayButton);
        music.addEventListener("pause", updatePlayButton);
        music.addEventListener("ended", updatePlayButton);
    }

    if (progress && music) {

        music.addEventListener("loadedmetadata", () => {
            progress.value = 0;
        });

        music.addEventListener("timeupdate", () => {

            if (
                !Number.isFinite(music.duration) ||
                music.duration <= 0
            ) {
                return;
            }

            progress.value =
                (music.currentTime / music.duration) * 100;
        });

        progress.addEventListener("input", () => {

            if (
                !Number.isFinite(music.duration) ||
                music.duration <= 0
            ) {
                return;
            }

            music.currentTime =
                (Number(progress.value) / 100) *
                music.duration;
        });
    }

    if (volume && music) {

        volume.addEventListener("input", () => {

            const value = Number(volume.value);

            if (Number.isFinite(value)) {

                music.volume =
                    value > 1 ? value / 100 : value;
            }
        });
    }

    // ============================================================
    // Heart Game
    // ============================================================

    const brokenHeart =
        document.getElementById("brokenHeart");

    const heartText =
        document.getElementById("heartText");

    let fixed = false;

    if (brokenHeart) {

        brokenHeart.addEventListener("click", () => {

            if (fixed) return;

            fixed = true;

            brokenHeart.innerHTML = "❤️";

            brokenHeart.style.transform =
                "scale(1.3)";

            if (heartText) {

                heartText.innerHTML =
                    "Thank you... ❤️<br>" +
                    "Even if you are not ready to forgive me today.";
            }
        });
    }

    // ============================================================
    // Floating Hearts
    // ============================================================

    function createHeart() {

        const heartsContainer =
            document.getElementById("hearts");

        if (!heartsContainer) return;

        const heart =
            document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            15 + Math.random() * 25 + "px";

        heart.style.animationDuration =
            5 + Math.random() * 5 + "s";

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 400);

    // ============================================================
    // Gallery Click Effect
    // ============================================================

    const images =
        document.querySelectorAll(".gallery img");

    images.forEach(img => {

        img.addEventListener("click", () => {

            img.style.transform =
                "scale(1.15)";

            img.style.zIndex = "999";

            setTimeout(() => {

                img.style.transform =
                    "scale(1)";

                img.style.zIndex = "1";

            }, 350);
        });
    });

    // ============================================================
    // Smooth Button Press
    // ============================================================

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach(btn => {

        btn.addEventListener("mousedown", () => {
            btn.style.transform = "scale(.96)";
        });

        btn.addEventListener("mouseup", () => {
            btn.style.transform = "scale(1)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "scale(1)";
        });

        btn.addEventListener("touchend", () => {
            btn.style.transform = "scale(1)";
        });
    });

    // ============================================================
    // Welcome Animation
    // ============================================================

    const welcomeBox =
        document.querySelector(".welcome-box");

    if (welcomeBox) {

        welcomeBox.style.opacity = "0";

        welcomeBox.style.transform =
            "translateY(40px)";

        setTimeout(() => {

            welcomeBox.style.transition = ".8s";

            welcomeBox.style.opacity = "1";

            welcomeBox.style.transform =
                "translateY(0)";

        }, 300);
    }

    // ============================================================
    // Random Background Glow
    // ============================================================

    setInterval(() => {

        document.body.style.backgroundPosition =
            Math.random() * 100 +
            "% " +
            Math.random() * 100 +
            "%";

    }, 5000);

    // ============================================================
    // Love Box Messages
    // ============================================================

    const loveMessages = [

        "❤️ Every day with you is my favorite day.",

        "🌹 You are my safest place.",

        "💖 Thank you for being in my life.",

        "🥹 Your smile makes everything better.",

        "✨ I choose you. Every single day.",

        "💕 You are my favorite notification.",

        "🌸 I hope today makes you smile.",

        "❤️ You are my little miracle.",

        "🌹 Forever starts with you.",

        "💌 Amine loves you more than words.",

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

    const gift =
        document.getElementById("giftBox");

    const msg =
        document.getElementById("giftMessage");

    const timer =
        document.getElementById("countdown");

    let waiting = false;

    if (gift) {

        gift.addEventListener("click", () => {

            if (waiting) return;

            waiting = true;

            gift.classList.add("openGift");

            const randomMessage =
                loveMessages[
                    Math.floor(
                        Math.random() *
                        loveMessages.length
                    )
                ];

            setTimeout(() => {

                gift.classList.remove("openGift");

                gift.innerHTML = "💝";

                if (msg) {
                    msg.textContent =
                        randomMessage;
                }

                sendTelegram(
                    "🎁 Ryma opened Love Box ❤️\n\n" +
                    randomMessage
                );

                createHearts();

            }, 600);

            let remaining = 10;

            if (timer) {
                timer.textContent =
                    "Next gift in 10s";
            }

            const countdown =
                setInterval(() => {

                    remaining--;

                    if (timer) {
                        timer.textContent =
                            "Next gift in " +
                            remaining +
                            "s";
                    }

                    if (remaining <= 0) {

                        clearInterval(countdown);

                        gift.innerHTML = "🎁";

                        if (timer) {
                            timer.textContent = "";
                        }

                        waiting = false;
                    }

                }, 1000);
        });
    }

    // ============================================================
    // Gift Heart Animation
    // ============================================================

    function createHearts() {

        for (let i = 0; i < 25; i++) {

            const heart =
                document.createElement("div");

            heart.innerHTML = "❤️";

            heart.style.position = "fixed";

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.top = "100vh";

            heart.style.fontSize =
                20 + Math.random() * 20 + "px";

            heart.style.transition = "3s";

            heart.style.pointerEvents = "none";

            heart.style.zIndex = "9999";

            document.body.appendChild(heart);

            setTimeout(() => {

                heart.style.transform =
                    "translateY(-120vh)";

                heart.style.opacity = "0";

            }, 50);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }

    // ============================================================
    // Quiz
    // ============================================================

    document
        .querySelectorAll(".quizBtn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const quizResult =
                    document.getElementById(
                        "quizResult"
                    );

                if (quizResult) {

                    quizResult.innerHTML =
                        "🥰 Correct! Amine loves you more than anything ❤️";
                }

                createHearts();
            });
        });

    // ============================================================
    // Ryme Message + Password
    // ============================================================

    const sendBtn =
        document.getElementById(
            "sendMessageBtn"
        );

    const messageBox =
        document.getElementById(
            "rymeMessage"
        );

    const passwordBox =
        document.getElementById(
            "passwordInput"
        );

    const status =
        document.getElementById(
            "sendStatus"
        );

    if (sendBtn) {

        sendBtn.addEventListener(
            "click",
            () => {

                const message =
                    messageBox
                        ? messageBox.value.trim()
                        : "";

                const password =
                    passwordBox
                        ? passwordBox.value
                        : "";

                if (password !== "ryma") {

                    if (status) {
                        status.innerHTML =
                            "❌ Try again babe ❤️";
                    }

                    return;
                }

                if (message === "") {

                    if (status) {
                        status.innerHTML =
                            "✍️ Write a beautiful message.";
                    }

                    return;
                }

                sendTelegram(
                    "💌 Message from Rymaa ❤️\n\n" +
                    message
                );

                if (status) {

                    status.innerHTML =
                        "✅ I received it, honey ❤️";
                }

                if (messageBox) {
                    messageBox.value = "";
                }

                if (passwordBox) {
                    passwordBox.value = "";
                }
            }
        );
    }

    // ============================================================
    // Telegram
    // ============================================================
    //
    // IMPORTANT:
    // Never put your Telegram Bot Token in browser JavaScript.
    //
    // The old token was exposed to anyone opening DevTools.
    //
    // This code expects a backend endpoint:
    //
    // POST /api/send-telegram
    //
    // JSON:
    // {
    //     "text": "message here"
    // }
    //
    // ============================================================

    const TELEGRAM_ENDPOINT =
        "/api/send-telegram";

    async function sendTelegram(text) {

        if (!text) {
            return false;
        }

        try {

            const response =
                await fetch(
                    TELEGRAM_ENDPOINT,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            text: text
                        })
                    }
                );

            if (!response.ok) {

                throw new Error(
                    "Telegram request failed: " +
                    response.status
                );
            }

            return true;

        } catch (error) {

            console.error(
                "Telegram message could not be sent:",
                error
            );

            return false;
        }
    }

});
