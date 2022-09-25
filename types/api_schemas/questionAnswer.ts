import testQuestion from './testQuestion';

type questionAnswer = {
  acquired_score: number;
  created_at: string;
  id: string;
  is_correct: boolean;
  selected_answer_alternatives: {
    answer_alternative_id: string;
    created_at: string;
    id: string;
    question_answer_id: string;
  }[];
  test_attempt_id: string;
  test_question: testQuestion;
};

export default questionAnswer;
