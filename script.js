document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const nextButton = document.getElementById('next');

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Wczytaj dane z pliku JSON
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            // Losuj 30 pytań
            questions = shuffleArray(data.questions).slice(0, 30);
            displayQuestion();
        });

    // Funkcja do wyświetlania pytania
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        if (question) {
            const options = question.options;
            const optionsHtml = Object.keys(options).map(option => 
                `<li>
                    <label>
                        <input type="radio" name="question${currentQuestionIndex}" value="${option}">
                        ${options[option]}
                    </label>
                </li>`
            ).join('');

            quizContainer.innerHTML = `
                <div class="question">
                    <h2>${question.question}</h2>
                    <ul class="options">${optionsHtml}</ul>
                </div>
            `;
        } else {
            showResult();
        }
    }

    // Funkcja do pokazywania wyniku
    function showResult() {
        resultContainer.innerHTML = `Twój wynik: ${score} z ${questions.length}`;
        quizContainer.style.display = 'none';
        nextButton.style.display = 'none';
    }

    // Funkcja do losowania pytań
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Obsługuje kliknięcie przycisku "Następne pytanie"
    nextButton.addEventListener('click', () => {
        const selectedOption = quizContainer.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === questions[currentQuestionIndex].correct_answer) {
                score++;
            }
            currentQuestionIndex++;
            displayQuestion();
        } else {
            alert('Proszę wybrać odpowiedź!');
        }
    });
});