document.addEventListener("DOMContentLoaded", () => {


    /* ============================================================
       CONFIGURATION
    ============================================================ */

    /*
       IMPORTANT:

       After creating your Google Apps Script Web App,
       paste its /exec URL here.

       Example:

       const API_URL =
       "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";
    */

    const API_URL =
        "https://script.google.com/macros/s/AKfycbwn3VYO5bTHqf4rC3khqVibW7MAPJ2Y_iqtEog1Qm2cRe6XqdjgNCj9-_q-7M1U0UOp/exec";


    /*
       This is NOT your Telegram token.

       It is simply an extra value used by the website
       to identify requests coming from this version.
    */

    const SITE_KEY =
        "RYMAA_PRIVATE_PLACE_2026";


    /*
       Love Code used by Rymaa.

       You can change it if you want.
    */

    const LOVE_CODE =
        "ryma";


    /* ============================================================
       PAGE NAVIGATION
    ============================================================ */

    const pages =
        document.querySelectorAll(".page");


    function showPage(id) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target =
            document.getElementById(id);

        if (target) {

            target.classList.add("active");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }


    /* ============================================================
       MAIN NAVIGATION
    ============================================================ */

    const happyBtn =
        document.getElementById("happyBtn");

    const sadBtn =
        document.getElementById("sadBtn");

    const continueBtn =
        document.getElementById("continueBtn");

    const next1 =
        document.getElementById("next1");

    const next2 =
        document.getElementById("next2");

    const next3 =
        document.getElementById("next3");

    const next4 =
        document.getElementById("next4");

    const quizStart =
        document.getElementById("quizStart");

    const quizNext =
        document.getElementById("quizNext");


    if (happyBtn) {

        happyBtn.addEventListener(
            "click",
            () => {

                showPage("happy");

            }
        );

    }


    if (sadBtn) {

        sadBtn.addEventListener(
            "click",
            () => {

                showPage("sad");

            }
        );

    }


    if (continueBtn) {

        continueBtn.addEventListener(
            "click",
            () => {

                showPage("letter");

            }
        );

    }


    if (next1) {

        next1.addEventListener(
            "click",
            () => {

                showPage("heartGame");

            }
        );

    }


    if (next2) {

        next2.addEventListener(
            "click",
            () => {

                showPage("lessons");

            }
        );

    }


    if (next3) {

        next3.addEventListener(
            "click",
            () => {

                showPage("memories");

            }
        );

    }


    if (next4) {

        next4.addEventListener(
            "click",
            () => {

                showPage("final");

            }
        );

    }


    if (quizStart) {

        quizStart.addEventListener(
            "click",
            () => {

                showPage("quiz");

            }
        );

    }


    if (quizNext) {

        quizNext.addEventListener(
            "click",
            () => {

                showPage("final");

            }
        );

    }


    /* ============================================================
       RANDOM LOVE MESSAGE
    ============================================================ */

    const loveMessages = [

        "❤️ You are my favorite person.",

        "🌹 Thank you for making this year unforgettable.",

        "💖 If I could relive this year, I would choose you again.",

        "🥹 You are one of my favorite parts of life.",

        "✨ One year. Countless memories. One special girl.",

        "💕 You made ordinary days feel extraordinary.",

        "🌸 I hope we create many more beautiful memories together.",

        "❤️ My favorite chapter is the one where I met you.",

        "🌙 Even on difficult days, you are still precious to me.",

        "💌 Happy first anniversary, my beautiful Rymaa.",

        "🌹 Thank you for every laugh, conversation and memory.",

        "💗 One year with you will always be a year I treasure.",

        "❤️ I choose you today, tomorrow and every day after.",

        "✨ Our story has only just begun.",

        "🥰 You are my favorite person and my sweetest memory.",

        "💖 Thank you for being you.",

        "🌷 Here's to the first year and all the beautiful moments ahead.",

        "💌 Amine loves you more than words can explain."

    ];


    const loveMessage =
        document.getElementById("loveMessage");


    function randomLoveMessage() {

        if (!loveMessage) {
            return;
        }

        const random =
            Math.floor(
                Math.random() *
                loveMessages.length
            );

        loveMessage.textContent =
            loveMessages[random];

    }


    randomLoveMessage();


    setInterval(
        randomLoveMessage,
        8000
    );


    /* ============================================================
       ANNIVERSARY COUNTER
    ============================================================ */

    const startDate =
        new Date(
            "September 27, 2025 00:00:00"
        );


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


    function updateCounter() {

        const now =
            new Date();

        if (now < startDate) {

            if (yearsEl)
                yearsEl.textContent = "0";

            if (daysEl)
                daysEl.textContent = "0";

            if (hoursEl)
                hoursEl.textContent = "0";

            if (minutesEl)
                minutesEl.textContent = "0";

            if (secondsEl)
                secondsEl.textContent = "0";

            return;

        }


        let years =
            now.getFullYear() -
            startDate.getFullYear();


        const anniversary =
            new Date(startDate);


        anniversary.setFullYear(
            startDate.getFullYear() +
            years
        );


        if (anniversary > now) {

            years--;

            anniversary.setFullYear(
                startDate.getFullYear() +
                years
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


        if (yearsEl)
            yearsEl.textContent = years;

        if (daysEl)
            daysEl.textContent = days;

        if (hoursEl)
            hoursEl.textContent = hours;

        if (minutesEl)
            minutesEl.textContent = minutes;

        if (secondsEl)
            secondsEl.textContent = seconds;

    }


    updateCounter();

    setInterval(
        updateCounter,
        1000
    );


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
            "timeupdate",
            () => {

                if (
                    progress &&
                    music.duration
                ) {

                    progress.value =
                        (
                            music.currentTime /
                            music.duration
                        ) * 100;

                }

            }
        );


        if (progress) {

            progress.addEventListener(
                "input",
                () => {

                    if (!music.duration) {
                        return;
                    }

                    music.currentTime =
                        (
                            progress.value /
                            100
                        ) *
                        music.duration;

                }
            );

        }


        if (volume) {

            volume.addEventListener(
                "input",
                () => {

                    music.volume =
                        volume.value;

                }
            );

        }

    }


    /* ============================================================
       FLOATING HEARTS
    ============================================================ */

    function createHeart() {

        const container =
            document.getElementById("hearts");

        if (!container) {
            return;
        }


        const heart =
            document.createElement("div");

        heart.className =
            "heart";

        heart.textContent =
            "❤";

        heart.style.left =
            Math.random() *
            100 +
            "vw";

        heart.style.fontSize =
            15 +
            Math.random() *
            25 +
            "px";

        heart.style.animationDuration =
            5 +
            Math.random() *
            5 +
            "s";

        container.appendChild(
            heart
        );


        setTimeout(
            () => {
                heart.remove();
            },
            10000
        );

    }


    setInterval(
        createHeart,
        650
    );


    /* ============================================================
       SPECIAL HEARTS
    ============================================================ */

    function createSpecialHearts() {

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const heart =
                document.createElement("div");

            heart.textContent =
                Math.random() > 0.5
                    ? "❤️"
                    : "💗";

            heart.style.position =
                "fixed";

            heart.style.left =
                Math.random() *
                100 +
                "vw";

            heart.style.bottom =
                "-30px";

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


            setTimeout(
                () => {

                    heart.style.transform =
                        "translateY(-120vh) rotate(360deg)";

                    heart.style.opacity =
                        "0";

                },
                50
            );


            setTimeout(
                () => {

                    heart.remove();

                },
                3000
            );

        }

    }


    /* ============================================================
       LOVE BOX
    ============================================================ */

    const gift =
        document.getElementById("giftBox");

    const giftMessage =
        document.getElementById("giftMessage");


    if (gift) {

        gift.addEventListener(
            "click",
            () => {

                const random =
                    Math.floor(
                        Math.random() *
                        loveMessages.length
                    );

                if (giftMessage) {

                    giftMessage.textContent =
                        loveMessages[random];

                }

                createSpecialHearts();

            }
        );

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
       PRIVATE PLACE MODAL
    ============================================================ */

    const featureModal =
        document.getElementById(
            "featureModal"
        );

    const featureModalBody =
        document.getElementById(
            "featureModalBody"
        );

    const closeFeatureModal =
        document.getElementById(
            "closeFeatureModal"
        );


    function openFeature() {

        if (!featureModal) {
            return;
        }

        featureModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeFeature() {

        if (!featureModal) {
            return;
        }

        featureModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    if (closeFeatureModal) {

        closeFeatureModal.addEventListener(
            "click",
            closeFeature
        );

    }


    if (featureModal) {

        featureModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    featureModal
                ) {

                    closeFeature();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                featureModal &&
                featureModal.classList.contains(
                    "active"
                )
            ) {

                closeFeature();

            }

        }
    );


    /* ============================================================
       MISS YOU
    ============================================================ */

    const missMessages = [

        "If you miss me right now, just know I'm probably missing you too. ❤️",

        "Close your eyes for a second... imagine me holding your hand. 🥺❤️",

        "Distance can make a moment feel long, but it cannot make you less important to me. 💗",

        "If I could appear beside you right now, I would. No questions asked. ❤️",

        "You don't have to say anything. Just remember that you are loved. 🌷",

        "One little message from you can change my whole day. 💌",

        "Come here... imaginary hug incoming. 🫂❤️",

        "If you miss me, send a little kiss into the screen. I'll catch it. 😘"

    ];


    let missIndex = 0;


    function renderMissYou() {

        if (!featureModalBody) {
            return;
        }


        const count =
            Number(
                localStorage.getItem(
                    "rymaaMissCount"
                ) || 0
            );


        featureModalBody.innerHTML = `

            <div class="feature-content">

                <div class="big-icon">
                    🥺❤️
                </div>

                <h2>
                    I Miss You
                </h2>

                <p class="feature-subtitle">
                    For the moments when you wish
                    I was right beside you.
                </p>

                <div class="feature-message"
                     id="missMessage">

                    ${missMessages[missIndex]}

                </div>

                <button class="feature-btn"
                        data-action="new-miss">

                    💌 Tell Me Again

                </button>

                <button class="feature-btn"
                        data-action="kiss">

                    😘 Send Me a Kiss

                </button>

                <p style="
                    color:#aaa;
                    font-size:12px;
                    margin-top:15px;
                ">

                    You opened this little place
                    ${count} time(s). ❤️

                </p>

            </div>

        `;

        openFeature();

    }


    /* ============================================================
       DAILY SURPRISE
    ============================================================ */

    const dailyItems = [

        {
            title: "Today's Little Challenge 🌸",
            text: "Tell me three little things that made you smile today."
        },

        {
            title: "Today's Question 💭",
            text: "What is one memory of us that you could live again?"
        },

        {
            title: "Today's Mission ❤️",
            text: "Send me one sentence that you would want me to remember forever."
        },

        {
            title: "Today's Hug 🫂",
            text: "Stop for a moment, breathe, and imagine the biggest hug from me."
        },

        {
            title: "Today's Secret 💌",
            text: "Think of one thing you love about us that you have never told me."
        },

        {
            title: "Today's Smile 😊",
            text: "Look at one of our photos and remember exactly how that moment felt."
        },

        {
            title: "Today's Promise 🌷",
            text: "Promise yourself to protect one beautiful memory of us today."
        }

    ];


    function getTodayKey() {

        const now =
            new Date();

        return (
            now.getFullYear() +
            "-" +
            String(
                now.getMonth() + 1
            ).padStart(2, "0") +
            "-" +
            String(
                now.getDate()
            ).padStart(2, "0")
        );

    }


    function renderDaily() {

        const key =
            "rymaaDaily-" +
            getTodayKey();


        let item =
            localStorage.getItem(key);


        if (item) {

            item =
                JSON.parse(item);

        } else {

            item =
                dailyItems[
                    Math.floor(
                        Math.random() *
                        dailyItems.length
                    )
                ];

            localStorage.setItem(
                key,
                JSON.stringify(item)
            );

        }


        featureModalBody.innerHTML = `

            <div class="feature-content">

                <div class="big-icon">
                    🌸
                </div>

                <h2>
                    Today's Surprise
                </h2>

                <p class="feature-subtitle">
                    One little thing for today.
                </p>

                <div class="daily-box">

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        ${item.text}
                    </p>

                </div>

                <button class="feature-btn"
                        data-action="daily-done">

                    ❤️ I Did It

                </button>

            </div>

        `;

        openFeature();

    }


    /* ============================================================
       QUESTIONS
    ============================================================ */

    const questions = [

        "What was the first thing that made you feel comfortable with me?",

        "Which memory of us makes you smile immediately?",

        "What is one place you would love for us to visit together?",

        "What little thing do I do that secretly makes you happy?",

        "If our story was a movie, what would you call it?",

        "What song reminds you of us?",

        "What is one thing you hope we experience together?",

        "Which version of us do you love the most?",

        "What was your favorite conversation between us?",

        "If you could freeze one moment with me, which one would it be?",

        "What is one thing you want us to learn together?",

        "What makes our relationship feel special to you?",

        "What is one silly memory you never want us to forget?",

        "Where would you take me for our perfect day?",

        "What do you want our next chapter to feel like?"

    ];


    let currentQuestion =
        Math.floor(
            Math.random() *
            questions.length
        );


    function renderQuestion() {

        featureModalBody.innerHTML = `

            <div class="feature-content">

                <div class="big-icon">
                    💬
                </div>

                <h2>
                    Our Little Question
                </h2>

                <p class="feature-subtitle">
                    No perfect answers.
                    Just honest ones.
                </p>

                <div class="question-box">

                    <div class="question-text">

                        ${questions[currentQuestion]}

                    </div>

                </div>

                <button class="feature-btn"
                        data-action="new-question">

                    🔄 Another Question

                </button>

            </div>

        `;

        openFeature();

    }


    /* ============================================================
       LOVE NOTES
    ============================================================ */

    const NOTES_KEY =
        "rymaaLoveNotes";


    function escapeHTML(text) {

        return String(text)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    function getNotes() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    NOTES_KEY
                ) || "[]"
            );

        } catch {

            return [];

        }

    }


    function saveNotes(notes) {

        localStorage.setItem(
            NOTES_KEY,
            JSON.stringify(notes)
        );

    }


    function renderNotes() {

        const notes =
            getNotes();


        let notesHTML =
            "";


        if (!notes.length) {

            notesHTML = `

                <div class="feature-message">

                    No little notes yet. ❤️
                    <br>
                    Write the first one.

                </div>

            `;

        } else {

            notesHTML =
                `<div class="note-list">` +
                notes
                    .slice()
                    .reverse()
                    .map(
                        note => `

                            <div class="note-item">

                                <button
                                    class="delete-note"
                                    data-action="delete-note"
                                    data-id="${note.id}">

                                    ✕

                                </button>

                                <small>
                                    ${escapeHTML(note.date)}
                                </small>

                                <p>
                                    ${escapeHTML(note.text)}
                                </p>

                            </div>

                        `
                    )
                    .join("") +
                `</div>`;

        }


        featureModalBody.innerHTML = `

            <div class="feature-content">

                <div class="big-icon">
                    💌
                </div>

                <h2>
                    Our Love Notes
                </h2>

                <p class="feature-subtitle">
                    These notes are saved on this device.
                </p>

                <textarea
                    id="noteInput"
                    class="feature-textarea"
                    maxlength="1000"
                    placeholder="Write something you want us to remember..."></textarea>

                <button class="feature-btn"
                        data-action="save-note">

                    💖 Save This Note

                </button>

                ${notesHTML}

            </div>

        `;

        openFeature();

    }


    /* ============================================================
       SECRET ROOM
    ============================================================ */

    let secretUnlocked =
        false;


    function renderSecret() {

        if (secretUnlocked) {

            featureModalBody.innerHTML = `

                <div class="feature-content">

                    <div class="big-icon">
                        🔐❤️
                    </div>

                    <h2>
                        Our Secret Room
                    </h2>

                    <div class="secret-success">

                        <h3>
                            Welcome back, Rymaa. ❤️
                        </h3>

                        <p>
                            This little place is only for
                            beautiful things, soft memories,
                            and words we don't want to lose.
                        </p>

                        <br>

                        <p>
                            You are loved.
                            You are remembered.
                            And you are special to me.
                            🌷❤️
                        </p>

                    </div>

                    <button class="feature-btn"
                            data-action="lock-secret">

                        🔒 Lock Again

                    </button>

                </div>

            `;

        } else {

            featureModalBody.innerHTML = `

                <div class="feature-content">

                    <div class="big-icon">
                        🔐
                    </div>

                    <h2>
                        Secret Room
                    </h2>

                    <p class="feature-subtitle">
                        Enter our little love code.
                    </p>

                    <div class="secret-box">

                        <input
                            id="secretInput"
                            class="feature-input"
                            type="password"
                            placeholder="Love Code">

                        <button
                            class="feature-btn"
                            data-action="unlock-secret">

                            ❤️ Unlock

                        </button>

                        <p id="secretStatus"
                           style="
                              color:#ff4f8b;
                              min-height:22px;
                              margin-top:8px;
                           ">
                        </p>

                    </div>

                </div>

            `;

        }

        openFeature();

    }


    /* ============================================================
       TIMELINE
    ============================================================ */

    function renderTimeline() {

        featureModalBody.innerHTML = `

            <div class="feature-content">

                <div class="big-icon">
                    🕰️❤️
                </div>

                <h2>
                    Our Story
                </h2>

                <p class="feature-subtitle">
                    Little chapters that belong to us.
                </p>

                <div class="timeline">

                    <div class="timeline-item">

                        <h3>
                            The Beginning 🌱
                        </h3>

                        <p>
                            The chapter where two people
                            became part of each other's story.
                        </p>

                    </div>

                    <div class="timeline-item">

                        <h3>
                            The First Memories 📸
                        </h3>

                        <p>
                            Conversations, jokes,
                            smiles and moments that slowly
                            became ours.
                        </p>

                    </div>

                    <div class="timeline-item">

                        <h3>
                            The First Year ❤️
                        </h3>

                        <p>
                            365 days filled with memories,
                            emotions and lessons.
                        </p>

                    </div>

                    <div class="timeline-item">

                        <h3>
                            Today 🌷
                        </h3>

                        <p>
                            Still here.
                            Still choosing each other.
                            Still writing.
                        </p>

                    </div>

                    <div class="timeline-item">

                        <h3>
                            The Next Chapter ✨
                        </h3>

                        <p>
                            The part of the story
                            we haven't written yet.
                        </p>

                    </div>

                </div>

            </div>

        `;

        openFeature();

    }


    /* ============================================================
       LOVE STREAK
    ============================================================ */

    function renderStreak() {

        const today =
            getTodayKey();

        const stored =
            JSON.parse(
                localStorage.getItem(
                    "rymaaStreak"
                ) || "{}"
            );


        let streak =
            Number(
                stored.streak || 0
            );


        if (
            stored.lastDate !==
            today
        ) {

            const yesterday =
                new Date();

            yesterday.setDate(
                yesterday.getDate() - 1
            );


            const yesterdayKey =
                yesterday.getFullYear() +
                "-" +
                String(
                    yesterday.getMonth() + 1
                ).padStart(2, "0") +
                "-" +
                String(
                    yesterday.getDate()
                ).padStart(2, "0");


            if (
                stored.lastDate ===
                yesterdayKey
            ) {

                streak += 1;

            } else {

                streak = 1;

            }


            localStorage.setItem(
                "rymaaStreak",
                JSON.stringify({
                    streak:
                        streak,
                    lastDate:
                        today
                })
            );

        }


        featureModalBody.innerHTML = `

            <div class="feature-content">

                <div class="big-icon">
                    🔥
                </div>

                <h2>
                    Love Streak
                </h2>

                <p class="feature-subtitle">
                    One little check-in each day.
                </p>

                <div class="streak-number">
                    ${streak}
                </div>

                <p>
                    day(s) of our little streak ❤️
                </p>

                <div class="feature-message">

                    Even a tiny moment can become
                    part of our story.

                </div>

            </div>

        `;

        openFeature();

    }


    /* ============================================================
       MESSAGE FEATURE
    ============================================================ */

    function renderMessageFeature() {

        featureModalBody.innerHTML = `

            <div class="feature-content">

                <div class="big-icon">
                    📩❤️
                </div>

                <h2>
                    Send Me a Message
                </h2>

                <p class="feature-subtitle">
                    This message goes through our private
                    connection and reaches my Telegram.
                </p>

                <textarea
                    id="privateMessageInput"
                    class="feature-textarea"
                    maxlength="1000"
                    placeholder="Write something from your heart..."></textarea>

                <input
                    id="privatePasswordInput"
                    class="feature-input"
                    type="password"
                    placeholder="Enter Love Code">

                <button
                    class="feature-btn"
                    data-action="send-private-message">

                    💖 Send With Love

                </button>

                <p id="privateMessageStatus"
                   style="
                       min-height:25px;
                       color:#ff4f8b;
                       font-size:13px;
                       margin-top:10px;
                   ">
                </p>

            </div>

        `;

        openFeature();

    }


    /* ============================================================
       PRIVATE PLACE BUTTONS
    ============================================================ */

    document.querySelectorAll(
        ".private-card"
    ).forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    const feature =
                        card.dataset.feature;


                    switch (feature) {

                        case "missYou":

                            const count =
                                Number(
                                    localStorage.getItem(
                                        "rymaaMissCount"
                                    ) || 0
                                ) + 1;

                            localStorage.setItem(
                                "rymaaMissCount",
                                count
                            );

                            missIndex =
                                Math.floor(
                                    Math.random() *
                                    missMessages.length
                                );

                            renderMissYou();

                            break;


                        case "daily":

                            renderDaily();

                            break;


                        case "questions":

                            currentQuestion =
                                Math.floor(
                                    Math.random() *
                                    questions.length
                                );

                            renderQuestion();

                            break;


                        case "notes":

                            renderNotes();

                            break;


                        case "secret":

                            renderSecret();

                            break;


                        case "timeline":

                            renderTimeline();

                            break;


                        case "streak":

                            renderStreak();

                            break;


                        case "message":

                            renderMessageFeature();

                            break;

                    }

                }
            );

        }
    );


    /* ============================================================
       PRIVATE MODAL ACTIONS
    ============================================================ */

    if (featureModalBody) {

        featureModalBody.addEventListener(
            "click",
            async event => {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );


                if (!button) {
                    return;
                }


                const action =
                    button.dataset.action;


                /* MISS YOU */

                if (
                    action ===
                    "new-miss"
                ) {

                    missIndex =
                        (
                            missIndex + 1
                        ) %
                        missMessages.length;


                    const message =
                        document.getElementById(
                            "missMessage"
                        );


                    if (message) {

                        message.textContent =
                            missMessages[
                                missIndex
                            ];

                    }

                }


                if (
                    action ===
                    "kiss"
                ) {

                    sendKiss();

                }


                /* DAILY */

                if (
                    action ===
                    "daily-done"
                ) {

                    createSpecialHearts();

                    button.textContent =
                        "🥰 That's Our Little Win";

                }


                /* QUESTIONS */

                if (
                    action ===
                    "new-question"
                ) {

                    currentQuestion =
                        Math.floor(
                            Math.random() *
                            questions.length
                        );

                    renderQuestion();

                }


                /* NOTES */

                if (
                    action ===
                    "save-note"
                ) {

                    const input =
                        document.getElementById(
                            "noteInput"
                        );


                    const text =
                        input
                            ? input.value.trim()
                            : "";


                    if (!text) {

                        alert(
                            "Write something first ❤️"
                        );

                        return;

                    }


                    const notes =
                        getNotes();


                    notes.push({

                        id:
                            Date.now(),

                        text:
                            text,

                        date:
                            new Date()
                                .toLocaleString()

                    });


                    saveNotes(
                        notes
                    );


                    renderNotes();

                    createSpecialHearts();

                }


                if (
                    action ===
                    "delete-note"
                ) {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const notes =
                        getNotes()
                            .filter(
                                note =>
                                    note.id !== id
                            );


                    saveNotes(
                        notes
                    );


                    renderNotes();

                }


                /* SECRET */

                if (
                    action ===
                    "unlock-secret"
                ) {

                    const input =
                        document.getElementById(
                            "secretInput"
                        );

                    const status =
                        document.getElementById(
                            "secretStatus"
                        );


                    if (
                        input &&
                        input.value ===
                        LOVE_CODE
                    ) {

                        secretUnlocked =
                            true;

                        renderSecret();

                        createSpecialHearts();

                    } else if (status) {

                        status.textContent =
                            "❌ Not quite... try again ❤️";

                    }

                }


                if (
                    action ===
                    "lock-secret"
                ) {

                    secretUnlocked =
                        false;

                    renderSecret();

                }


                /* PRIVATE TELEGRAM MESSAGE */

                if (
                    action ===
                    "send-private-message"
                ) {

                    await sendTelegramMessage(
                        {
                            messageId:
                                "private"
                        }
                    );

                }

            }
        );

    }


    /* ============================================================
       SEND KISS
    ============================================================ */

    function sendKiss() {

        for (
            let i = 0;
            i < 8;
            i++
        ) {

            const kiss =
                document.createElement(
                    "div"
                );

            kiss.className =
                "kiss";

            kiss.textContent =
                "😘";

            kiss.style.left =
                (
                    35 +
                    Math.random() *
                    30
                ) +
                "vw";

            kiss.style.animationDelay =
                (
                    Math.random() *
                    0.5
                ) +
                "s";

            document.body.appendChild(
                kiss
            );


            setTimeout(
                () => {
                    kiss.remove();
                },
                2600
            );

        }

    }


    /* ============================================================
       SEND TELEGRAM MESSAGE
    ============================================================ */

    async function sendTelegramMessage(
        options = {}
    ) {

        const isPrivate =
            options.messageId ===
            "private";


        let messageInput;


        let passwordInput;


        let status;


        if (isPrivate) {

            messageInput =
                document.getElementById(
                    "privateMessageInput"
                );

            passwordInput =
                document.getElementById(
                    "privatePasswordInput"
                );

            status =
                document.getElementById(
                    "privateMessageStatus"
                );

        } else {

            messageInput =
                document.getElementById(
                    "rymeMessage"
                );

            passwordInput =
                document.getElementById(
                    "passwordInput"
                );

            status =
                document.getElementById(
                    "sendStatus"
                );

        }


        const message =
            messageInput
                ? messageInput.value.trim()
                : "";


        const password =
            passwordInput
                ? passwordInput.value
                : "";


        if (
            password !==
            LOVE_CODE
        ) {

            if (status) {

                status.textContent =
                    "❌ Try again babe ❤️";

            }

            return;

        }


        if (!message) {

            if (status) {

                status.textContent =
                    "💌 Write something first.";

            }

            return;

        }


        if (
            message.length >
            1000
        ) {

            if (status) {

                status.textContent =
                    "❌ Your message is too long.";

            }

            return;

        }


        if (
            !API_URL ||
            API_URL.includes(
                "PUT_YOUR"
            )
        ) {

            if (status) {

                status.textContent =
                    "⚠️ The private connection is not configured yet.";

            }

            return;

        }


        if (status) {

            status.textContent =
                "💌 Sending your message...";

        }


        const payload = {

            siteKey:
                SITE_KEY,

            action:
                "message",

            message:
                message,

            loveCode:
                password,

            page:
                window.location.href,

            sentAt:
                new Date().toISOString()

        };


        try {

            /*
               We deliberately use text/plain instead of
               application/json.

               This keeps the request simple for a static
               GitHub Pages website and avoids exposing the
               Telegram token to the browser.

               Apps Script receives the JSON text through
               e.postData.contents.
            */

            await fetch(
                API_URL,
                {
                    method:
                        "POST",

                    mode:
                        "no-cors",

                    headers:
                        {
                            "Content-Type":
                                "text/plain;charset=UTF-8"
                        },

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );


            if (status) {

                status.textContent =
                    "❤️ Sent. Your message is on its way to me.";

            }


            if (messageInput) {

                messageInput.value =
                    "";

            }


            if (passwordInput) {

                passwordInput.value =
                    "";

            }


            createSpecialHearts();


        } catch (error) {

            console.error(
                "Message error:",
                error
            );


            if (status) {

                status.textContent =
                    "❌ Something went wrong. Please try again.";

            }

        }

    }


    /* ============================================================
       OLD MAIN MESSAGE BUTTON
    ============================================================ */

    const sendMessageBtn =
        document.getElementById(
            "sendMessageBtn"
        );


    if (sendMessageBtn) {

        sendMessageBtn.addEventListener(
            "click",
            () => {

                sendTelegramMessage({
                    messageId:
                        "main"
                });

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


    let fixed =
        false;


    if (brokenHeart) {

        brokenHeart.addEventListener(
            "click",
            () => {

                if (fixed) {
                    return;
                }


                fixed =
                    true;


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


    /* ============================================================
       LIGHTBOX
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


    let currentImage =
        0;


    function openLightbox(index) {

        if (
            !galleryImages.length ||
            !lightbox ||
            !lightboxImg
        ) {

            return;

        }


        currentImage =
            index;


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


    function changeImage(
        direction
    ) {

        if (!galleryImages.length) {
            return;
        }


        currentImage +=
            direction;


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

            currentImage =
                0;

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

                    openLightbox(
                        index
                    );

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

});
