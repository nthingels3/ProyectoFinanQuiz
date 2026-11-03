const promptVariants = [
  '¿Te sumas?',
  '¿Lo compras?',
  '¿Vas con eso?',
  '¿Estás con ello?',
  '¿Te parece bien?',
  '¿Sí o no?',
  '¿Lo tienes claro?',
  '¿Qué opinas?',
  '¿Va con vos?',
  '¿Te convence?'
];

function getQuestionTitle(questionIndex) {
  const variant = promptVariants[questionIndex % promptVariants.length];
  return variant;
}

const levelConfig = [
  {
    name: 'Nivel 1',
    points: 10,
    questions: [
      { title: '¿Te sumas?', statement: 'La economía es el arte de repartir recursos, no de esconder dinero.', answer: true, hint: 'Piensa en “repartir” y “administrar” como dos caras del mismo problema financiero.' },
      { title: '¿Lo compras?', statement: 'Comparar precios es casi un “doble check” antes de gastar.', answer: true },
      { title: '¿Sí o no?', statement: 'Si algo está “barato”, entonces siempre es la mejor compra.', answer: false, requiresHint: true, hint: 'No todo barato es bueno: a veces lo barato sale caro si después necesitas repararlo o reemplazarlo.' },
      { title: '¿Qué opinas?', statement: 'Comprar por impulso es una forma de “elegir” sin pensar.', answer: false },
      { title: '¿Te convence?', statement: 'Dinero en efectivo y dinero digital son iguales en todo sentido.', answer: false, requiresHint: true, hint: 'Igual valor no significa igual uso: el contexto importa.' }
    ]
  },
  {
    name: 'Nivel 2',
    points: 20,
    questions: [
      { title: '¿Vas con eso?', statement: 'Ahorrar es guardar para una tormenta, no solo para un día soleado.', answer: true },
      { title: '¿Te parece bien?', statement: 'Conocer tus gastos es el primer paso para no perder el rumbo del dinero.', answer: true },
      { title: '¿Lo tienes claro?', statement: 'Pedir prestado sin planear es como correr sin mapa.', answer: true, requiresHint: true, hint: 'Cuando no sabes hacia dónde va el dinero, cualquier deuda puede ser más pesada de lo que parece.' },
      { title: '¿Qué opinas?', statement: 'Gastarlo todo sin control es el “sinónimo” de disciplina financiera.', answer: false },
      { title: '¿Va con vos?', statement: 'Separar el dinero para ahorro y para diversión es un equilibrio sano.', answer: true }
    ]
  },
  {
    name: 'Nivel 3',
    points: 15,
    questions: [
      { title: '¿Estás con ello?', statement: 'Un presupuesto es una ruta, no una restricción amarga.', answer: true },
      { title: '¿Te sumas?', statement: 'La deuda puede ser útil si se usa con responsabilidad, como una herramienta y no un hábito.', answer: true },
      { title: '¿Te parece bien?', statement: 'Los impuestos no tienen nada que ver con tu dinero personal.', answer: false, requiresHint: true, hint: 'Aunque no “lo veas” siempre, los impuestos forman parte del flujo del dinero.' },
      { title: '¿Lo compras?', statement: 'Comprar solo lo necesario es lo mismo que “decir no” a los impulsos.', answer: true },
      { title: '¿Qué opinas?', statement: 'Comparar precios antes de comprar es una pequeña estrategia con gran impacto.', answer: true }
    ]
  },
  {
    name: 'Nivel 4',
    points: 30,
    questions: [
      { title: '¿Te convence?', statement: 'Invertir sin entender riesgo y plazo es jugar a la ruleta con números.', answer: true, requiresHint: true, hint: 'Riesgo y plazo son dos pilares esenciales de cualquier inversión real.' },
      { title: '¿Vas con eso?', statement: 'Antes de invertir en algo que no entiendes, conviene hacer una pausa y analizarlo.', answer: true },
      { title: '¿Te parece bien?', statement: 'Diversificar es poner huevos en varias canastas para no perder todo al caer una.', answer: true },
      { title: '¿Lo tienes claro?', statement: 'Toda inversión es una garantía de ganancia.', answer: false, requiresHint: true, hint: 'La ganancia no es garantía: el riesgo siempre existe.' },
      { title: '¿Qué opinas?', statement: 'Ahorrar e invertir no son sinónimos, aunque se parecen en la intención.', answer: true }
    ]
  },
  {
    name: 'Nivel 5',
    points: 25,
    questions: [
      { title: '¿Te sumas?', statement: 'La educación financiera es como un mapa para no perderte en el bosque del dinero.', answer: true, requiresHint: true, hint: 'Un mapa te ayuda a elegir caminos más seguros y menos confusos.' },
      { title: '¿Estás con ello?', statement: 'Un plan financiero sólido prioriza ahorro, metas y realismo.', answer: true },
      { title: '¿Sí o no?', statement: 'Si ya tienes dinero, no hace falta revisar tus gastos porque “ya está todo bien”.', answer: false, requiresHint: true, hint: 'El dinero no se cuida solo por tenerlo: también por revisarlo.' },
      { title: '¿Va con vos?', statement: 'La mejor decisión financiera suele ser la que equilibra costo, beneficio y conciencia.', answer: true },
      { title: '¿Lo compras?', statement: 'Una meta clara es casi una brújula para ahorrar con disciplina.', answer: true }
    ]
  }
];

