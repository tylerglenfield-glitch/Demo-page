// External JavaScript File for Web Development 101 //
// Interactive Features Engine //
// Web Audio Synthesizer Engine //
// Rainbow FX Canvas Engine //
// Multi-language Translator //
// Theme Toggler & Persistent Likes //
// Interactive User Input & If/Else Logic Engine //
// Parabolic Basketball Game Engine //
// Knicks Fan Poll & Roster Interactivity //
// Live ESPN NBA Scoreboard Fetcher //
// ------------------------------------------------------------- //
// Line 11: Web Audio Context Initialization //
const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); //

function playSound(type) { //
  if (audioCtx.state === 'suspended') audioCtx.resume(); //

  const osc = audioCtx.createOscillator(); //
  const gain = audioCtx.createGain(); //
  osc.connect(gain); //
  gain.connect(audioCtx.destination); //

  if (type === 'swish') { //
    osc.type = 'sine'; //
    osc.frequency.setValueAtTime(480, audioCtx.currentTime); //
    osc.frequency.exponentialRampToValueAtTime(130, audioCtx.currentTime + 0.2); //
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime); //
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2); //
    osc.start(); //
    osc.stop(audioCtx.currentTime + 0.2); //
  } else if (type === 'miss') { //
    osc.type = 'sawtooth'; //
    osc.frequency.setValueAtTime(150, audioCtx.currentTime); //
    osc.frequency.linearRampToValueAtTime(60, audioCtx.currentTime + 0.25); //
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime); //
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25); //
    osc.start(); //
    osc.stop(audioCtx.currentTime + 0.25); //
  } else if (type === 'cheer') { //
    osc.type = 'triangle'; //
    osc.frequency.setValueAtTime(300, audioCtx.currentTime); //
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.3); //
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime); //
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3); //
    osc.start(); //
    osc.stop(audioCtx.currentTime + 0.3); //
  } else if (type === 'rainbow') { //
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; //
    notes.forEach((freq, idx) => { //
      const rOsc = audioCtx.createOscillator(); //
      const rGain = audioCtx.createGain(); //
      rOsc.type = 'sine'; //
      rOsc.frequency.value = freq; //
      rGain.gain.setValueAtTime(0.15, audioCtx.currentTime + idx * 0.1); //
      rGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.5); //
      rOsc.connect(rGain); //
      rGain.connect(audioCtx.destination); //
      rOsc.start(audioCtx.currentTime + idx * 0.1); //
      rOsc.stop(audioCtx.currentTime + idx * 0.1 + 0.5); //
    }); //
  } else if (type === 'win') { //
    [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => { //
      const winOsc = audioCtx.createOscillator(); //
      const winGain = audioCtx.createGain(); //
      winOsc.type = 'triangle'; //
      winOsc.frequency.value = freq; //
      winGain.gain.setValueAtTime(0.2, audioCtx.currentTime + idx * 0.1); //
      winGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + idx * 0.1 + 0.35); //
      winOsc.connect(winGain); //
      winGain.connect(audioCtx.destination); //
      winOsc.start(audioCtx.currentTime + idx * 0.1); //
      winOsc.stop(audioCtx.currentTime + idx * 0.1 + 0.35); //
    }); //
  } //
} //

// -------------------------------------------------------------
// Step 2: Pop-Up Alert Button Feature
// -------------------------------------------------------------
function showAlertMessage() {
  playSound('cheer');
  alert("🎉 Welcome! You triggered an interactive alert from script.js!");
}

