import { useParams } from "react-router-dom";
import { useQuestionsDetails, useVote } from "../../hooks/questions";
import { formatVotePercentage } from "../../utils";
import { useEffect } from "react";


const QuestionDetails = ()=> {
    const { questionId } = useParams<{questionId: string}>();

    const { question, loading, error, refetch } = useQuestionsDetails(questionId);

    const {questionVote, success} = useVote();


   
    const handleAddVote = (url: string) => {
        if (!questionId) return;
        return questionVote(url);
    }

    useEffect(()=> {
        if (success){
            refetch(questionId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    if (error){
        return <div>
            <h1>{error}</h1>
        </div>
    }

    return <div>
        <h1>Questions details</h1>
         {loading && <h3>Loading...</h3>}

        {question && (
            <div>
                <h1>
            Question: {question.question}
            </h1>

             <table>
                <thead>
                    <tr>
                        <th>Choice</th>
                        <th>Votes</th>
                        <th>Percentage</th>
                        <th>Vote</th>
                    </tr>
                </thead>
                <tbody>
                    {question.choices.map((choice) => {
                        return (
                            <tr key={choice.url}>
                                <td>{choice.choice}</td>
                                <td>{choice.votes}</td>
                                <td>{formatVotePercentage(question.choices, choice.votes)}%</td>
                                <td>
                                    <button onClick={()=> handleAddVote(choice.url)}>Vote</button>
                               </td>
                            </tr>

                        )
                    })}
                </tbody>

             </table>
            </div>
        )}
    </div>
}


export default QuestionDetails;