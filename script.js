/**
 * ==========================================================================
 * ROMANTIC CINEMATIC BIRTHDAY SURPRISE - CORE ENGINE
 * Interactive story, mini-games, audio fallback, particles & celebrations
 * ==========================================================================
 */

/* ==========================================================================
   1. USER CONFIGURATION
   Customize all names, dates, music, and quotes here!
   ========================================================================== */
const CONFIG = {
  name: "prasath",                    // Boyfriend's name or pet name
  sender: "Keerthi",                 // Your name
  birthdayDate: "Special Day",       // Birthday date or month
  cakeNickname: "YOU IDIOT",         // Nickname on cake cut: "HAPPY BIRTHDAY, [NICKNAME] ❤️😂"
  music: "assets/music.mp3",         // Background music file path (Enthaaraa Enthaaraa)
  finalMessage: "To the person who somehow became one of the most important chapters of my life.",
  finalQuote: "We met as children, lost each other somewhere along the way, found each other again… and somehow, after everything, you're still the hand I want to hold. ♾️❣️",
  closingSignOff: "Happy Birthday my sandakaara,rowdy,vennamavanaee. ❤️"
};

/* ==========================================================================
   2. GLOBAL STATE
   ========================================================================== */
const STATE = {
  currentScreen: 1,
  totalScreens: 8,
  musicStarted: false,
  isMuted: false,
  usingWebAudio: false,
  candleLit: false,
  candleBlown: false,
  cakeCut: false,
  yesDodgeAttempts: 0,
  maxYesDodges: 4,
  yesSurrendered: false,
  envelopeOpened: false,
  currentReason: 0,
  currentQuiz: 0,
  quizAnswered: false,
  fireworksActive: false
};

/* ==========================================================================
   3. DATA: 25 LITTLE REASONS WHY I LOVE YOU
   ========================================================================== */
const REASONS_DATA = [
  {
    title: "The little ‘Saptiya?’",
    text: "Because somehow, a simple ‘Saptiya?’ from you became one of my favourite forms of care. but sometimes nan antha msg ku reply ae pannamaten ...",
    special: null
  },
  {
    title: "Enna sapta?",
    text: "Because apparently knowing whether I've eaten isn't enough… you also need the full menu and the word \"enakuu\". 😂",
    special: null
  },
  {
    title: "Enna panra?",
    text: "Three simple words.<br><br>But somehow, seeing them from you can instantly make my day better.",
    special: null
  },
  {
    title: "Enga iruka?",
    text: "Because apparently Google Maps isn't enough.<br><br>You need to know where I am too..nan enga poren enna panremu ne therunchuka nenaipa ...but nan sollama engyachum pona naalum undu ...sometimes nan ethuku sollanum nu irupen ..but still u say \"unaku enna thonutho pannu \" antha word😂❤️",
    special: null
  },
  {
    title: "Your notifications",
    text: "Even the most random notification from you can change my entire mood...nan un msg lam paakamaten nu ne neniapa ...but apdila athu secret ...",
    special: "notif"
  },
  {
    title: "Even on the no-call days",
    text: "There were days with no calls.<br><br>No meetings.<br><br>No seeing each other.<br><br>But somehow… you were still there.",
    special: null
  },
  {
    title: "You still held my hand.",
    text: "After every fight, every misunderstanding, every ‘seri mudinjiduchu.. breakup pannikalam ' moment…<br><br>somehow, you still held my hand.",
    special: "hands"
  },
  {
    title: "You know how i annoy you...",
    text: "avlo irritate paniruken kova paduthiruken ....<br><br>Honestly, nobody has mastered this skill quite like me ....😂",
    special: null
  },
  {
    title: "And somehow…",
    text: "You're also the person I want to talk to after getting sandafying with you.",
    special: null
  },
  {
    title: "Our fights",
    text: "No matter how many times we fought or said it's over...",
    special: "counter"
  },
  {
    title: "You've seen my angry side...",
    text: "And somehow you didn't run away....late nights ah irunthalum atha pesi anikae solve pannanum nenaipa ...but nan atha vidamatenu unaku therunchum ...u handle the way of samalifying ...",
    special: null
  },
  {
    title: "You've seen my childish side.",
    text: "And somehow… you survived that too. 😂",
    special: null
  },
  {
    title: "The little things you remember.....",
    text: "You remember things ..... but nan maranthrupen ....",
    special: null
  },
  {
    title: "One message can change my mood.",
    text: "Sometimes I don't need a long conversation......even ur dialogues ....romba perusa lam enaku dialogues vendam<br><br>Just one message from you is enough....like madam ,hey,THANGOW.,monae, inga paru ...Thats enough",
    special: null
  },
  {
    title: "The way u handle me.....",
    text: "Unaku nan epdi nu theriyum ......but last ah oru call la ellathyum i forgot everything what u actually did",
    special: null
  },
  {
    title: "I can be myself.",
    text: "With you, I don't always have to pretend to have everything figured out....nan nana irukura place nee than ...ellarum hurt panuvanga accept panipen ...pudikalenalum kaatikamaten ..but enaku pudikalena staright ah solra place ...nan ipdithan apdi nu solra place um ne tha",
    special: null
  },
  {
    title: "Even our silence.",
    text: "Even when there's nothing to say, somehow your presence still feels familiar....nan silent ah 6 months vara unkita pesama irunthruken ...but u still love my silence also and give me some space when i want",
    special: null
  },
  {
    title: "You know my ‘onnum illa,mm,ok ,’",
    text: "Because you know that when I say ‘onnum illa’…<br><br>there is probably definitely something...ivaluku etho aayiruchu nu antha single reply la u found me.. battle is ready nu 😂",
    special: null
  },
  {
    title: "After every fight…",
    text: "No matter how angry I get, there is still a tiny part of me waiting for your next message...not only ur message ...for ur reaction poriya ilaya nu",
    special: null
  },
  {
    title: "Our story.",
    text: "It isn't perfect....ella lovers mathri namma ila<br><br>It isn't always easy.<br><br>But it's ours.",
    special: null
  },
  {
    title: "We found each other again and again ...",
    text: "We lost touch everytime we sanda podrapo.<br><br>And somehow life brought us back to each other....definetely thirupi varathu nan ila ne tha ...",
    special: null
  },
  {
    title: "From those little kids…",
    text: "From 4th & 5th grade kids…enaku apo thrlla<br><br>to whatever this beautiful, chaotic thing called ‘us’ is now....but now both are waiting for the day we became together with holding hands and rendu perum senthu \"enthaara song\" kekra antha moment...",
    special: null
  },
  {
    title: "You're part of my everyday.",
    text: "From ‘Saptiya?’ to ‘Enga iruka?’…<br><br>the smallest conversations became part of my everyday life.",
    special: null
  },
  {
    title: "Still the hand I want to hold.",
    text: "After everything we've been through…<br><br>you're still the hand I want to hold. ♾️",
    special: null
  },
  {
    title: "Because it's you....ur love ...enna analum keerthi than nu vanthu nikra antha love ... ❤️",
    text: "Maybe I could write 25 reasons.<br><br>Maybe I could write 100.<br><br>But at the end of every reason…<br><br>it still comes back to the same answer.<br><br><strong style=\"font-size: 1.5rem; color: #ffbe0b; display: block; margin: 10px 0;\">You.</strong><div class=\"reason-25-bday-tag\">Happy 25th Birthday ...❤️</div>",
    special: "climax"
  }
];

