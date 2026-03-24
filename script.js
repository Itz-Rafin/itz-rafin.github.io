let menu = document.querySelector('#menu_icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['CSE Student', 'Backend Developer', 'Frontend Developer', 'Graphic Designer', 'Web Designer', 'Data Analyst'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
});

/* ── ROBOT BACKGROUND ── */
function initGalaxy() {
    const canvas = document.getElementById('galaxy-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, t = 0,
        scrollProgress = 0;
    let robot = { x: 0, y: 0, scale: 1, alpha: 1, state: 'home' };

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        W = canvas.width;
        H = canvas.height;
    }
    resize();
    window.addEventListener('resize', resize);

    function updateScroll() {
        const totalH = document.body.scrollHeight - window.innerHeight;
        scrollProgress = totalH > 0 ? Math.min(window.scrollY / totalH, 1) : 0;

        const isMobile = W < 768;
        const sections = ['home', 'about', 'education', 'services', 'projects', 'contact'];
        const sectionEls = sections.map(id => document.getElementById(id)).filter(Boolean);
        let activeSection = 'home';
        sectionEls.forEach(el => {
            if (window.scrollY >= el.offsetTop - window.innerHeight * 0.4) activeSection = el.id;
        });
        robot.state = activeSection;

        const positions = {
            home: { x: isMobile ? 0.5 : 0.78, y: isMobile ? 0.55 : 0.52, scale: isMobile ? 0.55 : 1, alpha: isMobile ? 0.35 : 1 },
            about: { x: isMobile ? 0.85 : 0.15, y: isMobile ? 0.3 : 0.5, scale: isMobile ? 0.4 : 0.85, alpha: isMobile ? 0.25 : 0.85 },
            education: { x: isMobile ? 0.85 : 0.82, y: isMobile ? 0.2 : 0.45, scale: isMobile ? 0.38 : 0.8, alpha: isMobile ? 0.2 : 0.8 },
            services: { x: isMobile ? 0.85 : 0.12, y: isMobile ? 0.25 : 0.48, scale: isMobile ? 0.35 : 0.75, alpha: isMobile ? 0.18 : 0.75 },
            projects: { x: isMobile ? 0.85 : 0.8, y: isMobile ? 0.2 : 0.5, scale: isMobile ? 0.32 : 0.7, alpha: isMobile ? 0.15 : 0.7 },
            contact: { x: isMobile ? 0.85 : 0.82, y: isMobile ? 0.25 : 0.52, scale: isMobile ? 0.3 : 0.65, alpha: isMobile ? 0.12 : 0.65 },
        };

        const target = positions[activeSection] || positions.home;
        const speed = 0.04;
        robot.x += (target.x * W - robot.x) * speed;
        robot.y += (target.y * H - robot.y) * speed;
        robot.scale += (target.scale - robot.scale) * speed;
        robot.alpha += (target.alpha - robot.alpha) * speed;
    }

    const neurons = Array.from({ length: 35 }, () => ({
        x: Math.random() * (W * 0.5),
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() > 0.8 ? 3.5 : 2,
        pulse: Math.random() * Math.PI * 2,
        ps: Math.random() * 0.025 + 0.01
    }));

    const binCols = Array.from({ length: 16 }, (_, i) => ({
        x: (i / 16) * W * 0.48,
        y: Math.random() * H,
        speed: Math.random() * 1.0 + 0.4,
        chars: Array.from({ length: 7 }, () => Math.random() > 0.5 ? '1' : '0'),
        alpha: Math.random() * 0.1 + 0.03
    }));

    const codeWords = ['if(AI)', 'while(1)', '01101', 'sys.run()', 'neural++', '0xFF', 'loop()', 'GPIO'];
    const floatingCode = Array.from({ length: 7 }, (_, i) => ({
        text: codeWords[i % codeWords.length],
        x: Math.random() * W * 0.45,
        y: Math.random() * H,
        vy: (Math.random() - 0.5) * 0.22,
        alpha: Math.random() * 0.12 + 0.04
    }));

    let scanY = 0;
    let blinkTimer = 0;

    function roundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
        ctx.stroke();
    }

    function drawRobot(rx, ry, sc, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(rx, ry);
        ctx.scale(sc, sc);

        const float = Math.sin(t * 0.018) * 10;
        ctx.translate(0, float);

        const glow = ctx.createRadialGradient(0, 0, 20, 0, 0, 160);
        glow.addColorStop(0, 'rgba(255,215,0,0.07)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(0, 0, 160, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,215,0,0.4)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-14, 75, 28, 22);
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-14, 79 + i * 7);
            ctx.lineTo(14, 79 + i * 7);
            ctx.strokeStyle = 'rgba(255,215,0,0.2)';
            ctx.lineWidth = 0.6;
            ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(255,215,0,0.55)';
        ctx.lineWidth = 1.8;
        roundRect(-58, -70, 116, 145, 14);
        ctx.strokeStyle = 'rgba(255,215,0,0.2)';
        ctx.lineWidth = 0.8;
        roundRect(-48, -60, 96, 125, 8);

        [-1, 1].forEach(side => {
            const ex = side * 62;
            ctx.strokeStyle = 'rgba(255,215,0,0.35)';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(side === 1 ? ex - 14 : ex, -20, 14, 40);
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(side === 1 ? ex - 14 : ex, -14 + i * 10);
                ctx.lineTo(side === -1 ? ex + 14 : ex, -14 + i * 10);
                ctx.strokeStyle = 'rgba(255,215,0,0.15)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });

        ctx.beginPath();
        ctx.moveTo(0, -70);
        ctx.lineTo(0, -108);
        ctx.strokeStyle = 'rgba(255,215,0,0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const antP = Math.sin(t * 0.06) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(0, -111, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,230,80,' + (0.5 + 0.5 * antP).toFixed(2) + ')';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, -111, 11, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,215,0,' + (0.25 * antP).toFixed(2) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();

        blinkTimer++;
        const isBlinking = blinkTimer % 200 < 8;
        [-1, 1].forEach(side => {
            const ex = side * 22;
            const ey = -22;
            if (!isBlinking) {
                const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 16);
                eg.addColorStop(0, 'rgba(255,230,80,0.28)');
                eg.addColorStop(1, 'rgba(255,215,0,0)');
                ctx.beginPath();
                ctx.arc(ex, ey, 16, 0, Math.PI * 2);
                ctx.fillStyle = eg;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ex, ey, 10, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,215,0,0.7)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(ex, ey, 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,230,80,0.9)';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ex + 2, ey - 2, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(ex - 10, ey);
                ctx.lineTo(ex + 10, ey);
                ctx.strokeStyle = 'rgba(255,215,0,0.6)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        const scanA = (Math.sin(t * 0.015) * 0.5 + 0.5) * 0.1;
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(-220, -22 + Math.sin(t * 0.015) * 70);
        ctx.strokeStyle = 'rgba(255,215,0,' + scanA.toFixed(3) + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        for (let i = 0; i < 6; i++) {
            const bh = 4 + Math.sin(t * 0.08 + i * 0.7) * 3;
            ctx.fillStyle = 'rgba(255,215,0,' + (0.3 + Math.sin(t * 0.08 + i) * 0.2).toFixed(2) + ')';
            ctx.fillRect(-26 + i * 9, 28 - bh / 2, 6, bh);
        }

        const labels = { home: 'HELLO', about: 'BIO', education: 'LEARN', services: 'SKILLS', projects: 'BUILD', contact: 'PING' };
        const dispP = Math.sin(t * 0.04) * 0.5 + 0.5;
        ctx.strokeStyle = 'rgba(255,215,0,' + (0.15 + 0.15 * dispP).toFixed(2) + ')';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-32, -58, 64, 22);
        ctx.fillStyle = 'rgba(255,215,0,' + (0.05 + 0.04 * dispP).toFixed(2) + ')';
        ctx.fillRect(-32, -58, 64, 22);
        ctx.fillStyle = 'rgba(255,230,80,' + (0.5 + 0.3 * dispP).toFixed(2) + ')';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(labels[robot.state] || 'SYS:ON', 0, -43);

        ctx.strokeStyle = 'rgba(255,215,0,0.2)';
        ctx.lineWidth = 0.7;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-20 + i * 20, 48);
            ctx.lineTo(-20 + i * 20, 60);
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawNeural() {
        const maxX = W < 768 ? W * 0.4 : W * 0.5;
        neurons.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > maxX) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });
        for (let i = 0; i < neurons.length; i++) {
            for (let j = i + 1; j < neurons.length; j++) {
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) {
                    ctx.beginPath();
                    ctx.moveTo(neurons[i].x, neurons[i].y);
                    ctx.lineTo(neurons[j].x, neurons[j].y);
                    ctx.strokeStyle = 'rgba(255,215,0,' + ((1 - d / 100) * 0.1).toFixed(3) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        neurons.forEach(n => {
            const g = Math.sin(t * n.ps + n.pulse) * 0.4 + 0.6;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,215,0,' + (0.25 + 0.35 * g).toFixed(2) + ')';
            ctx.fill();
        });
    }

    function drawBinary() {
        if (W < 480) return;
        ctx.font = '11px monospace';
        binCols.forEach(col => {
            col.y += col.speed;
            if (col.y > H + 100) {
                col.y = -80;
                col.chars = col.chars.map(() => Math.random() > 0.5 ? '1' : '0');
            }
            col.chars.forEach((ch, i) => {
                ctx.fillStyle = 'rgba(255,215,0,' + (col.alpha * (1 - i / col.chars.length)).toFixed(3) + ')';
                ctx.fillText(ch, col.x, col.y + i * 14);
            });
        });
    }

    function drawCode() {
        if (W < 480) return;
        ctx.font = '11px monospace';
        floatingCode.forEach(fc => {
            fc.y += fc.vy;
            if (fc.y < 0) fc.y = H;
            if (fc.y > H) fc.y = 0;
            ctx.fillStyle = 'rgba(255,215,0,' + fc.alpha + ')';
            ctx.fillText(fc.text, fc.x, fc.y);
        });
    }

    function drawScanLine() {
        scanY += 1.0;
        if (scanY > H) scanY = 0;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(W, scanY);
        ctx.strokeStyle = 'rgba(255,215,0,0.025)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    robot.x = W * (W < 768 ? 0.5 : 0.78);
    robot.y = H * 0.52;

    function draw() {
        W = canvas.width;
        H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        updateScroll();
        drawBinary();
        drawCode();
        drawNeural();
        drawRobot(robot.x, robot.y, robot.scale, Math.max(0.05, robot.alpha));
        drawScanLine();
        t++;
        requestAnimationFrame(draw);
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    draw();
}

/* ── DARK / LIGHT MODE ── */
function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (icon) icon.className = theme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
    }
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