const views = document.querySelectorAll('[data-screen]');
const levelIndicator = document.getElementById('level1-indicator');
const levelTitle = document.getElementById('level1-question-title');
const levelStatement = document.getElementById('level1-statement');
const levelProgress = document.getElementById('level1-progress');
const levelCard = document.querySelector('.level1-card');
const levelBanner = document.querySelector('.level1-banner');
const levelBody = document.querySelector('.level1-body');
const matchingLevelEl = document.getElementById('matching-level');
const matchingBoardEl = document.getElementById('matching-board');
const matchingTermsEl = document.getElementById('matching-terms');
const matchingDefinitionsEl = document.getElementById('matching-definitions');
const matchingLinesEl = document.getElementById('matching-lines');
const matchingScoreEl = document.getElementById('matching-score');
const matchingFeedbackEl = document.getElementById('matching-feedback');
const budgetLevelEl = document.getElementById('budget-level');
const budgetExpensesEl = document.getElementById('budget-expenses');
const budgetSpentEl = document.getElementById('budget-spent');
const budgetRemainingEl = document.getElementById('budget-remaining');
const budgetMeterFillEl = document.getElementById('budget-meter-fill');
const budgetFeedbackEl = document.getElementById('budget-feedback');
const budgetScenarioTitleEl = document.getElementById('budget-scenario-title');
const budgetScenarioTextEl = document.getElementById('budget-scenario-text');
const budgetTimerEl = document.getElementById('budget-timer');
const portfolioLevelEl = document.getElementById('portfolio-level');
const portfolioAssetsEl = document.getElementById('portfolio-assets');
const portfolioAllocatedEl = document.getElementById('portfolio-allocated');
const portfolioRemainingEl = document.getElementById('portfolio-remaining');
const portfolioFeedbackEl = document.getElementById('portfolio-feedback');
const portfolioSubmitBtn = document.getElementById('portfolio-submit');
const prioritiesLevelEl = document.getElementById('priorities-level');
const prioritiesOptionsEl = document.getElementById('priorities-options');
const prioritiesProgressEl = document.getElementById('priorities-progress');
const prioritiesScoreEl = document.getElementById('priorities-score');
const prioritiesFeedbackEl = document.getElementById('priorities-feedback');
const prioritiesTitleEl = document.getElementById('priorities-title');
const prioritiesTextEl = document.getElementById('priorities-text');
const prioritiesTimerEl = document.getElementById('priorities-timer');
const userScoreEl = document.getElementById('user-score');
const botScoreEl = document.getElementById('bot-score');
const botThinkingEl = document.getElementById('bot-thinking');
const hintPanelEl = document.getElementById('hint-panel');
const pauseOverlayEl = document.getElementById('pause-overlay');
const pauseGameBtn = document.getElementById('pause-game-btn');
const hintBtn = document.getElementById('hint-btn');
const restartGameBtn = document.getElementById('restart-game-btn');
const resumeGameBtn = document.getElementById('resume-game-btn');
const menuGameBtn = document.getElementById('menu-game-btn');
const pauseRestartBtn = document.getElementById('pause-restart-btn');

const resultsUserScoreEl = document.getElementById('results-user-score');
const resultsBotScoreEl = document.getElementById('results-bot-score');
const resultsUserCorrectEl = document.getElementById('results-user-correct');
const resultsUserWrongEl = document.getElementById('results-user-wrong');
const resultsBotCorrectEl = document.getElementById('results-bot-correct');
const resultsBotWrongEl = document.getElementById('results-bot-wrong');
const winnerMessageEl = document.getElementById('winner-message');
const instructionSlides = document.querySelectorAll('[data-instruction-slide]');
const instructionProgress = document.getElementById('instructions-progress');
const instructionPrevBtn = document.getElementById('instructions-prev');
const instructionNextBtn = document.getElementById('instructions-next');
const instructionStartBtn = document.getElementById('instructions-start');
const themeToggle = document.getElementById('theme-toggle');
const motionToggle = document.getElementById('motion-toggle');
const passwordForm = document.getElementById('password-form');
const passwordStatus = document.getElementById('password-status');
const resetPreferencesBtn = document.getElementById('reset-preferences-btn');
let instructionSlideIndex = 0;

const state = {
  levelIndex: 0,
  questionIndex: 0,
  userScore: 0,
  botScore: 0,
  userCorrect: 0,
  userWrong: 0,
  botCorrect: 0,
  botWrong: 0,
  userHistory: [],
  levelUserCorrect: 0,
  levelBotCorrect: 0,
  levelResults: [],
  isPaused: false,
  hintsUsed: 0,
  currentHint: '',
  questionsByLevel: [],
  matchingGame: null,
  budgetGame: null,
  portfolioGame: null,
  prioritiesGame: null
};

const budgetScenarios = [
  { title: 'Llego al final del mes', text: 'Te quedan $100 libres. ¿Qué haces con ellos?', options: [
    { label: 'Guardarlos para una emergencia', impact: 0, smart: true },
    { label: 'Gastarlos por impulso', impact: -100, smart: false }
  ] },
  { title: 'Una oferta tentadora', text: 'Un producto que no necesitas tiene 30% de descuento.', options: [
    { label: 'Comparar precios y esperar', impact: 0, smart: true },
    { label: 'Comprar porque está barato', impact: -120, smart: false }
  ] },
  { title: 'Aparece una deuda', text: 'Puedes pagar una cuota hoy o atrasarla y pagar más después.', options: [
    { label: 'Pagar a tiempo', impact: -80, smart: true },
    { label: 'Atrasarla sin un plan', impact: -130, smart: false }
  ] },
  { title: 'Tu meta te espera', text: 'Quieres ahorrar para una meta importante.', options: [
    { label: 'Separar dinero antes de gastar', impact: -200, smart: true },
    { label: 'Ahorrar solo lo que sobre', impact: 0, smart: false }
  ] },
  { title: 'Última decisión', text: 'Tienes que elegir entre una opción segura y una inversión que no entiendes.', options: [
    { label: 'Investigar antes de decidir', impact: 0, smart: true },
    { label: 'Invertir sin conocer el riesgo', impact: -150, smart: false }
  ] }
];

const balancedBudgetScenarios = [
  { title: 'Una reparacion necesaria', text: 'Tu computadora se usa para estudiar y trabajar. La opcion duradera cuesta $180 y la barata $70, pero puede fallar pronto.', options: [
    { label: 'Pagar $180 por una reparacion con garantia', impact: -180, smart: true, explanation: 'Gastar mas puede evitar pagar dos veces.' },
    { label: 'Elegir $70 sin garantia solo por ser barato', impact: -70, smart: false, explanation: 'El precio menor no siempre representa el menor costo final.' }
  ] },
  { title: 'La compra con descuento', text: 'Un producto que no necesitas tiene 30% de descuento y ocupa parte del fondo de emergencia.', options: [
    { label: 'No comprarlo y conservar el fondo', impact: 0, smart: true, explanation: 'Un descuento no convierte un deseo en una necesidad.' },
    { label: 'Comprar porque ahorras 30%', impact: -120, smart: false, explanation: 'Gastar $120 sigue siendo gastar $120.' }
  ] },
  { title: 'Pagar ahora o despues', text: 'Una deuda vence hoy. Si la pagas ahora cuesta $80; si la atrasas, acumula $35 de interes.', options: [
    { label: 'Pagar $80 a tiempo', impact: -80, smart: true, explanation: 'Un gasto planificado evita un costo mayor.' },
    { label: 'Atrasarla para conservar efectivo', impact: -115, smart: false, explanation: 'Conservar dinero hoy puede salir mas caro.' }
  ] },
  { title: 'Invertir en tu meta', text: 'Un curso cuesta $200 y puede mejorar tus ingresos. Ya tienes un fondo de emergencia.', options: [
    { label: 'Pagar el curso despues de revisar el presupuesto', impact: -200, smart: true, explanation: 'Gastar en una meta puede ser una inversion planificada.' },
    { label: 'No gastar nunca y dejar la meta para despues', impact: 0, smart: false, explanation: 'Ahorrar sin un plan tambien puede impedir alcanzar objetivos.' }
  ] },
  { title: 'Una oferta de inversion', text: 'Te prometen ganancias rapidas, pero no explican el riesgo ni la liquidez.', options: [
    { label: 'No invertir hasta entender el riesgo', impact: 0, smart: true, explanation: 'Entender antes de invertir protege tu dinero.' },
    { label: 'Invertir $150 porque promete mucho', impact: -150, smart: false, explanation: 'Una promesa de ganancia no elimina el riesgo.' }
  ] }
];