/* ==========================================================================
   4. DATA: QUESTION SESSION (7 QUESTIONS)
   ========================================================================== */
const QUIZ_DATA = [
  {
    num: "QUESTION 1 / 7",
    category: "Truth Time 👀",
    question: "When did you first realise that you were actually crazy about me?",
    options: [
      { letter: "A", text: "ithuku enna solrtahu ... 😌", reaction: "Hmm… noted. 👀❤️" },
      { letter: "B", text: "I don't remember… 👀", reaction: "Hmm… noted. 👀❤️" },
      { letter: "C", text: "I'm still figuring it out 😂", reaction: "Hmm… noted. 👀❤️" }
    ]
  },
  {
    num: "QUESTION 2 / 7",
    category: "Who Did It? 😂",
    question: "Who usually starts the fight? 😂",
    options: [
      { letter: "A", text: "Me", reaction: "Haha honest confession accepted! 😂❤️" },
      { letter: "B", text: "You", reaction: "Parraaa… neengalae othukiteengala! 😜" },
      { letter: "C", text: "We both know the answer is “it depends” 😌", reaction: "Haha safe play! It always depends on who is more hungrier 😂❤️" }
    ]
  },
  {
    num: "QUESTION 3 / 7",
    category: "Feelings Check 🥹",
    question: "What's the one thing you miss most when we don't meet?",
    options: [
      { letter: "A", text: "Talking to you", reaction: "Awww... calls never feel long enough 📞❤️" },
      { letter: "B", text: "Seeing you", reaction: "My eyes miss your smiling face too 👀✨" },
      { letter: "C", text: "Annoying you", reaction: "Nobody annoys me better than you 😂❤️" },
      { letter: "D", text: "Everything ❤️", reaction: "Awww... my heart just melted completely 🥹❤️" }
    ]
  },
  {
    num: "QUESTION 4 / 7",
    category: "Time Travel ⏳",
    question: "If you could relive one moment with me, which would it be?",
    options: [
      { letter: "A", text: "One of our 4 th and 5 th days..", reaction: "Those innocent childhood days under the school trees 🧒🏻👦🏻" },
      { letter: "B", text: "The day we found each other again", reaction: "That magical day life brought us back together 📱✨" },
      { letter: "C", text: "Tvm polama ....", reaction: "Tvm trip kandippa polam! 🚗🌊" },
      { letter: "D", text: "I want a new memory instead ❤️", reaction: "Yes, countless new memories waiting for us ♾️❤️" }
    ]
  },
  {
    num: "QUESTION 5 / 7",
    category: "Forever Choice ♾️",
    question: "After everything we've been through…\nwould you still choose us?",
    options: [
      { letter: "A", text: "YES ❤️", reaction: "Good answer. ❤️" },
      { letter: "B", text: "Obviously 😌", reaction: "Good answer. ❤️" }
    ]
  },
  {
    num: "QUESTION 6 / 7",
    category: "Caught Red-Handed 📱",
    question: "Be honest…\nHow many times have you checked your phone waiting for my message? 😂",
    options: [
      { letter: "A", text: "chat la than vaazhuren", reaction: "Hahaha same here! 📱😂" },
      { letter: "B", text: "Sometimes", reaction: "Mmm sure... only sometimes ah? 😜" },
      { letter: "C", text: "Don't expose me like this 😂", reaction: "Caught you red-handed! 😂❤️" }
    ]
  },
  {
    num: "QUESTION 7 / 7",
    category: "Our Bond ❣️",
    question: "What's your favourite thing about us?",
    options: [
      { letter: "A", text: "Our conversations,calls.Video calls....", reaction: "Those never-ending talks mean the world to me 📞❤️" },
      { letter: "B", text: "Our fights and patch-ups 😂", reaction: "‘Seri mudinjiduchu’ to ‘I love you’ in 5 minutes 😂❤️" },
      { letter: "C", text: "Our memories", reaction: "Every little piece of us is golden ✨" },
      { letter: "D", text: "Just… us ❤️", reaction: "Just us... always namma. ♾️❤️" }
    ]
  }
];

/* ==========================================================================
   4. WEB AUDIO API SYNTHESIZER (ROMANTIC MUSIC BOX FALLBACK)
   Plays gentle, soothing arpeggios when assets/music.mp3 is unavailable
   ========================================================================== */
let audioCtx = null;
let synthInterval = null;

function initWebAudioSynth() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();
  } catch (e) {
    console.warn("Web Audio not supported", e);
  }
}

function playRomanticBell(freq, time, duration = 2.2) {
  if (!audioCtx || STATE.isMuted) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Warm chime timbre
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);

  // Gentle bell envelope
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(0.12, time + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + duration);
}

function startWebAudioMelody() {
  if (!audioCtx) initWebAudioSynth();
  if (!audioCtx) return;

  STATE.usingWebAudio = true;

  // Gentle romantic music box progression (C - Am - F - G)
  const notes = [
    523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
    440.00, 523.25, 659.25, 880.00,  // A4, C5, E5, A5
    349.23, 440.00, 523.25, 698.46,  // F4, A4, C5, F5
    392.00, 493.88, 587.33, 783.99   // G4, B4, D5, G5
  ];

  let step = 0;
  clearInterval(synthInterval);

  synthInterval = setInterval(() => {
    if (!STATE.isMuted && audioCtx) {
      const now = audioCtx.currentTime;
      playRomanticBell(notes[step % notes.length], now, 2.0);
      step++;
    }
  }, 450);
}

/* ==========================================================================
   5. AUDIO CONTROLLER
   ========================================================================== */
const bgAudio = document.getElementById("bg-audio");
const musicToggle = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
const musicLabel = document.getElementById("music-label");

function startMusic() {
  if (STATE.musicStarted) return;
  STATE.musicStarted = true;

  if (bgAudio) {
    bgAudio.src = CONFIG.music;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateMusicUI(true);
        })
        .catch(() => {
          // File missing or blocked, start romantic Web Audio generator
          startWebAudioMelody();
          updateMusicUI(true);
        });
    }
  } else {
    startWebAudioMelody();
    updateMusicUI(true);
  }
}

function toggleMusic() {
  STATE.isMuted = !STATE.isMuted;
  if (STATE.isMuted) {
    if (bgAudio) bgAudio.pause();
    updateMusicUI(false);
  } else {
    if (!STATE.musicStarted) {
      startMusic();
    } else {
      if (STATE.usingWebAudio) {
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      } else if (bgAudio) {
        bgAudio.play().catch(() => startWebAudioMelody());
      }
      updateMusicUI(true);
    }
  }
}

function updateMusicUI(isPlaying) {
  if (isPlaying && !STATE.isMuted) {
    musicToggle.classList.remove("muted");
    musicIcon.textContent = "🔊";
    musicLabel.textContent = "Music";
  } else {
    musicToggle.classList.add("muted");
    musicIcon.textContent = "🔇";
    musicLabel.textContent = "Muted";
  }
}

if (musicToggle) {
  musicToggle.addEventListener("click", toggleMusic);
}

