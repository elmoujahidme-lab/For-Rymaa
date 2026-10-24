document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ============================================================
       CONFIGURATION
    ============================================================ */

    // Google Apps Script Web App URL (see Code.gs)
    const API_URL = "https://script.google.com/macros/s/AKfycbwn3VYO5bTHqf4rC3khqVibW7MAPJ2Y_iqtEog1Qm2cRe6XqdjgNCj9-_q-7M1U0UOp/exec";
    const SITE_KEY = "RYMAA_PRIVATE_PLACE_2026";

    // Password shown before the site opens.
    const GATE_CODE = "love";

    // The gate stays until this date (her birthday), format "YYYY-MM-DD".
    // Leave empty ("") to keep the gate forever.
    const GATE_UNTIL = "";

    const START_DATE = new Date("September 27, 2025 00:00:00");
    const SYNC_EVERY_MS = 10000;

    /* ============================================================
       HELPERS
    ============================================================ */

    const $ = id => document.getElementById(id);

    const esc = s => String(s ?? "").replace(/[&<>"']/g, c => (
        { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]
    ));

    const todayKey = () => {
        const d = new Date();
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };

    const store = {
        get(key, fallback) {
            try {
                const v = localStorage.getItem(key);
                return v === null ? fallback : JSON.parse(v);
            } catch { return fallback; }
        },
        set(key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
        }
    };

    const fmtDate = v => {
        if (!v) return "";
        const d = new Date(v);
        if (isNaN(d.getTime())) return String(v);
        return d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
    };

    const newId = prefix => prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);

    let toastTimer;
    function toast(text) {
        const el = $("toast");
        el.textContent = text;
        el.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove("show"), 6000);
    }

    /* ============================================================
       PASSWORD GATE
    ============================================================ */

    function unlockSite() {
        document.body.classList.remove("locked");
    }

    const openByDate = GATE_UNTIL && todayKey() >= GATE_UNTIL;

    if (openByDate || store.get("rymaaUnlocked", false)) {
        unlockSite();
    } else {
        const form = $("gateForm");
        const input = $("gateInput");
        const error = $("gateError");

        form.addEventListener("submit", event => {
            event.preventDefault();
            if (input.value.trim().toLowerCase() === GATE_CODE) {
                store.set("rymaaUnlocked", true);
                unlockSite();
            } else {
                error.textContent = "That's not it. Try again, my love.";
                input.value = "";
                form.classList.remove("shake");
                void form.offsetWidth;
                form.classList.add("shake");
                input.focus();
            }
        });
        input.focus();
    }

    /* ============================================================
       NAVIGATION
    ============================================================ */

    const pages = Array.from(document.querySelectorAll(".page"));

    function showPage(id) {
        pages.forEach(page => page.classList.toggle("active", page.id === id));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    document.querySelectorAll("[data-goto]").forEach(button => {
        button.addEventListener("click", () => showPage(button.dataset.goto));
    });

    /* ============================================================
       RANDOM LOVE MESSAGE
    ============================================================ */

    const loveMessages = [
        "You are my favorite person.",
        "Thank you for making this year unforgettable.",
        "If I could relive this year, I would choose you again.",
        "You are one of my favorite parts of life.",
        "One year. Countless memories. One special girl.",
        "You made ordinary days feel extraordinary.",
        "I hope we create many more beautiful memories together.",
        "My favorite chapter is the one where I met you.",
        "Even on difficult days, you are still precious to me.",
        "Happy first anniversary, my beautiful Rymaa.",
        "Thank you for every laugh, conversation and memory.",
        "One year with you will always be a year I treasure.",
        "I choose you today, tomorrow and every day after.",
        "Our story has only just begun.",
        "You are my favorite person and my sweetest memory.",
        "Thank you for being you.",
        "Here's to the first year and all the beautiful moments ahead.",
        "Amine loves you more than words can explain."
    ];

    function randomLoveMessage() {
        const el = $("loveMessage");
        if (el) el.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    }
    randomLoveMessage();
    setInterval(randomLoveMessage, 8000);

    /* ============================================================
       COUNTER
    ============================================================ */

    function updateCounter() {
        const now = new Date();
        const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };

        if (now < START_DATE) {
            ["years", "days", "hours", "minutes", "seconds"].forEach(id => set(id, 0));
            return;
        }

        let years = now.getFullYear() - START_DATE.getFullYear();
        const anniversary = new Date(START_DATE);
        anniversary.setFullYear(START_DATE.getFullYear() + years);
        if (anniversary > now) {
            years--;
            anniversary.setFullYear(START_DATE.getFullYear() + years);
        }

        const diff = now - anniversary;
        set("years", years);
        set("days", Math.floor(diff / 86400000));
        set("hours", Math.floor(diff / 3600000) % 24);
        set("minutes", Math.floor(diff / 60000) % 60);
        set("seconds", Math.floor(diff / 1000) % 60);
    }
    updateCounter();
    setInterval(updateCounter, 1000);

    /* ============================================================
       MUSIC
    ============================================================ */

    const music = $("music");
    const playBtn = $("playMusic");
    const progress = $("progress");
    const volume = $("volume");
    const cover = document.querySelector(".music-cover");

    function updateMusicUI() {
        if (!playBtn || !music) return;
        const playing = !music.paused;
        playBtn.textContent = playing ? "⏸" : "▶";
        if (cover) cover.classList.toggle("playing", playing);
    }

    if (music && playBtn) {
        playBtn.addEventListener("click", async () => {
            try {
                if (music.paused) await music.play();
                else music.pause();
            } catch (error) {
                console.warn("Music could not start:", error);
            }
            updateMusicUI();
        });

        music.addEventListener("play", updateMusicUI);
        music.addEventListener("pause", updateMusicUI);

        music.addEventListener("timeupdate", () => {
            if (progress && music.duration) progress.value = (music.currentTime / music.duration) * 100;
        });

        progress?.addEventListener("input", () => {
            if (music.duration) music.currentTime = (progress.value / 100) * music.duration;
        });

        volume?.addEventListener("input", () => { music.volume = volume.value; });
    }

    /* ============================================================
       FLOATING HEARTS & BURSTS
    ============================================================ */

    function createHeart() {
        const container = $("hearts");
        if (!container || document.hidden || document.body.classList.contains("locked")) return;

        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = 14 + Math.random() * 22 + "px";
        heart.style.animationDuration = 6 + Math.random() * 5 + "s";
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 11000);
    }
    setInterval(createHeart, 1000);

    function burst(emoji = "❤️", count = 14) {
        for (let i = 0; i < count; i++) {
            const el = document.createElement("div");
            el.className = "fly";
            el.textContent = emoji;
            el.style.left = Math.random() * 100 + "vw";
            el.style.fontSize = 16 + Math.random() * 22 + "px";
            el.style.animationDelay = Math.random() * 0.5 + "s";
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 3400);
        }
    }

    /* ============================================================
       SHARED CLOUD DATA (Google Sheets via Apps Script)

       - Every entry gets an id + rev stamp.
       - It is stored locally AND queued as "pending" until the
         server confirms it, so nothing is ever lost.
       - Every few seconds the site syncs, merges and re-renders.
    ============================================================ */

    const COLS = {
        notes: "note",
        diary: "diary",
        bucket: "bucket",
        capsules: "capsule",
        checkins: "checkin",
        messages: "message"
    };

    const DATA_KEY = "rymaaData3";
    const PENDING_KEY = "rymaaPending3";

    const data = {};
    const pending = store.get(PENDING_KEY, {});
    const cached = store.get(DATA_KEY, {});

    Object.keys(COLS).forEach(col => {
        data[col] = Array.isArray(cached[col]) ? cached[col] : [];
        pending[col] = Array.isArray(pending[col]) ? pending[col] : [];
    });

    let online = false;
    let firstSync = true;
    let lastSignature = JSON.stringify(data);

    const persist = () => {
        store.set(DATA_KEY, data);
        store.set(PENDING_KEY, pending);
    };

    function upsert(list, item) {
        const i = list.findIndex(x => String(x.id) === String(item.id));
        if (i >= 0) list[i] = { ...list[i], ...item };
        else list.push({ ...item });
    }

    async function post(col, item) {
        if (!API_URL) return;
        try {
            await fetch(API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain;charset=UTF-8" },
                body: JSON.stringify({
                    siteKey: SITE_KEY,
                    action: COLS[col],
                    item,
                    page: location.href
                })
            });
        } catch (error) {
            console.warn("Save failed, will retry on next sync.", error);
        }
    }

    function save(col, item) {
        item.rev = Date.now();
        upsert(data[col], item);
        upsert(pending[col], item);
        persist();
        post(col, item);
    }

    const sortKey = x => String(x.date || x.createdAt || "");

    async function sync() {
        if (!API_URL) return;

        try {
            const response = await fetch(API_URL + "?action=sync&t=" + Date.now(), { cache: "no-store" });
            const result = await response.json();
            if (!result.ok || !result.data) return;

            online = true;

            const before = {};
            Object.keys(COLS).forEach(col => { before[col] = new Set(data[col].map(x => String(x.id))); });

            let notice = "";
            const names = {
                notes: "a memory",
                diary: "a diary entry",
                bucket: "a dream",
                capsules: "a time capsule",
                checkins: "a mood check-in"
            };

            for (const col of Object.keys(COLS)) {
                const server = Array.isArray(result.data[col]) ? result.data[col] : [];
                const byId = new Map(server.map(x => [String(x.id), x]));

                // keep only what the server has not confirmed yet
                pending[col] = pending[col].filter(p => {
                    const s = byId.get(String(p.id));
                    return !s || (s.rev || 0) < (p.rev || 0);
                });

                const merged = server.map(s => {
                    const p = pending[col].find(x => String(x.id) === String(s.id));
                    return p ? { ...s, ...p } : s;
                });

                pending[col].forEach(p => {
                    if (!byId.has(String(p.id))) merged.push({ ...p });
                    post(col, p); // retry
                });

                merged.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
                data[col] = merged;

                if (!firstSync && !notice && col !== "messages") {
                    const fresh = merged.filter(x => !before[col].has(String(x.id)));
                    if (fresh.length) {
                        const item = fresh[fresh.length - 1];
                        notice = (item.author || "Someone") + " added " + names[col];
                    }
                }
            }

            firstSync = false;
            persist();

            const signature = JSON.stringify(data);
            if (signature !== lastSignature) {
                lastSignature = signature;
                if (notice) toast(notice + " ❤️");
                refreshOpenFeature();
            }
        } catch (error) {
            console.warn("Could not sync right now.", error);
        }
    }

    /* ============================================================
       AUTHOR
    ============================================================ */

    const getAuthor = () => store.get("rymaaAuthor", "Rymaa");
    const setAuthor = name => store.set("rymaaAuthor", name);

    function authorSelect(id = "featureAuthor") {
        return `<select id="${id}" class="field">` +
            ["Rymaa", "Amine"].map(n => `<option value="${n}" ${getAuthor() === n ? "selected" : ""}>${n}</option>`).join("") +
            `</select>`;
    }

    const msgAuthor = $("msgAuthor");
    if (msgAuthor) {
        msgAuthor.value = getAuthor();
        msgAuthor.addEventListener("change", () => setAuthor(msgAuthor.value));
    }

    /* ============================================================
       MODAL
    ============================================================ */

    const featureModal = $("featureModal");
    const featureModalBody = $("featureModalBody");
    let activeFeature = null;
    let selectedMood = "❤️";

    function showFeature(name, html) {
        activeFeature = name;
        featureModalBody.innerHTML = html;
        featureModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeFeature() {
        activeFeature = null;
        featureModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    $("closeFeatureModal").addEventListener("click", closeFeature);
    featureModal.addEventListener("click", event => { if (event.target === featureModal) closeFeature(); });

    featureModalBody.addEventListener("change", event => {
        if (event.target.id === "featureAuthor") setAuthor(event.target.value);
    });

    function refreshOpenFeature() {
        if (!activeFeature || !featureModal.classList.contains("active")) return;
        const el = document.activeElement;
        if (el && featureModalBody.contains(el) && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
        const render = renderers[activeFeature];
        if (render) render();
    }

    const syncLine = () => `<p class="sync-state">${online ? "Saved and shared between us." : "Offline. Saved on this device, it will sync when you're back online."}</p>`;

    /* ----- I Miss You ----- */

    const missMessages = [
        "If you miss me right now, just know I'm probably missing you too.",
        "Close your eyes for a second and imagine me holding your hand.",
        "Distance can make a moment feel long, but it cannot make you less important to me.",
        "If I could appear beside you right now, I would. No questions asked.",
        "You don't have to say anything. Just remember that you are loved.",
        "One little message from you can change my whole day.",
        "Come here... imaginary hug incoming.",
        "If you miss me, send a little kiss into the screen. I'll catch it."
    ];
    let missIndex = 0;

    function renderMissYou() {
        showFeature("missYou", `
            <div class="feature-content">
                <div class="big-icon">🥺</div>
                <h2>I Miss You</h2>
                <p class="feature-subtitle">For the moments when you wish I was right beside you.</p>
                <div class="feature-message" id="missMessage">${esc(missMessages[missIndex])}</div>
                <button class="feature-btn" data-action="new-miss">Tell Me Again</button>
                <button class="feature-btn" data-action="kiss">Send Me a Kiss 😘</button>
            </div>`);
    }

    /* ----- Questions ----- */

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
    let currentQuestion = 0;

    function renderQuestion() {
        showFeature("questions", `
            <div class="feature-content">
                <div class="big-icon">💬</div>
                <h2>Our Little Question</h2>
                <p class="feature-subtitle">No perfect answers. Just honest ones.</p>
                <div class="feature-message"><div class="question-text">${esc(questions[currentQuestion])}</div></div>
                <button class="feature-btn" data-action="new-question">Another Question</button>
            </div>`);
    }

    /* ----- Timeline ----- */

    function renderTimeline() {
        showFeature("timeline", `
            <div class="feature-content">
                <div class="big-icon">🕰️</div>
                <h2>Our Story</h2>
                <p class="feature-subtitle">Little chapters that belong to us.</p>
                <div class="timeline">
                    <div class="timeline-item"><h3>The Beginning</h3><p>The chapter where two people became part of each other's story.</p></div>
                    <div class="timeline-item"><h3>The First Memories</h3><p>Conversations, jokes, smiles and moments that slowly became ours.</p></div>
                    <div class="timeline-item"><h3>The First Year</h3><p>365 days filled with memories, emotions and lessons.</p></div>
                    <div class="timeline-item"><h3>Today</h3><p>Still here. Still choosing each other. Still writing.</p></div>
                    <div class="timeline-item"><h3>The Next Chapter</h3><p>The part of the story we haven't written yet.</p></div>
                </div>
            </div>`);
    }

    /* ----- Diary ----- */

    function renderDiary() {
        const entries = data.diary.slice().reverse();
        const list = entries.length ? entries.map(item => `
            <article class="entry">
                <div class="entry-meta"><span>${esc(item.mood || "❤️")} ${esc(item.author || "Us")}</span><small>${esc(fmtDate(item.date))}</small></div>
                <h3>${esc(item.title || "A little moment")}</h3>
                <p>${esc(item.text)}</p>
            </article>`).join("") : `<div class="feature-message">Our diary is still waiting for its first chapter.</div>`;

        showFeature("diary", `
            <div class="feature-content">
                <div class="big-icon">📖</div>
                <h2>Our Diary</h2>
                <p class="feature-subtitle">Write down moments we may want to remember years from now.</p>
                ${authorSelect()}
                <select id="diaryMood" class="field">
                    <option>❤️ Happy</option><option>🥹 Emotional</option><option>😂 Funny</option>
                    <option>🌙 Peaceful</option><option>🥺 Missing you</option><option>✨ Excited</option>
                </select>
                <input id="diaryTitle" class="field" maxlength="120" placeholder="Give this memory a title...">
                <textarea id="diaryText" class="field" maxlength="2000" placeholder="What happened? How did it feel?"></textarea>
                <button class="feature-btn" data-action="save-diary">Add to Our Diary</button>
                ${syncLine()}
                <div class="list">${list}</div>
            </div>`);
    }

    /* ----- Dreams ----- */

    function renderBucket() {
        const items = data.bucket.slice().reverse();
        const list = items.length ? items.map(item => `
            <div class="bucket-item ${item.done ? "done" : ""}">
                <button class="bucket-check" data-action="toggle-bucket" data-id="${esc(item.id)}" aria-label="Toggle">${item.done ? "✓" : "○"}</button>
                <div>
                    <strong>${esc(item.text)}</strong>
                    <small>${esc(item.author || "")} · ${item.done ? "Achieved ❤️" : "Still on our list"}</small>
                </div>
            </div>`).join("") : `<div class="feature-message">No dreams yet. Add the first one.</div>`;

        showFeature("bucket", `
            <div class="feature-content">
                <div class="big-icon">🎯</div>
                <h2>Our Dreams</h2>
                <p class="feature-subtitle">Things we want to experience, build or simply do together.</p>
                ${authorSelect()}
                <div class="inline-form">
                    <input id="bucketInput" class="field" maxlength="180" placeholder="One dream...">
                    <button class="feature-btn" data-action="add-bucket">Add</button>
                </div>
                ${syncLine()}
                <div class="list">${list}</div>
            </div>`);
    }

    /* ----- Time capsule ----- */

    const isLocked = c => String(c.openDate || "") > todayKey();

    function renderCapsule() {
        const items = data.capsules.slice().reverse();
        const list = items.length ? items.map(item => {
            const locked = isLocked(item);
            return `
            <article class="entry capsule-item">
                <div class="capsule-icon">${locked ? "🔒" : "💌"}</div>
                <div>
                    <div class="entry-meta"><span>${esc(item.author || "Us")}</span></div>
                    <h3>${esc(item.title || "Our Time Capsule")}</h3>
                    <small>Opens on ${esc(item.openDate)}</small>
                    <p>${locked ? "Sealed until its date. Future us will have to wait." : esc(item.text)}</p>
                </div>
            </article>`;
        }).join("") : `<div class="feature-message">Nothing sealed yet. Write something for future us.</div>`;

        showFeature("capsule", `
            <div class="feature-content">
                <div class="big-icon">🔒</div>
                <h2>Our Time Capsule</h2>
                <p class="feature-subtitle">A message for a future version of us. The text stays hidden until the opening date.</p>
                ${authorSelect()}
                <input id="capsuleTitle" class="field" maxlength="120" placeholder="Title, e.g. To Us in 2027">
                <input id="capsuleDate" class="field" type="date" min="${todayKey()}">
                <textarea id="capsuleMessage" class="field" maxlength="2500" placeholder="Write something future us should read..."></textarea>
                <button class="feature-btn" data-action="save-capsule">Seal This Message</button>
                ${syncLine()}
                <div class="list">${list}</div>
            </div>`);
    }

    /* ----- Mood ----- */

    function renderCheckin() {
        const items = data.checkins.slice().reverse().slice(0, 15);
        const list = items.length ? items.map(item => `
            <div class="entry checkin-item">
                <span>${esc(item.mood || "❤️")}</span>
                <div>
                    <strong>${esc(item.author || "Us")}</strong>
                    <p>${esc(item.text || "Just checking in ❤️")}</p>
                    <small>${esc(fmtDate(item.date))}</small>
                </div>
            </div>`).join("") : `<div class="feature-message">No check-ins yet.</div>`;

        const moods = ["❤️", "🥹", "😂", "🌙", "🥺", "✨"];

        showFeature("checkin", `
            <div class="feature-content">
                <div class="big-icon">🌙</div>
                <h2>Today's Mood</h2>
                <p class="feature-subtitle">Leave a tiny signal for each other, even when there isn't much to say.</p>
                ${authorSelect()}
                <div class="mood-grid">
                    ${moods.map(m => `<button class="mood-btn ${m === selectedMood ? "selected" : ""}" data-action="select-mood" data-mood="${m}">${m}</button>`).join("")}
                </div>
                <textarea id="checkinMessage" class="field" maxlength="500" placeholder="A few words for today..."></textarea>
                <button class="feature-btn" data-action="save-checkin">Save Today's Check-in</button>
                ${syncLine()}
                <div class="list">${list}</div>
            </div>`);
    }

    /* ----- Memory jar ----- */

    function renderMemoryJar() {
        const items = data.notes.slice().reverse();
        const list = items.length ? items.map(note => `
            <article class="entry">
                <div class="entry-meta"><span>💌 ${esc(note.author || "Us")}</span><small>${esc(fmtDate(note.date))}</small></div>
                <p>${esc(note.text)}</p>
            </article>`).join("") : `<div class="feature-message">The jar is empty. Put the first little memory inside.</div>`;

        showFeature("memoryJar", `
            <div class="feature-content">
                <div class="big-icon">🫙</div>
                <h2>Memory Jar</h2>
                <p class="feature-subtitle">Tiny things become important when we look back.</p>
                ${authorSelect()}
                <textarea id="jarInput" class="field" maxlength="1000" placeholder="Something small I never want us to forget..."></textarea>
                <button class="feature-btn" data-action="save-jar">Put It in the Jar</button>
                ${syncLine()}
                <div class="list">${list}</div>
            </div>`);
    }

    const renderers = {
        missYou: renderMissYou,
        questions: renderQuestion,
        timeline: renderTimeline,
        diary: renderDiary,
        bucket: renderBucket,
        capsule: renderCapsule,
        checkin: renderCheckin,
        memoryJar: renderMemoryJar
    };

    document.querySelectorAll("[data-feature]").forEach(tile => {
        tile.addEventListener("click", () => {
            const feature = tile.dataset.feature;
            if (feature === "missYou") missIndex = Math.floor(Math.random() * missMessages.length);
            if (feature === "questions") currentQuestion = Math.floor(Math.random() * questions.length);
            if (feature === "checkin") selectedMood = "❤️";
            renderers[feature]?.();
        });
    });

    /* ============================================================
       MODAL ACTIONS
    ============================================================ */

    const val = id => document.getElementById(id)?.value.trim() || "";
    const authorVal = () => document.getElementById("featureAuthor")?.value || getAuthor();

    featureModalBody.addEventListener("click", event => {
        const button = event.target.closest("[data-action]");
        if (!button) return;
        const action = button.dataset.action;

        switch (action) {
            case "new-miss": {
                missIndex = (missIndex + 1) % missMessages.length;
                const el = $("missMessage");
                if (el) el.textContent = missMessages[missIndex];
                break;
            }
            case "kiss":
                burst("😘", 8);
                break;

            case "new-question":
                currentQuestion = (currentQuestion + 1 + Math.floor(Math.random() * (questions.length - 1))) % questions.length;
                renderQuestion();
                break;

            case "save-diary": {
                const text = val("diaryText");
                if (!text) return alert("Write the memory first ❤️");
                const author = authorVal();
                setAuthor(author);
                save("diary", {
                    id: newId("diary"),
                    date: new Date().toISOString(),
                    author,
                    mood: val("diaryMood") || "❤️",
                    title: val("diaryTitle") || "A little moment",
                    text
                });
                renderDiary();
                burst();
                break;
            }

            case "add-bucket": {
                const text = val("bucketInput");
                if (!text) return alert("Add a dream first ✨");
                const author = authorVal();
                setAuthor(author);
                save("bucket", {
                    id: newId("dream"),
                    date: new Date().toISOString(),
                    author,
                    text,
                    done: false,
                    completedAt: ""
                });
                renderBucket();
                break;
            }

            case "toggle-bucket": {
                const item = data.bucket.find(x => String(x.id) === String(button.dataset.id));
                if (!item) break;
                item.done = !item.done;
                item.completedAt = item.done ? new Date().toISOString() : "";
                save("bucket", item);
                renderBucket();
                if (item.done) burst();
                break;
            }

            case "save-capsule": {
                const openDate = val("capsuleDate");
                const text = val("capsuleMessage");
                if (!openDate || !text) return alert("Choose an opening date and write the message 🔐");
                if (openDate <= todayKey()) return alert("Choose a future date ❤️");
                const author = authorVal();
                setAuthor(author);
                save("capsules", {
                    id: newId("capsule"),
                    date: new Date().toISOString(),
                    author,
                    title: val("capsuleTitle") || "A message to future us",
                    openDate,
                    text
                });
                renderCapsule();
                burst();
                break;
            }

            case "select-mood":
                selectedMood = button.dataset.mood || "❤️";
                document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("selected"));
                button.classList.add("selected");
                break;

            case "save-checkin": {
                const author = authorVal();
                setAuthor(author);
                save("checkins", {
                    id: newId("checkin"),
                    date: new Date().toISOString(),
                    author,
                    mood: selectedMood,
                    text: val("checkinMessage") || "Just checking in ❤️"
                });
                renderCheckin();
                burst();
                break;
            }

            case "save-jar": {
                const text = val("jarInput");
                if (!text) return alert("Write a little memory first ❤️");
                const author = authorVal();
                setAuthor(author);
                save("notes", {
                    id: newId("note"),
                    date: new Date().toISOString(),
                    author,
                    text
                });
                renderMemoryJar();
                burst();
                break;
            }
        }
    });

    /* ============================================================
       MESSAGE FOR AMINE (goes to Telegram)
    ============================================================ */

    const sendBtn = $("sendMessageBtn");
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            const input = $("rymeMessage");
            const status = $("sendStatus");
            const text = input.value.trim();

            if (!text) {
                status.textContent = "Write something first.";
                return;
            }

            const author = $("msgAuthor").value || "Rymaa";
            setAuthor(author);

            save("messages", {
                id: newId("msg"),
                date: new Date().toISOString(),
                author,
                text
            });

            input.value = "";
            status.textContent = navigator.onLine
                ? "Sent with love. ❤️"
                : "Saved. It will be sent as soon as you're back online.";
            burst();
        });
    }

    /* ============================================================
       BROKEN HEART
    ============================================================ */

    const brokenHeart = $("brokenHeart");
    let fixed = false;

    function fixHeart() {
        if (fixed) return;
        fixed = true;
        brokenHeart.textContent = "❤️";
        brokenHeart.style.transform = "scale(1.3)";
        $("heartText").innerHTML = "You fixed it...<br>Maybe hearts can heal when we choose to care.";
        burst();
    }

    if (brokenHeart) {
        brokenHeart.addEventListener("click", fixHeart);
        brokenHeart.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") fixHeart(); });
    }

    /* ============================================================
       LIGHTBOX
    ============================================================ */

    const galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    const lightbox = $("lightbox");
    const lightboxImg = $("lightboxImg");
    let currentImage = 0;

    function showImage(index) {
        if (!galleryImages.length) return;
        currentImage = (index + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImage].src;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("active");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
        img.addEventListener("error", () => { img.style.display = "none"; });
    });

    $("prev").addEventListener("click", () => showImage(currentImage - 1));
    $("next").addEventListener("click", () => showImage(currentImage + 1));
    $("closeLightbox").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });

    document.addEventListener("keydown", event => {
        if (lightbox.classList.contains("active")) {
            if (event.key === "ArrowLeft") showImage(currentImage - 1);
            if (event.key === "ArrowRight") showImage(currentImage + 1);
            if (event.key === "Escape") closeLightbox();
        } else if (event.key === "Escape" && featureModal.classList.contains("active")) {
            closeFeature();
        }
    });

    /* ============================================================
       START SYNC
    ============================================================ */

    sync();
    setInterval(() => { if (!document.hidden) sync(); }, SYNC_EVERY_MS);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) sync(); });
    window.addEventListener("online", sync);
});