const matchingPairs = [
  { term: 'Economía', definition: 'Administración de recursos limitados para satisfacer necesidades.' },
  { term: 'Ahorro', definition: 'Parte del dinero que se guarda para metas o emergencias.' },
  { term: 'Presupuesto', definition: 'Plan que organiza ingresos, gastos y objetivos.' },
  { term: 'Deuda', definition: 'Dinero recibido que debe devolverse según un acuerdo.' },
  { term: 'Inversión', definition: 'Uso del dinero buscando un beneficio futuro y aceptando un riesgo.' },
  { term: 'Interés', definition: 'Costo o ganancia por utilizar dinero durante un período.' },
  { term: 'Impuesto', definition: 'Pago obligatorio destinado a financiar servicios públicos.' },
  { term: 'Diversificación', definition: 'Distribución del dinero en varias opciones para reducir riesgos.' },
  { term: 'Inflación', definition: 'Aumento general de precios que reduce el poder de compra.' },
  { term: 'Consumo responsable', definition: 'Decisión de compra que considera necesidad, precio y consecuencias.' },
  { term: 'Educación financiera', definition: 'Conocimientos para tomar mejores decisiones con el dinero.' },
  { term: 'Meta financiera', definition: 'Objetivo económico concreto con un plazo y un plan.' }
];

