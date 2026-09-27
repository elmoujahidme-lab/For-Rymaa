document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       PAGE NAVIGATION
    ========================================================= */

    const pages = document.querySelectorAll(".page");

    function showPage(id) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target = document.getElementById(id);

        if (!target) return;

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =========================================================
       MAIN NAVIGATION
    ========================================================= */

    const navigation = {

        happyBtn: "happy",
        sadBtn: "sad",
        continueBtn: "letter",
        next1: "heartGame",
        next2: "lessons",
        next3: "memories",
        next4: "final",
        quizStart: "quiz",
        quizNext: "final"

    };

    Object.entries(navigation).forEach(([buttonId, pageId]) => {

        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener("click", () => {
                showPage(pageId);
            });
        }

    });


    /* =========================================================
       OUR PLACE BUTTONS
    ========================================================= */

    const placeNavigation = {

        missYouBtn: "missYou",
        dailyBtn: "daily",
        questionsBtn: "questions",
        secretBtn: "secret",
        notesBtn: "notes",
        timelineBtn: "timeline"

    };

    Object.entries(placeNavigation).forEach(([buttonId, pageId]) => {

        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener("click", () => {
                showPage(pageId);
            });
        }

    });


    document.querySelectorAll("[data-back]").forEach(button => {

        button.addEventListener("click", () => {

            const page = button.dataset.back;

            showPage(page);

        });

    });


    /* =========================================================
       LOVE MESSAGES
    ========================================================= */

    const messages = [

        "You are my favorite person ❤️",

        "I smile every time I think about you.",

        "My best memories always include you.",

        "You make ordinary days feel special.",

        "Thank you for being part of my life.",

        "I'd choose you again and again.",

        "You are my safe place.",

        "You mean more to me than words can say.",

        "One year later, I still choose you. ❤️",

        "Mima, you make my world softer. 🌸",

        "B'outa dyali ❤️",

        "Bentena dyali, always. ❤️"

    ];

    const loveMessage = document.getElementById("loveMessage");

    if (loveMessage) {

        loveMessage.textContent =
            messages[Math.floor(Math.random() * messages.length)];

    }


    /* =========================================================
       ANNIVERSARY COUNTER
    ========================================================= */

    const startDate =
        new Date("September 27, 2025 00:00:00");


    function updateCounter() {

        const yearsEl = document.getElementById("years");
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

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
            now.getFullYear() - startDate.getFullYear();

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
                (remaining /
                    (1000 * 60 * 60)) % 24
            );

        const minutes =
            Math.floor(
                (remaining /
                    (1000 * 60)) % 60
            );

        const seconds =
            Math.floor(
                (remaining / 1000) % 60
            );

        if (yearsEl) yearsEl.textContent = years;
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;

    }

    updateCounter();

    setInterval(updateCounter, 1000);


    /* =========================================================
       MUSIC
    ========================================================= */

    const music = document.getElementById("music");
    const playBtn = document.getElementById("playMusic");
    const progress = document.getElementById("progress");
    const volume = document.getElementById("volume");
    const cover = document.querySelector(".music-cover");


    function updateMusicUI() {

        if (!music || !playBtn) return;

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

        playBtn.addEventListener("click", async () => {

            try {

                if (music.paused) {
                    await music.play();
                } else {
                    music.pause();
                }

                updateMusicUI();

            } catch (error) {

                console.log("Music error:", error);

            }

        });

        music.addEventListener("play", updateMusicUI);
        music.addEventListener("pause", updateMusicUI);
        music.addEventListener("ended", updateMusicUI);

    }


    if (music && progress) {

        music.addEventListener("timeupdate", () => {

            if (!music.duration) return;

            progress.value =
                (music.currentTime / music.duration) * 100;

        });


        progress.addEventListener("input", () => {

            if (!music.duration) return;

            music.currentTime =
                (progress.value / 100) * music.duration;

        });

    }


    if (music && volume) {

        volume.addEventListener("input", () => {

            music.volume =
                Number(volume.value);

        });

    }


    /* =========================================================
       FLOATING HEARTS
    ========================================================= */

    function createHeart() {

        const container =
            document.getElementById("hearts");

        if (!container) return;

        const heart =
            document.createElement("div");

        heart.className = "heart";
        heart.textContent = "❤";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            15 + Math.random() * 25 + "px";

        heart.style.animationDuration =
            5 + Math.random() * 5 + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);

    }

    setInterval(createHeart, 650);


    /* =========================================================
       LOVE BOX
    ========================================================= */

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
        document.getElementById("giftBox");

    const giftMessage =
        document.getElementById("giftMessage");

    const countdownText =
        document.getElementById("countdown");


    if (gift) {

        gift.addEventListener("click", () => {

            const random =
                loveMessages[
                    Math.floor(
                        Math.random() *
                        loveMessages.length
                    )
                ];

            gift.style.transform =
                "scale(1.2) rotate(5deg)";

            setTimeout(() => {
                gift.style.transform = "";
            }, 300);

            if (giftMessage) {
                giftMessage.textContent = random;
            }

            createSpecialHearts();

        });

    }


    /* =========================================================
       SPECIAL HEARTS
    ========================================================= */

    function createSpecialHearts() {

        for (let i = 0; i < 20; i++) {

            const heart =
                document.createElement("div");

            heart.textContent = "❤️";

            heart.style.position = "fixed";
            heart.style.left =
                Math.random() * 100 + "vw";
            heart.style.top = "100vh";
            heart.style.fontSize =
                18 + Math.random() * 25 + "px";
            heart.style.zIndex = "99999";
            heart.style.pointerEvents = "none";
            heart.style.transition = "3s ease";

            document.body.appendChild(heart);

            setTimeout(() => {

                heart.style.transform =
                    "translateY(-120vh) rotate(360deg)";

                heart.style.opacity = "0";

            }, 50);

            setTimeout(() => {
                heart.remove();
            }, 3200);

        }

    }


    /* =========================================================
       I MISS YOU
    ========================================================= */

    const missMessages = [

        "Close your eyes for a second... imagine me giving you the biggest hug. 🫂❤️",

        "If you miss me, just remember: I'm probably thinking about you too. ❤️",

        "Come here, b'outa dyali... you deserve a hug. 🫂",

        "Mima, I wish I could teleport to you right now. 🥺❤️",

        "If I could be anywhere right now, I'd choose to be beside you.",

        "You don't have to say anything. Just stay here with me for a moment. ❤️",

        "I miss your smile. I miss your voice. I miss you. 🥺",

        "A virtual kiss until I can give you a real one. 💋❤️",

        "Bentenа dyali, don't forget that you're loved. ❤️",

        "One day we'll look back at all these moments and smile. 🌸",

        "I wish I could pause the world and keep one moment with you forever.",

        "Missing you is just another way of realizing how much you mean to me. ❤️"

    ];


    const missMessage =
        document.getElementById("missMessage");

    const anotherMiss =
        document.getElementById("anotherMiss");

    const missCount =
        document.getElementById("missCount");


    let savedMissCount =
        Number(localStorage.getItem("rymaaMissCount")) || 0;


    function showMissMessage() {

        const random =
            missMessages[
                Math.floor(
                    Math.random() *
                    missMessages.length
                )
            ];

        if (missMessage) {
            missMessage.textContent = random;
        }

        savedMissCount++;

        localStorage.setItem(
            "rymaaMissCount",
            savedMissCount
        );

        if (missCount) {
            missCount.textContent = savedMissCount;
        }

        createSpecialHearts();

    }


    if (missCount) {
        missCount.textContent = savedMissCount;
    }


    if (anotherMiss) {

        anotherMiss.addEventListener(
            "click",
            showMissMessage
        );

    }


    /* =========================================================
       DAILY SURPRISE
    ========================================================= */

    const dailySurprises = [

        {
            icon: "💌",
            text: "Today I want you to know that you are still one of my favorite people in this world."
        },

        {
            icon: "🥺",
            text: "Your mission today: smile at least once and remember that someone loves that smile."
        },

        {
            icon: "🌹",
            text: "A little reminder: beautiful things take time. So let's keep creating ours."
        },

        {
            icon: "🫂",
            text: "Today's surprise is a virtual hug. Don't escape. You're stuck here. 😂❤️"
        },

        {
            icon: "💋",
            text: "Today's official message: one kiss for Rymaa. No refunds. 😌❤️"
        },

        {
            icon: "🌙",
            text: "Tonight, before sleeping, remember one beautiful moment between us."
        },

        {
            icon: "📸",
            text: "Today, look at one of our pictures and remember how far our story has come."
        },

        {
            icon: "❤️",
            text: "365 days later... and I would still choose you."
        },

        {
            icon: "🎵",
            text: "Listen to our song today and pretend I'm sitting beside you."
        },

        {
            icon: "🥰",
            text: "Your daily reminder: Mima is loved. Very, very much."
        }

    ];


    const dailyIcon =
        document.getElementById("dailyIcon");

    const dailyMessage =
        document.getElementById("dailyMessage");


    function getTodayKey() {

        const today = new Date();

        return today.getFullYear() +
            "-" +
            String(today.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(today.getDate()).padStart(2, "0");

    }


    function showDailySurprise() {

        const todayKey =
            getTodayKey();

        let saved =
            localStorage.getItem(
                "rymaaDailySurprise"
            );

        if (!saved) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    dailySurprises.length
                );

            saved = JSON.stringify({
                date: todayKey,
                index: randomIndex
            });

            localStorage.setItem(
                "rymaaDailySurprise",
                saved
            );

        }

        const data =
            JSON.parse(saved);

        if (data.date !== todayKey) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    dailySurprises.length
                );

            saved = JSON.stringify({
                date: todayKey,
                index: randomIndex
            });

            localStorage.setItem(
                "rymaaDailySurprise",
                saved
            });

            data.date = todayKey;
            data.index = randomIndex;

        }

        const surprise =
            dailySurprises[data.index];

        if (dailyIcon) {
            dailyIcon.textContent =
                surprise.icon;
        }

        if (dailyMessage) {
            dailyMessage.textContent =
                surprise.text;
        }

    }


    showDailySurprise();


    /* =========================================================
       QUESTIONS
    ========================================================= */

    const questions = [

        "What is your favorite memory of us?",

        "What was the first thing you noticed about me?",

        "What is one thing you want us to do together this year?",

        "Where would you take me if we could travel tomorrow?",

        "What song reminds you of us?",

        "What little thing I do makes you smile?",

        "What moment with me do you wish you could relive?",

        "What is something you want us to learn together?",

        "What is your favorite nickname I call you?",

        "What do you hope our next anniversary looks like?",

        "What's one dream you want us to achieve together?",

        "What makes you feel most loved by me?",

        "What's one place you want us to visit together?",

        "What is something you never want us to stop doing?",

        "If our relationship was a movie, what would its title be?"

    ];


    const questionText =
        document.getElementById("questionText");

    const newQuestion =
        document.getElementById("newQuestion");

    const questionAnswer =
        document.getElementById("questionAnswer");

    const saveAnswer =
        document.getElementById("saveAnswer");

    const answerStatus =
        document.getElementById("answerStatus");


    function showRandomQuestion() {

        if (!questionText) return;

        questionText.textContent =
            questions[
                Math.floor(
                    Math.random() *
                    questions.length
                )
            ];

        if (questionAnswer) {
            questionAnswer.value = "";
        }

        if (answerStatus) {
            answerStatus.textContent = "";
        }

    }


    if (newQuestion) {
        newQuestion.addEventListener(
            "click",
            showRandomQuestion
        );
    }


    if (saveAnswer) {

        saveAnswer.addEventListener("click", () => {

            const answer =
                questionAnswer
                    ? questionAnswer.value.trim()
                    : "";

            if (!answer) {

                if (answerStatus) {
                    answerStatus.textContent =
                        "Write something from your heart first ❤️";
                }

                return;

            }

            const savedAnswers =
                JSON.parse(
                    localStorage.getItem(
                        "rymaaAnswers"
                    ) || "[]"
                );

            savedAnswers.push({

                question:
                    questionText.textContent,

                answer,

                date:
                    new Date().toLocaleString()

            });

            localStorage.setItem(
                "rymaaAnswers",
                JSON.stringify(savedAnswers)
            );

            if (answerStatus) {
                answerStatus.textContent =
                    "❤️ Saved. Keep this little moment.";
            }

        });

    }


    /* =========================================================
       SECRET ROOM
    ========================================================= */

    const secretPin =
        document.getElementById("secretPin");

    const unlockSecret =
        document.getElementById("unlockSecret");

    const secretStatus =
        document.getElementById("secretStatus");

    const secretLocked =
        document.getElementById("secretLocked");

    const secretContent =
        document.getElementById("secretContent");

    const lockSecret =
        document.getElementById("lockSecret");


    /*
       Change this PIN if you want.
       IMPORTANT:
       Because this is a GitHub Pages website,
       this is NOT real security.
       It is only a cute private-room lock.
    */

    const SECRET_PIN = "2709";


    function unlockRoom() {

        if (!secretPin) return;

        if (secretPin.value === SECRET_PIN) {

            secretLocked.classList.add("hidden");
            secretContent.classList.remove("hidden");

            secretPin.value = "";

            createSpecialHearts();

        } else {

            if (secretStatus) {
                secretStatus.textContent =
                    "❌ That's not our secret ❤️";
            }

        }

    }


    if (unlockSecret) {
        unlockSecret.addEventListener(
            "click",
            unlockRoom
        );
    }


    if (secretPin) {

        secretPin.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    unlockRoom();
                }

            }
        );

    }


    if (lockSecret) {

        lockSecret.addEventListener(
            "click",
            () => {

                secretContent.classList.add("hidden");
                secretLocked.classList.remove("hidden");

                if (secretStatus) {
                    secretStatus.textContent = "";
                }

            }
        );

    }


    /* =========================================================
       LOVE NOTES
    ========================================================= */

    const noteInput =
        document.getElementById("noteInput");

    const saveNote =
        document.getElementById("saveNote");

    const notesList =
        document.getElementById("notesList");

    const clearNotes =
        document.getElementById("clearNotes");


    function getNotes() {

        return JSON.parse(
            localStorage.getItem(
                "rymaaLoveNotes"
            ) || "[]"
        );

    }


    function renderNotes() {

        if (!notesList) return;

        const notes =
            getNotes();

        notesList.innerHTML = "";

        if (!notes.length) {

            notesList.innerHTML = `
                <div class="saved-note">
                    <p>
                        Your little love notes will appear here. ❤️
                    </p>
                </div>
            `;

            return;

        }


        [...notes]
            .reverse()
            .forEach(note => {

                const element =
                    document.createElement("div");

                element.className =
                    "saved-note";

                const p =
                    document.createElement("p");

                p.textContent =
                    note.text;

                const small =
                    document.createElement("small");

                small.textContent =
                    note.date;

                element.appendChild(p);
                element.appendChild(small);

                notesList.appendChild(element);

            });

    }


    if (saveNote) {

        saveNote.addEventListener("click", () => {

            const text =
                noteInput
                    ? noteInput.value.trim()
                    : "";

            if (!text) return;

            const notes =
                getNotes();

            notes.push({

                text,

                date:
                    new Date().toLocaleString()

            });

            localStorage.setItem(
                "rymaaLoveNotes",
                JSON.stringify(notes)
            );

            noteInput.value = "";

            renderNotes();

            createSpecialHearts();

        });

    }


    if (clearNotes) {

        clearNotes.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Clear all your saved love notes?"
                    );

                if (!confirmed) return;

                localStorage.removeItem(
                    "rymaaLoveNotes"
                );

                renderNotes();

            }
        );

    }


    renderNotes();


    /* =========================================================
       LOVE STREAK
    ========================================================= */

    const streakNumber =
        document.getElementById("streakNumber");


    function updateStreak() {

        const today =
            new Date();

        const todayKey =
            today.toISOString().slice(0, 10);

        const yesterday =
            new Date(today);

        yesterday.setDate(
            yesterday.getDate() - 1
        );

        const yesterdayKey =
            yesterday.toISOString().slice(0, 10);

        let streak =
            Number(
                localStorage.getItem(
                    "rymaaStreak"
                )
            ) || 0;

        const lastVisit =
            localStorage.getItem(
                "rymaaLastVisit"
            );


        if (lastVisit === todayKey) {

            // Already counted today.

        } else if (lastVisit === yesterdayKey) {

            streak++;

        } else {

            streak = 1;

        }


        localStorage.setItem(
            "rymaaStreak",
            streak
        );

        localStorage.setItem(
            "rymaaLastVisit",
            todayKey
        );


        if (streakNumber) {
            streakNumber.textContent =
                streak;
        }

    }


    updateStreak();


    /* =========================================================
       QUIZ
    ========================================================= */

    const quizButtons =
        document.querySelectorAll(
            ".quizBtn"
        );

    const quizResult =
        document.getElementById(
            "quizResult"
        );


    quizButtons.forEach(button => {

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

    });


    /* =========================================================
       MESSAGE BOX
    ========================================================= */

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


                const saved =
                    JSON.parse(
                        localStorage.getItem(
                            "rymaaMessages"
                        ) || "[]"
                    );


                saved.push({

                    message,

                    date:
                        new Date().toLocaleString()

                });


                localStorage.setItem(
                    "rymaaMessages",
                    JSON.stringify(saved)
                );


                if (messageBox) {
                    messageBox.value = "";
                }

                if (passwordInput) {
                    passwordInput.value = "";
                }


                if (sendStatus) {
                    sendStatus.textContent =
                        "❤️ Your message is saved here.";
                }


                createSpecialHearts();

            }
        );

    }


    /* =========================================================
       BROKEN HEART
    ========================================================= */

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

                if (fixed) return;

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

                createSpecialHearts();

            }
        );

    }


    /* =========================================================
       LIGHTBOX
    ========================================================= */

    const galleryImages =
        document.querySelectorAll(
            ".gallery img"
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

        if (!galleryImages.length) return;

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

        if (!galleryImages.length) return;

        currentImage += direction;

        if (currentImage < 0) {

            currentImage =
                galleryImages.length - 1;

        }

        if (
            currentImage >=
            galleryImages.length
        ) {

            currentImage = 0;

        }

        lightboxImg.src =
            galleryImages[
                currentImage
            ].src;

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


    /* =========================================================
       ESCAPE FROM SPECIAL PAGES
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            const activePage =
                document.querySelector(
                    ".page.active"
                );

            if (!activePage) return;

            const specialPages = [
                "missYou",
                "daily",
                "questions",
                "secret",
                "notes",
                "timeline"
            ];

            if (
                specialPages.includes(
                    activePage.id
                )
            ) {

                showPage("happy");

            }

        }
    );

});