/* ── LOADING SCREEN ── */
function runLoader(onComplete) {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const outerRing = document.getElementById('outer-ring');
    const nameBlock = document.getElementById('loader-name');
    const underline = loader.querySelector('.loader-underline');
    const tagline = loader.querySelector('.loader-tagline');
    const progWrap = document.getElementById('loader-prog');
    const progFill = loader.querySelector('.loader-prog-fill');
    const pctEl = document.getElementById('loader-pct');

    loader.classList.remove('hide');
    loader.style.cssText = 'opacity:1;visibility:visible;pointer-events:all;';

    if (nameBlock) nameBlock.classList.remove('show');
    if (underline) {
        underline.classList.remove('show');
        underline.style.width = '0';
    }
    if (tagline) tagline.classList.remove('show');
    if (progWrap) progWrap.classList.remove('show');
    if (progFill) {
        progFill.classList.remove('run');
        progFill.style.width = '0';
    }
    if (pctEl) pctEl.textContent = '0%';

    if (outerRing) {
        outerRing.style.animation = 'none';
        void outerRing.getBoundingClientRect();
        outerRing.style.animation = 'loaderFillOuter 2.8s cubic-bezier(0.4,0,0.2,1) forwards';
    }

    if (window._loaderTimers) window._loaderTimers.forEach(clearTimeout);
    window._loaderTimers = [];

    function hideLoader() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.visibility = 'hidden';
            loader.style.pointerEvents = 'none';
            loader.classList.add('hide');
            if (onComplete) onComplete();
        }, 600);
    }

    var steps = [
        [2800, function() { if (nameBlock) nameBlock.classList.add('show'); if (progWrap) progWrap.classList.add('show'); }],
        [3200, function() { if (underline) underline.classList.add('show'); if (progFill) progFill.classList.add('run'); }],
        [3600, function() { if (tagline) tagline.classList.add('show'); }],
        [5600, function() { hideLoader(); }],
    ];

    steps.forEach(function(step) {
        window._loaderTimers.push(setTimeout(step[1], step[0]));
    });

    var n = 0;
    window._loaderTimers.push(setTimeout(function() {
        var iv = setInterval(function() {
            n = Math.min(100, n + Math.floor(Math.random() * 4) + 1);
            if (pctEl) pctEl.textContent = n + '%';
            if (n >= 100) clearInterval(iv);
        }, 26);
        window._loaderTimers.push(iv);
    }, 2900));

    window._loaderTimers.push(setTimeout(function() { hideLoader(); }, 8000));
}