/* ==========================================================================
   6. CANVAS 1: AMBIENT PARTICLES & FLOATING HEARTS
   ========================================================================== */
const ambCanvas = document.getElementById("ambient-canvas");
const ambCtx = ambCanvas ? ambCanvas.getContext("2d") : null;

let stars = [];
let ambientHearts = [];

function resizeAmbCanvas() {
  if (!ambCanvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  ambCanvas.width = window.innerWidth * dpr;
  ambCanvas.height = window.innerHeight * dpr;
  ambCtx.scale(dpr, dpr);
  initStars();
}

function initStars() {
  stars = [];
  const count = Math.floor((window.innerWidth * window.innerHeight) / 3800);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function addAmbientHeart() {
  if (ambientHearts.length > 25) return;
  ambientHearts.push({
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 20,
    size: Math.random() * 14 + 10,
    speedY: Math.random() * 0.8 + 0.4,
    speedX: (Math.random() - 0.5) * 0.6,
    alpha: Math.random() * 0.5 + 0.3,
    wobble: Math.random() * 10,
    color: Math.random() > 0.4 ? "rgba(255, 77, 121, " : "rgba(255, 180, 200, "
  });
}

function drawHeartShape(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
  ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.25);
  ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
  ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function renderAmbient() {
  if (!ambCtx) return;
  ambCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Draw twinkling stars
  const now = Date.now() * 0.002;
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    const twinkle = Math.sin(now * s.speed * 10 + s.phase) * 0.35 + 0.65;
    ambCtx.fillStyle = `rgba(255, 235, 245, ${s.alpha * twinkle})`;
    ambCtx.beginPath();
    ambCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ambCtx.fill();
  }

  // Draw floating hearts
  if (Math.random() < 0.035) addAmbientHeart();

  for (let i = ambientHearts.length - 1; i >= 0; i--) {
    const h = ambientHearts[i];
    h.y -= h.speedY;
    h.x += Math.sin(h.y * 0.02 + h.wobble) * 0.5 + h.speedX;

    ambCtx.fillStyle = `${h.color}${h.alpha})`;
    drawHeartShape(ambCtx, h.x, h.y, h.size);

    if (h.y < -30) {
      ambientHearts.splice(i, 1);
    }
  }

  requestAnimationFrame(renderAmbient);
}

/* ==========================================================================
   7. CANVAS 2: CELEBRATION FX (CONFETTI, BURSTS, FIREWORKS)
   ========================================================================== */
const fxCanvas = document.getElementById("fx-canvas");
const fxCtx = fxCanvas ? fxCanvas.getContext("2d") : null;

let particles = [];
let fireworks = [];

function resizeFxCanvas() {
  if (!fxCanvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  fxCanvas.width = window.innerWidth * dpr;
  fxCanvas.height = window.innerHeight * dpr;
  fxCtx.scale(dpr, dpr);
}

function launchConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 2, count = 70) {
  const colors = ["#ff4d79", "#ffbe0b", "#ff70a6", "#70d6ff", "#ffd166", "#ffffff", "#ff006e"];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 11 + 3;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.22,
      drag: 0.96,
      alpha: 1,
      fade: Math.random() * 0.012 + 0.008,
      isHeart: Math.random() > 0.65
    });
  }
}

function launchHeartBurst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 35) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 2;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: Math.random() * 14 + 8,
      color: Math.random() > 0.3 ? "#ff3366" : "#ff9ebb",
      rotation: 0,
      rotSpeed: 0,
      gravity: 0.12,
      drag: 0.95,
      alpha: 1,
      fade: 0.015,
      isHeart: true
    });
  }
}

// Grand fireworks system for Screen 7
function launchFirework() {
  const sx = Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1;
  const targetY = Math.random() * (window.innerHeight * 0.4) + 60;
  fireworks.push({
    x: sx,
    y: window.innerHeight,
    targetY: targetY,
    speedY: - (Math.random() * 4 + 11),
    color: `hsl(${Math.random() * 60 + 330}, 100%, 65%)`
  });
}

function explodeFirework(x, y, color) {
  const count = 55;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 1.5;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 3.5 + 1.5,
      color: color,
      rotation: 0,
      rotSpeed: 0,
      gravity: 0.08,
      drag: 0.94,
      alpha: 1,
      fade: Math.random() * 0.015 + 0.01,
      isHeart: false
    });
  }
}

function renderFx() {
  if (!fxCtx) return;
  fxCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Manage firework rockets
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const fw = fireworks[i];
    fw.y += fw.speedY;

    // Trail
    fxCtx.fillStyle = fw.color;
    fxCtx.beginPath();
    fxCtx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
    fxCtx.fill();

    if (fw.y <= fw.targetY || fw.speedY >= 0) {
      explodeFirework(fw.x, fw.y, fw.color);
      fireworks.splice(i, 1);
    }
  }

  // Manage explosion/confetti particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= p.fade;
    p.rotation += p.rotSpeed;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    fxCtx.save();
    fxCtx.globalAlpha = Math.max(0, p.alpha);
    fxCtx.translate(p.x, p.y);
    fxCtx.rotate((p.rotation * Math.PI) / 180);

    if (p.isHeart) {
      fxCtx.fillStyle = p.color;
      drawHeartShape(fxCtx, 0, 0, p.size);
    } else {
      fxCtx.fillStyle = p.color;
      fxCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    }
    fxCtx.restore();
  }

  // Trigger continuous fireworks during Finale
  if (STATE.fireworksActive && Math.random() < 0.065) {
    launchFirework();
  }

  requestAnimationFrame(renderFx);
}

window.addEventListener("resize", () => {
  resizeAmbCanvas();
  resizeFxCanvas();
});

/* ==========================================================================
   8. SCREEN ROUTING & PROGRESSION
   ========================================================================= */
const stepNumEl = document.getElementById("step-num");

