import styles from "./styles.module.css"
import { Question } from "../Quiz"
import {MouseEvent} from "react"


interface QuestionAnswerProps {
    answer: string
    question:Question
    handleAnswerQuestion: (event: MouseEvent<HTMLButtonElement>,question:Question,answer:string) => void
}

export function QuestionAnswer (props:QuestionAnswerProps) {
    return (
        <button 
          className={styles.container}
          onClick={(event) => props.handleAnswerQuestion(event, props.question, props.answer)}>
            {props.answer}
        </button>
    )
}