import answerAlternative from './answerAlternative';

type testQuestion = {
  id: string;
  created_at: string;
  question_type: 'multiple_selection' | 'simple_selection';
  relative_position: number;
  question_score: number;
  practice_test_id: string;
  answer_alternatives: answerAlternative[];
};

export default testQuestion;
