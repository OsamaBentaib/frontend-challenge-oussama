import { Link } from "react-router-dom";
import { useQuestionsList } from "../../hooks/questions";
import styles from "./QuestionList.module.scss"

const QuestionList = () => {
  const { questions } = useQuestionsList();
  return (
    <div className={styles.questions}>
      <h1>Questions</h1>
      <div className={styles.questions_list}>
      {questions.map((question) => (
         <div className={styles.question_card}>
        <Link to={question.url.split("/")[2]}>
            <h3>{question.question}</h3>
            <h5>{question.published_at}</h5>
            <div>
              <strong>{question.choices.length}</strong>
            </div>
        </Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default QuestionList;