// -------------------------------------------------------------
// Steps 4 & 5: User Input + If/Else Logic Engine
// -------------------------------------------------------------
function processUserInput() {
  const userInput = document.getElementById('user-name-input').value.trim();
  const outputBox = document.getElementById('user-output-msg');

  if (userInput === "") {
    outputBox.style.color = "#e53e3e";
    outputBox.innerText = "⚠️ Please enter your name or favorite NBA team first!";
  } else if (userInput.toLowerCase().includes("knicks")) {
    playSound('cheer');
    outputBox.style.color = "#3182ce";
    outputBox.innerText = `🗽 Let's go ${userInput}! Orange & Blue forever! Welcome to the Knicks Fan Hub!`;
  } else if (userInput.toLowerCase().includes("lakers") || userInput.toLowerCase().includes("celtics")) {
    playSound('miss');
    outputBox.style.color = "#dd6b20";
    outputBox.innerText = `🏀 Hey ${userInput}! Bold choice, but New York is Knicks territory!`;
  } else {
    playSound('swish');
    outputBox.style.color = "#38a169";
    outputBox.innerText = `⭐ Welcome to the site, ${userInput}! Enjoy the basketball game and beach vibes!`;
  }
}

// -------------------------------------------------------------
// Canvas Engine: Rainbow Formation & Click Rainbow Bursts
// -------------------------------------------------------------
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let rainbowArches = [];
const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

function resizeCanvas() {
  if (canvas) {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const mainContainer = document.getElementById('main-container');
if (mainContainer) {
  mainContainer.addEventListener('click', (e) => {
    if (['BUTTON', 'SELECT', 'A', 'OPTION', 'INPUT'].includes(e.target.tagName)) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    rainbowArches.push({
      x: clickX,
      y: clickY + 25,
      maxRadius: Math.random() * 30 + 45,
      currentRadius: 0,
      progress: 0,
      alpha: 1,
      lineWidth: 4,
      isClickRainbow: true
    });

    for (let i = 0; i < 18; i++) {
      const color = rainbowColors[i % rainbowColors.length];
      particles.push({
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 1,
        size: Math.random() * 5 + 3,
        color: color,
        alpha: 1,
        gravity: 0.1
      });
    }
  });
}

function formRainbow() {
  playSound('rainbow');
  
  const width = canvas.width;
  const arcCenterX = width / 2;
  const arcCenterY = canvas.height * 0.45;
  const baseRadius = width * 0.42;

  rainbowArches.push({
    x: arcCenterX,
    y: arcCenterY,
    maxRadius: baseRadius,
    progress: 0,
    alpha: 1,
    lineWidth: Math.max(8, width * 0.015),
    isClickRainbow: false
  });

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const angle = Math.PI + (i / 60) * Math.PI;
      const color = rainbowColors[i % rainbowColors.length];
      const px = arcCenterX + baseRadius * Math.cos(angle);
      const py = arcCenterY + baseRadius * Math.sin(angle);
      
      for (let k = 0; k < 3; k++) {
        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 4 + 2,
          color: color,
          alpha: 1,
          gravity: 0.02
        });
      }
    }, i * 30);
  }
}

function triggerConfetti() {
  const colors = ['#006BB6', '#F58426', '#ffffff', '#38a169', '#ecc94b', '#FF0000', '#9400D3'];
  for (let i = 0; i < 110; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      gravity: 0.2
    });
  }
}

