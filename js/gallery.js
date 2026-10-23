// <u1-gallery> — full-bleed, draggable, endlessly wrapping mosaic of works with a
// white name intro, a small centre wall label, pill contact nav, a lightbox and
// a profile panel.
//
// Feed it content with el.setAttribute('data', JSON.stringify({ profile, works, mediaBase }))
// (see index.html).

const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,400&family=Inter+Tight:wght@400;500&display=swap';

const CSS = `
:host {
    --black: #000;
    --void: #111;
    --white: #fff;
    --charcoal: #393939;
    --card: #fff;
    --display: 'Fraunces', 'GT Sectra Display', Georgia, 'Times New Roman', serif;
    --sans: 'Inter Tight', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    --ease: cubic-bezier(.7, 0, .2, 1);
    display: block;
    position: relative;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    background: var(--void);
    color: var(--white);
    font-family: var(--sans);
    -webkit-font-smoothing: antialiased;
}
*, *::before, *::after { box-sizing: border-box; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
a { color: inherit; text-decoration: none; }
:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }

/* ---------- mosaic ---------- */
.stage { position: absolute; inset: 0; cursor: grab; touch-action: none; user-select: none; -webkit-user-select: none; }
.stage.grabbing { cursor: grabbing; }
.plane { position: absolute; top: 0; left: 0; will-change: transform; }
.col { position: absolute; top: 0; display: flex; flex-direction: column; gap: 2px; will-change: transform; }
.tile { position: relative; overflow: hidden; background: var(--black); flex: none; opacity: 0; transition: opacity .9s ease; }
.ready .tile { opacity: 1; }
.tile img, .tile video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
.tile video { opacity: 0; transition: opacity .5s ease; }
.tile video.on { opacity: 1; }
.tile .mk {
    position: absolute; left: 8px; bottom: 8px; padding: 3px 9px 2px; border-radius: 9999px;
    background: var(--white); color: var(--black); font-size: 10px; letter-spacing: -.02em; text-transform: uppercase;
    opacity: 0; transform: translateY(4px); transition: opacity .25s, transform .25s;
}
.stage:not(.grabbing) .tile:hover .mk { opacity: 1; transform: none; }
.tile::after { content: ''; position: absolute; inset: 0; background: var(--black); opacity: 0; transition: opacity .35s; pointer-events: none; }
.stage.dim .tile::after { opacity: .45; }
.stage.dim .tile.hot::after { opacity: 0; }

/* ---------- grain ---------- */
.grain { position: absolute; inset: -50%; pointer-events: none; opacity: .09; animation: grain 1s steps(6) infinite; }
@keyframes grain {
    0% { transform: translate(0, 0); } 20% { transform: translate(-4%, 3%); } 40% { transform: translate(3%, -5%); }
    60% { transform: translate(-6%, -2%); } 80% { transform: translate(5%, 4%); } 100% { transform: translate(0, 0); }
}

/* ---------- centre wall label ---------- */
.label {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    width: min(250px, calc(100% - 64px)); padding: 12px 14px 11px; background: var(--black);
    font-size: 12px; line-height: 1.1; letter-spacing: -.025em; text-transform: uppercase;
}
.label p { margin: 0; }
.label .plink { display: inline-block; margin-top: 14px; color: var(--card); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px; text-transform: uppercase; letter-spacing: -.025em; }
.label .plink:hover { font-style: italic; }
.label .now { margin-top: 14px; color: #8a8a8a; min-height: 1.1em; }
.label .now b { font-weight: 400; color: var(--white); }

/* ---------- pills ---------- */
.pills { position: absolute; left: 0; right: 0; bottom: 18px; display: flex; justify-content: center; flex-wrap: wrap; gap: 6px; padding: 0 16px; }
.pill {
    display: inline-flex; align-items: center; height: 26px; padding: 0 12px; border-radius: 9999px;
    background: var(--white); color: var(--black); font-size: 12px; letter-spacing: -.025em; text-transform: uppercase; white-space: nowrap;
}
.pill .l, .pill .v { display: block; overflow: hidden; transition: max-width .45s var(--ease), opacity .3s; }
.pill .l { max-width: 10em; }
.pill .v { max-width: 0; opacity: 0; }
.pill:hover .l, .pill:focus-visible .l { max-width: 0; opacity: 0; }
.pill:hover .v, .pill:focus-visible .v { max-width: 24em; opacity: 1; }
.pill.dark { background: var(--black); color: var(--white); }
.pill.ic { height: 30px; padding: 0 8px; gap: 0; }
.pill.ic svg { width: 16px; height: 16px; flex: none; }
.pill.ic .v { margin-left: 0; transition: max-width .45s var(--ease), opacity .3s, margin .45s var(--ease); }
.pill.ic:hover .v, .pill.ic:focus-visible .v { margin-left: 6px; margin-right: 2px; }
.pills .pill:not(.ic) { height: 30px; }
.pf .ct svg { width: 15px; height: 15px; flex: none; }
.pf .ct a span:first-child { display: inline-flex; align-items: center; gap: 8px; }

/* ---------- intro ---------- */
.intro {
    position: absolute; inset: 0; z-index: 30; background: var(--card); color: var(--black);
    display: grid; place-items: center; transition: transform 1.1s var(--ease);
}
.intro.out { transform: translateY(-100%); }
.name {
    margin: 0; font-family: var(--display); font-style: italic; font-weight: 300; font-variation-settings: 'opsz' 144;
    font-size: clamp(84px, 24vw, 238px); line-height: .8; letter-spacing: -.04em; text-align: center;
}
.name span { display: block; overflow: hidden; padding: 0 .06em .08em; }
.name span i { display: block; font-style: inherit; }
.intro .name span i { transform: translateY(105%); transition: transform 1s var(--ease); }
.intro .name span:nth-child(2) i { transition-delay: .12s; }
.intro.in .name span i { transform: none; }
.intro small { position: absolute; bottom: 22px; left: 0; right: 0; text-align: center; font-size: 12px; letter-spacing: -.025em; text-transform: uppercase; color: var(--charcoal); }

/* ---------- lightbox ---------- */
.lb {
    position: absolute; inset: 0; z-index: 20; background: rgba(0, 0, 0, .96);
    display: grid; grid-template-rows: 1fr auto; opacity: 0; visibility: hidden; transition: opacity .35s, visibility 0s .35s;
}
.lb.open { opacity: 1; visibility: visible; transition: opacity .35s; }
.lb .media { min-height: 0; display: grid; place-items: center; padding: 56px 16px 12px; }
.lb .media img, .lb .media video { max-width: 100%; max-height: 100%; display: block; background: var(--black); }
.lb .bar { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding: 14px 18px 18px; flex-wrap: wrap; }
.lb .cap { font-size: 12px; line-height: 1.1; letter-spacing: -.025em; text-transform: uppercase; }
.lb .cap .t { font-family: var(--display); font-style: italic; font-weight: 300; text-transform: none; font-size: clamp(28px, 4vw, 48px); line-height: .9; letter-spacing: -.04em; margin: 4px 0 6px; }
.lb .cap .m { color: #8a8a8a; }
.lb .ctl { display: flex; gap: 6px; flex-wrap: wrap; }
.lb .x { position: absolute; top: 16px; right: 16px; }
.lb .ix { position: absolute; top: 22px; left: 18px; font-size: 12px; letter-spacing: -.025em; color: #8a8a8a; }

/* ---------- profile ---------- */
.pf {
    position: absolute; inset: 0; z-index: 25; background: var(--card); color: var(--black); overflow-y: auto; overscroll-behavior: contain;
    transform: translateY(100%); visibility: hidden; transition: transform .9s var(--ease), visibility 0s .9s;
}
.pf.open { transform: none; visibility: visible; transition: transform .9s var(--ease); }
.pf .in { padding: 38px; min-height: 100%; display: flex; flex-direction: column; gap: 38px; }
.pf .name { text-align: left; }
.pf .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 29px 38px; font-size: 14px; line-height: 1.1; letter-spacing: -.025em; }
.pf h3 { margin: 0 0 10px; font: inherit; font-size: 12px; text-transform: uppercase; color: var(--charcoal); border-top: 1px solid var(--black); padding-top: 6px; }
.pf p { margin: 0 0 .8em; max-width: 34em; }
.pf ul { list-style: none; margin: 0; padding: 0; }
.pf li { border-bottom: 1px solid rgba(0, 0, 0, .18); }
.pf .idx button, .pf .svc li, .pf .ct a { display: flex; justify-content: space-between; gap: 12px; width: 100%; padding: 6px 0 5px; text-align: left; }
.pf .idx button:hover span:first-child, .pf .ct a:hover span:first-child { font-style: italic; }
.pf .idx .c, .pf .ct .c { color: var(--charcoal); text-transform: uppercase; font-size: 12px; white-space: nowrap; }
.pf .x { position: sticky; top: 0; align-self: flex-end; margin-bottom: -64px; z-index: 1; }

/* ---------- showreel hero ---------- */
.hero { position: absolute; inset: 0; z-index: 15; background: var(--black); }
.hero[hidden] { display: none; }
.hero video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: var(--black); }
@media (min-aspect-ratio: 13/10) { .hero video { object-fit: cover; } }
.hero .hctl { position: absolute; left: 0; right: 0; bottom: 18px; display: flex; justify-content: center; gap: 6px; padding: 0 16px; }
.hero .pill { height: 30px; gap: 6px; box-shadow: 0 0 0 1px rgba(0, 0, 0, .14); }
.hero .pill svg { width: 16px; height: 16px; flex: none; }
.hero .cue i { font-style: normal; display: inline-block; animation: nudge 1.6s ease-in-out infinite; }
@keyframes nudge { 0%, 100% { transform: translateY(-1px); } 50% { transform: translateY(2px); } }

@media (max-width: 600px) {
    .pf .in { padding: 22px 16px; gap: 29px; }
    .pills { bottom: 14px; }
}
@media (prefers-reduced-motion: reduce) {
    .grain { animation: none; }
    .intro, .pf, .lb, .tile, .tile video { transition: none; }
    .hero .cue i { animation: none; }
}
`;