function showScreen(stepNumber) {
  const currentEl = document.querySelector(".screen.active");
  const nextEl = document.getElementById(`screen-${stepNumber}`);
  if (!nextEl) return;

  STATE.currentScreen = stepNumber;

  if (stepNumEl) {
    stepNumEl.textContent = String(stepNumber).padStart(2, "0");
  }

  if (currentEl) {
    currentEl.classList.add("fade-out");
    setTimeout(() => {
      currentEl.classList.remove("active", "fade-out");
      nextEl.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  } else {
    nextEl.classList.add("active");
  }
}

/* ==========================================================================
   9. SCREEN 1: ENTRANCE INTERACTION
   ========================================================================== */
const btnStart = document.getElementById("btn-start");
if (btnStart) {
  btnStart.addEventListener("click", (e) => {
    startMusic();
    const rect = btnStart.getBoundingClientRect();
    launchHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
    showScreen(2);
  });
}

/* ==========================================================================
   10. SCREEN 2: CANDLE LIGHTING & BLOWING SEQUENCE
   ========================================================================== */
const candleFlame = document.getElementById("candle-flame");
const warmthOverlay = document.getElementById("warmth-overlay");
const smokePuff = document.getElementById("smoke-puff");
const cakeMsg = document.getElementById("cake-msg");
const btnLightCandle = document.getElementById("btn-light-candle");
const btnBlowCandle = document.getElementById("btn-blow-candle");
const btnCutCake = document.getElementById("btn-cut-cake");

function lightCandle() {
  if (STATE.candleLit) return;
  STATE.candleLit = true;

  if (candleFlame) candleFlame.classList.add("lit");
  if (warmthOverlay) warmthOverlay.classList.add("warm");

  // Golden particle burst from candle
  const rect = candleFlame ? candleFlame.getBoundingClientRect() : { left: window.innerWidth / 2, top: 250 };
  launchConfetti(rect.left + 8, rect.top, 25);

  if (cakeMsg) {
    cakeMsg.textContent = "Okay… now make a really good wish.";
  }

  // Reveal 'Blow the candle' after brief delay
  setTimeout(() => {
    if (cakeMsg) cakeMsg.textContent = "Ready?";
    if (btnLightCandle) btnLightCandle.classList.add("hidden");
    if (btnBlowCandle) btnBlowCandle.classList.remove("hidden");
  }, 1800);
}

function blowCandle() {
  if (STATE.candleBlown) return;
  STATE.candleBlown = true;

  if (candleFlame) {
    candleFlame.classList.add("flicker-crazy");
  }

  setTimeout(() => {
    // Flame extinguishes & smoke rises
    if (candleFlame) {
      candleFlame.classList.remove("lit", "flicker-crazy");
    }
    if (smokePuff) {
      smokePuff.classList.add("rise");
    }

    // Playful prank: Candle relights for a second with confetti
    setTimeout(() => {
      if (candleFlame) candleFlame.classList.add("lit");
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 30);
      if (cakeMsg) cakeMsg.textContent = "Nice try 😂";

      // Final extinguishing and reveal cake cut button
      setTimeout(() => {
        if (candleFlame) candleFlame.classList.remove("lit");
        if (cakeMsg) cakeMsg.textContent = "Okay okay… cake time.";
        if (btnBlowCandle) btnBlowCandle.classList.add("hidden");
        if (btnCutCake) btnCutCake.classList.remove("hidden");
      }, 1500);

    }, 700);

  }, 450);
}

if (btnLightCandle) btnLightCandle.addEventListener("click", lightCandle);
if (btnBlowCandle) btnBlowCandle.addEventListener("click", blowCandle);
if (btnCutCake) {
  btnCutCake.addEventListener("click", () => {
    cutCake();
  });
}

/* ==========================================================================
   11. SCREEN 3: CAKE CUTTING ANIMATION
   ========================================================================== */
const cuttingKnife = document.getElementById("cutting-knife");
const cakeLeft = document.getElementById("cake-left");
const cakeRight = document.getElementById("cake-right");
const btnToTrick = document.getElementById("btn-to-trick");

function cutCake() {
  if (STATE.cakeCut) return;
  STATE.cakeCut = true;

  // Animate knife descending
  if (cuttingKnife) {
    cuttingKnife.classList.add("animating");
  }

  // Slices separate smoothly midway through cut
  setTimeout(() => {
    if (cakeLeft) cakeLeft.classList.add("separated-left");
    if (cakeRight) cakeRight.classList.add("separated-right");

    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 60);
    launchHeartBurst(window.innerWidth / 2, window.innerHeight * 0.45, 30);

    // Transition smoothly to Screen 3 celebratory announcement
    setTimeout(() => {
      showScreen(3);
    }, 1100);

  }, 750);
}

if (btnToTrick) {
  btnToTrick.addEventListener("click", () => {
    showScreen(4);
    initDodgeGame();
  });
}

/* ==========================================================================
   12. SCREEN 4: THE TRICK QUESTION MINI-GAME (YES DODGING ENGINE)
   ========================================================================== */
const btnNo = document.getElementById("btn-no");
const btnYes = document.getElementById("btn-yes");
const trickFeedback = document.getElementById("trick-feedback");
const dodgeArea = document.getElementById("dodge-area");
const flashOverlay = document.getElementById("flash-overlay");

function initDodgeGame() {
  STATE.yesDodgeAttempts = 0;
  STATE.yesSurrendered = false;
  if (btnYes) {
    btnYes.classList.remove("surrendered");
    btnYes.style.position = "";
    btnYes.style.left = "";
    btnYes.style.top = "";
    btnYes.style.transform = "";
    btnYes.innerHTML = "YES ❤️";
  }
  if (trickFeedback) trickFeedback.textContent = "";
}

// NO button shake behavior
if (btnNo) {
  btnNo.addEventListener("click", () => {
    btnNo.classList.remove("shake-animate");
    void btnNo.offsetWidth; // Re-trigger CSS animation
    btnNo.classList.add("shake-animate");

    if (trickFeedback) {
      trickFeedback.textContent = "Nice try.";
      setTimeout(() => {
        trickFeedback.textContent = "Wrong answer. Try again 😂";
      }, 700);
    }
  });
}

// Dynamic dodging algorithm that clamps strictly inside visible viewport
function dodgeYesButton(e) {
  if (STATE.yesSurrendered) return;

  if (e) {
    e.preventDefault();
  }

  STATE.yesDodgeAttempts++;

  const feedbackPhrases = [
    "Hey! 😂",
    "Too slow! 😜",
    "Almost got it! 😏",
    "Can't catch me! 🏃💨"
  ];

  if (trickFeedback) {
    trickFeedback.textContent = feedbackPhrases[(STATE.yesDodgeAttempts - 1) % feedbackPhrases.length];
  }

  // If user has attempted 4 times, stop dodging and let them win!
  if (STATE.yesDodgeAttempts >= STATE.maxYesDodges) {
    surrenderYesButton();
    return;
  }

  // Calculate safe bounding coordinates inside dodgeArea / viewport
  if (!dodgeArea || !btnYes) return;
  const areaRect = dodgeArea.getBoundingClientRect();
  const btnWidth = btnYes.offsetWidth || 120;
  const btnHeight = btnYes.offsetHeight || 50;

  // Safe boundaries relative to dodge area
  const padding = 12;
  const maxLeft = Math.max(10, areaRect.width - btnWidth - padding);
  const maxTop = Math.max(10, areaRect.height - btnHeight - padding);

  const randomLeft = Math.floor(Math.random() * maxLeft) + padding;
  const randomTop = Math.floor(Math.random() * maxTop) + padding;
  const randomRot = (Math.random() - 0.5) * 22; // -11deg to +11deg
  const randomScale = (Math.random() * 0.2 + 0.9).toFixed(2); // 0.90 to 1.10

  btnYes.classList.add("dodging");
  btnYes.style.position = "absolute";
  btnYes.style.left = `${randomLeft}px`;
  btnYes.style.top = `${randomTop}px`;
  btnYes.style.transform = `rotate(${randomRot}deg) scale(${randomScale})`;
}

function surrenderYesButton() {
  STATE.yesSurrendered = true;
  if (!btnYes) return;

  btnYes.classList.remove("dodging");
  btnYes.classList.add("surrendered");
  btnYes.style.position = "relative";
  btnYes.style.left = "auto";
  btnYes.style.top = "auto";
  btnYes.style.transform = "scale(1.08)";
  btnYes.innerHTML = "YES ❤️";

  if (trickFeedback) {
    trickFeedback.textContent = "Okay fine… you win 😂❤️";
  }
}