function renderFX() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rainbowArches.forEach((r, idx) => {
    ctx.save();
    ctx.globalAlpha = r.alpha;

    if (r.isClickRainbow) {
      r.progress += 0.06;
      r.currentRadius = r.maxRadius * Math.min(1, r.progress);
      if (r.progress > 1) r.alpha -= 0.02;

      rainbowColors.forEach((color, cIdx) => {
        const radius = r.currentRadius - (cIdx * r.lineWidth);
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, Math.PI, 2 * Math.PI, false);
          ctx.strokeStyle = color;
          ctx.lineWidth = r.lineWidth;
          ctx.stroke();
        }
      });
    } else {
      r.progress = Math.min(1, r.progress + 0.015);
      if (r.progress >= 1) r.alpha -= 0.003;

      const endAngle = Math.PI + (Math.PI * r.progress);

      rainbowColors.forEach((color, cIdx) => {
        const radius = r.maxRadius - (cIdx * (r.lineWidth + 1));
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, Math.PI, endAngle, false);
          ctx.strokeStyle = color;
          ctx.lineWidth = r.lineWidth;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });
    }

    ctx.restore();

    if (r.alpha <= 0) {
      rainbowArches.splice(idx, 1);
    }
  });

  particles.forEach((p, index) => {
    if (p.alpha > 0) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.02;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    } else {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(renderFX);
}
renderFX();

// -------------------------------------------------------------
// Translations Dictionary (English, Spanish, Chinese)
// -------------------------------------------------------------
const translations = {
  en: {
    themeBtn: "🌓 Switch Theme",
    rainbowStartBtn: "🌈 Form Rainbow",
    title: "Welcome to Web Development 101",
    wLoc: "📍 Santa Monica Beach",
    wSurf: "🌊 Surf Height",
    wWater: "🏊 Water Temp",
    likeBtn: "❤️ Likes: ",
    factBtn: "📍 Random Beach Fact",
    rainbowFactBtn: "🌈 Form Full Rainbow",
    introP1: "In this class, we learn the foundations of building, styling, and publishing interactive websites on the web using HTML, CSS, and GitHub Pages.",
    linksHeading: "🔗 Recommended Web Links & Resources:",
    wikiLabel: "General Knowledge:",
    wikiLink: "Visit Wikipedia",
    smWeatherLabel: "Beach Weather:",
    smWeatherLink: "Santa Monica Surf & Weather Report",
    knicksSiteLabel: "Sports Hub:",
    knicksLink: "Official New York Knicks Website",
    gameTitle: "🏀 Santa Monica Basketball Challenge",
    gameDesc: "Time your shot! Click 'Shoot!' or press SPACEBAR when the red pointer is inside the green zone. Watch the ball fly through the hoop! Make 25 in a row to win!",
    diffLabel: "Difficulty:",
    streakLabel: "Streak",
    highScoreLabel: "Best Streak",
    shootBtn: "🏀 Shoot!",
    keyHint: "💡 Tip: You can also press [SPACEBAR] or [ENTER] to shoot!",
    facts: [
      "This photo was taken in Santa Monica, CA - Tyler’s favorite beach in California!",
      "Santa Monica Pier was built back in 1909!",
      "Santa Monica enjoys over 300 sunny days every year.",
      "The famous Original Muscle Beach was established next to Santa Monica Pier in the 1930s."
    ],
    swish: "🏀 SWISH! Clean through the net! (+1)",
    miss: "❌ MISSED! Clanged off the rim! Streak reset to 0.",
    win: "🎉 YOU WIN! You made 25 shots in a row! You are a Santa Monica legend!",
    knicksTitle: "🗽 Congratulations New York Knicks!",
    knicksDesc: "Shoutout to the indisputable BEST team in the NBA! Orange & Blue forever!",
    rosterTitle: "⭐ Featured Star Players",
    pollTitle: "Knicks Fan Poll: Who is the MVP?",
    nbaTitle: "🏀 Live NBA Scores & Schedule",
    refreshBtn: "🔄 Fetch Scores",
    galleryTitle: "📷 Photo Gallery & Highlights",
    surferCaption: "🏄 Riding Waves at Santa Monica Pier",
    brunsonCaption: "🏀 Jalen Brunson (#11) - Knicks Captain",
    statusFinal: "FINAL",
    statusUpcoming: "UPCOMING"
  },
  es: {
    themeBtn: "🌓 Cambiar Tema",
    rainbowStartBtn: "🌈 Formar Arcoíris",
    title: "Bienvenido a Desarrollo Web 101",
    wLoc: "📍 Playa de Santa Mónica",
    wSurf: "🌊 Altura del Oleaje",
    wWater: "🏊 Temp. Agua",
    likeBtn: "❤️ Me gusta: ",
    factBtn: "📍 Dato Aleatorio de Playa",
    rainbowFactBtn: "🌈 Crear Arcoíris Completo",
    introP1: "En esta clase, aprendemos las bases para construir, diseñar y publicar sitios web interactivos usando HTML, CSS y GitHub Pages.",
    linksHeading: "🔗 Enlaces y Recursos Recomendados:",
    wikiLabel: "Conocimiento General:",
    wikiLink: "Visitar Wikipedia",
    smWeatherLabel: "Clima de Playa:",
    smWeatherLink: "Reporte de Surf y Clima de Santa Mónica",
    knicksSiteLabel: "Centro Deportivo:",
    knicksLink: "Sitio Oficial de New York Knicks",
    gameTitle: "🏀 Desafío de Baloncesto de Santa Mónica",
    gameDesc: "¡Calcula tu tiro! Haz clic en '¡Tirar!' o presiona BARRA ESPACIADORA en la zona verde. ¡Mira cómo la pelota pasa por el aro! ¡Encesta 25 seguidos para ganar!",
    diffLabel: "Dificultad:",
    streakLabel: "Racha",
    highScoreLabel: "Mejor Racha",
    shootBtn: "🏀 ¡Tirar!",
    keyHint: "💡 Consejo: ¡También puedes presionar [ESPACIO] o [ENTER] para tirar!",
    facts: [
      "¡Esta foto fue tomada en Santa Mónica, CA, la playa favorita de Tyler en California!",
      "¡El muelle de Santa Mónica fue construido en 1909!",
      "Santa Mónica disfruta de más de 300 días de sol al año.",
      "La famosa 'Muscle Beach' original nació junto al muelle de Santa Mónica en la década de 1930."
    ],
    swish: "🏀 ¡ENCESTADO! ¡Directo a la red! (+1)",
    miss: "❌ ¡FALLASTE! Rebotó en el aro. La racha volvió a 0.",
    win: "🎉 ¡GANASTE! ¡Encestaste 25 tiros seguidos! ¡Eres una leyenda de Santa Mónica!",
    knicksTitle: "🗽 ¡Felicidades New York Knicks!",
    knicksDesc: "¡Un saludo al indiscutible MEJOR equipo de la NBA! ¡Naranja y Azul por siempre!",
    rosterTitle: "⭐ Jugadores Estrella",
    pollTitle: "Encuesta Knicks: ¿Quién es el MVP?",
    nbaTitle: "🏀 Marcadores y Calendario NBA",
    refreshBtn: "🔄 Obtener Resultados",
    galleryTitle: "📷 Galería de Fotos y Destacados",
    surferCaption: "🏄 Surfista en el muelle de Santa Mónica",
    brunsonCaption: "🏀 Jalen Brunson (#11) - Capitan Knicks",
    statusFinal: "FINAL",
    statusUpcoming: "PRÓXIMO"
  },
  zh: {
    themeBtn: "🌓 切换主题",
    rainbowStartBtn: "🌈 形成彩虹",
    title: "欢迎来到网页开发 101",
    wLoc: "📍 圣莫尼卡海滩",
    wSurf: "🌊 浪高",
    wWater: "🏊 水温",
    likeBtn: "❤️ 点赞：",
    factBtn: "📍 海滩随机冷知识",
    rainbowFactBtn: "🌈 形成完整彩虹",
    introP1: "在本课程中，我们学习使用 HTML、CSS 和 GitHub Pages 构建、美化和发布互动网站的基础知识。",
    linksHeading: "🔗 推荐网页链接与资源：",
    wikiLabel: "综合知识：",
    wikiLink: "访问维基百科",
    smWeatherLabel: "海滩天气：",
    smWeatherLink: "圣莫尼卡冲浪与天气预报",
    knicksSiteLabel: "体育中心：",
    knicksLink: "纽约尼克斯队官方网站",
    gameTitle: "🏀 圣莫尼卡篮球挑战赛",
    gameDesc: "把握投篮时机！当红色指针位于绿色区域时点击“投篮！”或按空格键。亲眼见证篮球穿过篮网！连续投中 25 球即可获胜！",
    diffLabel: "难度：",
    streakLabel: "连中",
    highScoreLabel: "最高纪录",
    shootBtn: "🏀 投篮！",
    keyHint: "💡 提示：你也可以按下 [空格键] 或 [回车键] 进行投篮！",
    facts: [
      "这张照片拍摄于加州圣莫尼卡——这是 Tyler 在加州最喜欢的海滩！",
      "圣莫尼卡码头建于 1909 年！",
      "圣莫尼卡每年拥有超过 300 天的晴朗天气。",
      "著名的 Muscle Beach（肌肉海滩）于 20 世纪 30 年代在圣莫尼卡码头旁诞生。"
    ],
    swish: "🏀 空心入网！篮球完美穿过篮网！(+1)",
    miss: "❌ 没投中！篮球砸在篮筐上弹开！连中纪录重置为 0。",
    win: "🎉 你赢了！你连续投中了 25 球！你是圣莫尼卡的传奇球星！",
    knicksTitle: "🗽 祝贺纽约尼克斯队！",
    knicksDesc: "向 NBA 无庸置疑的最强球队致敬！永远的橙蓝军团！",
    rosterTitle: "⭐ 球队明星球员",
    pollTitle: "尼克斯球迷投票：谁是 MVP？",
    nbaTitle: "🏀 实时 NBA 比分与赛程",
    refreshBtn: "🔄 获取比分",
    galleryTitle: "📷 照片图库与精彩瞬间",
    surferCaption: "🏄 圣莫尼卡码头冲浪精彩瞬间",
    brunsonCaption: "🏀 贾伦·布伦森 (#11) - 尼克斯队长",
    statusFinal: "完赛",
    statusUpcoming: "即将开始"
  }
};

let currentLang = "en";

function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.getElementById('theme-btn').innerText = t.themeBtn;
  document.getElementById('rainbow-start-btn').innerText = t.rainbowStartBtn;
  document.getElementById('site-title').innerText = t.title;
  document.getElementById('w-loc-label').innerText = t.wLoc;
  document.getElementById('w-surf-label').innerText = t.wSurf;
  document.getElementById('w-water-label').innerText = t.wWater;
  document.getElementById('fact-btn').innerText = t.factBtn;
  document.getElementById('rainbow-fact-btn').innerText = t.rainbowFactBtn;
  document.getElementById('intro-p1').innerText = t.introP1;
  
  document.getElementById('links-box-heading').innerText = t.linksHeading;
  document.getElementById('wiki-label').innerText = t.wikiLabel;
  document.getElementById('wiki-link').innerText = t.wikiLink;
  document.getElementById('sm-weather-label').innerText = t.smWeatherLabel;
  document.getElementById('sm-weather-link').innerText = t.smWeatherLink;
  document.getElementById('knicks-site-label').innerText = t.knicksSiteLabel;
  document.getElementById('knicks-link').innerText = t.knicksLink;

  document.getElementById('game-title').innerText = t.gameTitle;
  document.getElementById('game-desc').innerText = t.gameDesc;
  document.getElementById('diff-label').innerText = t.diffLabel;
  document.getElementById('streak-label').innerText = t.streakLabel;
  document.getElementById('high-score-label').innerText = t.highScoreLabel;
  document.getElementById('shoot-btn').innerText = t.shootBtn;
  document.getElementById('key-hint').innerText = t.keyHint;
  document.getElementById('knicks-title').innerText = t.knicksTitle;
  document.getElementById('knicks-desc').innerText = t.knicksDesc;
  document.getElementById('roster-title').innerText = t.rosterTitle;
  document.getElementById('poll-title').innerText = t.pollTitle;
  document.getElementById('nba-title').innerText = t.nbaTitle;
  document.getElementById('refresh-btn').innerText = t.refreshBtn;

  document.getElementById('gallery-title').innerText = t.galleryTitle;
  document.getElementById('surfer-caption').innerText = t.surferCaption;
  document.getElementById('brunson-caption').innerText = t.brunsonCaption;

  updateLikesDisplay();
  document.getElementById('fact-text').style.display = "none";
}

