type measurableInteraction = {
  id: string;
  interaction_weight: number;
  interaction_threshold: number;
  interaction_trigger: string;
  learning_style_attribute?: string;
  learning_content_id: string;
};

export default measurableInteraction;
