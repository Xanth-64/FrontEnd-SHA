import { UseFormReturnType } from '@mantine/form';

import testQuestion from '../api_schemas/testQuestion';

interface studentTestQuestionCardProps {
  testQuestion: testQuestion;
  index: number;
  form: UseFormReturnType<{
    practice_test_id: string;
    question_answers: {
      test_question_id: string;
      selected_answer_alternatives: never[];
    }[];
  }>;
  componentLoading: boolean;
}
export default studentTestQuestionCardProps;