const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mod = (n, m) => ((n % m) + m) % m;
const svg = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const ICONS = {
    email: svg('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>'),
    instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".6" fill="currentColor"/>'),
    whatsapp: svg('<path d="M3.6 20.4 5 16.2A8.6 8.6 0 1 1 8 19.1z"/><path d="M9.2 8.2c-.3 2.9 3.3 6.7 6.5 6.6l.9-1.5-1.9-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-.9-1.9z"/>'),
    telegram: svg('<path d="M21 4 2.8 11.2l5.7 2L19 6.6 10.6 15l.3 5.2 3-3.6 4.8 3.6z"/>'),
    tiktok: svg('<path d="M14.5 3v11.6a3.6 3.6 0 1 1-3.6-3.6"/><path d="M14.5 3c.4 2.6 2.4 4.6 5 4.8"/>'),
    link: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
    play: svg('<path d="M7 4.5v15l12-7.5z"/>'),
    muted: svg('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5m0-5-5 5"/>'),
    sound: svg('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/>')
};
const linkTarget = (href) => (/^(mailto|tel):/.test(href) ? '_self' : '_blank');
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function ensureFonts() {
    if (document.querySelector('link[data-u1-fonts]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    link.dataset.u1Fonts = '';
    document.head.appendChild(link);
}

function noiseUrl() {
    const c = document.createElement('canvas');
    c.width = c.height = 180;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(180, 180);
    for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL('image/png');
}

// Small seeded PRNG so the column stagger is stable between rebuilds.
function rng(seed) {
    return () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
    };
}

class U1Gallery extends HTMLElement {
    static get observedAttributes() {
        return ['data'];
    }

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.cfg = { profile: {}, works: [], mediaBase: '' };
        this.pan = { x: 0, y: 0, vx: 0, vy: 0 };
        this.cols = [];
        this.drag = null;
        // Hold the idle drift until a few seconds after the intro.
        this.lastInput = performance.now() + 3000;
        this.current = -1;
        this.onKey = this.onKey.bind(this);
        this.frame = this.frame.bind(this);
    }

    connectedCallback() {
        if (!this.shell) this.buildShell();
        ensureFonts();
        window.addEventListener('keydown', this.onKey);
        this.ro = new ResizeObserver(() => this.scheduleLayout());
        this.ro.observe(this);
        this.raf = requestAnimationFrame(this.frame);
        this.readAttr();
        this.playIntro();
    }

    disconnectedCallback() {
        window.removeEventListener('keydown', this.onKey);
        cancelAnimationFrame(this.raf);
        if (this.ro) this.ro.disconnect();
        if (this.io) this.io.disconnect();
    }

    attributeChangedCallback() {
        if (this.shell) this.readAttr();
    }

    set config(value) {
        this.cfg = Object.assign({ profile: {}, works: [], mediaBase: '' }, value);
        if (this.shell) this.populate();
    }

    get config() {
        return this.cfg;
    }

    readAttr() {
        const raw = this.getAttribute('data');
        if (!raw) return;
        try {
            this.config = JSON.parse(raw);
        } catch (e) {
            console.error('u1-gallery: invalid data attribute', e);
        }
    }

    // ---------- media resolution ----------

    src(item, key) {
        const override = { file: 'src', poster: 'posterSrc', loop: 'loopSrc' }[key];
        if (item[override]) return item[override];
        if (!item[key]) return '';
        if (/^(https?:)?\/\//.test(item[key])) return item[key];
        return (this.cfg.mediaBase || '') + item[key];
    }

    still(item) {
        return item.type === 'video' ? this.src(item, 'poster') : this.src(item, 'file');
    }

    // ---------- shell ----------

    buildShell() {
        this.root.innerHTML = `
            <style>${CSS}</style>
            <div class="stage" part="stage"><div class="plane" aria-hidden="true"></div></div>
            <div class="grain" aria-hidden="true"></div>
            <div class="label" role="note">
                <p class="bio"></p>
                <button class="plink" type="button">Profile ↗</button>
                <p class="now" aria-live="polite"></p>
            </div>
            <nav class="pills" aria-label="Contact"></nav>
            <section class="lb" role="dialog" aria-modal="true" aria-label="Work">
                <span class="ix"></span>
                <button class="pill x" type="button" data-act="close"><span class="l">Close</span><span class="v">Esc</span></button>
                <div class="media"></div>
                <div class="bar"><div class="cap"></div><div class="ctl"></div></div>
            </section>
            <section class="pf" role="dialog" aria-modal="true" aria-label="Profile">
                <div class="in"></div>
            </section>
            <section class="hero" hidden aria-label="Showreel">
                <video muted loop playsinline preload="auto"></video>
                <div class="hctl">
                    <button class="pill snd" type="button"></button>
                    <button class="pill cue" type="button">Scroll <i>↓</i></button>
                </div>
            </section>
            <div class="intro" aria-hidden="true"><h1 class="name"></h1><small></small></div>
        `;
        const $ = (s) => this.root.querySelector(s);
        this.shell = {
            stage: $('.stage'), plane: $('.plane'), grain: $('.grain'), label: $('.label'),
            bio: $('.bio'), now: $('.now'), pills: $('.pills'), intro: $('.intro'),
            lb: $('.lb'), lbMedia: $('.lb .media'), lbCap: $('.lb .cap'), lbCtl: $('.lb .ctl'), lbIx: $('.lb .ix'),
            pf: $('.pf'), pfIn: $('.pf .in'),
            hero: $('.hero'), heroVideo: $('.hero video'), snd: $('.hero .snd')
        };
        this.shell.grain.style.backgroundImage = `url(${noiseUrl()})`;
        this.bindStage();
        this.bindHero();
        $('.plink').addEventListener('click', () => this.openProfile());
        this.shell.lb.addEventListener('click', (e) => {
            const act = e.target.closest('[data-act]');
            if (act) this.lbAction(act.dataset.act);
            else if (e.target === this.shell.lb || e.target === this.shell.lbMedia) this.closeLightbox();
        });
    }

    populate() {
        const { profile = {}, works = [] } = this.cfg;
        const s = this.shell;
        const nameLines = [].concat(profile.name || []);
        const nameHtml = nameLines.map((n) => `<span><i>${esc(n)}</i></span>`).join('');
        s.intro.querySelector('.name').innerHTML = nameHtml;
        s.intro.querySelector('small').textContent = `Portfolio ’${String(new Date().getFullYear()).slice(2)}`;
        s.bio.textContent = profile.bio || '';
        this.idleHint = `Drag to explore · ${works.length} works`;
        s.now.textContent = this.idleHint;

        const links = (profile.links || []).filter((l) => l.href);
        s.pills.innerHTML =
            links.map((l) => `<a class="pill ic" href="${esc(l.href)}" target="${linkTarget(l.href)}" rel="noopener" aria-label="${esc(l.label)}">${ICONS[l.icon] || ICONS.link}<span class="v">${esc(l.label)}</span></a>`).join('') +
            (this.cfg.reel ? `<button class="pill ic" type="button" data-act="reel" aria-label="Showreel">${ICONS.play}<span class="v">Showreel</span></button>` : '') +
            `<button class="pill" type="button" data-act="index"><span class="l">Index</span><span class="v">All ${works.length} works</span></button>`;
        s.pills.querySelector('[data-act="index"]').addEventListener('click', () => this.openProfile(true));
        const reelPill = s.pills.querySelector('[data-act="reel"]');
        if (reelPill) reelPill.addEventListener('click', () => this.openHero());

        const reel = this.cfg.reel;
        if (reel && !this.heroReady) {
            this.heroReady = true;
            const v = s.heroVideo;
            v.muted = true;
            v.poster = this.src(reel, 'poster');
            v.src = this.src(reel, 'file');
            s.hero.hidden = false;
            this.heroOpen = true;
            this.setSound(false);
            if (this.introDone) this.playHero();
        }

        this.renderProfile(nameHtml);
        this.layout();
    }

    renderProfile(nameHtml) {
        const { profile = {}, works = [] } = this.cfg;
        const links = (profile.links || []).filter((l) => l.href);
        this.shell.pfIn.innerHTML = `
            <button class="pill dark x" type="button" data-act="close-pf"><span class="l">Close</span><span class="v">Esc</span></button>
            <h2 class="name">${nameHtml}</h2>
            <div class="grid">
                <div>
                    <h3>Profile</h3>
                    ${(profile.about || [profile.bio]).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join('')}
                </div>
                <div class="svc">
                    <h3>Services</h3>
                    <ul>${(profile.services || []).map((x) => `<li><span>${esc(x)}</span></li>`).join('')}</ul>
                </div>
                <div class="ct">
                    <h3>Contact</h3>
                    <ul>${links.map((l) => `<li><a href="${esc(l.href)}" target="${linkTarget(l.href)}" rel="noopener"><span>${ICONS[l.icon] || ICONS.link}${esc(l.label)}</span><span class="c">↗</span></a></li>`).join('')}</ul>
                </div>
            </div>
            <div class="idx">
                <h3>Index — ${works.length} works</h3>
                <ul>${works.map((w, i) => `<li><button type="button" data-i="${i}"><span>${String(i + 1).padStart(2, '0')}  ${esc(w.title)}</span><span class="c">${esc([w.category, w.client].filter(Boolean).join(' · '))}</span></button></li>`).join('')}</ul>
            </div>
        `;
        this.shell.pfIn.onclick = (e) => {
            if (e.target.closest('[data-act="close-pf"]')) return this.closeProfile();
            const b = e.target.closest('[data-i]');
            if (b) {
                this.closeProfile(false);
                this.openLightbox(+b.dataset.i);
            }
        };
    }

    // ---------- mosaic layout ----------

    scheduleLayout() {
        const w = this.clientWidth;
        const h = this.clientHeight;
        if (w === this.lastW && h === this.lastH) return;
        clearTimeout(this.layoutTimer);
        this.layoutTimer = setTimeout(() => this.layout(), this.lastW ? 150 : 0);
    }

    layout() {
        const works = this.cfg.works || [];
        const W = this.clientWidth || window.innerWidth;
        const H = this.clientHeight || window.innerHeight;
        this.lastW = W;
        this.lastH = H;
        if (this.io) this.io.disconnect();
        this.shell.plane.textContent = '';
        this.cols = [];
        if (!works.length) return;

        const gap = 2;
        const colW = W < 600 ? 140 : W < 1000 ? 200 : W < 1700 ? 250 : 300;
        const C = W < 600 ? 4 : 6;
        // Masonry: shortest column wins, but avoid stacking the same media type
        // or the same series ("Psyche — …") in one column.
        const series = (w) => (w.series || w.title.split(' — ')[0]).toLowerCase();
        const bucket = (w) => ({ tiles: [], h: 0, types: [], series: [], w });
        // Landscape works and anything marked `featured` go in the big column.
        const isWide = (w) => w.featured || (w.w || 1) / (w.h || 1) >= 1.3;
        const wideItems = works.map((w, i) => i).filter((i) => isWide(works[i]));
        const hasWide = wideItems.length >= 3;
        // Use only as many normal columns as keep each one ~1.25 screens tall,
        // so a tile never shows twice in the same column at once.
        const normalH = works.reduce((s, w) => (hasWide && isWide(w) ? s : s + (colW * (w.h || 1)) / (w.w || 1) + gap), 0);
        const maxCols = hasWide ? C - 1 : C;
        let nCols = Math.max(2, Math.min(maxCols, Math.floor(normalH / (H * 1.25))));
        // A series of n works needs 2n columns in total to keep every one of them
        // a column apart (wrap-around included). Add columns for that while each
        // still stays at least a screen tall.
        const seriesMax = Math.max(0, ...Object.values(works.reduce((m, w) => {
            if (!(hasWide && isWide(w))) m[series(w)] = (m[series(w)] || 0) + 1;
            return m;
        }, {})).filter((n) => n > 1));
        const needed = seriesMax * 2 - (hasWide ? 1 : 0);
        if (nCols < needed && needed <= maxCols && normalH / needed >= H * 1.05) nCols = needed;
        const buckets = Array.from({ length: nCols }, () => bucket(colW));
        const place = (b, item, i) => {
            const th = Math.round((b.w * (item.h || 1)) / (item.w || 1));
            b.tiles.push({ i, th });
            b.types.push(item.type);
            b.series.push(series(item));
            b.h += th + gap;
        };
        // Landscape works get their own double-width column so they read big.
        const wide = hasWide ? bucket(colW * 2 + gap) : null;
        if (wide) {
            // Featured first, then alternate stills and videos so films are never adjacent.
            const feat = wideItems.filter((i) => works[i].featured);
            const vids = wideItems.filter((i) => !works[i].featured && works[i].type === 'video');
            const rest = wideItems.filter((i) => !works[i].featured && works[i].type !== 'video');
            feat.forEach((i) => place(wide, works[i], i));
            while (vids.length || rest.length) {
                if (rest.length) place(wide, works[rest[0]], rest.shift());
                if (vids.length) place(wide, works[vids[0]], vids.shift());
            }
        }
        // Spread each series (e.g. the three Psyche ads) across columns as far
        // apart as possible, counting the wide column and the wrap-around.
        const wideAt = Math.max(1, Math.floor(nCols / 2));
        const T = nCols + (wide ? 1 : 0);
        const tIdx = (n) => (wide && n >= wideAt ? n + 1 : n);
        const groups = {};
        works.forEach((w, i) => {
            if (!(wide && isWide(w))) (groups[series(w)] = groups[series(w)] || []).push(i);
        });
        const pinned = new Set();
        const spread = [];
        Object.values(groups).filter((g) => g.length > 1 && g.length <= nCols).forEach((g) => {
            let best = null;
            let bestGap = -1;
            const pick = (start, acc) => {
                if (acc.length === g.length) {
                    let gapMin = Infinity;
                    acc.forEach((a) => acc.forEach((b) => {
                        const d = Math.abs(tIdx(a) - tIdx(b));
                        if (a !== b) gapMin = Math.min(gapMin, d, T - d);
                    }));
                    if (gapMin > bestGap) [best, bestGap] = [acc.slice(), gapMin];
                    return;
                }
                for (let n = start; n < nCols; n++) pick(n + 1, acc.concat(n));
            };
            pick(0, []);
            // Each pinned work is the first tile in its column (y = 0).
            g.forEach((i, k) => {
                place(buckets[best[k]], works[i], i);
                pinned.add(i);
            });
            spread.push(best.map((n) => ({ b: buckets[n], t: tIdx(n) })).sort((a, b) => a.t - b.t));
        });
        works.forEach((item, i) => {
            if ((wide && isWide(item)) || pinned.has(i)) return;
            const cost = (b) => b.h + (b.types[b.types.length - 1] === item.type ? colW * 0.8 : 0) + (b.series.includes(series(item)) ? colW * 3 : 0);
            place(buckets.reduce((a, x) => (cost(x) < cost(a) ? x : a)), item, i);
        });
        if (wide) buckets.splice(wideAt, 0, wide);
        const lefts = [];
        this.blockW = buckets.reduce((x, b) => {
            lefts.push(x);
            return x + b.w + gap;
        }, 0);
        const reps = Math.ceil(W / this.blockW) + 1;
        const rand = rng(7);
        const phases = buckets.map((b) => Math.round(rand() * b.h));

        // Open centred on the first featured work, until the visitor moves the grid.
        if (wide && !this.touched && wide.tiles.length && works[wide.tiles[0].i].featured) {
            const c = buckets.indexOf(wide);
            this.pan.x = W / 2 - wide.w / 2 - lefts[c];
            this.pan.y = H / 2 - wide.tiles[0].th / 2 - phases[c];
            this.pan.vx = this.pan.vy = 0;
        }

        // Stagger a series vertically too: when columns can't keep them apart,
        // neighbours start a third of a column apart so they never sit side by side.
        spread.forEach((grp) => {
            const step = Math.max(...grp.map((g) => g.b.h)) / grp.length;
            grp.forEach((g, k) => {
                const c = buckets.indexOf(g.b);
                phases[c] = mod(k * step - this.pan.y, g.b.h);
            });
        });
        const autoplay = !reduced();
        this.io = new IntersectionObserver(this.onVisible.bind(this), { rootMargin: '120px' });

        const frag = document.createDocumentFragment();
        for (let r = 0; r < reps; r++) {
            buckets.forEach((b, c) => {
                if (!b.tiles.length) return;
                const col = document.createElement('div');
                col.className = 'col';
                col.style.left = `${r * this.blockW + lefts[c]}px`;
                col.style.width = `${b.w}px`;
                const copies = Math.ceil(H / b.h) + 1;
                for (let k = 0; k < copies; k++) {
                    b.tiles.forEach(({ i, th }) => col.appendChild(this.tile(works[i], i, th, autoplay)));
                }
                frag.appendChild(col);
                this.cols.push({ el: col, period: b.h, phase: phases[c], oy: null });
            });
        }
        this.shell.plane.appendChild(frag);
        this.lastOx = null;
        this.paint(true);
        setTimeout(() => this.shell.stage.classList.add('ready'), 30);
    }

    tile(item, i, th, autoplay) {
        const t = document.createElement('div');
        t.className = 'tile';
        t.dataset.i = i;
        t.style.height = `${th}px`;
        const img = document.createElement('img');
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.draggable = false;
        img.src = this.still(item);
        t.appendChild(img);
        if (item.type === 'video' && autoplay && (item.loop || item.loopSrc)) {
            const v = document.createElement('video');
            v.muted = true;
            v.loop = true;
            v.playsInline = true;
            v.preload = 'none';
            v.setAttribute('muted', '');
            v.setAttribute('playsinline', '');
            v.dataset.src = this.src(item, 'loop');
            v.addEventListener('playing', () => v.classList.add('on'), { once: true });
            t.appendChild(v);
            this.io.observe(v);
        }
        const mk = document.createElement('span');
        mk.className = 'mk';
        mk.textContent = item.type === 'video' ? 'Play ▶' : item.type === 'site' ? 'Visit ↗' : 'View';
        t.appendChild(mk);
        return t;
    }

    onVisible(entries) {
        entries.forEach((e) => {
            const v = e.target;
            if (e.isIntersecting) {
                if (!v.src) v.src = v.dataset.src;
                const p = v.play();
                if (p && p.catch) p.catch(() => {});
            } else if (!v.paused) {
                v.pause();
            }
        });
    }

    // ---------- motion ----------

    frame(now) {
        this.raf = requestAnimationFrame(this.frame);
        const p = this.pan;
        if (!this.drag) {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.93;
            p.vy *= 0.93;
            if (Math.abs(p.vx) < 0.01) p.vx = 0;
            if (Math.abs(p.vy) < 0.01) p.vy = 0;
            const overlay = this.current >= 0 || this.profileOpen || this.heroOpen;
            if (!overlay && !reduced() && now - this.lastInput > 2500 && !document.hidden) p.y -= 0.22;
        }
        this.paint();
    }

    paint(force) {
        if (!this.cols.length) return;
        const ox = Math.round(mod(this.pan.x, this.blockW) - this.blockW);
        if (force || ox !== this.lastOx) {
            this.shell.plane.style.transform = `translate3d(${ox}px,0,0)`;
            this.lastOx = ox;
        }
        for (const col of this.cols) {
            const oy = Math.round(mod(this.pan.y + col.phase, col.period) - col.period);
            if (force || oy !== col.oy) {
                col.el.style.transform = `translate3d(0,${oy}px,0)`;
                col.oy = oy;
            }
        }
    }

    bindStage() {
        const st = this.shell.stage;
        st.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) return;
            this.drag = { id: e.pointerId, lx: e.clientX, ly: e.clientY, moved: 0, tile: e.target.closest('.tile') };
            this.pan.vx = this.pan.vy = 0;
            this.lastInput = performance.now();
            this.touched = true;
            st.setPointerCapture(e.pointerId);
        });
        st.addEventListener('pointermove', (e) => {
            const d = this.drag;
            if (!d || e.pointerId !== d.id) return;
            const dx = e.clientX - d.lx;
            const dy = e.clientY - d.ly;
            d.lx = e.clientX;
            d.ly = e.clientY;
            d.moved += Math.abs(dx) + Math.abs(dy);
            if (d.moved > 6) st.classList.add('grabbing');
            this.pan.x += dx;
            this.pan.y += dy;
            this.pan.vx = this.pan.vx * 0.4 + dx * 0.6;
            this.pan.vy = this.pan.vy * 0.4 + dy * 0.6;
            this.lastInput = performance.now();
            this.touched = true;
        });
        const end = (e) => {
            const d = this.drag;
            if (!d || e.pointerId !== d.id) return;
            this.drag = null;
            st.classList.remove('grabbing');
            if (e.type === 'pointerup' && d.moved <= 6 && d.tile) {
                this.pan.vx = this.pan.vy = 0;
                this.openLightbox(+d.tile.dataset.i);
            }
        };
        st.addEventListener('pointerup', end);
        st.addEventListener('pointercancel', end);
        st.addEventListener('wheel', (e) => {
            e.preventDefault();
            const k = e.deltaMode === 1 ? 16 : 1;
            this.pan.x -= e.deltaX * k;
            this.pan.y -= e.deltaY * k;
            this.pan.vx = this.pan.vy = 0;
            this.lastInput = performance.now();
            this.touched = true;
        }, { passive: false });

        // Hovering a tile dims the rest and names it on the wall label.
        st.addEventListener('pointerover', (e) => {
            if (e.pointerType !== 'mouse') return;
            const t = e.target.closest('.tile');
            if (!t || t === this.hot) return;
            this.setHot(t);
        });
        st.addEventListener('pointerleave', () => this.setHot(null));
    }

    setHot(t) {
        if (this.hot) this.hot.classList.remove('hot');
        this.hot = t;
        const st = this.shell.stage;
        if (!t) {
            st.classList.remove('dim');
            this.shell.now.textContent = this.idleHint || '';
            return;
        }
        t.classList.add('hot');
        st.classList.add('dim');
        const w = this.cfg.works[+t.dataset.i];
        this.shell.now.innerHTML = `<b>${esc(w.title)}</b> — ${esc([w.category, w.client].filter(Boolean).join(' · '))}`;
    }

    onKey(e) {
        if (e.defaultPrevented) return;
        if (this.heroOpen) {
            if (['ArrowDown', 'PageDown', ' ', 'Escape'].includes(e.key)) {
                e.preventDefault();
                this.closeHero();
            }
            return;
        }
        if (e.key === 'Escape') {
            if (this.current >= 0) this.closeLightbox();
            else if (this.profileOpen) this.closeProfile();
            return;
        }
        if (this.current >= 0) {
            if (e.key === 'ArrowRight') this.lbAction('next');
            if (e.key === 'ArrowLeft') this.lbAction('prev');
            return;
        }
        if (this.profileOpen) return;
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
        const step = { ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60] }[e.key];
        if (step) {
            this.pan.vx += step[0] * 0.12;
            this.pan.vy += step[1] * 0.12;
            this.lastInput = performance.now();
            this.touched = true;
        }
    }

    // ---------- intro ----------

    playIntro() {
        const intro = this.shell.intro;
        if (reduced()) {
            intro.remove();
            this.introDone = true;
            return;
        }
        const skip = () => {
            this.introDone = true;
            if (this.heroOpen) this.playHero();
            intro.classList.add('out');
            setTimeout(() => intro.remove(), 1200);
        };
        void intro.offsetHeight;
        setTimeout(() => intro.classList.add('in'), 80);
        this.introTimer = setTimeout(skip, 2400);
        intro.addEventListener('click', () => {
            clearTimeout(this.introTimer);
            skip();
        }, { once: true });
    }

    // ---------- showreel hero ----------

    bindHero() {
        const s = this.shell;
        s.snd.addEventListener('click', () => this.setSound(s.heroVideo.muted));
        s.hero.querySelector('.cue').addEventListener('click', () => this.closeHero());
        let acc = 0;
        s.hero.addEventListener('wheel', (e) => {
            e.preventDefault();
            acc = Math.max(0, acc + e.deltaY);
            if (acc > 40) {
                acc = 0;
                this.closeHero();
            }
        }, { passive: false });
        let ty = null;
        s.hero.addEventListener('touchstart', (e) => {
            ty = e.touches[0].clientY;
        }, { passive: true });
        s.hero.addEventListener('touchmove', (e) => {
            if (ty !== null && ty - e.touches[0].clientY > 40) {
                ty = null;
                this.closeHero();
            }
        }, { passive: true });
    }

    playHero() {
        const p = this.shell.heroVideo.play();
        if (p && p.catch) p.catch(() => {});
    }

    setSound(on) {
        const v = this.shell.heroVideo;
        v.muted = !on;
        this.shell.snd.innerHTML = on ? `${ICONS.sound}Sound off` : `${ICONS.muted}Sound on`;
        this.shell.snd.setAttribute('aria-pressed', String(on));
    }

    // The rectangle the reel collapses into: the featured tile at the centre,
    // or a centred box if there is none.
    heroTarget() {
        const host = this.getBoundingClientRect();
        const cx = host.left + host.width / 2;
        const cy = host.top + host.height / 2;
        const featured = (this.cfg.works || []).findIndex((w) => w.featured);
        let r = null;
        if (featured >= 0) {
            this.shell.plane.querySelectorAll(`.tile[data-i="${featured}"]`).forEach((t) => {
                const b = t.getBoundingClientRect();
                if (b.left <= cx && b.right >= cx && b.top <= cy && b.bottom >= cy) r = b;
            });
        }
        if (!r) {
            const w = host.width * 0.3;
            const h = host.height * 0.3;
            r = { left: cx - w / 2, right: cx + w / 2, top: cy - h / 2, bottom: cy + h / 2 };
        }
        const t = Math.max(0, r.top - host.top);
        const l = Math.max(0, r.left - host.left);
        const b = Math.max(0, host.bottom - r.bottom);
        const rt = Math.max(0, host.right - r.right);
        return `inset(${t}px ${rt}px ${b}px ${l}px)`;
    }

    // Collapse the reel into the centre tile, revealing the grid.
    closeHero() {
        if (!this.heroOpen) return;
        this.heroOpen = false;
        const hero = this.shell.hero;
        const v = this.shell.heroVideo;
        this.lastInput = performance.now();
        if (reduced()) {
            v.pause();
            hero.hidden = true;
            return;
        }
        hero.style.transition = 'clip-path .9s cubic-bezier(.7, 0, .2, 1), opacity .35s ease .75s';
        hero.style.clipPath = this.heroTarget();
        hero.style.opacity = '0';
        clearTimeout(this.heroTimer);
        this.heroTimer = setTimeout(() => {
            if (this.heroOpen) return;
            v.pause();
            hero.hidden = true;
        }, 1150);
    }

    // Grow the reel back out of the centre tile.
    openHero() {
        if (this.heroOpen || !this.cfg.reel) return;
        this.heroOpen = true;
        const hero = this.shell.hero;
        clearTimeout(this.heroTimer);
        hero.hidden = false;
        this.playHero();
        if (reduced()) {
            hero.style.clipPath = '';
            hero.style.opacity = '';
            return;
        }
        hero.style.transition = 'none';
        hero.style.clipPath = this.heroTarget();
        hero.style.opacity = '1';
        void hero.offsetHeight;
        hero.style.transition = 'clip-path .9s cubic-bezier(.7, 0, .2, 1)';
        hero.style.clipPath = 'inset(0px 0px 0px 0px)';
    }

    // ---------- lightbox ----------

    openLightbox(i) {
        const works = this.cfg.works || [];
        if (!works[i]) return;
        if (this.current < 0) this.returnFocus = this.root.activeElement || document.activeElement;
        this.current = i;
        this.setHot(null);
        const w = works[i];
        const s = this.shell;
        s.lbMedia.textContent = '';
        let media;
        if (w.type === 'video') {
            media = document.createElement('video');
            media.src = this.src(w, 'file');
            media.poster = this.src(w, 'poster');
            media.controls = true;
            media.playsInline = true;
            media.autoplay = true;
        } else {
            media = document.createElement('img');
            media.src = this.src(w, 'file');
            media.alt = w.title;
        }
        s.lbMedia.appendChild(media);
        s.lbIx.textContent = `${String(i + 1).padStart(2, '0')} / ${String(works.length).padStart(2, '0')}`;
        s.lbCap.innerHTML = `<div class="m">${esc(w.category || '')}</div><div class="t">${esc(w.title)}</div><div class="m">${esc([w.client, w.year].filter(Boolean).join(' · '))}</div>`;
        s.lbCtl.innerHTML =
            (w.type === 'site' && w.url ? `<a class="pill" href="${esc(w.url)}" target="_blank" rel="noopener"><span class="l">Visit site ↗</span><span class="v">${esc(w.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</span></a>` : '') +
            `<button class="pill" type="button" data-act="prev" aria-label="Previous work"><span class="l">←</span><span class="v">Prev</span></button>` +
            `<button class="pill" type="button" data-act="next" aria-label="Next work"><span class="l">→</span><span class="v">Next</span></button>`;
        s.lb.classList.add('open');
        s.lb.querySelector('.x').focus({ preventScroll: true });
    }

    lbAction(act) {
        const n = (this.cfg.works || []).length;
        if (act === 'close') this.closeLightbox();
        if (act === 'next') this.openLightbox((this.current + 1) % n);
        if (act === 'prev') this.openLightbox((this.current - 1 + n) % n);
    }

    closeLightbox() {
        const s = this.shell;
        const v = s.lbMedia.querySelector('video');
        if (v) v.pause();
        s.lb.classList.remove('open');
        this.current = -1;
        setTimeout(() => {
            if (this.current < 0) s.lbMedia.textContent = '';
        }, 400);
        if (this.returnFocus && this.returnFocus.focus) this.returnFocus.focus({ preventScroll: true });
    }

    // ---------- profile ----------

    openProfile(toIndex) {
        this.profileOpen = true;
        this.returnFocus = this.root.activeElement || document.activeElement;
        const pf = this.shell.pf;
        pf.classList.add('open');
        pf.scrollTop = 0;
        if (toIndex) {
            // Scroll only the panel; scrollIntoView would also scroll the host box.
            setTimeout(() => pf.scrollTo({ top: pf.querySelector('.idx').offsetTop - 24, behavior: reduced() ? 'auto' : 'smooth' }), 500);
        }
        pf.querySelector('.x').focus({ preventScroll: true });
    }

    closeProfile(restoreFocus = true) {
        this.profileOpen = false;
        this.shell.pf.classList.remove('open');
        if (restoreFocus && this.returnFocus && this.returnFocus.focus) this.returnFocus.focus({ preventScroll: true });
    }
}

if (!customElements.get('u1-gallery')) customElements.define('u1-gallery', U1Gallery);