// -------------------------------------------------------------
// Step 3: Dark Mode & Dynamic Persistent Likes (Page Updates)
// -------------------------------------------------------------
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

let likes = parseInt(localStorage.getItem('siteLikes')) || 0;

function updateLikesDisplay() {
  document.getElementById('like-btn').innerHTML = `${translations[currentLang].likeBtn} <span id="like-count">${likes}</span>`;
}

function addLike() {
  likes++;
  localStorage.setItem('siteLikes', likes);
  updateLikesDisplay();
}

updateLikesDisplay();

// -------------------------------------------------------------
// Step 6: Step-by-Step Random Beach Fact Generator
// -------------------------------------------------------------
function showRandomFact() {
  const factList = translations[currentLang].facts;
  const randomIndex = Math.floor(Math.random() * factList.length);
  const factBox = document.getElementById('fact-text');
  
  factBox.innerText = factList[randomIndex];
  factBox.style.display = "block";
}

// -------------------------------------------------------------
// Basketball Parabolic Trajectory Animation Engine
// -------------------------------------------------------------
let streak = 0;
let highScore = parseInt(localStorage.getItem('nbaHighScore')) || 0;
const highScoreElem = document.getElementById('high-score-count');
if (highScoreElem) highScoreElem.innerText = highScore;