if (btnYes) {
  // Desktop pointer hover dodge
  btnYes.addEventListener("mouseenter", (e) => {
    if (!STATE.yesSurrendered) dodgeYesButton(e);
  });

  // Mobile touch dodge
  btnYes.addEventListener("touchstart", (e) => {
    if (!STATE.yesSurrendered) {
      e.preventDefault();
      dodgeYesButton(e);
    }
  }, { passive: false });

  // Victory click handler when surrendered
  btnYes.addEventListener("click", () => {
    if (!STATE.yesSurrendered) {
      dodgeYesButton();
      return;
    }

    // Victory celebration burst!
    launchHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
    launchConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);

    // Screen flash transition
    if (flashOverlay) {
      flashOverlay.classList.add("active");
      setTimeout(() => {
        flashOverlay.classList.remove("active");
      }, 350);
    }

    setTimeout(() => {
      showScreen(5);
    }, 600);
  });
}

/* ==========================================================================
   13. SCREEN 5: ENVELOPE / LOVE LETTER SEQUENCE
   ========================================================================== */
const envelopeWrapper = document.getElementById("envelope-wrapper");
const btnOpenEnvelope = document.getElementById("btn-open-envelope");
const expandedLetter = document.getElementById("expanded-letter");
const btnToStory = document.getElementById("btn-to-story");

function openEnvelope() {
  if (STATE.envelopeOpened) return;
  STATE.envelopeOpened = true;

  if (envelopeWrapper) {
    envelopeWrapper.classList.add("open");
  }

  // Mini heart puff as seal breaks
  launchHeartBurst(window.innerWidth / 2, window.innerHeight * 0.45, 20);

  // Expand letter modal
  setTimeout(() => {
    if (expandedLetter) {
      expandedLetter.classList.remove("hidden");
      void expandedLetter.offsetWidth;
      expandedLetter.classList.add("visible");
    }
  }, 750);
}

if (envelopeWrapper) envelopeWrapper.addEventListener("click", openEnvelope);
if (btnOpenEnvelope) btnOpenEnvelope.addEventListener("click", openEnvelope);

function goToReasons() {
  // reset reasons screen to its intro state
  clearReasonTimers();
  reasonLock = false;
  STATE.currentReason = 0;
  if (reasonsIntroCard) reasonsIntroCard.classList.remove("hidden", "card-exit");
  if (reasonDisplayCard) reasonDisplayCard.classList.add("hidden");
  showScreen(6);
}

if (btnToStory) {
  btnToStory.addEventListener("click", () => {
    if (expandedLetter) {
      expandedLetter.classList.remove("visible");
      setTimeout(() => {
        expandedLetter.classList.add("hidden");
        goToReasons();
      }, 300);
    } else {
      goToReasons();
    }
  });
}

/* ==========================================================================
   14. SCREEN 6: 25 LITTLE REASONS WHY I LOVE YOU
   One reason at a time, cinematic transitions, special widgets, slow climax
   ========================================================================== */
const reasonsIntroCard = document.getElementById("reasons-intro-card");
const reasonDisplayCard = document.getElementById("reason-display-card");
const btnStartReasons = document.getElementById("btn-start-reasons");
const btnNextReason = document.getElementById("btn-next-reason");
const reasonCounterEl = document.getElementById("reason-counter");
const reasonTitleEl = document.getElementById("reason-title");
const reasonTextEl = document.getElementById("reason-text");
const reasonSlotEl = document.getElementById("reason-slot");
const reasonBodyWrap = document.getElementById("reason-body-wrap");
const reasonProgressFill = document.getElementById("reason-progress-fill");

let reasonLock = false;
let reasonTimers = [];
let reasonIntervals = [];

function pad2(n) { return String(n).padStart(2, "0"); }
function rTimeout(fn, ms) { const t = setTimeout(fn, ms); reasonTimers.push(t); return t; }
function clearReasonTimers() {
  reasonTimers.forEach(clearTimeout);
  reasonIntervals.forEach(clearInterval);
  reasonTimers = [];
  reasonIntervals = [];
}

function removeClimaxSky() {
  const sky = reasonDisplayCard ? reasonDisplayCard.querySelector(".climax-sky") : null;
  if (sky) sky.remove();
}

function buildClimaxSky() {
  removeClimaxSky();
  const sky = document.createElement("div");
  sky.className = "climax-sky";
  sky.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("span");
    s.className = "cstar";
    const size = Math.random() * 2.6 + 0.8;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
      `animation-delay:${(Math.random() * 5).toFixed(2)}s;animation-duration:${(Math.random() * 3 + 3).toFixed(2)}s;`;
    sky.appendChild(s);
  }
  for (let i = 0; i < 16; i++) {
    const g = document.createElement("span");
    g.className = "cglow";
    const size = Math.random() * 14 + 8;
    g.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
      `animation-delay:${(Math.random() * 9).toFixed(2)}s;animation-duration:${(Math.random() * 8 + 10).toFixed(2)}s;`;
    sky.appendChild(g);
  }
  reasonDisplayCard.insertBefore(sky, reasonDisplayCard.firstChild);
}

/* ----- Special widgets ----- */
function buildNotifWidget() {
  const msgs = [
    { text: "Saptiya? 🍽️", delay: 500 },
    { text: "Enna panra? 👀", delay: 1700 },
    { text: "Enga iruka? 📍", delay: 2900 }
  ];
  const wrap = document.createElement("div");
  wrap.className = "notif-stack";
  reasonSlotEl.appendChild(wrap);
  const sender = CONFIG.sender || "Keerthi";
  msgs.forEach((m) => {
    rTimeout(() => {
      const n = document.createElement("div");
      n.className = "phone-notification-mockup notif-buzz";
      n.innerHTML = `
        <div class="notif-avatar">${sender.charAt(0).toUpperCase()}</div>
        <div class="notif-details">
          <div class="notif-header-row"><span class="notif-sender">${sender} ❤️</span><span>now</span></div>
          <div class="notif-preview">${m.text}</div>
        </div>`;
      wrap.insertBefore(n, wrap.firstChild);
      if (navigator.vibrate) { try { navigator.vibrate(25); } catch (e) { /* ignore */ } }
    }, m.delay);
  });
}

function buildHandsWidget() {
  const wrap = document.createElement("div");
  wrap.className = "hands-join-wrap";
  wrap.innerHTML = `
    <span class="hand-icon hand-left">🫱</span>
    <span class="hand-icon hand-right">🫲</span>
    <span class="hands-sparkle-center">✨</span>`;
  reasonSlotEl.appendChild(wrap);
  rTimeout(() => wrap.classList.add("hands-joined"), 700);
}

