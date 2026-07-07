// ============ HERO BOOT SEQUENCE ============
(function bootSequence(){
  const bootLog = document.getElementById('bootLog');
  if (!bootLog) return; // not on this page

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { text: ' GioTux booting...', ok:false },
    { text: ' Mounting filesystem... OK', ok:true },
    { text: ' Loading drivers... OK', ok:true },
    { text: ' Starting shell...', ok:false },
    { text: ' Adding custom theme...', ok:false },
  ];

  const reveal = (el) => requestAnimationFrame(() => el.classList.add('show'));

  function showAll(){
    lines.forEach(l => {
      const p = document.createElement('p');
      p.className = 'line show' + (l.ok ? ' ok' : '');
      p.textContent = l.text;
      bootLog.appendChild(p);
    });
    finishBoot();
  }

  function finishBoot(){
    const isMobile = window.matchMedia('(max-width:560px)').matches;
    reveal(document.getElementById(isMobile ? 'asciiLogoMobile' : 'asciiLogo'));
    reveal(document.getElementById('versionLine'));
    reveal(document.getElementById('heroTagline'));
    reveal(document.getElementById('heroSub'));
    reveal(document.getElementById('heroCtas'));
  }

  if (reduceMotion){
    showAll();
    return;
  }

  let delay = 150;
  lines.forEach((l, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = 'line' + (l.ok ? ' ok' : '');
      p.textContent = l.text;
      bootLog.appendChild(p);
      reveal(p);
      if (i === lines.length - 1){
        setTimeout(finishBoot, 380);
      }
    }, delay);
    delay += 380;
  });
})();


// ============ INTERACTIVE DEMO TERMINAL ============
(function demoTerminal(){
  const form = document.getElementById('demoForm');
  if (!form) return; // not on this page

  const input = document.getElementById('demoInput');
  const body = document.getElementById('demoBody');

  const fortunes = [
    "You will fix a bug only to create two more.",
    "A wild segfault appears. It's super effective.",
    "rm -rf is not a personality trait, but it could be yours.",
    "Your code compiles today. Trust nothing.",
    "Somewhere, a server is on fire over a missing semicolon.",
    "GioTux predicts: you will open 47 tabs and close none.",
    "The cake is a batch file.",
    "404: Motivation not found.",
    "sudo make me a sandwich. It refused.",
    "Your next commit message will just say 'fix stuff'."
  ];

  function printLine(text, cls){
    const p = document.createElement('p');
    p.className = 'out' + (cls ? ' ' + cls : '');
    p.textContent = text;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }

  function printEcho(cmd){
    const p = document.createElement('p');
    p.className = 'out';
    p.innerHTML = '<span style="color:var(--green)">::GTX::></span> ' + cmd;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }

  function cowsay(text){
    const msg = text || 'Moo. Type something next time.';
    const art =
` ${msg}
  --------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
    printLine(art);
  }

  function handle(raw){
    const trimmed = raw.trim();
    if (!trimmed) return;
    printEcho(trimmed);

    const [cmdRaw, ...rest] = trimmed.split(' ');
    const cmd = cmdRaw.toLowerCase();
    const args = rest.join(' ');

    switch (cmd){
      case 'help':
        printLine('Available in this preview:', 'dim');
        printLine('  help                 this list');
        printLine('  ls                   list a fake directory');
        printLine('  whoami               who you are, allegedly');
        printLine('  fortune              a random developer fortune');
        printLine('  cowsay [text]        a cow says your text');
        printLine('  ginfo                a peek at the real system panel');
        printLine('  clear                clear this preview');
        printLine('  download             jump to the download section');
        break;
      case 'ls':
      case 'list':
      case 'dir':
        printLine('Documents   Downloads   Desktop   giotux_admin.json   projects\\', 'dim');
        break;
      case 'whoami':
        printLine('a person checking out GioTux before installing it. respect.', 'dim');
        break;
      case 'fortune':
        printLine(' ' + fortunes[Math.floor(Math.random() * fortunes.length)]);
        break;
      case 'cowsay':
        cowsay(args);
        break;
      case 'ginfo':
        printLine('Full ginfo runs full-screen on the real thing — OS, CPU, GPU,', 'dim');
        printLine('memory, uptime, and a live ANSI color test. Install to see it.', 'dim');
        break;
      case 'sudo':
        printLine('gio: sudo what? you have no power here. (this is a browser tab)', 'amber');
        break;
      case 'clear':
      case 'cls':
        body.innerHTML = '';
        break;
      case 'download':
        printLine('Opening the download section...', 'dim');
        setTimeout(() => {
          const el = document.getElementById('download');
          if (el) el.scrollIntoView({ behavior: reducedMotionOK() ? 'auto' : 'smooth' });
        }, 200);
        break;
      case 'exit':
        printLine('gio: nothing to exit — you\'re just scrolling a webpage.', 'dim');
        break;
      default:
        printLine('gio: command not found: ' + cmdRaw, 'err');
    }
  }

  function reducedMotionOK(){
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = '';
    handle(val);
  });
})();
