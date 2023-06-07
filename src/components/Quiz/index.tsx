// styles
import styles from "./styles.module.css"

// components
import { QuestionAnswer } from "../QuestionAnswer"
import { useState, MouseEvent } from "react";
import { Button } from "../Button";
import { Result } from "../Result";
import { ProgressBar } from "../ProgressBar"

export interface Question {
    id:number
    question:string
    answer:string[]
    correctAnswer:string
}

const QUESTIONS:Question[] = [
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [isCurrentQuestionAnswered , setIsCurrentQuestionAnswered] = useState(false)
    const [isTakingQuiz, setIsTakingQuiz] = useState(true)

    const currentQuestionNumber = currentQuestionIndex + 1;
    const quizSize = QUESTIONS.length

const handleAnswerQuestion = (
    event: MouseEvent<HTMLButtonElement>, question:Question, 
    answer:string):void => {
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

    const handleNextQuestion = () => {
        if(currentQuestionIndex + 1 < quizSize){
            setCurrentQuestionIndex(index => index + 1)
        } else {
            setIsTakingQuiz(false)
        }

        setIsCurrentQuestionAnswered(false)
    }

    const handleTryAgain = () => {
        setIsTakingQuiz(true)
        setCorrectAnswersCount(0)
        setCurrentQuestionIndex(0)
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const navigationButtonText = currentQuestionNumber === quizSize ? "Ver Resultado" : "Próxima Pergunta"

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {isTakingQuiz ? (
                    <div className={styles.quiz}>
                        < ProgressBar size={quizSize} currentStep={currentQuestionNumber}/>

                    <header className={styles.quizHeader}>
                        <span className={styles.questionCount}>
                            PERGUNTA {currentQuestionNumber}/{quizSize}
                        </span>
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
                    {isCurrentQuestionAnswered && (
                        <Button onClick={handleNextQuestion}>
                            {navigationButtonText}
                        </Button>
                    )}
                </div>
                ) : (
                    <Result 
                    correctAnswersCount={correctAnswersCount}
                    quizSize={quizSize}
                    handleTryAgain={handleTryAgain}
                    />
                )}
            </div>
            
        </div>
        
    )
}