function shuffleQuestions(questions) {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function resetGameState() {
  if (state.budgetGame?.timerId) clearInterval(state.budgetGame.timerId);
  if (state.prioritiesGame?.timerId) clearInterval(state.prioritiesGame.timerId);
  state.levelIndex = 0;
  state.questionIndex = 0;
  state.questionsByLevel = levelConfig.map((level) => shuffleQuestions(level.questions));
  state.userScore = 0;
  state.botScore = 0;
  state.userCorrect = 0;
  state.userWrong = 0;
  state.botCorrect = 0;
  state.botWrong = 0;
  state.userHistory = [];
  state.levelUserCorrect = 0;
  state.levelBotCorrect = 0;
  state.levelResults = [];
  state.matchingGame = null;
  state.budgetGame = null;
  state.portfolioGame = null;
  state.prioritiesGame = null;
  state.isPaused = false;
  state.hintsUsed = 0;
  state.currentHint = '';
  hintPanelEl.hidden = true;
  hintPanelEl.textContent = '';
  pauseOverlayEl.hidden = true;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setView(name) {
  views.forEach((view) => {
    view.hidden = view.dataset.screen !== name;
  });

  if (name === 'level1') renderLevelQuestion();
  if (name === 'results') renderResults();

  if (name !== 'level1') {
    pauseOverlayEl.hidden = true;
    state.isPaused = false;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderInstructionSlide() {
  instructionSlides.forEach((slide, index) => {
    slide.hidden = index !== instructionSlideIndex;
  });
  instructionProgress.textContent = `${instructionSlideIndex + 1} / ${instructionSlides.length}`;
  instructionPrevBtn.hidden = instructionSlideIndex === 0;
  instructionNextBtn.hidden = instructionSlideIndex === instructionSlides.length - 1;
  instructionStartBtn.hidden = instructionSlideIndex !== instructionSlides.length - 1;
}

function getCurrentQuestion() {
  const questions = state.questionsByLevel[state.levelIndex];
  if (!questions) return null;
  return questions[state.questionIndex] || null;
}

function canUseHint() {
  const question = getCurrentQuestion();
  return Boolean(question && question.requiresHint && question.hint);
}

function renderLevelQuestion() {
  const level = levelConfig[state.levelIndex];
  if (!level) return;

  if (state.levelIndex === 1) {
    renderMatchingLevel();
    return;
  }

  if (state.levelIndex === 2) {
    renderBudgetLevel();
    return;
  }

  if (state.levelIndex === 3) {
    renderPortfolioLevel();
    return;
  }

  if (state.levelIndex === 4) {
    renderPrioritiesLevel();
    return;
  }

  matchingLevelEl.hidden = true;
  budgetLevelEl.hidden = true;
  portfolioLevelEl.hidden = true;
  prioritiesLevelEl.hidden = true;
  levelBanner.hidden = false;
  levelBody.hidden = false;
  const question = getCurrentQuestion();
  if (!question) {
    finishLevel();
    return;
  }

  const title = question.title || getQuestionTitle(state.questionIndex);
  levelCard.classList.remove('slide-out-left', 'slide-out-right');
  levelIndicator.textContent = `${level.name} • Pregunta N°${state.questionIndex + 1}`;
  levelTitle.textContent = title;
  levelStatement.textContent = question.statement;
  levelProgress.textContent = `${state.questionIndex + 1}/${level.questions.length}`;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;
  hintPanelEl.hidden = true;
  hintPanelEl.textContent = '';
  state.currentHint = '';

  const showHintButton = canUseHint();
  hintBtn.disabled = !showHintButton;
  hintBtn.hidden = !showHintButton;
  hintBtn.title = showHintButton ? 'Usar pista' : 'No hay pista disponible para esta pregunta';
}

function renderMatchingLevel() {
  levelBanner.hidden = true;
  levelBody.hidden = true;
  matchingLevelEl.hidden = false;
  levelIndicator.textContent = 'Nivel 2 • Conecta conceptos';
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;
  hintBtn.hidden = true;
  hintBtn.disabled = true;

  if (!state.matchingGame) startMatchingLevel();
}

function startMatchingLevel() {
  const pairs = shuffleQuestions(matchingPairs).slice(0, 5);
  state.matchingGame = {
    pairs,
    selectedTerm: null,
    selectedDefinition: null,
    matched: 0,
    wrong: 0,
    attempts: 0,
    botCorrect: 0,
    connections: []
  };
  matchingFeedbackEl.textContent = '';
  matchingFeedbackEl.className = 'matching-feedback';
  renderMatchingOptions();
}

function renderMatchingOptions() {
  const game = state.matchingGame;
  matchingTermsEl.replaceChildren();
  matchingDefinitionsEl.replaceChildren();
  matchingLinesEl.replaceChildren();
  matchingScoreEl.textContent = `0/${game.pairs.length} conexiones`;

  game.pairs.forEach((pair) => {
    matchingTermsEl.appendChild(createMatchingButton(pair.term, 'term', pair.term));
  });
  shuffleQuestions(game.pairs).forEach((pair) => {
    matchingDefinitionsEl.appendChild(createMatchingButton(pair.definition, 'definition', pair.term));
  });
}

function createMatchingButton(label, type, value) {
  const button = document.createElement('button');
  button.className = `matching-option matching-${type}`;
  button.type = 'button';
  button.textContent = label;
  button.dataset.matchingValue = value;
  button.addEventListener('click', () => selectMatchingOption(type, value));
  return button;
}

function selectMatchingOption(type, value) {
  const game = state.matchingGame;
  if (!game) return;

  game[type === 'term' ? 'selectedTerm' : 'selectedDefinition'] = value;
  document.querySelectorAll(`#matching-level .matching-${type}`).forEach((button) => {
    button.classList.toggle('is-selected', button.dataset.matchingValue === value);
  });

  if (game.selectedTerm && game.selectedDefinition) resolveMatchingConnection();
}

function resolveMatchingConnection() {
  const game = state.matchingGame;
  const term = game.selectedTerm;
  const definition = game.selectedDefinition;
  const isCorrect = term === definition;
  const pointsPerConnection = levelConfig[1].points / game.pairs.length;

  game.attempts += 1;
  game.connections.push({ term, definition, isCorrect });
  disableMatchingButtons(term, definition);
  const botCorrect = Math.random() < getBotAnswerChance();
  if (botCorrect) {
    game.botCorrect += 1;
    state.botCorrect += 1;
    state.botScore += pointsPerConnection;
  } else {
    state.botWrong += 1;
  }

  if (isCorrect) {
    game.matched += 1;
    state.userCorrect += 1;
    state.userScore += pointsPerConnection;
    matchingFeedbackEl.textContent = '¡Conexión correcta!';
    matchingFeedbackEl.className = 'matching-feedback is-success';
    drawMatchingLines();
    matchingFeedbackEl.textContent = `¡Conexión correcta! +${pointsPerConnection} puntos`;
  } else {
    game.wrong += 1;
    state.userWrong += 1;
    state.userScore -= pointsPerConnection;
    matchingFeedbackEl.textContent = `Conexión incorrecta. -${pointsPerConnection} puntos`;
    matchingFeedbackEl.className = 'matching-feedback is-error';
  }
  matchingScoreEl.textContent = `${game.attempts}/${game.pairs.length} conexiones`;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;

  game.selectedTerm = null;
  game.selectedDefinition = null;
  if (game.attempts === game.pairs.length) finishMatchingLevel();
}

function disableMatchingButtons(term, definition) {
  document.querySelectorAll(`#matching-level .matching-term[data-matching-value="${CSS.escape(term)}"], #matching-level .matching-definition[data-matching-value="${CSS.escape(definition)}"]`)
    .forEach((button) => {
      button.disabled = true;
      button.classList.remove('is-selected');
    });
}

function drawMatchingLines() {
  const game = state.matchingGame;
  const boardRect = matchingBoardEl.getBoundingClientRect();
  matchingLinesEl.setAttribute('width', boardRect.width);
  matchingLinesEl.setAttribute('height', boardRect.height);
  matchingLinesEl.replaceChildren();

  game.connections.forEach(({ term, definition, isCorrect }) => {
    const termButton = matchingTermsEl.querySelector(`[data-matching-value="${CSS.escape(term)}"]`);
    const definitionButton = matchingDefinitionsEl.querySelector(`[data-matching-value="${CSS.escape(definition)}"]`);
    if (!termButton || !definitionButton) return;
    const termRect = termButton.getBoundingClientRect();
    const definitionRect = definitionButton.getBoundingClientRect();
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', termRect.right - boardRect.left);
    line.setAttribute('y1', termRect.top + termRect.height / 2 - boardRect.top);
    line.setAttribute('x2', definitionRect.left - boardRect.left);
    line.setAttribute('y2', definitionRect.top + definitionRect.height / 2 - boardRect.top);
    line.classList.add('matching-line', isCorrect ? 'matching-line-correct' : 'matching-line-wrong');
    matchingLinesEl.appendChild(line);
  });
}

function finishMatchingLevel() {
  const level = levelConfig[1];
  const game = state.matchingGame;
  state.levelResults.push({
    level: level.name,
    points: level.points,
    userCorrect: game.matched,
    userWrong: game.wrong,
    botCorrect: game.botCorrect,
    botWrong: game.pairs.length - game.botCorrect
  });
  state.levelIndex += 1;
  state.questionIndex = 0;
  state.levelUserCorrect = 0;
  state.levelBotCorrect = 0;
  state.matchingGame = null;
  matchingFeedbackEl.textContent = '¡Nivel 2 completado! Cargando el siguiente nivel...';
  setTimeout(() => setView('level1'), 700);
}

function renderBudgetLevel() {
  matchingLevelEl.hidden = true;
  levelBanner.hidden = true;
  levelBody.hidden = true;
  budgetLevelEl.hidden = false;
  levelIndicator.textContent = 'Nivel 3 • Decide tu presupuesto';
  hintBtn.hidden = true;
  hintBtn.disabled = true;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;

  if (!state.budgetGame) startBudgetLevel();
}

function startBudgetLevel() {
  state.budgetGame = {
    income: 1000,
    balance: 1000,
    scenarioIndex: 0,
    smartChoices: 0,
    botSmartChoices: 0,
    timerId: null,
    timerSeconds: 8,
    resolving: false
  };
  budgetFeedbackEl.textContent = '';
  budgetFeedbackEl.className = 'budget-feedback';
  renderBudgetScenario();
}

function renderBudgetScenario() {
  const game = state.budgetGame;
  if (!game) return;
  const scenario = balancedBudgetScenarios[game.scenarioIndex];
  budgetScenarioTitleEl.textContent = scenario.title;
  budgetScenarioTextEl.textContent = scenario.text;
  budgetSpentEl.textContent = `${game.scenarioIndex}/${balancedBudgetScenarios.length}`;
  budgetRemainingEl.textContent = `$${game.balance}`;
  budgetRemainingEl.classList.toggle('is-negative', game.balance < 0);
  budgetMeterFillEl.style.width = `${Math.min(100, Math.max(0, game.balance / game.income * 100))}%`;
  budgetMeterFillEl.classList.toggle('is-over', game.balance < 200);
  budgetExpensesEl.replaceChildren();

  scenario.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'budget-expense budget-choice';
    button.type = 'button';
    button.innerHTML = `<span class="budget-expense-icon">${index === 0 ? '✓' : '!'}</span><span><strong>${option.label}</strong><small>${option.impact ? `Impacto: $${option.impact}` : 'Sin gasto inmediato'}</small></span><b>Elegir</b>`;
    button.addEventListener('click', () => chooseBudgetOption(option));
    budgetExpensesEl.appendChild(button);
  });
  startBudgetTimer();
}

function startBudgetTimer() {
  const game = state.budgetGame;
  if (!game) return;
  if (game.timerId) clearInterval(game.timerId);
  game.timerSeconds = 8;
  budgetTimerEl.textContent = game.timerSeconds;
  budgetTimerEl.classList.remove('is-urgent');
  game.timerId = setInterval(() => {
    game.timerSeconds -= 1;
    budgetTimerEl.textContent = game.timerSeconds;
    if (game.timerSeconds <= 1) budgetTimerEl.classList.add('is-urgent');
    if (game.timerSeconds <= 0) {
      clearInterval(game.timerId);
      game.timerId = null;
      chooseBudgetOption({ label: 'Tiempo agotado', impact: 0, smart: false }, true);
    }
  }, 1000);
}

function chooseBudgetOption(option, timedOut = false) {
  const game = state.budgetGame;
  if (!game || game.resolving) return;
  game.resolving = true;
  if (game.timerId) {
    clearInterval(game.timerId);
    game.timerId = null;
  }
  game.balance += option.impact;
  game.scenarioIndex += 1;
  if (option.smart) {
    game.smartChoices += 1;
    state.userCorrect += 1;
    budgetFeedbackEl.textContent = option.explanation || 'Buena decisión financiera.';
    budgetFeedbackEl.className = 'budget-feedback is-success';
  } else {
    state.userWrong += 1;
    budgetFeedbackEl.textContent = timedOut
      ? 'Se acabó el tiempo: la decisión cuenta como incorrecta.'
      : option.explanation || 'La decisión no era la más conveniente.';
    budgetFeedbackEl.className = 'budget-feedback is-error';
  }
  const botCorrect = Math.random() < 0.5;
  if (botCorrect) {
    game.botSmartChoices += 1;
    state.botCorrect += 1;
  } else {
    state.botWrong += 1;
  }
  budgetRemainingEl.textContent = `$${game.balance}`;
  budgetSpentEl.textContent = `${game.scenarioIndex}/${balancedBudgetScenarios.length}`;
  budgetExpensesEl.querySelectorAll('.budget-choice').forEach((button) => {
    button.disabled = true;
  });
  setTimeout(() => {
    if (game.scenarioIndex === balancedBudgetScenarios.length) {
      finishBudgetLevel(game.smartChoices >= 3);
    } else {
      game.resolving = false;
      budgetFeedbackEl.textContent = '';
      renderBudgetScenario();
    }
  }, 650);
}

function finishBudgetLevel(userCorrect) {
  const level = levelConfig[2];
  const game = state.budgetGame;
  const botCorrect = game.botSmartChoices >= 3;
  if (userCorrect) {
    state.userScore += level.points;
  } else {
    state.userScore -= level.points;
  }
  if (botCorrect) state.botScore += level.points;
  state.levelResults.push({
    level: level.name,
    points: level.points,
    userCorrect: game.smartChoices,
    userWrong: balancedBudgetScenarios.length - game.smartChoices,
    botCorrect: game.botSmartChoices,
    botWrong: balancedBudgetScenarios.length - game.botSmartChoices
  });
  state.levelIndex += 1;
  state.questionIndex = 0;
  state.levelUserCorrect = 0;
  state.levelBotCorrect = 0;
  if (game.timerId) clearInterval(game.timerId);
  state.budgetGame = null;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;
  setTimeout(() => setView('level1'), 900);
}

const financialSignals = [
  { title: 'Un ahorro para emergencias', text: 'Apartas una parte de tus ingresos antes de comenzar a gastar.', answer: 'green', explanation: 'Ahorrar primero ayuda a prepararte para imprevistos.' },
  { title: 'Una compra por impulso', text: 'Ves una oferta y compras algo que no necesitas porque tiene descuento.', answer: 'red', explanation: 'Un descuento no convierte un deseo en una necesidad.' },
  { title: 'Una deuda planificada', text: 'Pides un préstamo, revisas los intereses y sabes cómo devolverlo.', answer: 'yellow', explanation: 'Puede ser útil, pero requiere revisar el costo y el plazo.' },
  { title: 'Una inversión sin investigar', text: 'Inviertes porque prometen ganancias rápidas y no explican los riesgos.', answer: 'red', explanation: 'Toda inversión tiene riesgo y debe entenderse antes de decidir.' },
  { title: 'Un presupuesto equilibrado', text: 'Organizas tus gastos, separas ahorro y dejas espacio para una meta.', answer: 'green', explanation: 'Un presupuesto ordena el dinero y ayuda a cumplir objetivos.' }
];

function renderPortfolioLevel() {
  matchingLevelEl.hidden = true;
  budgetLevelEl.hidden = true;
  portfolioLevelEl.hidden = false;
  levelBanner.hidden = true;
  levelBody.hidden = true;
  levelIndicator.textContent = 'Nivel 4 • Semáforo financiero';
  hintBtn.hidden = true;
  hintBtn.disabled = true;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;
  if (!state.portfolioGame) startPortfolioLevel();
}

function startPortfolioLevel() {
  state.portfolioGame = { scenarioIndex: 0, correctAnswers: 0, botCorrectAnswers: 0, resolving: false };
  portfolioFeedbackEl.textContent = '';
  portfolioFeedbackEl.className = 'portfolio-feedback';
  renderPortfolioAssets();
}

function renderPortfolioAssets() {
  const game = state.portfolioGame;
  const signal = financialSignals[game?.scenarioIndex];
  if (!game || !signal) return;
  portfolioAssetsEl.innerHTML = `
    <article class="portfolio-asset portfolio-signal-card">
      <span class="portfolio-risk">Caso ${game.scenarioIndex + 1}/${financialSignals.length}</span>
      <div class="portfolio-asset-heading"><strong>${signal.title}</strong></div>
      <p>${signal.text}</p>
      <small>¿Cómo clasificarías esta conducta?</small>
    </article>
    <div class="portfolio-signal-options">
      <button type="button" class="portfolio-signal-button is-green" data-signal-answer="green">Verde<br><small>Buena práctica</small></button>
      <button type="button" class="portfolio-signal-button is-yellow" data-signal-answer="yellow">Amarillo<br><small>Revisar con cuidado</small></button>
      <button type="button" class="portfolio-signal-button is-red" data-signal-answer="red">Rojo<br><small>Riesgo financiero</small></button>
    </div>
  `;
  portfolioAllocatedEl.textContent = `${game.scenarioIndex}/${financialSignals.length}`;
  portfolioRemainingEl.textContent = `${game.correctAnswers} aciertos`;
  portfolioSubmitBtn.disabled = game.resolving;
  portfolioAssetsEl.querySelectorAll('.portfolio-signal-button').forEach((button) => {
    button.addEventListener('click', () => chooseFinancialSignal(button.dataset.signalAnswer));
  });
}

function chooseFinancialSignal(answer) {
  const game = state.portfolioGame;
  const signal = financialSignals[game?.scenarioIndex];
  if (!game || !signal || game.resolving) return;
  game.resolving = true;
  const userCorrect = answer === signal.answer;
  const botCorrect = Math.random() < getBotAnswerChance();
  if (userCorrect) {
    state.userCorrect += 1;
    game.correctAnswers += 1;
    portfolioFeedbackEl.textContent = `¡Correcto! ${signal.explanation}`;
    portfolioFeedbackEl.className = 'portfolio-feedback is-success';
  } else {
    state.userWrong += 1;
    portfolioFeedbackEl.textContent = `No era la mejor clasificación. ${signal.explanation}`;
    portfolioFeedbackEl.className = 'portfolio-feedback is-error';
  }
  if (botCorrect) {
    state.botCorrect += 1;
    game.botCorrectAnswers += 1;
  } else {
    state.botWrong += 1;
  }
  setTimeout(() => {
    game.scenarioIndex += 1;
    if (game.scenarioIndex === financialSignals.length) {
      finishPortfolioLevel(game.correctAnswers >= 3, game.botCorrectAnswers >= 3);
      return;
    }
    game.resolving = false;
    portfolioFeedbackEl.textContent = '';
    renderPortfolioAssets();
  }, 900);
}

function finishPortfolioLevel(userCorrect, botCorrect) {
  const level = levelConfig[3];
  const game = state.portfolioGame;
  if (userCorrect) state.userScore += level.points;
  else state.userScore -= level.points;
  if (botCorrect) state.botScore += level.points;
  state.levelResults.push({
    level: level.name,
    points: level.points,
    userCorrect: game.correctAnswers,
    userWrong: financialSignals.length - game.correctAnswers,
    botCorrect: game.botCorrectAnswers,
    botWrong: financialSignals.length - game.botCorrectAnswers
  });
  state.levelIndex += 1;
  state.questionIndex = 0;
  state.levelUserCorrect = 0;
  state.levelBotCorrect = 0;
  state.portfolioGame = null;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;
  setTimeout(() => setView('level1'), 500);
}

const priorityChallenges = [
  {
    title: 'Llegó tu ingreso',
    text: '¿Qué haces primero para organizar tu dinero?',
    options: ['Separar ahorro y gastos fijos', 'Comprar algo por impulso', 'Gastar todo y revisar después'],
    answer: 0,
    explanation: 'Separar prioridades evita gastar dinero que ya tiene un destino.'
  },
  {
    title: 'Vence una deuda',
    text: 'Tienes dinero disponible y una cuota vence hoy. ¿Qué priorizas?',
    options: ['Pagar a tiempo', 'Ignorarla hasta fin de mes', 'Pedir otro préstamo sin revisar intereses'],
    answer: 0,
    explanation: 'Pagar a tiempo evita intereses y protege tu presupuesto.'
  },
  {
    title: 'Quieres comprar algo',
    text: 'Antes de pagar, ¿qué paso demuestra consumo responsable?',
    options: ['Comparar necesidad, precio y calidad', 'Comprar porque está de moda', 'Elegir siempre lo más caro'],
    answer: 0,
    explanation: 'Comparar necesidad, precio y calidad ayuda a tomar una decisión consciente.'
  },
  {
    title: 'Te ofrecen invertir',
    text: 'La propuesta promete ganancias rápidas. ¿Qué haces primero?',
    options: ['Investigar riesgos y condiciones', 'Invertir de inmediato', 'Pedir dinero prestado para invertir'],
    answer: 0,
    explanation: 'Entender el riesgo y el plazo es necesario antes de invertir.'
  },
  {
    title: 'Tu meta financiera',
    text: 'Quieres ahorrar para una meta concreta. ¿Qué acción te ayuda más?',
    options: ['Definir monto, plazo y aporte periódico', 'Ahorrar solo si sobra dinero', 'Cambiar de meta cada semana'],
    answer: 0,
    explanation: 'Una meta clara necesita un monto, un plazo y un plan.'
  }
];

function renderPrioritiesLevel() {
  matchingLevelEl.hidden = true;
  budgetLevelEl.hidden = true;
  portfolioLevelEl.hidden = true;
  prioritiesLevelEl.hidden = false;
  levelBanner.hidden = true;
  levelBody.hidden = true;
  levelIndicator.textContent = 'Nivel 5 • Reto de prioridades';
  hintBtn.hidden = true;
  hintBtn.disabled = true;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;
  if (!state.prioritiesGame) startPrioritiesLevel();
}

function startPrioritiesLevel() {
  state.prioritiesGame = {
    challengeIndex: 0,
    correctAnswers: 0,
    botCorrectAnswers: 0,
    resolving: false,
    timerId: null,
    timerSeconds: 10
  };
  prioritiesFeedbackEl.textContent = '';
  prioritiesFeedbackEl.className = 'priorities-feedback';
  renderPriorityChallenge();
}

function renderPriorityChallenge() {
  const game = state.prioritiesGame;
  const challenge = priorityChallenges[game?.challengeIndex];
  if (!game || !challenge) return;
  prioritiesTitleEl.textContent = challenge.title;
  prioritiesTextEl.textContent = challenge.text;
  prioritiesProgressEl.textContent = `${game.challengeIndex + 1}/${priorityChallenges.length}`;
  prioritiesScoreEl.textContent = `${game.correctAnswers} aciertos`;
  prioritiesOptionsEl.replaceChildren();
  challenge.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'priorities-option';
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => choosePriority(index));
    prioritiesOptionsEl.appendChild(button);
  });
  startPrioritiesTimer();
}

