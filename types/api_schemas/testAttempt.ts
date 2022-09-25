import practiceTest from './practiceTest';
import questionAnswer from './questionAnswer';

type testAttempt = {
  acquired_score: number;
  created_at: string;
  id: string;
  practice_test: practiceTest;
  question_answers: questionAnswer[];
  user_id: string;
};

export default testAttempt;
