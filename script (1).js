/* ==========================================================================
   FINIMUS portfolio — behavior
   Sections: i18n (EN/RO), footer year, nav, scroll-spy (nav + trace rail),
   reveal-on-scroll, subtle hero glitch, interactive terminal (single,
   language-aware).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     i18n — EN / RO
     Every translatable element carries data-i18n="section.key" and its
     text (or innerHTML, for entries with inline tags like <strong>/<code>)
     is swapped on language change. Add a new language by adding a sibling
     object below and a matching button in the header's .lang-toggle.
     --------------------------------------------------------------------- */
  const translations = {
    en: {
      nav: { home: 'Home', about: 'About', skills: 'Skills', achievement: 'Achievement', social: 'Social', contact: 'Contact', terminal: 'Terminal' },
      hero: {
        eyebrow: 'IT STUDENT · CYBERSECURITY · AI · PROGRAMMING',
        tagline: 'Building with technology. Learning through cybersecurity. Exploring AI.',
        btnSkills: 'VIEW SKILLS',
        btnContact: 'CONTACT ME',
      },
      about: {
        title: 'Learning by building, breaking, and understanding <span class="accent">why</span> it works.',
        p1: 'I\'m an IT student with a growing focus on <strong>cybersecurity</strong>, <strong>AI</strong>, and <strong>software development</strong>. Most of what I know didn\'t come from a classroom first — it came from setting up a lab, misconfiguring something, and figuring out why it broke.',
        p2: 'I spend my time between Linux environments, small programming projects, CTF challenges, and experimenting with AI tools to see where the practical edge of the field actually is right now.',
        p3: 'This site is a running log of that process — not a finished résumé, but a workspace that grows as I do.',
      },
      skills: {
        title: 'What I work with.',
        cat1: 'SYSTEMS &amp; HARDWARE', cat2: 'PROGRAMMING', cat3: 'AI', cat4: 'CREATIVE &amp; SOFTWARE', cat5: 'MEDIA &amp; TECHNICAL', cat6: 'LANGUAGES',
        pcAssembly: 'PC Assembly &amp; Maintenance', troubleshooting: 'Troubleshooting',
        promptEng: 'Prompt Engineering', aiTools: 'AI Tools',
        webDesign: 'Web Design — Basic',
        audioMixing: 'Audio Mixing', liveStreaming: 'Live Streaming', videoProjection: 'Video &amp; Projection',
        langRo: 'Romanian — Native', langEn: 'English — Fluent', langIt: 'Italian — Conversational', langFr: 'French — Basic',
      },
      achievement: {
        line1: '1st Place — National Cyber Security Olympiad',
        line2: 'County Stage, 2026',
      },
      social: { title: 'Where else to find me.', addLink: 'add link →', viewProfile: 'view profile →' },
      contact: { title: 'Let\'s talk.', lead: 'Reach me directly at:', btn: 'SEND EMAIL' },
      terminal: {
        title: 'Try it yourself.',
        lead: 'A live shell into this page. Type <code>help</code> to see what it can do.',
        welcome: 'Type "help" to see available commands.',
      },
    },
    ro: {
      nav: { home: 'Acasă', about: 'Despre', skills: 'Skill-uri', achievement: 'Realizare', social: 'Social', contact: 'Contact', terminal: 'Terminal' },
      hero: {
        eyebrow: 'ELEV IT · CYBERSECURITY · AI · PROGRAMARE',
        tagline: 'Construiesc cu tehnologie. Învăț prin cybersecurity. Explorez AI.',
        btnSkills: 'VEZI SKILL-URILE',
        btnContact: 'CONTACTEAZĂ-MĂ',
      },
      about: {
        title: 'Învăț construind, stricând și înțelegând <span class="accent">de ce</span> funcționează.',
        p1: 'Sunt elev pasionat de IT, cu un interes tot mai mare pentru <strong>cybersecurity</strong>, <strong>AI</strong> și <strong>dezvoltare software</strong>. Cea mai mare parte din ce știu n-a venit din clasă — a venit din montat un laborator, greșit configurat ceva, și încercat să înțeleg de ce s-a stricat.',
        p2: 'Îmi petrec timpul între medii Linux, proiecte mici de programare, provocări CTF și experimente cu unelte AI, ca să văd unde e, practic, granița actuală a domeniului.',
        p3: 'Situl ăsta e un jurnal al acestui proces — nu un CV terminat, ci un spațiu de lucru care crește odată cu mine.',
      },
      skills: {
        title: 'Cu ce lucrez.',
        cat1: 'SISTEME &amp; HARDWARE', cat2: 'PROGRAMARE', cat3: 'AI', cat4: 'CREATIV &amp; SOFTWARE', cat5: 'MEDIA &amp; TEHNIC', cat6: 'LIMBI',
        pcAssembly: 'Asamblare &amp; Mentenanță PC', troubleshooting: 'Depanare',
        promptEng: 'Prompt Engineering', aiTools: 'Unelte AI',
        webDesign: 'Web Design — Nivel de bază',
        audioMixing: 'Mixaj Audio', liveStreaming: 'Transmisiuni Live', videoProjection: 'Video &amp; Proiecție',
        langRo: 'Română — Nativ', langEn: 'Engleză — Fluent', langIt: 'Italiană — Conversațional', langFr: 'Franceză — Începător',
      },
      achievement: {
        line1: 'Locul I — Olimpiada Națională de Securitate Cibernetică',
        line2: 'Etapa Județeană, 2026',
      },
      social: { title: 'Unde mă mai găsești.', addLink: 'adaugă link →', viewProfile: 'vezi profilul →' },
      contact: { title: 'Hai să vorbim.', lead: 'Scrie-mi direct la:', btn: 'TRIMITE EMAIL' },
      terminal: {
        title: 'Încearcă și tu.',
        lead: 'Un terminal viu, direct pe pagină. Scrie <code>help</code> ca să vezi ce poate face.',
        welcome: 'Scrie "help" ca să vezi comenzile disponibile.',
      },
    },
  };

  function resolveKey(dict, path) {
    return path.split('.').reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), dict);
  }

  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = resolveKey(translations[lang], el.dataset.i18n);
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  applyLanguage(currentLang);

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll-spy: highlights the active nav link + trace-rail hop
     --------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');
  const hops = document.querySelectorAll('.trace-hops li[data-hop]');

  if (sections.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;

        navAnchors.forEach(a => a.classList.toggle('active', a.dataset.nav === id));
        hops.forEach(h => h.classList.toggle('active', h.dataset.hop === id));
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => spyObserver.observe(sec));
  }

  /* ---------------------------------------------------------------------
     Reveal-on-scroll
     --------------------------------------------------------------------- */
  const revealSelectors = [
    '.about-grid-solo', '.skills-grid', '.achievement-card', '.social-grid',
    '.contact-email-btn', '.section-title', '.section-lead'
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach(el => el.setAttribute('data-reveal', ''));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------------------------------------------------------------------
     Subtle glitch flicker on the hero title (used sparingly)
     --------------------------------------------------------------------- */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      heroTitle.style.textShadow = '2px 0 var(--cyan), -2px 0 var(--red), 0 0 30px var(--green-glow)';
      setTimeout(() => { heroTitle.style.textShadow = '0 0 30px var(--green-glow)'; }, 90);
    }, 7000);
  }

  /* ---------------------------------------------------------------------
     Interactive terminal — the only terminal on the site.
     Commands are language-aware: they read the current language each
     time they run, so switching EN/RO changes future command output.
     --------------------------------------------------------------------- */
  const termOutput = document.getElementById('termOutput');
  const termInput = document.getElementById('termInput');
  const history = [];
  let historyIndex = -1;

  function getCommands(lang) {
    const isRo = lang === 'ro';
    return {
      help: () => isRo ? [
        'Comenzi disponibile:',
        '  about        — despre mine',
        '  skills       — ce lucruri stăpânesc',
        '  achievement  — o realizare',
        '  social       — unde mă găsești',
        '  contact      — cum mă contactezi',
        '  whoami       — verificare rapidă de identitate',
        '  clear        — golește terminalul',
      ] : [
        'Available commands:',
        '  about        — who this site belongs to',
        '  skills       — what I actually work with',
        '  achievement  — one thing I\'m proud of',
        '  social       — where to find me',
        '  contact      — how to reach me',
        '  whoami       — quick identity check',
        '  clear        — clear this terminal',
      ],
      whoami: () => [isRo
        ? 'finimus — elev IT · cybersecurity · AI · programare'
        : 'finimus — IT student · cybersecurity · AI · programming'],
      about: () => isRo ? [
        'Finimus — elev IT pasionat de tehnologie,',
        'cybersecurity și AI. Învăț construind,',
        'stricând, și înțelegând de ce funcționează.',
      ] : [
        'Finimus — IT student passionate about technology,',
        'cybersecurity and AI. Learning by building, breaking,',
        'and understanding why things work.',
      ],
      skills: () => isRo ? [
        'Sisteme & Hardware : Windows, Linux, PC Assembly, Depanare',
        'Programare         : C++, Python',
        'AI                 : LLMs, Prompt Engineering, Unelte AI',
        'Creativ & Software  : MS Office, Canva, Photoshop, Web Design',
        'Media & Tehnic      : Mixaj Audio, Live Streaming, Proiecție',
        'Limbi              : Română, Engleză, Italiană, Franceză',
      ] : [
        'Systems & Hardware : Windows, Linux, PC Assembly, Troubleshooting',
        'Programming        : C++, Python',
        'AI                 : LLMs, Prompt Engineering, AI Tools',
        'Creative & Software: MS Office, Canva, Photoshop, Web Design',
        'Media & Technical  : Audio Mixing, Live Streaming, Projection',
        'Languages          : Romanian, English, Italian, French',
      ],
      achievement: () => isRo
        ? ['Locul I — Olimpiada Națională de Securitate Cibernetică (Etapa Județeană, 2026)']
        : ['1st Place — National Cyber Security Olympiad (County Stage, 2026)'],
      social: () => [
        'Facebook   : (add link)',
        'Instagram  : (add link)',
        'GitHub     : github.com/Finimus',
        'LinkedIn   : linkedin.com/in/fineas-turcu',
      ],
      contact: () => [isRo ? 'Email: finimus7@gmail.com' : 'Email: finimus7@gmail.com'],
      clear: () => { termOutput.innerHTML = ''; return null; },
    };
  }

  function printLine(text, cls) {
    const div = document.createElement('div');
    div.className = 'out-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    termOutput.appendChild(div);
  }

  function runCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) return;

    const echo = document.createElement('div');
    echo.className = 'out-line out-cmd';
    echo.textContent = cmd;
    termOutput.appendChild(echo);

    const handler = getCommands(currentLang)[cmd.toLowerCase()];
    if (!handler) {
      const notFound = currentLang === 'ro'
        ? `comandă necunoscută: ${cmd} (încearcă "help")`
        : `command not found: ${cmd} (try "help")`;
      printLine(notFound, 'out-err');
    } else {
      const result = handler();
      if (Array.isArray(result)) result.forEach(line => printLine(line));
    }
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  if (termInput && termOutput) {
    printLine(translations[currentLang].terminal.welcome);

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = termInput.value;
        runCommand(value);
        if (value.trim()) {
          history.push(value);
          historyIndex = history.length;
        }
        termInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex -= 1;
          termInput.value = history[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < history.length - 1) {
          historyIndex += 1;
          termInput.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          termInput.value = '';
        }
        e.preventDefault();
      }
    });
  }

});