function startPrioritiesTimer() {
  const game = state.prioritiesGame;
  if (!game) return;
  if (game.timerId) clearInterval(game.timerId);
  game.timerSeconds = 10;
  prioritiesTimerEl.textContent = game.timerSeconds;
  prioritiesTimerEl.classList.remove('is-urgent');
  game.timerId = setInterval(() => {
    game.timerSeconds -= 1;
    prioritiesTimerEl.textContent = game.timerSeconds;
    if (game.timerSeconds <= 3) prioritiesTimerEl.classList.add('is-urgent');
    if (game.timerSeconds <= 0) {
      clearInterval(game.timerId);
      game.timerId = null;
      choosePriority(null, true);
    }
  }, 1000);
}

function choosePriority(answer, timedOut = false) {
  const game = state.prioritiesGame;
  const challenge = priorityChallenges[game?.challengeIndex];
  if (!game || !challenge || game.resolving) return;
  game.resolving = true;
  if (game.timerId) {
    clearInterval(game.timerId);
    game.timerId = null;
  }
  const userCorrect = answer === challenge.answer;
  const botCorrect = Math.random() < getBotAnswerChance();
  if (userCorrect) {
    game.correctAnswers += 1;
    state.userCorrect += 1;
    prioritiesFeedbackEl.textContent = `¡Correcto! ${challenge.explanation}`;
    prioritiesFeedbackEl.className = 'priorities-feedback is-success';
  } else {
    state.userWrong += 1;
    prioritiesFeedbackEl.textContent = timedOut
      ? `Se acabó el tiempo. ${challenge.explanation}`
      : `Revisa tu prioridad. ${challenge.explanation}`;
    prioritiesFeedbackEl.className = 'priorities-feedback is-error';
  }
  if (botCorrect) {
    game.botCorrectAnswers += 1;
    state.botCorrect += 1;
  } else {
    state.botWrong += 1;
  }
  prioritiesOptionsEl.querySelectorAll('button').forEach((button) => {
    button.disabled = true;
  });
  setTimeout(() => {
    game.challengeIndex += 1;
    if (game.challengeIndex === priorityChallenges.length) {
      finishPrioritiesLevel();
      return;
    }
    game.resolving = false;
    prioritiesFeedbackEl.textContent = '';
    renderPriorityChallenge();
  }, 850);
}

