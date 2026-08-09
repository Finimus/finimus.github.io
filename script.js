/* ==========================================================================
   FINIMUS portfolio — behavior
   Sections: config, footer year, nav, scroll-spy (nav + trace rail),
   reveal-on-scroll, hero boot sequence, subtle glitch, contact form,
   interactive terminal.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     EDITABLE PROJECT DATA
     Add/update project cards here, or just edit the markup directly in
     the #projects section of index.html — either works. This array is
     kept for anyone who wants to render cards from data instead.
     --------------------------------------------------------------------- */
  const PROJECTS_DATA = [
    { num: '01', title: 'Cybersecurity Lab', desc: 'A personal lab environment for practicing ethical hacking, CTF challenges, and defensive security concepts.', tags: ['Linux', 'CTF', 'Networking'], link: '#' },
    { num: '02', title: 'AI Experiments', desc: 'Small projects exploring generative AI, prompt engineering, and practical automation.', tags: ['Generative AI', 'Automation', 'Prompting'], link: '#' },
    { num: '03', title: 'Linux Lab', desc: 'Experiments with Linux distributions, shell scripting, and system configuration.', tags: ['Linux', 'Shell', 'Sysadmin'], link: '#' },
    { num: '04', title: 'Networking', desc: 'Projects centered on networks, routers, DNS, and small infrastructure setups.', tags: ['DNS', 'Routing', 'Infrastructure'], link: '#' },
  ];
  // (Left unused by default since the cards are already in index.html —
  // swap in a render loop here if you'd rather manage projects from data.)

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
    '.about-grid', '.skills-grid', '.projects-grid', '.cyber-grid',
    '.ai-grid', '.github-panel', '.contact-grid', '.section-title', '.section-lead'
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
     Hero boot sequence
     --------------------------------------------------------------------- */
  const bootBody = document.getElementById('bootBody');
  const BOOT_LINES = [
    { text: 'initializing system...', ok: false },
    { text: 'loading profile...', ok: false },
    { text: 'checking skills...', ok: false },
    { text: 'establishing secure connection...', ok: false },
    { text: 'access granted.', ok: true },
  ];

  function runBootSequence() {
    if (!bootBody) return;
    bootBody.innerHTML = '';
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stepDelay = prefersReduced ? 0 : 380;

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 'boot-line' + (line.ok ? ' ok' : '');
        div.textContent = (line.ok ? '✓ ' : '› ') + line.text;
        bootBody.appendChild(div);

        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            const prompt = document.createElement('div');
            prompt.className = 'boot-line ok';
            prompt.innerHTML = '<span class="prompt">FINIMUS@PORTFOLIO:~$</span> <span class="term-caret">▌</span>';
            bootBody.appendChild(prompt);
          }, stepDelay);
        }
      }, i * stepDelay);
    });
  }
  runBootSequence();

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
     Contact form (visual only — no backend wired up)
     --------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      if (formNote) {
        formNote.textContent = 'No backend is connected yet, so nothing was actually sent. Wire this form up to Formspree, EmailJS, or your own endpoint in script.js to make it live.';
        formNote.style.color = 'var(--amber)';
      }
      contactForm.reset();
    });
  }

  /* ---------------------------------------------------------------------
     Interactive terminal
     --------------------------------------------------------------------- */
  const termOutput = document.getElementById('termOutput');
  const termInput = document.getElementById('termInput');
  const history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => [
      'Available commands:',
      '  about      — who this site belongs to',
      '  skills     — programming, security, AI, tech',
      '  projects   — a list of things I\'ve built',
      '  contact    — how to reach me',
      '  github     — link to my GitHub profile',
      '  whoami     — short identity check',
      '  clear      — clear this terminal',
    ],
    whoami: () => ['finimus — IT student · cybersecurity · AI · programming'],
    about: () => [
      'Finimus — IT student passionate about technology,',
      'cybersecurity and AI. Learning by building, breaking,',
      'and understanding why things work.',
      '(Full story in the /about section above.)',
    ],
    skills: () => [
      'Programming   : C++, Python, JavaScript, HTML/CSS',
      'Cybersecurity : Linux, Networking, CTF, Web Security',
      'AI            : Generative AI, Prompt Engineering, Local AI',
      'Technology    : Git/GitHub, Linux, Windows, Hardware',
    ],
    projects: () => [
      '01 Cybersecurity Lab — ethical hacking & CTF practice',
      '02 AI Experiments    — generative AI & automation',
      '03 Linux Lab          — distros, shell, configuration',
      '04 Networking         — routers, DNS, infrastructure',
      'Scroll to /projects to view details.',
    ],
    contact: () => [
      'GitHub  : github.com/Finimus',
      'Email   : contact@example.com',
      'Or just scroll down to /contact and use the form.',
    ],
    github: () => {
      window.open('https://github.com/Finimus', '_blank', 'noopener,noreferrer');
      return ['Opening github.com/Finimus ...'];
    },
    sudo: () => ['Permission denied: nice try though.'],
    ls: () => ['about  skills  projects  cybersecurity  ai  github  contact'],
    clear: () => { termOutput.innerHTML = ''; return null; },
  };

  function printLine(text, cls) {
    const div = document.createElement('div');
    div.className = 'out-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    termOutput.appendChild(div);
  }

  function printWelcome() {
    printLine('Type "help" to see available commands.');
  }

  function runCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) return;

    const echo = document.createElement('div');
    echo.className = 'out-line out-cmd';
    echo.textContent = cmd;
    termOutput.appendChild(echo);

    const handler = COMMANDS[cmd.toLowerCase()];
    if (!handler) {
      printLine(`command not found: ${cmd} (try "help")`, 'out-err');
    } else {
      const result = handler();
      if (Array.isArray(result)) result.forEach(line => printLine(line));
    }
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  if (termInput) {
    printWelcome();

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