let pointerPosition = 0;
let pointerDirection = 1;
let pointerSpeed = 1.3;
let targetMin = 42.5;
let targetMax = 57.5;
let isShooting = false;

const pointerElem = document.getElementById('meter-pointer');
const targetZoneElem = document.getElementById('target-zone');
const statusElem = document.getElementById('game-status');
const ballElem = document.getElementById('court-ball');

function setDifficulty(level) {
  if (level === 'easy') {
    pointerSpeed = 1.0;
    targetMin = 35;
    targetMax = 65;
  } else if (level === 'pro') {
    pointerSpeed = 1.3;
    targetMin = 42.5;
    targetMax = 57.5;
  } else if (level === 'legend') {
    pointerSpeed = 2.2;
    targetMin = 45;
    targetMax = 55;
  }
  if (targetZoneElem) {
    targetZoneElem.style.left = targetMin + '%';
    targetZoneElem.style.width = (targetMax - targetMin) + '%';
  }
}

function animateMeter() {
  pointerPosition += pointerSpeed * pointerDirection;

  if (pointerPosition >= 98) {
    pointerDirection = -1;
  } else if (pointerPosition <= 0) {
    pointerDirection = 1;
  }

  if (pointerElem) pointerElem.style.left = pointerPosition + '%';
  requestAnimationFrame(animateMeter);
}
animateMeter();

