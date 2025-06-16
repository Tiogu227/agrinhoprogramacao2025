let quizzes = [];

let currentQuizIndex = 0;

let score = 0;

let gameState = 'playing'; // 'playing', 'feedback', 'finished'

let buttonA, buttonB, buttonC, buttonD;

let feedbackMessage = '';

let feedbackColor;

let selectedOption = -1; // Armazena o índice da opção clicada

let correctOptionIndex = -1; // Armazena o índice da resposta correta

function setup() {

  let canvas = createCanvas(windowWidth, windowHeight);

  // Definição dos quizzes

  quizzes = [

    {

      question: "Qual característica melhor descreve o ambiente rural?",

      options: ["Grandes edifícios", "Pouca vegetação", "Espaços abertos e natureza", "Transporte público intenso"],

      correct: 2 // Índice da opção correta (0, 1, 2, 3)

    },

    {

      question: "O que é mais comum encontrar em uma cidade grande?",

      options: ["Pequenas fazendas", "Shoppings e arranha-céus", "Animais selvagens", "Silêncio absoluto"],

      correct: 1

    },

    {

      question: "Qual o principal produto que o campo fornece para a cidade?",

      options: ["Tecnologia", "Alimentos frescos", "Veículos", "Entretenimento"],

      correct: 1

    },

    {

      question: "Qual o principal benefício que a cidade oferece ao campo?",

      options: ["Mão de obra rural", "Máquinas agrícolas", "Acesso a mercados e serviços", "Florestas"],

      correct: 2

    },

    {

      question: "O que caracteriza a conexão entre campo e cidade?",

      options: ["Total independência", "Troca de bens e serviços", "Isolamento mútuo", "Somente conflitos"],

      correct: 1

    }

  ];

  // Criação dos botões de opção

  buttonA = createButton('');

  buttonB = createButton('');

  buttonC = createButton('');

  buttonD = createButton('');

  // Posicionamento e estilização dos botões (ajuste conforme necessário)

  let buttonWidth = 250; // Aumentei um pouco a largura

  let buttonHeight = 40;

  let buttonX = width / 2 - buttonWidth / 2;

  buttonA.position(buttonX, 150);

  buttonA.size(buttonWidth, buttonHeight);

  buttonA.mousePressed(() => checkAnswer(0));

  buttonB.position(buttonX, 200);

  buttonB.size(buttonWidth, buttonHeight);

  buttonB.mousePressed(() => checkAnswer(1));

  buttonC.position(buttonX, 250);

  buttonC.size(buttonWidth, buttonHeight);

  buttonC.mousePressed(() => checkAnswer(2));

  buttonD.position(buttonX, 300);

  buttonD.size(buttonWidth, buttonHeight);

  buttonD.mousePressed(() => checkAnswer(3));

  // Estilo padrão dos botões

  applyButtonDefaultStyle();

  loadQuiz();

}

function draw() {

  background(220);

  if (gameState === 'playing' || gameState === 'feedback') {

    // Desenha a pergunta

    fill(0);

    textAlign(CENTER);

    textSize(18);

    text(quizzes[currentQuizIndex].question, width / 2, 80);

    // Exibe a pontuação

    textSize(14);

    textAlign(LEFT);

    text(`Pontuação: ${score}`, 20, 30);

    // Se estiver em modo de feedback, exibe a mensagem

    if (gameState === 'feedback') {

      fill(feedbackColor);

      textSize(20);

      textAlign(CENTER);

      text(feedbackMessage, width / 2, height - 50);

    }

  } else if (gameState === 'finished') {

    // Tela final do quiz

    fill(0);

    textAlign(CENTER);

    textSize(32);

    text("Quiz Concluído!", width / 2, height / 2 - 50);

    textSize(24);

    text(`Sua pontuação final: ${score} de ${quizzes.length}`, width / 2, height / 2 + 10);

    // Esconde os botões quando o quiz termina

    buttonA.hide();

    buttonB.hide();

    buttonC.hide();

    buttonD.hide();

  }

}

function loadQuiz() {

  if (currentQuizIndex < quizzes.length) {

    // Reinicia o estado para a próxima pergunta

    gameState = 'playing';

    feedbackMessage = '';

    selectedOption = -1;

    correctOptionIndex = quizzes[currentQuizIndex].correct;

    // Atualiza o texto dos botões para a nova pergunta

    buttonA.html('A) ' + quizzes[currentQuizIndex].options[0]);

    buttonB.html('B) ' + quizzes[currentQuizIndex].options[1]);

    buttonC.html('C) ' + quizzes[currentQuizIndex].options[2]);

    buttonD.html('D) ' + quizzes[currentQuizIndex].options[3]);

    // Garante que os botões estão visíveis e com estilo padrão

    buttonA.show();

    buttonB.show();

    buttonC.show();

    buttonD.show();

    applyButtonDefaultStyle();

  } else {

    gameState = 'finished'; // Marca o quiz como terminado

  }

}

function checkAnswer(optionIndex) {

  if (gameState === 'playing') {

    selectedOption = optionIndex;

    let currentQuiz = quizzes[currentQuizIndex];

    if (selectedOption === currentQuiz.correct) {

      score++;

      feedbackMessage = "Correto!";

      feedbackColor = color(0, 150, 0); // Verde

      highlightButton(getButtonByIndex(selectedOption), 'correct');

    } else {

      feedbackMessage = `Incorreto! A resposta correta era: ${currentQuiz.options[currentQuiz.correct]}`;

      feedbackColor = color(255, 0, 0); // Vermelho

      highlightButton(getButtonByIndex(selectedOption), 'incorrect');

      highlightButton(getButtonByIndex(currentQuiz.correct), 'correct'); // Mostra a correta

    }

    gameState = 'feedback'; // Entra no estado de feedback

    // Desabilita os botões para evitar múltiplos cliques

    disableButtons();

    // Aguarda um pouco antes de ir para a próxima pergunta

    setTimeout(() => {

      currentQuizIndex++;

      loadQuiz();

    }, 2000); // 2 segundos de feedback

  }

}

function applyButtonDefaultStyle() {

  const buttons = [buttonA, buttonB, buttonC, buttonD];

  buttons.forEach(btn => {

    btn.style('background-color', '#E0E0E0'); // Cinza claro

    btn.style('color', '#000000');

    btn.style('border', '1px solid #C0C0C0');

    btn.style('font-size', '16px');

    btn.style('cursor', 'pointer');

    btn.style('border-radius', '5px');

    btn.removeAttribute('disabled'); // Garante que estejam habilitados

  });

}

function highlightButton(button, type) {

  if (type === 'correct') {

    button.style('background-color', '#4CAF50'); // Verde vibrante

    button.style('color', '#FFFFFF');

  } else if (type === 'incorrect') {

    button.style('background-color', '#F44336'); // Vermelho vibrante

    button.style('color', '#FFFFFF');

  }

}

function getButtonByIndex(index) {

  switch (index) {

    case 0: return buttonA;

    case 1: return buttonB;

    case 2: return buttonC;

    case 3: return buttonD;

    default: return null;

  }

}

function disableButtons() {

  buttonA.attribute('disabled', '');

  buttonB.attribute('disabled', '');

  buttonC.attribute('disabled', '');

  buttonD.attribute('disabled', '');

}