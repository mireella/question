const quizData = [
    {
        question: "1. Você evita consumir produtos de empresas que prejudicam o meio ambiente?",
        options: ["Sempre", "Às vezes", "Nunca"],
        scores: [3, 2, 0]
    },
    {
        question: "2. Participa de campanhas sociais ou culturais?",
        options: ["Frequentemente", "Raramente", "Nunca"],
        scores: [3, 1, 0]
    },
    {
        question: "3. Separar lixo reciclável é uma prática em sua casa?",
        options: ["Sim, sempre", "Às vezes", "Não faço isso"],
        scores: [3, 2, 0]
    },
    {
        question: "4. Consome produtos de pequenos produtores ou artesãos locais?",
        options: ["Sim, valorizo muito", "De vez em quando", "Não me preocupo com isso"],
        scores: [3, 2, 0]
    },
    {
        question: "5. O que você pensa sobre mudanças climáticas?",
        options: ["É urgente agir", "Talvez seja exagero", "Não acredito nisso"],
        scores: [3, 1, 0]
    },
    {
        question: "6. Você evita o desperdício de água e energia?",
        options: ["Sempre", "Às vezes", "Não me preocupo com isso"],
        scores: [3, 2, 0]
    },
    {
        question: "7. Participa de ações de voluntariado?",
        options: ["Sim, regularmente", "Às vezes", "Nunca participei"],
        scores: [3, 2, 0]
    },
    {
        question: "8. Você procura se informar sobre questões sociais e ambientais?",
        options: ["Sim, estou sempre atento(a)", "De vez em quando", "Não ligo muito para isso"],
        scores: [3, 2, 0]
    }
];

let currentQuestion = 0;
let totalScore = 0;

const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next');
const resultContainer = document.getElementById('result');
const progressContainer = document.getElementById('progress');
const restartButton = document.getElementById('restart');

function loadQuestion() {
    const q = quizData[currentQuestion];
    quizContainer.innerHTML = `<h2>${q.question}</h2>`;
    
    q.options.forEach((option, index) => {
        quizContainer.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${option}
            </label><br>
        `;
    });

    progressContainer.innerText = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
}

loadQuestion();

nextButton.addEventListener('click', () => {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (!answer) {
        alert('Por favor, selecione uma opção!');
        return;
    }

    const selected = parseInt(answer.value);
    totalScore += quizData[currentQuestion].scores[selected];
    
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.style.display = 'none';
    nextButton.style.display = 'none';
    progressContainer.style.display = 'none';
    restartButton.style.display = 'inline-block';

    let message = '';

    if (totalScore >= 20) {
        message = "Parabéns! Você possui uma **alta consciência social e ambiental**.";
    } else if (totalScore >= 12) {
        message = "Você está no **caminho certo**! Ainda pode melhorar sua atuação social e ambiental.";
    } else {
        message = "Atenção! Reflita mais sobre como suas atitudes **impactam** a sociedade e o meio ambiente.";
    }

    resultContainer.innerHTML = `
        <h2>Resultado</h2>
        <p>${message}</p>
        <p>Sua pontuação: ${totalScore}</p>
    `;
}

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    totalScore = 0;
    quizContainer.style.display = 'block';
    nextButton.style.display = 'inline-block';
    progressContainer.style.display = 'block';
    resultContainer.innerHTML = '';
    restartButton.style.display = 'none';
    loadQuestion();
});
