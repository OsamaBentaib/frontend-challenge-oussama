export interface Choice {
  choice: string;
  votes: number;
  url: string;
}

export interface Question {
  question: string;
  choices: Choice[];
  published_at: string;
  url: string;
}
