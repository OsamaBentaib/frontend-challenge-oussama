import { useEffect, useState } from "react";
import { Question } from "../QuestionsType";
import axios, { AxiosError } from "axios";

export const useQuestionsList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const fetchQuestion = async () => {
    try {
      const { data } = await axios.get<Question[]>(
        "https://polls.apiblueprint.org/questions"
      );
      setQuestions(data);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return { questions };
};

export const useQuestionsDetails = (questionId?: string) => {
  const [question, setQuestions] = useState<Question | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error , setError] = useState<string | null>(null);

  const fetchQuestionDetails = async (questionId?: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<Question>(
        `https://polls.apiblueprint.org/questions/${questionId}`
      );
      setQuestions(data);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
   if (questionId) {
    fetchQuestionDetails(questionId);
   } else {
       setError("Invalid question id");
   }
  }, [questionId]);

  return { question, loading, error, refetch: fetchQuestionDetails };
};


export const useVote = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error , setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
  
    const questionVote = async (url: string) => {
      setSuccess(false);
      setLoading(true);
      try {
        await axios.post(
          `https://polls.apiblueprint.org${url}`
        );
        setSuccess(true);
      } catch (err) {
        const error = err as AxiosError;
        console.error(error);
        setError("Failed to vote");
        setSuccess(false);
      } finally {
          setLoading(false);
      }
    };
  
    return { questionVote, success, loading, error };
  };
  