import styles from "./styles.module.css"

export function QuestionAnswer (props) {
    return (
        <button 
          className={styles.container}
          onClick={(event) => props.handleAnswerQuestion(event, props.question, props.answer)}>
            {props.answer}
        </button>
    )
}