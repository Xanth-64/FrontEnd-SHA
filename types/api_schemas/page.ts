import learningContent from './learningContent';
import practiceTest from './practiceTest';

type page = {
  id: string;
  created_at: string;
  relative_position: number;
  template_id: string;
  learning_content: learningContent | null;
  practice_test: practiceTest | null;
  adaptative_object_id?: string;
};

export default page;
