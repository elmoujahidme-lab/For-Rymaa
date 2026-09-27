document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       PAGE NAVIGATION
    ============================================================ */

    const pages = document.querySelectorAll(".page");

    function showPage(id) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target = document.getElementById(id);

        if (target) {
            target.classList.add("active");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }


    /* ============================================================
       NAVIGATION
    ============================================================ */

    const happyBtn = document.getElementById("happyBtn");
    const sadBtn = document.getElementById("sadBtn");
    const continueBtn = document.getElementById("continueBtn");

    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");
    const next3 = document.getElementById("next3");
    const next4 = document.getElementById("next4");

    const quizStart = document.getElementById("quizStart");
    const quizNext = document.getElementById("quizNext");


    if (happyBtn) {
        happyBtn.addEventListener("click", () => {
            showPage("happy");
        });
    }


    if (sadBtn) {
        sadBtn.addEventListener("click", () => {
            showPage("sad");
        });
    }


    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            showPage("letter");
        });
    }


    if (next1) {
        next1.addEventListener("click", () => {
            showPage("heartGame");
        });
    }


    if (next2) {
        next2.addEventListener("click", () => {
            showPage("lessons");
        });
    }


    if (next3) {
        next3.addEventListener("click", () => {
            showPage("memories");
        });
    }


    if (next4) {
        next4.addEventListener("click", () => {
            showPage("final");
        });
    }


    if (quizStart) {
        quizStart.addEventListener("click", () => {
            showPage("quiz");
        });
    }


    if (quizNext) {
        quizNext.addEventListener("click", () => {
            showPage("final");
        });
    }


    /* ============================================================
       LOVE MESSAGES
    ============================================================ */

    const messages = [

        "You are my favorite person ❤️",

        "I smile every time I think about you.",

        "My best memories always include you.",

        "You make ordinary days feel special.",

        "Thank you for being part of my life.",

        "I'd choose you again and again.",

        "You are my safe place.",

        "You are one of the most beautiful chapters of my story.",

        "You mean more to me than words can say.",

        "One year later, I still choose you. ❤️"

    ];


    const loveMessage =
        document.getElementById("loveMessage");


    if (loveMessage) {

        loveMessage.textContent =
            messages[
                Math.floor(
                    Math.random() * messages.length
                )
            ];

    }


    /* ============================================================
       ANNIVERSARY COUNTER
       
       CHANGE THIS DATE ONLY IF YOUR REAL MEETING DATE IS DIFFERENT.
    ============================================================ */

    const startDate =
        new Date("September 27, 2025 00:00:00");


    function updateCounter() {

        const yearsEl =
            document.getElementById("years");

        const daysEl =
            document.getElementById("days");

        const hoursEl =
            document.getElementById("hours");

        const minutesEl =
            document.getElementById("minutes");

        const secondsEl =
            document.getElementById("seconds");


        const now = new Date();


        if (now < startDate) {

            if (yearsEl) yearsEl.textContent = "0";
            if (daysEl) daysEl.textContent = "0";
            if (hoursEl) hoursEl.textContent = "0";
            if (minutesEl) minutesEl.textContent = "0";
            if (secondsEl) secondsEl.textContent = "0";

            return;
        }


        let years =
            now.getFullYear() -
            startDate.getFullYear();


        const anniversary =
            new Date(startDate);


        anniversary.setFullYear(
            startDate.getFullYear() + years
        );


        if (anniversary > now) {

            years--;

            anniversary.setFullYear(
                startDate.getFullYear() + years
            );
        }


        const remaining =
            now - anniversary;


        const days =
            Math.floor(
                remaining /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    remaining /
                    (1000 * 60 * 60)
                ) % 24
            );


        const minutes =
            Math.floor(
                (
                    remaining /
                    (1000 * 60)
                ) % 60
            );


        const seconds =
            Math.floor(
                (
                    remaining /
                    1000
                ) % 60
            );


        if (yearsEl) {
            yearsEl.textContent = years;
        }

        if (daysEl) {
            daysEl.textContent = days;
        }

        if (hoursEl) {
            hoursEl.textContent = hours;
        }

        if (minutesEl) {
            minutesEl.textContent = minutes;
        }

        if (secondsEl) {
            secondsEl.textContent = seconds;
        }

    }


    updateCounter();

    setInterval(updateCounter, 1000);


    /* ============================================================
       MUSIC
    ============================================================ */

    const music =
        document.getElementById("music");

    const playBtn =
        document.getElementById("playMusic");

    const progress =
        document.getElementById("progress");

    const volume =
        document.getElementById("volume");

    const cover =
        document.querySelector(".music-cover");


    function updateMusicUI() {

        if (!playBtn || !music) {
            return;
        }


        if (!music.paused) {

            playBtn.textContent = "⏸";

            if (cover) {
                cover.classList.add("playing");
            }

        } else {

            playBtn.textContent = "▶";

            if (cover) {
                cover.classList.remove("playing");
            }

        }

    }


    if (playBtn && music) {

        playBtn.addEventListener(
            "click",
            async () => {

                try {

                    if (music.paused) {

                        await music.play();

                    } else {

                        music.pause();

                    }

                    updateMusicUI();

                } catch (error) {

                    console.log(
                        "Music could not start:",
                        error
                    );

                }

            }
        );


        music.addEventListener(
            "play",
            updateMusicUI
        );


        music.addEventListener(
            "pause",
            updateMusicUI
        );


        music.addEventListener(
            "ended",
            updateMusicUI
        );

    }


    if (music && progress) {

        music.addEventListener(
            "timeupdate",
            () => {

                if (
                    !Number.isFinite(
                        music.duration
                    ) ||
                    music.duration <= 0
                ) {

                    return;

                }


                progress.value =
                    (
                        music.currentTime /
                        music.duration
                    ) * 100;

            }
        );


        progress.addEventListener(
            "input",
            () => {

                if (
                    !Number.isFinite(
                        music.duration
                    ) ||
                    music.duration <= 0
                ) {

                    return;

                }


                music.currentTime =
                    (
                        Number(progress.value) /
                        100
                    ) * music.duration;

            }
        );

    }


    if (music && volume) {

        volume.addEventListener(
            "input",
            () => {

                music.volume =
                    Number(volume.value);

            }
        );

    }


    /* ============================================================
       BROKEN HEART GAME
    ============================================================ */

    const brokenHeart =
        document.getElementById(
            "brokenHeart"
        );

    const heartText =
        document.getElementById(
            "heartText"
        );


    let fixed = false;


    if (brokenHeart) {

        brokenHeart.addEventListener(
            "click",
            () => {

                if (fixed) {
                    return;
                }


                fixed = true;


                brokenHeart.textContent =
                    "❤️";


                brokenHeart.style.transform =
                    "scale(1.3)";


                if (heartText) {

                    heartText.innerHTML =
                        "You fixed it... ❤️<br>" +
                        "Maybe hearts can heal when we choose to care.";

                }

            }
        );

    }


    /* ============================================================
       FLOATING HEARTS
    ============================================================ */

    function createHeart() {

        const container =
            document.getElementById(
                "hearts"
            );


        if (!container) {
            return;
        }


        const heart =
            document.createElement("div");


        heart.className = "heart";

        heart.textContent = "❤";


        heart.style.left =
            Math.random() * 100 + "vw";


        heart.style.fontSize =
            15 +
            Math.random() * 25 +
            "px";


        heart.style.animationDuration =
            5 +
            Math.random() * 5 +
            "s";


        container.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 10000);

    }


    setInterval(createHeart, 500);


    /* ============================================================
       LOVE BOX
    ============================================================ */

    const loveMessages = [

        "❤️ One year down, and I still get butterflies because of you.",

        "🌹 Thank you for making this year unforgettable.",

        "💖 If I could relive this year, I would choose you again.",

        "🥹 You are one of my favorite parts of life.",

        "✨ One year. Countless memories. One special girl.",

        "💕 You made ordinary days feel extraordinary.",

        "🌸 I hope we create many more beautiful memories together.",

        "❤️ My favorite chapter is the one where I met you.",

        "🌙 Even on difficult days, you are still precious to me.",

        "💌 Happy first anniversary, my beautiful Rymaa.",

        "🌹 Thank you for every laugh, every conversation and every memory.",

        "💗 One year with you will always be a year I treasure.",

        "❤️ I choose you today, tomorrow and every day after.",

        "✨ Our story has only just begun.",

        "🥰 You are my favorite person and my sweetest memory.",

        "💖 Thank you for being you.",

        "🌷 Here's to the first year and all the beautiful moments ahead.",

        "💌 Amine loves you more than words can explain."

    ];


    const gift =
        document.getElementById(
            "giftBox"
        );

    const giftMessage =
        document.getElementById(
            "giftMessage"
        );

    const countdownText =
        document.getElementById(
            "countdown"
        );


    let giftWaiting = false;


    if (gift) {

        gift.addEventListener(
            "click",
            () => {

                if (giftWaiting) {
                    return;
                }


                giftWaiting = true;


                gift.classList.add(
                    "openGift"
                );


                const randomMessage =
                    loveMessages[
                        Math.floor(
                            Math.random() *
                            loveMessages.length
                        )
                    ];


                setTimeout(() => {

                    gift.classList.remove(
                        "openGift"
                    );


                    gift.textContent =
                        "💝";


                    if (giftMessage) {

                        giftMessage.textContent =
                            randomMessage;

                    }


                    createSpecialHearts();

                }, 500);


                let remaining = 10;


                if (countdownText) {

                    countdownText.textContent =
                        "Next gift in 10s";

                }


                const countdown =
                    setInterval(
                        () => {

                            remaining--;


                            if (countdownText) {

                                countdownText.textContent =
                                    "Next gift in " +
                                    remaining +
                                    "s";

                            }


                            if (
                                remaining <= 0
                            ) {

                                clearInterval(
                                    countdown
                                );


                                gift.textContent =
                                    "🎁";


                                if (countdownText) {

                                    countdownText.textContent =
                                        "";

                                }


                                giftWaiting =
                                    false;

                            }

                        },
                        1000
                    );

            }
        );

    }


    /* ============================================================
       SPECIAL HEART BURST
    ============================================================ */

    function createSpecialHearts() {

        for (
            let i = 0;
            i < 25;
            i++
        ) {

            const heart =
                document.createElement(
                    "div"
                );


            heart.textContent = "❤️";


            heart.style.position =
                "fixed";


            heart.style.left =
                Math.random() *
                100 +
                "vw";


            heart.style.top =
                "100vh";


            heart.style.fontSize =
                18 +
                Math.random() *
                25 +
                "px";


            heart.style.zIndex =
                "99999";


            heart.style.pointerEvents =
                "none";


            heart.style.transition =
                "3s ease";


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.style.transform =
                    "translateY(-120vh) rotate(360deg)";

                heart.style.opacity =
                    "0";

            }, 50);


            setTimeout(() => {

                heart.remove();

            }, 3000);

        }

    }


    /* ============================================================
       QUIZ
    ============================================================ */

    const quizButtons =
        document.querySelectorAll(
            ".quizBtn"
        );


    const quizResult =
        document.getElementById(
            "quizResult"
        );


    quizButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    if (quizResult) {

                        quizResult.innerHTML =
                            "🥰 Obviously Amine! ❤️<br>" +
                            "You knew the answer all along 😂";

                    }


                    createSpecialHearts();

                }
            );

        }
    );


    /* ============================================================
       MESSAGE BOX
    ============================================================ */

    const sendMessageBtn =
        document.getElementById(
            "sendMessageBtn"
        );

    const messageBox =
        document.getElementById(
            "rymeMessage"
        );

    const passwordInput =
        document.getElementById(
            "passwordInput"
        );

    const sendStatus =
        document.getElementById(
            "sendStatus"
        );


    if (sendMessageBtn) {

        sendMessageBtn.addEventListener(
            "click",
            () => {

                const message =
                    messageBox
                        ? messageBox.value.trim()
                        : "";


                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                if (password !== "ryma") {

                    if (sendStatus) {

                        sendStatus.textContent =
                            "❌ Try again babe ❤️";

                    }

                    return;

                }


                if (!message) {

                    if (sendStatus) {

                        sendStatus.textContent =
                            "✍️ Write something first ❤️";

                    }

                    return;

                }


                /*
                    IMPORTANT:

                    Do NOT put your Telegram Bot Token
                    inside this JavaScript file.

                    If you want Telegram messages,
                    connect this button to your backend.

                    Example endpoint:

                    /api/send-telegram
                */


                if (sendStatus) {

                    sendStatus.textContent =
                        "💖 Your message is saved in my heart ❤️";

                }


                if (messageBox) {
                    messageBox.value = "";
                }


                if (passwordInput) {
                    passwordInput.value = "";
                }


                createSpecialHearts();

            }
        );

    }


    /* ============================================================
       GALLERY + LIGHTBOX
    ============================================================ */

    const galleryImages =
        Array.from(
            document.querySelectorAll(
                ".gallery img"
            )
        );


    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImg =
        document.getElementById(
            "lightboxImg"
        );

    const previousButton =
        document.getElementById(
            "prev"
        );

    const nextButton =
        document.getElementById(
            "next"
        );

    const closeButton =
        document.getElementById(
            "closeLightbox"
        );


    let currentImage = 0;


    function openLightbox(index) {

        if (
            !galleryImages.length ||
            !lightbox ||
            !lightboxImg
        ) {
            return;
        }


        currentImage = index;


        lightboxImg.src =
            galleryImages[
                currentImage
            ].src;


        lightbox.classList.add(
            "active"
        );

    }


    function closeLightbox() {

        if (lightbox) {

            lightbox.classList.remove(
                "active"
            );

        }

    }


    function changeImage(direction) {

        if (!galleryImages.length) {
            return;
        }


        currentImage += direction;


        if (
            currentImage < 0
        ) {

            currentImage =
                galleryImages.length - 1;

        }


        if (
            currentImage >=
            galleryImages.length
        ) {

            currentImage = 0;

        }


        if (lightboxImg) {

            lightboxImg.src =
                galleryImages[
                    currentImage
                ].src;

        }

    }


    galleryImages.forEach(
        (img, index) => {

            img.addEventListener(
                "click",
                () => {
                    openLightbox(index);
                }
            );

        }
    );


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {
                changeImage(-1);
            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {
                changeImage(1);
            }
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                changeImage(-1);

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                changeImage(1);

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }

        }
    );


    /* ============================================================
       BUTTON ANIMATION
    ============================================================ */

    document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "mousedown",
                () => {
                    button.style.transform =
                        "scale(.97)";
                }
            );


            button.addEventListener(
                "mouseup",
                () => {
                    button.style.transform =
                        "";
                }
            );


            button.addEventListener(
                "mouseleave",
                () => {
                    button.style.transform =
                        "";
                }
            );

        });


    /* ============================================================
       WELCOME ANIMATION
    ============================================================ */

    const welcomeBox =
        document.querySelector(
            ".welcome-box"
        );


    if (welcomeBox) {

        welcomeBox.style.opacity = "0";

        welcomeBox.style.transform =
            "translateY(25px)";


        setTimeout(() => {

            welcomeBox.style.transition =
                "0.8s ease";

            welcomeBox.style.opacity =
                "1";

            welcomeBox.style.transform =
                "translateY(0)";

        }, 200);

    }

});