function buildCounterWidget() {
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="fights-counter-grid">
      <div class="counter-box"><div class="counter-num" data-c>0</div><div class="counter-lbl">Fights</div></div>
      <div class="counter-box"><div class="counter-num" data-c>0</div><div class="counter-lbl">“Seri mudinjiduchu”</div></div>
      <div class="counter-box"><div class="counter-num" data-c>0</div><div class="counter-lbl">Patch-ups</div></div>
    </div>
    <div class="counter-us-final" style="opacity:0">And somehow… us: still here. ❤️</div>`;
  reasonSlotEl.appendChild(wrap);
  const nums = wrap.querySelectorAll("[data-c]");
  const speeds = [1, 1.6, 2.3];
  let tick = 0;
  const iv = setInterval(() => {
    tick++;
    nums.forEach((el, i) => { el.textContent = Math.floor(tick * speeds[i] * tick * 0.35); });
  }, 55);
  reasonIntervals.push(iv);
  rTimeout(() => {
    clearInterval(iv);
    nums.forEach((el, i) => {
      rTimeout(() => {
        el.textContent = "♾️";
        el.style.transform = "scale(1.3)";
        el.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
        setTimeout(() => { el.style.transform = "scale(1)"; }, 350);
      }, i * 350);
    });
    rTimeout(() => {
      const fin = wrap.querySelector(".counter-us-final");
      fin.style.transition = "opacity 1s ease";
      fin.style.opacity = "1";
    }, 1500);
  }, 1900);
}

/* ----- Render a single reason ----- */
function renderReason(idx) {
  clearReasonTimers();
  STATE.currentReason = idx;
  const data = REASONS_DATA[idx];
  const isClimax = data.special === "climax";

  reasonCounterEl.textContent = `${pad2(idx + 1)} / ${REASONS_DATA.length}`;
  reasonTitleEl.textContent = data.title;
  reasonTextEl.innerHTML = data.text;
  reasonSlotEl.innerHTML = "";
  reasonProgressFill.style.width = `${((idx + 1) / REASONS_DATA.length) * 100}%`;

  reasonDisplayCard.classList.toggle("reason-25-card", isClimax);
  reasonBodyWrap.classList.toggle("climax-slow", isClimax);
  if (isClimax) buildClimaxSky(); else removeClimaxSky();

  // Cinematic entrance (restart CSS animation)
  reasonBodyWrap.classList.remove("reason-leave", "reason-enter");
  void reasonBodyWrap.offsetWidth;
  reasonBodyWrap.classList.add("reason-enter");

  if (data.special === "notif") buildNotifWidget();
  if (data.special === "hands") buildHandsWidget();
  if (data.special === "counter") buildCounterWidget();

  if (isClimax) {
    btnNextReason.textContent = "But wait… I have questions for you. 👀";
    btnNextReason.classList.add("climax-btn", "hidden");
    reasonDisplayCard.classList.add("climax-mode");
    // Gentle golden sparkle as the big reason lands
    rTimeout(() => launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 28), 3600);
    rTimeout(() => btnNextReason.classList.remove("hidden"), 8600);
  } else {
    btnNextReason.textContent = "Next reason →";
    btnNextReason.classList.remove("climax-btn", "hidden");
    reasonDisplayCard.classList.remove("climax-mode");
  }
}

function startReasons() {
  if (!reasonsIntroCard || !reasonDisplayCard) return;
  reasonsIntroCard.classList.add("card-exit");
  setTimeout(() => {
    reasonsIntroCard.classList.add("hidden");
    reasonsIntroCard.classList.remove("card-exit");
    reasonDisplayCard.classList.remove("hidden");
    renderReason(0);
    reasonLock = false;
  }, 450);
}

function nextReason() {
  if (reasonLock) return;
  if (STATE.currentReason >= REASONS_DATA.length - 1) { goToQuestionSession(); return; }
  reasonLock = true;
  launchHeartBurst(
    btnNextReason.getBoundingClientRect().left + btnNextReason.offsetWidth / 2,
    btnNextReason.getBoundingClientRect().top,
    6
  );
  reasonBodyWrap.classList.remove("reason-enter");
  reasonBodyWrap.classList.add("reason-leave");
  setTimeout(() => {
    renderReason(STATE.currentReason + 1);
    reasonLock = false;
  }, 480);
}

if (btnStartReasons) btnStartReasons.addEventListener("click", startReasons);
if (btnNextReason) btnNextReason.addEventListener("click", nextReason);

/* ==========================================================================
   14b. SCREEN 6 -> 7: PLAYFUL TRANSITION INTO THE QUESTION SESSION
   ========================================================================== */
function goToQuestionSession() {
  if (reasonLock) return;
  reasonLock = true;
  // Playful burst: confetti + hearts, quick colour flash, then swap screens
  launchConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 90);
  launchHeartBurst(window.innerWidth / 2, window.innerHeight * 0.6, 24);
  if (flashOverlay) {
    flashOverlay.style.background = "#ffe6a8";
    flashOverlay.classList.add("active");
    setTimeout(() => flashOverlay.classList.remove("active"), 260);
    setTimeout(() => { flashOverlay.style.background = ""; }, 700);
  }
  resetQuizUI();
  setTimeout(() => {
    showScreen(7);
    if (quizIntroCard) {
      quizIntroCard.classList.remove("playful-in");
      void quizIntroCard.offsetWidth;
      quizIntroCard.classList.add("playful-in");
    }
    setTimeout(() => {
      // tidy up the reasons screen once it is out of view
      removeClimaxSky();
      reasonLock = false;
    }, 900);
  }, 420);
}

/* ==========================================================================
   15. SCREEN 7: QUESTION SESSION (7 QUESTIONS + FINAL EMOTIONAL QUESTION)
   Playful, chat/quiz-inspired
   ========================================================================== */
const quizIntroCard = document.getElementById("quiz-intro-card");
const quizActiveCard = document.getElementById("quiz-active-card");
const quizFinalCard = document.getElementById("quiz-final-card");
const btnStartQuiz = document.getElementById("btn-start-quiz");
const quizStepBadge = document.getElementById("quiz-step-badge");
const quizCategoryTag = document.getElementById("quiz-category-tag");
const quizProgressFill = document.getElementById("quiz-progress-fill");
const quizQuestionTitle = document.getElementById("quiz-question-title");
const quizOptionsGrid = document.getElementById("quiz-options-grid");
const quizToast = document.getElementById("quiz-reaction-toast");
const quizToastEmoji = document.getElementById("quiz-toast-emoji");
const quizToastMsg = document.getElementById("quiz-toast-msg");
const quizFooter = document.getElementById("quiz-footer");
const btnNextQuestion = document.getElementById("btn-next-question");
const quizTyping = document.getElementById("quiz-typing");
const finalQIntro = document.getElementById("final-q-intro");
const finalQContent = document.getElementById("final-q-content");
const finalQSuccess = document.getElementById("final-q-success");
const btnToFinale = document.getElementById("btn-to-finale");

let quizTimers = [];
function qTimeout(fn, ms) { const t = setTimeout(fn, ms); quizTimers.push(t); return t; }
function clearQuizTimers() { quizTimers.forEach(clearTimeout); quizTimers = []; }

const TOAST_EMOJIS = ["👀", "😂", "🥹", "⏳", "💞", "📱", "❣️"];

function resetQuizUI() {
  clearQuizTimers();
  STATE.currentQuiz = 0;
  STATE.quizAnswered = false;
  STATE.finalAnswered = false;
  document.body.classList.remove("final-mood");
  if (quizIntroCard) quizIntroCard.classList.remove("hidden", "card-exit");
  if (quizActiveCard) quizActiveCard.classList.add("hidden");
  if (quizFinalCard) quizFinalCard.classList.add("hidden");
  if (quizToast) quizToast.classList.add("hidden");
  if (quizFooter) quizFooter.classList.add("hidden");
  if (quizTyping) quizTyping.classList.add("hidden");
  if (quizOptionsGrid) quizOptionsGrid.innerHTML = "";
  if (finalQIntro) { finalQIntro.classList.remove("hidden"); finalQIntro.classList.remove("fading"); }
  if (finalQContent) finalQContent.classList.add("hidden");
  if (finalQSuccess) finalQSuccess.classList.add("hidden");
  document.querySelectorAll(".seq-item").forEach((el) => el.classList.remove("seq-show"));
  document.querySelectorAll(".heart-rain, .soft-glow").forEach((el) => el.remove());
}

function renderQuestion(idx) {
  const q = QUIZ_DATA[idx];
  STATE.currentQuiz = idx;
  STATE.quizAnswered = false;

  quizStepBadge.textContent = q.num;
  quizCategoryTag.textContent = q.category;
  quizProgressFill.style.width = `${((idx + 1) / QUIZ_DATA.length) * 100}%`;
  quizToast.classList.add("hidden");
  quizFooter.classList.add("hidden");
  quizOptionsGrid.innerHTML = "";
  quizQuestionTitle.innerHTML = "";
  quizQuestionTitle.classList.remove("bubble-in");
  btnNextQuestion.textContent = idx === QUIZ_DATA.length - 1 ? "One more thing… →" : "Next question →";

  // chat-style "typing…" beat, then the question bubble, then reply options
  quizTyping.classList.remove("hidden");
  quizActiveCard.classList.remove("q-leaving");
  quizActiveCard.classList.remove("q-entering");
  void quizActiveCard.offsetWidth;
  quizActiveCard.classList.add("q-entering");

  qTimeout(() => {
    quizTyping.classList.add("hidden");
    quizQuestionTitle.innerHTML = q.question.replace(/\n/g, "<br>");
    quizQuestionTitle.classList.add("bubble-in");
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-opt-btn";
      btn.style.animationDelay = `${0.12 + i * 0.1}s`;
      btn.innerHTML = `<span class="opt-letter">${opt.letter}</span><span class="opt-text"></span>`;
      btn.querySelector(".opt-text").textContent = opt.text;
      btn.addEventListener("click", () => answerQuestion(idx, i, btn));
      quizOptionsGrid.appendChild(btn);
    });
  }, 800);
}

function spawnHeartRain(count = 22, duration = 4200) {
  const layer = document.createElement("div");
  layer.className = "heart-rain";
  layer.setAttribute("aria-hidden", "true");
  const glyphs = ["💖", "💗", "❤️", "💕", "🩷"];
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.textContent = glyphs[i % glyphs.length];
    h.style.cssText = `left:${Math.random() * 96}%;font-size:${Math.random() * 20 + 18}px;` +
      `animation-delay:${(Math.random() * 1.6).toFixed(2)}s;animation-duration:${(Math.random() * 2 + 2.6).toFixed(2)}s;`;
    layer.appendChild(h);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), duration);
}

function answerQuestion(qIdx, optIdx, btn) {
  if (STATE.quizAnswered) return;
  STATE.quizAnswered = true;
  const q = QUIZ_DATA[qIdx];
  const opt = q.options[optIdx];

  // selected glows, others fade
  quizOptionsGrid.querySelectorAll(".quiz-opt-btn").forEach((b) => {
    if (b === btn) b.classList.add("selected"); else b.classList.add("faded");
  });

  // tiny heart + confetti pop from the chosen option
  const r = btn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  launchHeartBurst(cx, cy, 10);
  launchConfetti(cx, cy, 16);

  const showToast = (msg, emoji) => {
    quizToastEmoji.textContent = emoji;
    quizToastMsg.textContent = msg;
    quizToast.classList.remove("hidden");
    qTimeout(() => quizFooter.classList.remove("hidden"), 450);
  };

  if (qIdx === 4) {
    // Question 05: romantic heart animation, then "Good answer."
    const mx = window.innerWidth / 2;
    const my = window.innerHeight / 2;
    launchHeartBurst(mx, my, 60);
    qTimeout(() => launchHeartBurst(mx - 90, my + 40, 30), 250);
    qTimeout(() => launchHeartBurst(mx + 90, my + 40, 30), 450);
    spawnHeartRain(26, 4600);
    const big = document.createElement("div");
    big.className = "big-heart-overlay";
    big.textContent = "💖";
    document.body.appendChild(big);
    setTimeout(() => big.remove(), 2400);
    qTimeout(() => showToast("Good answer. ❤️", "💖"), 1500);
  } else {
    showToast(opt.reaction, TOAST_EMOJIS[qIdx % TOAST_EMOJIS.length]);
  }
}

function nextQuestion() {
  if (!STATE.quizAnswered) return;
  STATE.quizAnswered = false; // guard against double clicks while animating out
  quizActiveCard.classList.remove("q-entering");
  quizActiveCard.classList.add("q-leaving");
  qTimeout(() => {
    if (STATE.currentQuiz < QUIZ_DATA.length - 1) {
      renderQuestion(STATE.currentQuiz + 1);
    } else {
      startFinalQuestion();
    }
  }, 480);
}

function startQuiz() {
  if (!quizIntroCard) return;
  quizIntroCard.classList.add("card-exit");
  qTimeout(() => {
    quizIntroCard.classList.add("hidden");
    quizActiveCard.classList.remove("hidden");
    renderQuestion(0);
  }, 450);
}

if (btnStartQuiz) btnStartQuiz.addEventListener("click", startQuiz);
if (btnNextQuestion) btnNextQuestion.addEventListener("click", nextQuestion);

/* ----- FINAL EMOTIONAL QUESTION ----- */
function startFinalQuestion() {
  quizActiveCard.classList.add("hidden");
  quizActiveCard.classList.remove("q-leaving");
  quizFinalCard.classList.remove("hidden");
  finalQIntro.classList.remove("hidden", "fading");
  finalQContent.classList.add("hidden");
  finalQSuccess.classList.add("hidden");
  document.body.classList.add("final-mood");

  // "One last question…" -> long pause -> the question itself
  qTimeout(() => finalQIntro.classList.add("fading"), 2600);
  qTimeout(() => {
    finalQIntro.classList.add("hidden");
    finalQContent.classList.remove("hidden");
  }, 3500);
}

function revealSeq(el, delay) {
  if (!el) return;
  qTimeout(() => el.classList.add("seq-show"), delay);
}

function answerFinal(which) {
  if (STATE.finalAnswered) return;
  STATE.finalAnswered = true;

  const mx = window.innerWidth / 2;
  const my = window.innerHeight * 0.45;

  // heart explosion
  launchHeartBurst(mx, my, 90);
  qTimeout(() => launchHeartBurst(mx - 110, my - 30, 45), 200);
  qTimeout(() => launchHeartBurst(mx + 110, my - 30, 45), 380);
  // gentle confetti
  qTimeout(() => launchConfetti(mx, my - 80, 36), 500);
  // soft glow
  const glow = document.createElement("div");
  glow.className = "soft-glow";
  glow.setAttribute("aria-hidden", "true");
  document.body.appendChild(glow);
  setTimeout(() => glow.remove(), 5200);
  // floating hearts (DOM rain + ambient canvas hearts)
  spawnHeartRain(30, 5200);
  for (let i = 0; i < 14; i++) addAmbientHeart();

  // swap to the "That's all I wanted to hear" view
  finalQContent.classList.add("hidden");
  finalQSuccess.classList.remove("hidden");

  // Interview-over sequence, then the birthday wish
  revealSeq(document.getElementById("iv-1"), 2400);
  revealSeq(document.getElementById("iv-2"), 4000);
  revealSeq(document.getElementById("iv-3"), 6200);
  revealSeq(document.getElementById("iv-btn"), 7600);
}

document.querySelectorAll(".final-ans-btn").forEach((b) => {
  b.addEventListener("click", () => answerFinal(b.dataset.answer));
});

/* ----- Transition into the existing Happy Birthday finale ----- */
if (btnToFinale) {
  btnToFinale.addEventListener("click", () => {
    if (STATE.toFinale) return;
    STATE.toFinale = true;
    if (flashOverlay) {
      flashOverlay.style.background = "#050207";
      flashOverlay.classList.add("active");
    }
    setTimeout(() => {
      document.body.classList.remove("final-mood");
      showScreen(8);
      if (flashOverlay) {
        flashOverlay.classList.remove("active");
        setTimeout(() => { flashOverlay.style.background = ""; }, 400);
      }
      startFinaleSequence();
      STATE.toFinale = false;
    }, 1000);
  });
}

/* ==========================================================================
   15b. SCREEN 8: GRAND FINALE & TYPEWRITER QUOTE
   ========================================================================== */
const finaleIntro = document.getElementById("finale-intro");
const finaleMain = document.getElementById("finale-main");
const typewriterQuoteEl = document.getElementById("typewriter-quote");
const quoteSignatureEl = document.getElementById("quote-signature");

function startFinaleSequence() {
  STATE.fireworksActive = true;

  // Launch initial celebration bursts
  launchFirework();
  setTimeout(launchFirework, 350);
  setTimeout(launchFirework, 700);

  // Transition from "And now…" to grand reveal
  setTimeout(() => {
    if (finaleIntro) finaleIntro.style.display = "none";
    if (finaleMain) {
      finaleMain.classList.add("revealed");
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 100);
    }

    // Start typewriter effect on the special final quote
    startTypewriterQuote();
  }, 1600);
}

function startTypewriterQuote() {
  if (!typewriterQuoteEl) return;
  typewriterQuoteEl.textContent = "";

  const text = CONFIG.finalQuote;
  let charIdx = 0;

  clearInterval(STATE.typeTimer);
  const timer = STATE.typeTimer = setInterval(() => {
    if (charIdx < text.length) {
      typewriterQuoteEl.textContent += text.charAt(charIdx);
      charIdx++;
    } else {
      clearInterval(timer);
      if (quoteSignatureEl) {
        quoteSignatureEl.textContent = CONFIG.closingSignOff;
        quoteSignatureEl.classList.remove("hidden");
        quoteSignatureEl.style.opacity = "0";
        quoteSignatureEl.style.transition = "opacity 1s ease";
        void quoteSignatureEl.offsetWidth;
        quoteSignatureEl.style.opacity = "1";
      }
    }
  }, 32);
}

/* ==========================================================================
   16. REPLAY OUR STORY
   Resets all state machines and loops back to screen 1
   ========================================================================== */
const btnReplay = document.getElementById("btn-replay");

function replayExperience() {
  STATE.fireworksActive = false;
  STATE.candleLit = false;
  STATE.candleBlown = false;
  STATE.cakeCut = false;
  STATE.envelopeOpened = false;
  STATE.toFinale = false;
  clearInterval(STATE.typeTimer);

  // Reset 25 reasons
  clearReasonTimers();
  reasonLock = false;
  STATE.currentReason = 0;
  removeClimaxSky();
  if (reasonsIntroCard) reasonsIntroCard.classList.remove("hidden", "card-exit");
  if (reasonDisplayCard) {
    reasonDisplayCard.classList.add("hidden");
    reasonDisplayCard.classList.remove("reason-25-card", "climax-mode");
  }
  if (reasonBodyWrap) reasonBodyWrap.classList.remove("climax-slow", "reason-enter", "reason-leave");
  if (reasonSlotEl) reasonSlotEl.innerHTML = "";

  // Reset question session
  resetQuizUI();
  if (quizActiveCard) quizActiveCard.classList.remove("q-leaving", "q-entering");
  if (flashOverlay) { flashOverlay.classList.remove("active"); flashOverlay.style.background = ""; }

  // Reset candle & cake visual states
  if (candleFlame) candleFlame.classList.remove("lit", "flicker-crazy");
  if (warmthOverlay) warmthOverlay.classList.remove("warm");
  if (smokePuff) smokePuff.classList.remove("rise");
  if (btnLightCandle) btnLightCandle.classList.remove("hidden");
  if (btnBlowCandle) btnBlowCandle.classList.add("hidden");
  if (btnCutCake) btnCutCake.classList.add("hidden");
  if (cakeMsg) cakeMsg.textContent = "";

  if (cuttingKnife) cuttingKnife.classList.remove("animating");
  if (cakeLeft) cakeLeft.classList.remove("separated-left");
  if (cakeRight) cakeRight.classList.remove("separated-right");

  // Reset envelope
  if (envelopeWrapper) envelopeWrapper.classList.remove("open");
  if (expandedLetter) {
    expandedLetter.classList.remove("visible");
    expandedLetter.classList.add("hidden");
  }

  // Reset finale view
  if (finaleIntro) finaleIntro.style.display = "flex";
  if (finaleMain) finaleMain.classList.remove("revealed");
  if (quoteSignatureEl) quoteSignatureEl.classList.add("hidden");
  if (typewriterQuoteEl) typewriterQuoteEl.textContent = "";

  // Reset dodge game
  initDodgeGame();

  // Scroll to top and navigate to Screen 1
  window.scrollTo({ top: 0, behavior: "smooth" });
  showScreen(1);
}

if (btnReplay) {
  btnReplay.addEventListener("click", replayExperience);
}

/* ==========================================================================
   18. PERSONALIZATION INJECTION
   ========================================================================== */
function applyConfigPersonalization() {
  const boyfriend = CONFIG.name || CONFIG.boyfriendName || "";
  const sender = CONFIG.sender || CONFIG.senderName || "";

  // Dynamic Cake celebration nickname
  const cakeTitleEl = document.getElementById("cake-celebration-title");
  if (cakeTitleEl) {
    const nick = CONFIG.cakeNickname || (boyfriend ? boyfriend.toUpperCase() : "YOU IDIOT");
    cakeTitleEl.textContent = `HAPPY BIRTHDAY, ${nick} ❤️😂`;
  }

  // Dynamic finale subheading
  const bdaySubheadingEl = document.getElementById("bday-recipient-subheading");
  if (bdaySubheadingEl && CONFIG.finalMessage) {
    bdaySubheadingEl.textContent = CONFIG.finalMessage;
  }
}

/* ==========================================================================
   19. INITIALIZATION
   ========================================================================== */
window.addEventListener("DOMContentLoaded", () => {
  applyConfigPersonalization();
  resizeAmbCanvas();
  resizeFxCanvas();
  renderAmbient();
  renderFx();
});
