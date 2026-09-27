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
       "https://script.google.com/macros/s/AKfycbwn3VYO5bTHqf4rC3khqVibW7MAPJ2Y_iqtEog1Qm2cRe6XqdjgNCj9-_q-7M1U0UOp/exec";
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
       SHARED MEMORY CLOUD
    ============================================================ */

    const sharedData = {
        notes: [],
        diary: [],
        bucket: [],
        capsules: [],
        checkins: []
    };

    let sharedSyncOnline = false;
    let lastSharedSnapshot = null;
    let activeSharedFeature = null;

    function ensureLiveNotice() {
        if (document.getElementById("liveSyncNotice")) return;
        const el = document.createElement("div");
        el.id = "liveSyncNotice";
        el.className = "live-sync-notice";
        el.setAttribute("role", "status");
        el.innerHTML = '<span class="live-sync-icon">💌</span><span id="liveSyncNoticeText">A new moment in Our Story</span><button id="enableLiveNotifications" type="button">Enable alerts</button><button id="dismissLiveNotice" type="button" aria-label="Dismiss">×</button>';
        document.body.appendChild(el);
        document.getElementById("dismissLiveNotice").addEventListener("click", () => el.classList.remove("show"));
        document.getElementById("enableLiveNotifications").addEventListener("click", async () => {
            if (!("Notification" in window)) {
                document.getElementById("liveSyncNoticeText").textContent = "This browser does not support notifications.";
                return;
            }
            const permission = await Notification.requestPermission();
            document.getElementById("liveSyncNoticeText").textContent = permission === "granted" ? "Browser alerts enabled ❤️" : "Alerts are blocked in browser settings.";
            if (permission === "granted") document.getElementById("enableLiveNotifications").style.display = "none";
        });
    }

    function showLiveNotice(text, title = "Rymaa ❤️ Amine") {
        ensureLiveNotice();
        const el = document.getElementById("liveSyncNotice");
        document.getElementById("liveSyncNoticeText").textContent = text;
        el.classList.add("show");
        if ("Notification" in window && Notification.permission === "granted" && document.visibilityState !== "visible") {
            try { new Notification(title, { body: text, icon: "./assets/icon.png" }); } catch (_) {}
        }
        clearTimeout(window.__rymaaNoticeTimer);
        window.__rymaaNoticeTimer = setTimeout(() => el.classList.remove("show"), 8000);
    }

    function sharedSnapshot(data = sharedData) {
        return JSON.stringify(Object.fromEntries(Object.keys(data).map(key => [key, (data[key] || []).map(item => ({ id: item.id, date: item.date || item.createdAt, author: item.author, text: item.text || item.message || item.title, done: item.done }))])));
    }

    function refreshOpenSharedView() {
        if (!featureModal || !featureModal.classList.contains("active")) return;
        if (featureModalBody && featureModalBody.querySelector("input:focus, textarea:focus, select:focus")) return;
        const heading = featureModalBody?.querySelector("h2")?.textContent || "";
        if (heading.includes("Dashboard")) renderDashboard();
        else if (heading.includes("Diary")) renderDiary();
        else if (heading.includes("Bucket") || heading.includes("Dream")) renderBucket();
        else if (heading.includes("Time Capsule")) renderCapsule();
        else if (heading.includes("Mood") || heading.includes("Check")) renderCheckin();
        else if (heading.includes("Memory Jar")) renderMemoryJar();
    }

    function makeId(prefix = "rymaa") {
        return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    }

    async function saveShared(action, data = {}) {
        const payload = {
            siteKey: SITE_KEY,
            action,
            ...data
        };

        try {
            await fetch(API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8"
                },
                body: JSON.stringify(payload)
            });
            return true;
        } catch (error) {
            console.warn("Shared save failed; local copy kept.", error);
            return false;
        }
    }

    async function loadSharedData() {
        if (!API_URL || API_URL.includes("PUT_YOUR")) return;

        try {
            const response = await fetch(
                API_URL + "?action=sync&t=" + Date.now(),
                { cache: "no-store" }
            );

            const result = await response.json();

            if (result.ok && result.data) {
                Object.keys(sharedData).forEach(key => {
                    sharedData[key] = Array.isArray(result.data[key])
                        ? result.data[key]
                        : [];
                });
                sharedSyncOnline = true;
                localStorage.setItem("rymaaSharedCache", JSON.stringify(sharedData));
                const nextSnapshot = sharedSnapshot(sharedData);
                if (lastSharedSnapshot !== null && nextSnapshot !== lastSharedSnapshot) {
                    const before = JSON.parse(lastSharedSnapshot);
                    let notice = "Our shared story was updated ❤️";
                    for (const key of Object.keys(sharedData)) {
                        const oldIds = new Set((before[key] || []).map(item => String(item.id)));
                        const added = sharedData[key].filter(item => !oldIds.has(String(item.id)));
                        if (added.length) {
                            const item = added[added.length - 1];
                            const names = { notes: "a love note", diary: "a diary memory", bucket: "a dream", capsules: "a time capsule", checkins: "a mood check-in" };
                            notice = `${item.author || "Someone"} added ${names[key] || "something new"} 💌`;
                            break;
                        }
                    }
                    showLiveNotice(notice);
                    refreshOpenSharedView();
                }
                lastSharedSnapshot = nextSnapshot;
            }
        } catch (error) {
            console.warn("Could not sync shared memories. Using local cache.", error);
            try {
                const cache = JSON.parse(localStorage.getItem("rymaaSharedCache") || "{}");
                Object.keys(sharedData).forEach(key => {
                    if (Array.isArray(cache[key])) sharedData[key] = cache[key];
                });
            } catch {}
        }
    }

    function cacheSharedData() {
        localStorage.setItem("rymaaSharedCache", JSON.stringify(sharedData));
    }

    function upsertLocal(collection, item) {
        const list = sharedData[collection];
        const index = list.findIndex(existing => String(existing.id) === String(item.id));
        if (index >= 0) list[index] = { ...list[index], ...item };
        else list.push(item);
        cacheSharedData();
    }

    function authorName() {
        return localStorage.getItem("rymaaAuthor") || "Amine";
    }

    function setAuthor(name) {
        localStorage.setItem("rymaaAuthor", name);
    }


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
       NEW SHARED FEATURES
    ============================================================ */

    function authorSelector(id = "featureAuthor") {
        return `
            <select id="${id}" class="feature-input">
                <option value="Amine" ${authorName() === "Amine" ? "selected" : ""}>Amine ❤️</option>
                <option value="Rymaa" ${authorName() === "Rymaa" ? "selected" : ""}>Rymaa 🌸</option>
            </select>
        `;
    }

    function sharedDate(value) {
        if (!value) return "";
        const d = new Date(value);
        return isNaN(d.getTime()) ? String(value) : d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
    }

    function renderDashboard() {
        const done = sharedData.bucket.filter(item => item.done).length;
        const openCapsules = sharedData.capsules.filter(item => !item.locked).length;
        const today = getTodayKey();
        const todayCheckins = sharedData.checkins.filter(item => String(item.date || "").slice(0, 10) === today).length;

        featureModalBody.innerHTML = `
            <div class="feature-content">
                <div class="big-icon">📊❤️</div>
                <h2>Our Dashboard</h2>
                <p class="feature-subtitle">A living snapshot of the little world we're building together.</p>

                <div class="stats-grid">
                    <div class="stat-card"><strong>${sharedData.diary.length}</strong><span>Diary entries</span></div>
                    <div class="stat-card"><strong>${sharedData.notes.length}</strong><span>Love notes</span></div>
                    <div class="stat-card"><strong>${sharedData.bucket.length}</strong><span>Dreams added</span></div>
                    <div class="stat-card"><strong>${done}</strong><span>Dreams achieved</span></div>
                    <div class="stat-card"><strong>${sharedData.capsules.length}</strong><span>Time capsules</span></div>
                    <div class="stat-card"><strong>${todayCheckins}</strong><span>Today's check-ins</span></div>
                </div>

                <div class="feature-message">
                    ${sharedSyncOnline ? "☁️ Shared memory is connected. What you add here can be seen from the other device too." : "📱 Offline mode: your changes stay on this device and will sync when the connection is available."}
                </div>

                <button class="feature-btn" data-action="refresh-shared">🔄 Refresh Our Story</button>
            </div>
        `;
        openFeature();
    }

    function renderDiary() {
        const entries = sharedData.diary.slice().reverse();
        const list = entries.length ? entries.map(item => `
            <article class="memory-item">
                <div class="memory-meta"><span>${escapeHTML(item.mood || "❤️")} ${escapeHTML(item.author || "Us")}</span><small>${escapeHTML(sharedDate(item.date))}</small></div>
                <h3>${escapeHTML(item.title || "A little moment")}</h3>
                <p>${escapeHTML(item.text || "")}</p>
            </article>
        `).join("") : `<div class="feature-message">Our diary is still waiting for its first chapter. 🌱</div>`;

        featureModalBody.innerHTML = `
            <div class="feature-content">
                <div class="big-icon">📖</div>
                <h2>Our Diary</h2>
                <p class="feature-subtitle">Write down moments we may want to remember years from now.</p>
                ${authorSelector()}
                <select id="diaryMood" class="feature-input">
                    <option>❤️ Happy</option><option>🥹 Emotional</option><option>😂 Funny</option><option>🌙 Peaceful</option><option>🥺 Missing you</option><option>✨ Excited</option>
                </select>
                <input id="diaryTitle" class="feature-input" maxlength="120" placeholder="Give this memory a title...">
                <textarea id="diaryText" class="feature-textarea" maxlength="2000" placeholder="What happened? How did it feel? Why should future us remember it?"></textarea>
                <button class="feature-btn" data-action="save-diary">📖 Add to Our Diary</button>
                <div class="memory-list">${list}</div>
            </div>
        `;
        openFeature();
    }

    function renderBucket() {
        const items = sharedData.bucket.slice().reverse();
        const list = items.length ? items.map(item => `
            <div class="bucket-item ${item.done ? "done" : ""}">
                <button class="bucket-check" data-action="toggle-bucket" data-id="${escapeHTML(item.id)}">${item.done ? "✓" : "○"}</button>
                <div><strong>${escapeHTML(item.text)}</strong><small>${escapeHTML(item.done ? "Achieved ❤️" : "Still on our list ✨")}</small></div>
            </div>
        `).join("") : `<div class="feature-message">No dreams yet. Add the first one. 🌷</div>`;

        featureModalBody.innerHTML = `
            <div class="feature-content">
                <div class="big-icon">🎯</div>
                <h2>Our Dreams</h2>
                <p class="feature-subtitle">A list of things we want to experience, build or simply do together.</p>
                ${authorSelector()}
                <div class="inline-form">
                    <input id="bucketInput" class="feature-input" maxlength="180" placeholder="One dream...">
                    <button class="feature-btn" data-action="add-bucket">➕ Add</button>
                </div>
                <div class="bucket-list">${list}</div>
            </div>
        `;
        openFeature();
    }

    function renderCapsule() {
        const capsules = sharedData.capsules.slice().reverse();
        const list = capsules.length ? capsules.map(item => `
            <article class="capsule-item ${item.locked ? "locked" : "opened"}">
                <div class="capsule-icon">${item.locked ? "🔒" : "💌"}</div>
                <div>
                    <h3>${escapeHTML(item.title || "Our Time Capsule")}</h3>
                    <small>Opens: ${escapeHTML(sharedDate(item.openDate))}</small>
                    <p>${item.locked ? "This message is sealed until its date. Future us will have to wait. 🤫" : escapeHTML(item.message || "")}</p>
                </div>
            </article>
        `).join("") : `<div class="feature-message">Nothing sealed yet. Write something for future us. 🔐</div>`;

        featureModalBody.innerHTML = `
            <div class="feature-content">
                <div class="big-icon">🔒</div>
                <h2>Our Time Capsule</h2>
                <p class="feature-subtitle">A message for a future version of us. The server hides the text until the opening date.</p>
                ${authorSelector()}
                <input id="capsuleTitle" class="feature-input" maxlength="120" placeholder="Title — e.g. To Us in 2027">
                <input id="capsuleDate" class="feature-input" type="date">
                <textarea id="capsuleMessage" class="feature-textarea" maxlength="2500" placeholder="Write something future us should read..."></textarea>
                <button class="feature-btn" data-action="save-capsule">🔐 Seal This Message</button>
                <div class="capsule-list">${list}</div>
            </div>
        `;
        openFeature();
    }

    function renderCheckin() {
        const list = sharedData.checkins.slice().reverse().slice(0, 12);
        const listHTML = list.length ? list.map(item => `
            <div class="checkin-item"><span>${escapeHTML(item.mood || "❤️")}</span><div><strong>${escapeHTML(item.author || "Us")}</strong><p>${escapeHTML(item.message || "Just checking in ❤️")}</p><small>${escapeHTML(sharedDate(item.date))}</small></div></div>
        `).join("") : `<div class="feature-message">No check-ins yet today. 🌙</div>`;

        featureModalBody.innerHTML = `
            <div class="feature-content">
                <div class="big-icon">🌙</div>
                <h2>Today's Mood</h2>
                <p class="feature-subtitle">Leave a tiny signal for each other — even when there isn't much to say.</p>
                ${authorSelector()}
                <div class="mood-grid">
                    <button class="mood-btn" data-action="select-mood" data-mood="❤️">❤️</button><button class="mood-btn" data-action="select-mood" data-mood="🥹">🥹</button><button class="mood-btn" data-action="select-mood" data-mood="😂">😂</button><button class="mood-btn" data-action="select-mood" data-mood="🌙">🌙</button><button class="mood-btn" data-action="select-mood" data-mood="🥺">🥺</button><button class="mood-btn" data-action="select-mood" data-mood="✨">✨</button>
                </div>
                <textarea id="checkinMessage" class="feature-textarea" maxlength="500" placeholder="A few words for today..."></textarea>
                <button class="feature-btn" data-action="save-checkin">💗 Save Today's Check-in</button>
                <div class="checkin-list">${listHTML}</div>
            </div>
        `;
        openFeature();
    }

    let selectedMood = "❤️";

    function renderMemoryJar() {
        const notes = sharedData.notes.slice().reverse();
        const list = notes.length ? notes.map(note => `
            <article class="jar-note"><span>💌</span><div><small>${escapeHTML(note.author || "Us")} · ${escapeHTML(sharedDate(note.date))}</small><p>${escapeHTML(note.text || "")}</p></div></article>
        `).join("") : `<div class="feature-message">The jar is empty. Put the first little memory inside. 🫙❤️</div>`;

        featureModalBody.innerHTML = `
            <div class="feature-content">
                <div class="big-icon">🫙❤️</div>
                <h2>Memory Jar</h2>
                <p class="feature-subtitle">Tiny things become important when we look back.</p>
                ${authorSelector()}
                <textarea id="jarInput" class="feature-textarea" maxlength="1000" placeholder="Something small I never want us to forget..."></textarea>
                <button class="feature-btn" data-action="save-jar">💌 Put It in the Jar</button>
                <div class="jar-list">${list}</div>
            </div>
        `;
        openFeature();
    }

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
        return Array.isArray(sharedData.notes)
            ? sharedData.notes
            : [];
    }


    function saveNotes(notes) {
        sharedData.notes = notes;
        cacheSharedData();
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
                    These notes live in our shared memory. ❤️
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

                        case "dashboard":
                            renderDashboard();
                            break;

                        case "diary":
                            renderDiary();
                            break;

                        case "bucket":
                            renderBucket();
                            break;

                        case "capsule":
                            renderCapsule();
                            break;

                        case "checkin":
                            selectedMood = "❤️";
                            renderCheckin();
                            break;

                        case "memoryJar":
                            renderMemoryJar();
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


                    const item = {
                        id: makeId("note"),
                        text,
                        author: authorName(),
                        date: new Date().toISOString()
                    };

                    upsertLocal("notes", item);
                    await saveShared("note", item);
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


                /* NEW SHARED FEATURES */

                if (action === "refresh-shared") {
                    await loadSharedData();
                    renderDashboard();
                }

                if (action === "save-diary") {
                    const author = document.getElementById("featureAuthor")?.value || "Amine";
                    const mood = document.getElementById("diaryMood")?.value || "❤️";
                    const title = document.getElementById("diaryTitle")?.value.trim() || "A little moment";
                    const text = document.getElementById("diaryText")?.value.trim() || "";
                    if (!text) return alert("Write the memory first ❤️");
                    setAuthor(author);
                    const item = { id: makeId("diary"), date: new Date().toISOString(), author, mood, title, text };
                    upsertLocal("diary", item);
                    await saveShared("diary", item);
                    renderDiary();
                    createSpecialHearts();
                }

                if (action === "add-bucket") {
                    const author = document.getElementById("featureAuthor")?.value || "Amine";
                    const input = document.getElementById("bucketInput");
                    const text = input?.value.trim() || "";
                    if (!text) return alert("Add a dream first ✨");
                    setAuthor(author);
                    const item = { id: makeId("dream"), date: new Date().toISOString(), author, text, done: false, completedAt: "" };
                    upsertLocal("bucket", item);
                    await saveShared("bucket", item);
                    renderBucket();
                }

                if (action === "toggle-bucket") {
                    const id = button.dataset.id;
                    const item = sharedData.bucket.find(x => String(x.id) === String(id));
                    if (item) {
                        item.done = !item.done;
                        item.completedAt = item.done ? new Date().toISOString() : "";
                        cacheSharedData();
                        await saveShared("bucket", item);
                        renderBucket();
                        if (item.done) createSpecialHearts();
                    }
                }

                if (action === "save-capsule") {
                    const author = document.getElementById("featureAuthor")?.value || "Amine";
                    const title = document.getElementById("capsuleTitle")?.value.trim() || "A message to future us";
                    const openDate = document.getElementById("capsuleDate")?.value || "";
                    const message = document.getElementById("capsuleMessage")?.value.trim() || "";
                    if (!openDate || !message) return alert("Choose an opening date and write the message 🔐");
                    if (new Date(openDate + "T00:00:00") <= new Date()) return alert("Choose a future date ❤️");
                    setAuthor(author);
                    const item = { id: makeId("capsule"), createdAt: new Date().toISOString(), author, title, openDate, message, locked: true };
                    upsertLocal("capsules", item);
                    await saveShared("capsule", item);
                    renderCapsule();
                    createSpecialHearts();
                }

                if (action === "save-checkin") {
                    const author = document.getElementById("featureAuthor")?.value || "Amine";
                    const message = document.getElementById("checkinMessage")?.value.trim() || "Just checking in ❤️";
                    setAuthor(author);
                    const item = { id: makeId("checkin"), date: new Date().toISOString(), author, mood: selectedMood, message };
                    upsertLocal("checkins", item);
                    await saveShared("checkin", item);
                    renderCheckin();
                    createSpecialHearts();
                }

                if (action === "save-jar") {
                    const author = document.getElementById("featureAuthor")?.value || "Amine";
                    const text = document.getElementById("jarInput")?.value.trim() || "";
                    if (!text) return alert("Write a little memory first ❤️");
                    setAuthor(author);
                    const item = { id: makeId("note"), date: new Date().toISOString(), author, text };
                    upsertLocal("notes", item);
                    await saveShared("note", item);
                    renderMemoryJar();
                    createSpecialHearts();
                }

                if (action === "select-mood") {
                    selectedMood = button.dataset.mood || "❤️";
                    document.querySelectorAll(".mood-btn").forEach(btn => btn.classList.remove("selected"));
                    button.classList.add("selected");
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


    // Load shared memories after the interface is ready.
    ensureLiveNotice();
    loadSharedData().then(() => {
        cacheSharedData();
        lastSharedSnapshot = sharedSnapshot(sharedData);
    });

    // Poll the shared Google Sheets backend so both devices stay in step.
    setInterval(() => {
        loadSharedData();
    }, 5000);

});
