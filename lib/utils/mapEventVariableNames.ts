const mapEventVariableNames = (
  variableName:
    | 'TOPIC_KNOWLEDGE'
    | 'TEMPLATE_KNOWLEDGE'
    | 'LEARNING_STYLE_AURAL_AFFINITY'
    | 'LEARNING_STYLE_VISUAL_AFFINITY'
    | 'LEARNING_STYLE_READING_AFFINITY'
    | 'LEARNING_STYLE_KINESTHETIC_AFFINITY'
    | string
) => {
  switch (variableName) {
    case 'TOPIC_KNOWLEDGE':
      return 'Conocimiento de Tópico';
    case 'TEMPLATE_KNOWLEDGE':
      return 'Conocimiento de Template';
    case 'LEARNING_STYLE_AURAL_AFFINITY':
      return 'Afinidad al Estilo de Aprendizaje Auditivo';
    case 'LEARNING_STYLE_VISUAL_AFFINITY':
      return 'Afinidad al Estilo de Aprendizaje Visual';
    case 'LEARNING_STYLE_READING_AFFINITY':
      return 'Afinidad al Estilo de Aprendizaje de Lectura/Escritura';
    case 'LEARNING_STYLE_KINESTHETIC_AFFINITY':
      return 'Afinidad al Estilo de Aprendizaje Kinestésico';
    default:
      return `Nombre de Variable Desconocido: ${variableName}`;
  }
};

export default mapEventVariableNames;
