const CryptoQuestArcade = require('cryptoquestarcade');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

class CryptoQuizMaster extends CryptoQuestArcade {
    constructor() {
        super();
        // Extend with more complex quiz logic and questions
        this.quizQuestions.push(
            { question: "What algorithm does Bitcoin use?", options: ["SHA-256", "Scrypt", "X11"], answer: 0 },
            { question: "Which year was Ethereum launched?", options: ["2013", "2015", "2017"], answer: 1 }
        );
    }

    startQuizWeb(req, res) {
        const question = this.quizQuestions[Math.floor(Math.random() * this.quizQuestions.length)];
        let html = `<h1>${question.question}</h1><form method="post">`;
        question.options.forEach((option, index) => {
            html += `<input type="radio" name="answer" value="${index}" />${option}<br />`;
        });
        html += `<input type="submit" value="Submit" /></form>`;
        res.send(html);
    }

    checkAnswerWeb(req, res, question, userAnswer) {
        if (parseInt(userAnswer) === question.answer) {
            res.send("Correct!");
        } else {
            res.send("Wrong! Better luck next time.");
        }
    }
}

const quizMaster = new CryptoQuizMaster();

app.get('/quiz', (req, res) => quizMaster.startQuizWeb(req, res));
app.post('/quiz', (req, res) => {
    const { question, answer } = req.body;
    quizMaster.checkAnswerWeb(req, res, question, answer);
});

app.listen(port, () => console.log(`CryptoQuizMaster running on port ${port}`));