function shootBasket() {
  if (isShooting) return;
  const isSwish = (pointerPosition >= targetMin && pointerPosition <= targetMax);
  animatePhysicalShot(isSwish);
}

function animatePhysicalShot(isSwish) {
  isShooting = true;
  const tDict = translations[currentLang];
  const stage = document.getElementById('court-stage');
  const stageWidth = stage ? stage.clientWidth : 600;
  const stageHeight = stage ? stage.clientHeight : 190;

  const startX = 35;
  const startY = stageHeight - 35;
  
  const hoopX = stageWidth - 55;
  const hoopY = 52;

  let frame = 0;
  const totalArcFrames = 28;

  function arcStep() {
    frame++;
    const progress = frame / totalArcFrames;

    if (progress <= 1) {
      const targetX = isSwish ? hoopX : hoopX - 25;
      const currentX = startX + (targetX - startX) * progress;
      const peakHeight = Math.max(90, (startY - hoopY) + 65);
      const currentY = startY + (hoopY - startY) * progress - Math.sin(progress * Math.PI) * peakHeight;
      const rot = progress * 720;

      if (ballElem) {
        ballElem.style.left = currentX + 'px';
        ballElem.style.top = currentY + 'px';
        ballElem.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      }

      requestAnimationFrame(arcStep);
    } else if (isSwish) {
      streak++;
      document.getElementById('streak-count').innerText = streak;
      playSound('swish');

      if (streak > highScore) {
        highScore = streak;
        localStorage.setItem('nbaHighScore', highScore);
        document.getElementById('high-score-count').innerText = highScore;
      }

      if (streak >= 25) {
        statusElem.style.color = "#38a169";
        statusElem.innerText = tDict.win;
        playSound('win');
        triggerConfetti();
      } else {
        statusElem.style.color = "#38a169";
        statusElem.innerText = tDict.swish;
      }

      dropThroughNet(hoopX, hoopY, stageHeight);
    } else {
      streak = 0;
      document.getElementById('streak-count').innerText = streak;
      playSound('miss');
      statusElem.style.color = "#e53e3e";
      statusElem.innerText = tDict.miss;

      clangMiss(hoopX - 25, hoopY, stageHeight);
    }
  }

  requestAnimationFrame(arcStep);
}

