// styles
import styles from "./styles.module.css"

// components
import { QuestionAnswer } from "../QuestionAnswer"
import { useState } from "react";

const QUESTIONS = [
    {
        id: 1,
        question: "Qual é o meu nome ?",
        answer: ["Miguel", "Luis", "Daniel", "Ana"],
        correctAnswer: "Daniel"
    },
    {
        id: 2,
        question: "Qual é a minha idade?",
        answer: ["19", "15", "30", "22"],
        correctAnswer: "19"
    },
    {
        id: 3,
        question: "O que eu sou ?",
        answer: ["Programador", "Médico", "Eletricista", "Jogador"],
        correctAnswer: "Programador"
    },
    {
        id: 4,
        question: "Qual é Daniel ?",
        answer: ["Homen de Ferro", "Super man", "Homen Aranha", "Homen Formiga"],
        correctAnswer: "Homen Formiga"
    }

]

export function Quiz() {
    const currentQuestion = QUESTIONS[0];
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [isCurrentQuestionAnswered , setIsCurrentQuestionAnswered] = useState(false)

const handleAnswerQuestion = (event, question, answer) => {
    if(isCurrentQuestionAnswered) {
            return;
        }
    const isCorrectAnswer = question.correctAnswer === answer

    const resultClassName = isCorrectAnswer ? styles.correct : styles.incorrect
        event.currentTarget.classList.toggle(resultClassName)

        if(isCorrectAnswer) {
            setCorrectAnswersCount(correctAnswersCount + 1)
        }

        setIsCurrentQuestionAnswered(true)

    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.quiz}>
                    <header className={styles.quizHeader}>
                        <span className={styles.questionCount}>PERGUNTA 1/3</span>
                        <p className={styles.question}> 
                            {currentQuestion.question}   
                        </p>
                    </header>

                    <ul className={styles.answer}>
                        {currentQuestion.answer.map((answer) => (
                            <li key={answer} className={styles.answerItem}>
                                <QuestionAnswer 
                                    answer={answer} question={currentQuestion}
                                    handleAnswerQuestion = {handleAnswerQuestion}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
        </div>
        
    )
}