function initLoader() {
    runLoader(null);
    var logoBtnEl = document.getElementById('logo-btn');
    if (logoBtnEl) {
        logoBtnEl.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(function() { runLoader(null); }, 300);
        });
    }
}

/* ── FREE AI CLONE (NO API NEEDED) ── */
function initChatbot() {
    var fab = document.getElementById('chatFab');
    var fabIcon = document.getElementById('chatFabIcon');
    var chatWin = document.getElementById('chatWindow');
    var closeBtn = document.getElementById('chatClose');
    var input = document.getElementById('chatInput');
    var sendBtn = document.getElementById('chatSendBtn');
    var messages = document.getElementById('chatMessages');
    var quickReplies = document.getElementById('chatQuickReplies');

    if (!fab) return;

    var isOpen = false;

    // Your complete knowledge base (all your real info)
    const knowledge = {
        education: "🎓 I'm studying Computer Science and Engineering at University of Asia Pacific, Dhaka. Currently in my 2nd year (2023-present)! I completed my HSC from Begum Badrunnesa Govt. Girls' College and SSC from Keraniganj Girls School.",

        skills: "💻 My tech skills:\n\n• Python (85%) - OOP, data structures, problem solving\n• Java (80%) - Core Java, OOP concepts, inheritance\n• C (75%) - Pointers, memory management, algorithms\n• HTML/CSS (70%) - Responsive design, Flexbox, Grid\n• Django (20%) - Currently learning web framework\n\n📜 Certifications: Python Basic & Java Basic from HackerRank",

        projects: "🚀 Here are my projects:\n\n1. 🌤️ Weather App - Python/PyQt5 with OpenWeatherMap API\n2. ⏱️ Stop Watch - PyQt5 timer with millisecond precision\n3. ⏰ Alarm Clock - Python CLI with real-time clock\n4. ✈️ Airline Reservation System - Java OOP with file handling\n5. 📚 Student Record System - C with linked lists\n6. 💼 Portfolio Website - HTML/CSS/JS responsive design\n\n🔗 All on GitHub: github.com/Itz-Rafin",

        contact: "📫 Connect with me:\n\n• LinkedIn: linkedin.com/in/rafin-azim-5908053a4\n• GitHub: github.com/Itz-Rafin\n• Instagram: @itz_rafin_azim\n• Facebook: farzana.azim.3114\n• WhatsApp: +8801880225076\n\nAll links are in my website footer! Feel free to reach out! 🤝",

        about: "👨‍💻 I'm Rafin Azim (Itz_Rafin), a passionate Computer Science student from Dhaka, Bangladesh.\n\nWhat I do:\n• Build web and software projects\n• Learn new technologies daily\n• Turn ideas into real solutions\n• Focus on backend development\n\nI'm always excited to learn and create new things! 🌟",

        greeting: "Hey there! 👋 I'm Rafin Azim, a Computer Science student and aspiring developer.\n\nAsk me about:\n💻 My skills (Python, Java, C, etc.)\n🚀 My projects (Weather App, Airline System, etc.)\n🎓 My education (University of Asia Pacific)\n📫 How to contact me\n\nWhat would you like to know? 😊"
    };

    function getResponse(message) {
        const msg = message.toLowerCase();

        // Greetings
        if (msg.match(/hello|hi|hey|greetings|sup|what'?s up|howdy|yo|hey there|good morning|good evening/i))
            return knowledge.greeting;

        // Education related
        if (msg.match(/study|university|college|school|education|degree|bachelor|hsc|ssc|cse|computer science|uap|academic|class|semester|where do you study/i))
            return knowledge.education;

        // Skills related
        if (msg.match(/skill|tech|stack|language|python|java|c\s*program|c\+\+|html|css|django|framework|proficiency|know|learn|certif|hackerrank|what can you do|what are you good at/i))
            return knowledge.skills;

        // Projects related
        if (msg.match(/project|build|made|create|code|github|weather|stopwatch|alarm|airline|student|record|portfolio|app|application|work|showcase|what have you built/i))
            return knowledge.projects;

        // Contact related
        if (msg.match(/contact|reach|email|phone|whatsapp|linkedin|instagram|facebook|social|connect|follow|dm|message|how to reach|how to contact/i))
            return knowledge.contact;

        // About me
        if (msg.match(/about|who are you|tell me about yourself|background|bio|introduce|yourself|who is rafin|what is your name/i))
            return knowledge.about;

        // Default response
        return "😊 I'm Rafin! I can tell you about:\n\n💻 My skills (Python, Java, C, etc.)\n🚀 My projects (Weather App, Airline System, etc.)\n🎓 My education (University of Asia Pacific)\n📫 How to contact me\n\nWhat would you like to know? Just ask!";
    }

    function toggleChat() {
        isOpen = !isOpen;
        chatWin.classList.toggle('open', isOpen);
        fabIcon.className = isOpen ? 'bx bx-x' : 'bx bx-message-rounded-dots';
        if (isOpen) setTimeout(() => input.focus(), 300);
    }

    fab.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    document.addEventListener('click', (e) => {
        if (isOpen && !chatWin.contains(e.target) && !fab.contains(e.target)) toggleChat();
    });

    function getTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function addMessage(text, role) {
        const div = document.createElement('div');
        div.className = 'chat-msg ' + role;
        // Preserve line breaks
        const formattedText = text.replace(/\n/g, '<br>');
        div.innerHTML = `<div class="chat-bubble">${formattedText}</div><div class="chat-time">${getTime()}</div>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        div.id = 'chatTyping';
        div.innerHTML = '<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
        const t = document.getElementById('chatTyping');
        if (t) t.remove();
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text || sendBtn.disabled) return;

        if (quickReplies) quickReplies.style.display = 'none';
        input.value = '';
        sendBtn.disabled = true;
        addMessage(text, 'user');
        showTyping();

        // Simulate AI thinking (feels more natural)
        setTimeout(() => {
            const reply = getResponse(text);
            removeTyping();
            addMessage(reply, 'bot');
            sendBtn.disabled = false;
            input.focus();

            setTimeout(() => {
                if (quickReplies) quickReplies.style.display = 'flex';
            }, 500);
        }, 600);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !sendBtn.disabled) sendMessage();
    });

    // Update quick reply buttons
    document.querySelectorAll('.chat-qr').forEach((btn) => {
        btn.addEventListener('click', () => {
            input.value = btn.dataset.q;
            sendMessage();
        });
    });
}
/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initGalaxy();
    initThemeToggle();
    initScrollReveal();
    initChatbot();
});