function dropThroughNet(hoopX, hoopY, stageHeight) {
  let dropFrame = 0;
  const totalDropFrames = 14;

  function dropStep() {
    dropFrame++;
    const progress = dropFrame / totalDropFrames;
    const currentY = hoopY + progress * 42;
    const currentX = hoopX + progress * 2;

    if (ballElem) {
      ballElem.style.left = currentX + 'px';
      ballElem.style.top = currentY + 'px';
      ballElem.style.transform = `translate(-50%, -50%) scale(${1 - progress * 0.15})`;
    }

    if (dropFrame < totalDropFrames) {
      requestAnimationFrame(dropStep);
    } else {
      bounceFloor(currentX, currentY, stageHeight);
    }
  }
  requestAnimationFrame(dropStep);
}

function bounceFloor(startX, startY, stageHeight) {
  let bounceFrame = 0;
  const totalBounceFrames = 18;
  const floorY = stageHeight - 20;

  function bounceStep() {
    bounceFrame++;
    const progress = bounceFrame / totalBounceFrames;
    const currentY = startY + (floorY - startY) * Math.sin(progress * Math.PI / 2);
    const currentX = startX + progress * 15;

    if (ballElem) {
      ballElem.style.left = currentX + 'px';
      ballElem.style.top = currentY + 'px';
    }

    if (bounceFrame < totalBounceFrames) {
      requestAnimationFrame(bounceStep);
    } else {
      resetBall();
    }
  }
  requestAnimationFrame(bounceStep);
}

function clangMiss(hitX, hitY, stageHeight) {
  let missFrame = 0;
  const totalMissFrames = 20;
  const floorY = stageHeight - 20;

  function missStep() {
    missFrame++;
    const progress = missFrame / totalMissFrames;
    const currentX = hitX - progress * 45;
    const currentY = hitY + (floorY - hitY) * (progress * progress);

    if (ballElem) {
      ballElem.style.left = currentX + 'px';
      ballElem.style.top = currentY + 'px';
    }

    if (missFrame < totalMissFrames) {
      requestAnimationFrame(missStep);
    } else {
      resetBall();
    }
  }
  requestAnimationFrame(missStep);
}

function resetBall() {
  const stage = document.getElementById('court-stage');
  const stageHeight = stage ? stage.clientHeight : 190;
  if (ballElem) {
    ballElem.style.left = '35px';
    ballElem.style.top = (stageHeight - 35) + 'px';
    ballElem.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
  }
  isShooting = false;
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'Enter') {
    if (document.activeElement.tagName !== 'BUTTON' && document.activeElement.tagName !== 'SELECT' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      shootBasket();
    }
  }
});