function finishPrioritiesLevel() {
  const level = levelConfig[4];
  const game = state.prioritiesGame;
  const userCorrect = game.correctAnswers >= 3;
  const botCorrect = game.botCorrectAnswers >= 3;
  if (userCorrect) state.userScore += level.points;
  else state.userScore -= level.points;
  if (botCorrect) state.botScore += level.points;
  state.levelResults.push({
    level: level.name,
    points: level.points,
    userCorrect: game.correctAnswers,
    userWrong: priorityChallenges.length - game.correctAnswers,
    botCorrect: game.botCorrectAnswers,
    botWrong: priorityChallenges.length - game.botCorrectAnswers
  });
  state.levelIndex += 1;
  state.questionIndex = 0;
  if (game.timerId) clearInterval(game.timerId);
  state.prioritiesGame = null;
  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;
  setTimeout(() => setView('results'), 600);
}

function getBotAnswerChance() {
  return 0.8;
}

function togglePause(forceState) {
  if (state.levelIndex >= levelConfig.length) return;

  const shouldPause = typeof forceState === 'boolean' ? forceState : !state.isPaused;
  state.isPaused = shouldPause;
  pauseOverlayEl.hidden = !shouldPause;
  pauseGameBtn.textContent = shouldPause ? 'Continuar' : 'Pausar';
}

