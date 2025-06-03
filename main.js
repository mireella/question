const quizData = [
  {
    question: "O que você faz com o lixo reciclável?",
    options: [
      { text: "Separo e levo para reciclagem", category: "ambiental" },
      { text: "Jogo tudo no mesmo saco", category: "social" },
      { text: "Procuro reutilizar para artesanato", category: "cultural" }
    ]
  },
  {
    question: "Como você costuma se deslocar pela cidade?",
    options: [
      { text: "Prefiro transporte coletivo ou bicicleta", category: "ambiental" },
      { text: "Uso carro, mas ofereço carona", category: "social" },
      { text: "Ando bastante a pé para conhecer o ambiente", category: "cultural" }
    ]
  },
  {
    question: "Em relação a causas sociais, você:",
    options: [
      { text: "Participa de ações comunitárias", category: "social" },
      { text: "Divulga informações e mobiliza amigos", category: "cultural" },
      { text: "Procura doar roupas e alimentos", category: "ambiental" }
    ]
  },
  {
    question: "Qual seu passatempo preferido?",
    options: [
      { text: "Cuidar do jardim ou da natureza", category: "ambiental" },
      { text: "Participar de movimentos sociais", category: "social" },
      { text: "Visitar museus ou eventos culturais", category: "cultural" }
    ]
  },
  {
    question: "Como você contribui para um mundo melhor?",
    options: [
      { text: "Reduzindo meu consumo", category: "ambiental" },
      { text: "Defendendo direitos humanos", category: "social" },
      { text: "Preservando tradições culturais", category: "cultural" }
    ]
  }
];

let currentQuestion = 0;
const answersCount = {
  ambiental: 0,
  social: 0,
  cultural: 0
};

const quiz = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');

function loadQuestion() {
  const q = quizData[currentQuestion];
  quiz.innerHTML = `<h2>${q.question}</h2>`;
  
  q.options.forEach((opt, index) => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.innerText = opt.text;
    div.addEventListener('click', () => selectOption(div, opt.category));
    quiz.appendChild(div);
  });
}

function selectOption(selectedDiv, category) {
  document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
  selectedDiv.classList.add('selected');
  
  nextBtn.onclick = () => {
    answersCount[category]++;
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  };
}

function showResult() {
  quiz.style.display = 'none';
  nextBtn.style.display = 'none';
  
  let maxCategory = '';
  let maxCount = 0;
  
  for (let cat in answersCount) {
    if (answersCount[cat] > maxCount) {
      maxCount = answersCount[cat];
      maxCategory = cat;
    }
  }
  
  let summary = '';
  
  if (maxCategory === 'ambiental') {
    summary = "Você é um **Cidadão Ambiental**! Preocupa-se com a preservação da natureza e adota hábitos sustentáveis.";
  } else if (maxCategory === 'social') {
    summary = "Você é um **Cidadão Social**! Atua na promoção da justiça social, ajudando na construção de uma sociedade mais igualitária.";
  } else {
    summary = "Você é um **Cidadão Cultural**! Valoriza tradições, arte e cultura, promovendo a diversidade e a identidade cultural.";
  }
  
  result.innerHTML = `<h2>Resultado:</h2><p>${summary}</p>`;
}

loadQuestion();