// -------------------------------------------------------------
// Knicks Player Cheer & Fan Poll
// -------------------------------------------------------------
function cheerPlayer(name) {
  playSound('cheer');
  alert(`🗽 Let's go ${name}! New York Knicks Legend!`);
}

let pollData = JSON.parse(localStorage.getItem('knicksPollVotes')) || { brunson: 18, kat: 12 };

function updatePollUI() {
  const total = pollData.brunson + pollData.kat;
  const brunsonPct = Math.round((pollData.brunson / total) * 100);
  const katPct = 100 - brunsonPct;

  const brunsonPctElem = document.getElementById('brunson-pct');
  const katPctElem = document.getElementById('kat-pct');
  const pollFillElem = document.getElementById('poll-fill');

  if (brunsonPctElem) brunsonPctElem.innerText = brunsonPct;
  if (katPctElem) katPctElem.innerText = katPct;
  if (pollFillElem) pollFillElem.style.width = brunsonPct + '%';
}

function voteKnicks(player) {
  pollData[player]++;
  localStorage.setItem('knicksPollVotes', JSON.stringify(pollData));
  updatePollUI();
}
updatePollUI();

// -------------------------------------------------------------
// Dynamic Live NBA API Scoreboard
// -------------------------------------------------------------
async function fetchLiveNBAScores() {
  const grid = document.getElementById('scores-grid');
  if (!grid) return;
  grid.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>🔄 Fetching live scores...</p>";

  try {
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
    const data = await response.json();
    
    grid.innerHTML = "";
    
    if (data.events && data.events.length > 0) {
      data.events.slice(0, 4).forEach(event => {
        const comp = event.competitions[0];
        const home = comp.competitors.find(c => c.homeAway === 'home');
        const away = comp.competitors.find(c => c.homeAway === 'away');
        const statusState = event.status.type.state;
        const isUpcoming = statusState === 'pre';

        grid.innerHTML += `
          <div class="card">
            <div class="card-status ${isUpcoming ? 'upcoming' : ''}">
              ${event.status.type.shortDetail}
            </div>
            <div class="team-row"><span>${away.team.displayName}</span> <span>${away.score || '-'}</span></div>
            <div class="team-row"><span>${home.team.displayName}</span> <span>${home.score || '-'}</span></div>
          </div>
        `;
      });
    } else {
      renderFallbackScores();
    }
  } catch (err) {
    renderFallbackScores();
  }
}

function renderFallbackScores() {
  const grid = document.getElementById('scores-grid');
  if (!grid) return;
  const fallbackData = [
    { home: "New York Knicks", homeScore: 118, away: "Philadelphia 76ers", awayScore: 105, status: "FINAL" },
    { home: "Milwaukee Bucks", homeScore: 98, away: "Boston Celtics", awayScore: 112, status: "FINAL" },
    { home: "New York Knicks", homeScore: "-", away: "Washington Wizards", awayScore: "-", status: "UPCOMING - 7:30 PM" },
    { home: "Chicago Bulls", homeScore: "-", away: "Phoenix Suns", awayScore: "-", status: "UPCOMING - 8:00 PM" }
  ];

  grid.innerHTML = "";
  fallbackData.forEach(game => {
    const isUpcoming = game.status.includes("UPCOMING");
    grid.innerHTML += `
      <div class="card">
        <div class="card-status ${isUpcoming ? 'upcoming' : ''}">${game.status}</div>
        <div class="team-row"><span>${game.away}</span> <span>${game.awayScore}</span></div>
        <div class="team-row"><span>${game.home}</span> <span>${game.homeScore}</span></div>
      </div>
    `;
  });
}

fetchLiveNBAScores();