function useHint() {
  const question = getCurrentQuestion();
  if (!question || state.isPaused || !canUseHint()) return;

  const hintText = question.hint || 'Busca la opción que tenga sentido en contexto financiero.';
  state.currentHint = hintText;
  state.hintsUsed += 1;
  hintPanelEl.textContent = `Pista: ${hintText}`;
  hintPanelEl.hidden = false;
}

function answerQuestion(userChoice) {
  if (state.isPaused) return;

  const level = levelConfig[state.levelIndex];
  const question = getCurrentQuestion();
  if (!question) return;

  const userCorrect = userChoice === question.answer;
  state.userHistory.push(userCorrect);

  if (userCorrect) {
    state.userCorrect += 1;
    state.levelUserCorrect += 1;
  } else {
    state.userWrong += 1;
  }

  const botChance = getBotAnswerChance();
  const botAnswer = Math.random() < botChance;
  const botCorrect = botAnswer === question.answer;

  if (botCorrect) {
    state.botCorrect += 1;
    state.levelBotCorrect += 1;
  } else {
    state.botWrong += 1;
  }

  const correctBtn = document.querySelector('.choice-correct');
  const wrongBtn = document.querySelector('.choice-wrong');

  correctBtn.disabled = true;
  wrongBtn.disabled = true;

  botThinkingEl.hidden = false;
  botThinkingEl.textContent = botAnswer ? 'BOT respondió correcta' : 'BOT respondió incorrecta';

  const direction = userChoice ? 'left' : 'right';
  levelCard.classList.remove('slide-out-left', 'slide-out-right');
  levelCard.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right');

  setTimeout(() => {
    correctBtn.disabled = false;
    wrongBtn.disabled = false;
    botThinkingEl.hidden = true;

    state.questionIndex += 1;

    if (state.questionIndex >= level.questions.length) {
      finishLevel();
      return;
    }

    renderLevelQuestion();
  }, 550);
}

function finishLevel() {
  const level = levelConfig[state.levelIndex];
  const userLevelCorrect = state.levelUserCorrect;
  const botLevelCorrect = state.levelBotCorrect;

  if (userLevelCorrect > botLevelCorrect) {
    state.userScore += level.points;
  } else if (botLevelCorrect > userLevelCorrect) {
    state.botScore += level.points;
  }

  state.levelResults.push({
    level: level.name,
    points: level.points,
    userCorrect: userLevelCorrect,
    userWrong: level.questions.length - userLevelCorrect,
    botCorrect: botLevelCorrect,
    botWrong: level.questions.length - botLevelCorrect
  });

  state.levelIndex += 1;
  state.questionIndex = 0;
  state.levelUserCorrect = 0;
  state.levelBotCorrect = 0;

  userScoreEl.textContent = state.userScore;
  botScoreEl.textContent = state.botScore;

  if (state.levelIndex >= levelConfig.length) {
    setView('results');
    return;
  }

  setTimeout(() => setView('level1'), 500);
}

function renderResults() {
  resultsUserScoreEl.textContent = state.userScore;
  resultsBotScoreEl.textContent = state.botScore;
  resultsUserCorrectEl.textContent = state.userCorrect;
  resultsUserWrongEl.textContent = state.userWrong;
  resultsBotCorrectEl.textContent = state.botCorrect;
  resultsBotWrongEl.textContent = state.botWrong;

  if (state.userScore > state.botScore) {
    winnerMessageEl.textContent = '¡GANASTE!';
  } else if (state.botScore > state.userScore) {
    winnerMessageEl.textContent = '¡Gana el BOT!';
  } else {
    winnerMessageEl.textContent = 'EMPATE';
  }
}

