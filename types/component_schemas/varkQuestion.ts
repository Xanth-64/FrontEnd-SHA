import varkQuestionAlternative from './varkQuestionAlternative';

type varkQuestion = {
  question_prompt: string;
  question_alternatives: varkQuestionAlternative[];
};

export default varkQuestion;
