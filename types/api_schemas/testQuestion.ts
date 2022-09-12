import answerAlternative from './answerAlternative';

type testQuestion = {
  id: string;
  created_at: string;
  question_type: 'multiple_selection' | 'simple_selection';
  question_prompt: string;
  relative_position: number;
  question_score: number;
  practice_test_id: string;
  question_hint: string;
  answer_alternatives: answerAlternative[];
  adaptative_object_id?: string;
};

export default testQuestion;