function applyPreferences() {
  const savedTheme = localStorage.getItem('finanquiz-theme') || 'light';
  const savedMotion = localStorage.getItem('finanquiz-motion') || 'on';
  document.body.dataset.theme = savedTheme;
  document.body.dataset.motion = savedMotion === 'off' ? 'reduced' : 'full';
  themeToggle.checked = savedTheme === 'dark';
  motionToggle.checked = savedMotion !== 'off';
}

function getStoredProfile() {
  const profile = localStorage.getItem('finanquiz-profile');
  return profile ? JSON.parse(profile) : null;
}

document.querySelectorAll('[data-view]').forEach((control) => {
  control.addEventListener('click', () => {
    const viewName = control.dataset.view;

    if (viewName === 'home') {
      resetGameState();
      setView('home');
      return;
    }

    if (viewName === 'level1') {
      resetGameState();
      setView('level1');
      return;
    }

    if (viewName === 'instructions') {
      instructionSlideIndex = 0;
      renderInstructionSlide();
    }

    setView(viewName);
  });
});

instructionPrevBtn.addEventListener('click', () => {
  instructionSlideIndex = Math.max(0, instructionSlideIndex - 1);
  renderInstructionSlide();
});

instructionNextBtn.addEventListener('click', () => {
  instructionSlideIndex = Math.min(instructionSlides.length - 1, instructionSlideIndex + 1);
  renderInstructionSlide();
});

document.querySelectorAll('.choice-button').forEach((button) => {
  button.addEventListener('click', () => {
    const userChoice = button.classList.contains('choice-correct');
    answerQuestion(userChoice);
  });
});

document.querySelectorAll('.auth-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const inputs = form.querySelectorAll('input');

    let valid = true;
    inputs.forEach((input) => {
      let message = '';

      if (!input.value.trim()) {
        message = 'Este campo es obligatorio.';
      } else if (input.type === 'email' && !input.validity.valid) {
        message = 'Ingresa un email valido.';
      } else if (input.minLength && input.value.length < input.minLength) {
        message = `Usa al menos ${input.minLength} caracteres.`;
      }

      input.classList.toggle('invalid', Boolean(message));
      const error = document.querySelector(`[data-error-for="${input.id}"]`);
      if (error) error.textContent = message;

      if (message) valid = false;
    });

    const password = form.querySelector('[name="password"]');
    const confirm = form.querySelector('[name="confirm"]');
    if (confirm && password.value !== confirm.value) {
      confirm.classList.add('invalid');
      const confirmError = document.querySelector('[data-error-for="register-confirm"]');
      if (confirmError) confirmError.textContent = 'Las contrasenas no coinciden.';
      valid = false;
    }

    if (!valid) {
      status.textContent = 'Revisa los campos marcados.';
      status.className = 'form-status is-error';
      return;
    }

    status.textContent = form.id === 'login-form'
      ? 'Datos correctos. Bienvenido a FinanQuiz.'
      : 'Cuenta creada. Ya podes empezar a jugar.';
    status.className = 'form-status is-success';

    localStorage.setItem('finanquiz-profile', JSON.stringify({
      name: form.querySelector('[name="name"]')?.value || '',
      email: form.querySelector('[name="email"]').value,
      password: password.value
    }));
    form.reset();
  });
});

themeToggle.addEventListener('change', () => {
  const theme = themeToggle.checked ? 'dark' : 'light';
  document.body.dataset.theme = theme;
  localStorage.setItem('finanquiz-theme', theme);
});

motionToggle.addEventListener('change', () => {
  const motion = motionToggle.checked ? 'on' : 'off';
  document.body.dataset.motion = motion === 'off' ? 'reduced' : 'full';
  localStorage.setItem('finanquiz-motion', motion);
});

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const currentPassword = passwordForm.elements.currentPassword.value;
  const newPassword = passwordForm.elements.newPassword.value;
  const confirmPassword = passwordForm.elements.confirmPassword.value;
  const profile = getStoredProfile();
  const fields = [
    ['current-password', currentPassword, 'La contraseña actual es obligatoria.'],
    ['new-password', newPassword, 'La nueva contraseña es obligatoria.'],
    ['confirm-password', confirmPassword, 'Repite la nueva contraseña.']
  ];
  let valid = true;

  fields.forEach(([id, value, message]) => {
    const input = document.getElementById(id);
    const error = document.querySelector(`[data-error-for="${id}"]`);
    const fieldMessage = value.trim() ? '' : message;
    input.classList.toggle('invalid', Boolean(fieldMessage));
    error.textContent = fieldMessage;
    if (fieldMessage) valid = false;
  });

  if (newPassword.length < 6) {
    document.querySelector('[data-error-for="new-password"]').textContent = 'Usa al menos 6 caracteres.';
    valid = false;
  }
  if (newPassword !== confirmPassword) {
    document.querySelector('[data-error-for="confirm-password"]').textContent = 'Las contraseñas no coinciden.';
    valid = false;
  }
  if (!profile) {
    passwordStatus.textContent = 'Primero crea o inicia una sesión para cambiar tu contraseña.';
    passwordStatus.className = 'form-status is-error';
    return;
  }
  if (profile.password !== currentPassword) {
    document.querySelector('[data-error-for="current-password"]').textContent = 'La contraseña actual no coincide.';
    valid = false;
  }
  if (!valid) {
    passwordStatus.textContent = 'Revisa los campos marcados.';
    passwordStatus.className = 'form-status is-error';
    return;
  }

  profile.password = newPassword;
  localStorage.setItem('finanquiz-profile', JSON.stringify(profile));
  passwordForm.reset();
  passwordStatus.textContent = 'Contraseña actualizada correctamente.';
  passwordStatus.className = 'form-status is-success';
});

resetPreferencesBtn.addEventListener('click', () => {
  localStorage.removeItem('finanquiz-theme');
  localStorage.removeItem('finanquiz-motion');
  applyPreferences();
  resetGameState();
  passwordForm.reset();
  passwordStatus.textContent = 'Preferencias restablecidas.';
  passwordStatus.className = 'form-status is-success';
});

pauseGameBtn.addEventListener('click', () => {
  togglePause();
});

resumeGameBtn.addEventListener('click', () => {
  togglePause(false);
});

menuGameBtn.addEventListener('click', () => {
  resetGameState();
  setView('home');
});

pauseRestartBtn.addEventListener('click', () => {
  resetGameState();
  setView('level1');
});

restartGameBtn.addEventListener('click', () => {
  resetGameState();
  setView('level1');
});

hintBtn.addEventListener('click', () => {
  useHint();
});

window.addEventListener('resize', () => {
  if (state.matchingGame) drawMatchingLines();
});

applyPreferences();
setView('home');