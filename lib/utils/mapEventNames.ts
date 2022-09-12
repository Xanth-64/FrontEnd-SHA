const mapEventNames = (
  eventName:
    | 'HIGHLIGHT'
    | 'OBSCURE'
    | 'DISABLE'
    | 'HIDE'
    | 'NOTIFY_POSITIVE'
    | 'NOTIFY_NEGATIVE'
    | 'DISPLAY_HINT'
    | 'REDUCE_ALTERNATIVES'
    | string
) => {
  switch (eventName) {
    case 'HIGHLIGHT':
      return 'Resaltar';

    case 'OBSCURE':
      return 'Atenuar';
    case 'DISABLE':
      return 'Deshabilitar';
    case 'HIDE':
      return 'Esconder';
    case 'NOTIFY_POSITIVE':
      return 'Notificar Positivamente';
    case 'NOTIFY_NEGATIVE':
      return 'Notificar Negativamente';
    case 'DISPLAY_HINT':
      return 'Mostrar Pista';
    case 'REDUCE_ALTERNATIVES':
      return 'Reducir Alternativas';
    default:
      return `Evento Desconocido: ${eventName}`;
  }
};

export default mapEventNames;
