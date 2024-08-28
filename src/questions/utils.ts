import { Choice } from "./QuestionsType";

export const formatVotePercentage = (choices: Choice[], votes: number ): string => {
    const total = choices.reduce((acc, choice) => acc + choice.votes, 0);
    return (total ? (votes / total) * 100 : 0).toFixed(2);
}