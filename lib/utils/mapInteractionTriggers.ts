const mapInteractionTriggers = (
  interactionTrigger: 'click' | 'observe' | 'idle_observe' | string
) => {
  switch (interactionTrigger) {
    case 'click':
      return 'Pulsar';
    case 'observe':
      return 'Visualizar';
    case 'idle_observe':
      return 'Visualizar sin Movimiento';
    default:
      return `Interacción Desconocida: ${interactionTrigger}`;
  }
};

export default mapInteractionTriggers;
