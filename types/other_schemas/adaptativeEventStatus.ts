type adaptativeEventStatus = {
  firstInteractionType?: 'POSITIVE' | 'NEGATIVE';
  highlightTriggered?: boolean;
  obscureTriggered?: boolean;
  disableTriggered?: boolean;
  hideTriggered?: boolean;
  notifyPositiveTriggered?: boolean;
  notifyNegativeTriggered?: boolean;
  displayHintTriggered?: boolean;
  reduceAlternativesTriggered?: boolean;
};

export default adaptativeEventStatus;
