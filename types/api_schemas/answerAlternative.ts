type answerAlternative = {
  id: string;
  created_at: string;
  alternative_text: string;
  is_correct?: boolean;
  test_question_id: string;
};

export default answerAlternative;
