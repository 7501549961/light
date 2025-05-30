const questions = [
    {
        question: "আলোর বেগ সবচেয়ে বেশি কোথায়?",
        options: ["জল", "কাঁচ", "বায়ু", "শূন্যস্থান"],
        answer: "শূন্যস্থান"
    },
    {
        question: "নিচের কোনটি আলোর প্রতিফলনের নিয়ম?",
        options: ["আপতন কোণ > প্রতিফলন কোণ", "আপতন কোণ < প্রতিফলন কোণ", "আপতন কোণ = প্রতিফলন কোণ", "আপতিত রশ্মি ও অভিলম্ব একই সরলরেখায় থাকে"],
        answer: "আপতন কোণ = প্রতিফলন কোণ"
    },
    {
        question: "একটি অবতল দর্পণের ফোকাস দূরত্ব 10 সেমি হলে, বক্রতা ব্যাসার্ধ কত?",
        options: ["5 সেমি", "10 সেমি", "20 সেমি", "কোনোটিই নয়"],
        answer: "20 সেমি"
    },
    {
        question: "লেন্সের ক্ষমতা কোন এককে মাপা হয়?",
        options: ["ওয়াট", "ডায়াপ্টার", "জুল", "নিউটন"],
        answer: "ডায়াপ্টার"
    },
    {
        question: "সাদা আলো প্রিজমের মধ্যে দিয়ে গেলে কয়টি রঙে বিভক্ত হয়?",
        options: ["পাঁচ", "ছয়", "সাত", "আট"],
        answer: "সাত"
    },
    {
        question: "আলোর প্রতিসরণের কারণ কী?",
        options: ["আলোর তরঙ্গদৈর্ঘ্য", "আলোর কম্পাঙ্ক", "মাধ্যমের ঘনত্বের পরিবর্তন", "আলোর তীব্রতা"],
        answer: "মাধ্যমের ঘনত্বের পরিবর্তন"
    },
    {
        question: "কোন ধরণের লেন্সে সর্বদা অসদ বিম্ব গঠিত হয়?",
        options: ["উত্তল লেন্স", "অবতল লেন্স", "উত্তল ও অবতল উভয়ই", "কোনোটিই নয়"],
        answer: "অবতল লেন্স"
    },
    {
        question: "গাড়ির হেডলাইটে কোন ধরণের দর্পণ ব্যবহার করা হয়?",
        options: ["সমতল দর্পণ", "উত্তল দর্পণ", "অবতল দর্পণ", "অধিবৃত্তীয় দর্পণ"],
        answer: "অধিবৃত্তীয় দর্পণ"
    },
    {
        question: "বায়ুর সাপেক্ষে কাঁচের প্রতিসরাঙ্ক কত?",
        options: ["প্রায় 1.0", "প্রায় 1.5", "প্রায় 2.0", "প্রায় 2.5"],
        answer: "প্রায় 1.5"
    },
    {
        question: "রামধনু তৈরীর মূল কারণ কী?",
        options: ["আলোর প্রতিফলন", "আলোর প্রতিসরণ", "আলোর বিচ্ছুরণ", "আলোর ব্যতিচার"],
        answer: "আলোর বিচ্ছুরণ"
    }
];

const questionNumberElement = document.querySelector('.question-number');
const questionTextElement = document.querySelector('.question-text');
const optionsAreaElement = document.querySelector('.options-area');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const submitButton = document.querySelector('.submit-button');
const reviewButtons = document.querySelectorAll('.grid-button');
const resultAreaElement = document.querySelector('.result-area');
const scoreElement = document.getElementById('score');
const correctCountElement = document.getElementById('correct-count');
const wrongCountElement = document.getElementById('wrong-count');
const timeElement = document.getElementById('time');
const reviewContainer = document.getElementById('review-questions');

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 10 * 60; // 10 মিনিট
let timerInterval;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timeElement.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showResult();
    } else {
        timeLeft--;
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionNumberElement.textContent = `প্রশ্ন ${currentQuestionIndex + 1}`;
    questionTextElement.textContent = currentQuestion.question;

    optionsAreaElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsAreaElement.appendChild(button);

        if (userAnswers[currentQuestionIndex] === option) {
            button.classList.add('selected');
        }
    });

    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = false; // সব সময় enable থাকবে
    updateReviewButtons();
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected');
    updateReviewButtons();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitTest() {
    clearInterval(timerInterval);
    showResult();
}

function showResult() {
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.question-area').style.display = 'none';
    document.querySelector('.options-area').style.display = 'none';
    document.querySelector('.navigation-area').style.display = 'none';
    document.querySelector('.review-area').style.display = 'none';
    resultAreaElement.style.display = 'block';

    let correctCount = 0;
    let wrongCount = 0;
    questions.forEach((question, index) => {
        const div = document.createElement('div');
        div.classList.add('result-item');

        let userAnswerText = userAnswers[index] || 'দেওয়া হয়নি';
        let isCorrect = userAnswers[index] === question.answer;

        div.innerHTML = `
            <p class="result-question">প্রশ্ন ${index + 1}: ${question.question}</p>
            <p class="result-answer">আপনার উত্তর: ${userAnswerText}</p>
            <p class="result-answer">সঠিক উত্তর: ${question.answer}</p>
        `;

        if (isCorrect) {
            correctCount++;
            div.classList.add('correct-answer');
        } else if (userAnswers[index] !== null) {
            wrongCount++;
            div.classList.add('wrong-answer');
        }

        reviewContainer.appendChild(div);
    });

    scoreElement.textContent = correctCount;
    correctCountElement.textContent = correctCount;
    wrongCountElement.textContent = wrongCount;
}

function updateReviewButtons() {
    reviewButtons.forEach((button, index) => {
        if (userAnswers[index] !== null) {
            button.classList.add('answered');
        } else {
            button.classList.remove('answered');
        }
        button.addEventListener('click', () => {
            currentQuestionIndex = index;
            loadQuestion();
        });
    });
}

loadQuestion();
startTimer();

nextButton.addEventListener('click', nextQuestion);
prevButton.addEventListener('click', prevQuestion);
submitButton.addEventListener('click', submitTest);