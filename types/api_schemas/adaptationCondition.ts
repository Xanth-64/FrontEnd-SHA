type adaptationCondition = {
  value_to_compare: number;
  comparation_condition: 'lte' | 'gte';
  variable_to_compare:
    | 'TOPIC_KNOWLEDGE'
    | 'TEMPLATE_KNOWLEDGE'
    | 'LEARNING_STYLE_AURAL_AFFINITY'
    | 'LEARNING_STYLE_VISUAL_AFFINITY'
    | 'LEARNING_STYLE_READING_AFFINITY'
    | 'LEARNING_STYLE_KINESTHETIC_AFFINITY';
  adaptative_event_id: string;
};

export default adaptationCondition;
