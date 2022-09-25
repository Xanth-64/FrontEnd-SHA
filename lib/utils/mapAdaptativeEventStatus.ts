import adaptativeEventStatus from '../../types/other_schemas/adaptativeEventStatus';

const mapAdaptativeEventStatus = (
  adaptativeStatus: adaptativeEventStatus
): adaptativeEventStatus => {
  return {
    disableTriggered:
      adaptativeStatus.disableTriggered &&
      adaptativeStatus.firstInteractionType === 'NEGATIVE',
    hideTriggered:
      adaptativeStatus.hideTriggered &&
      adaptativeStatus.firstInteractionType === 'NEGATIVE',
    notifyNegativeTriggered:
      adaptativeStatus.notifyNegativeTriggered &&
      adaptativeStatus.firstInteractionType === 'NEGATIVE',
    obscureTriggered:
      adaptativeStatus.obscureTriggered &&
      adaptativeStatus.firstInteractionType === 'NEGATIVE',
    highlightTriggered:
      adaptativeStatus.highlightTriggered &&
      adaptativeStatus.firstInteractionType === 'POSITIVE',
    notifyPositiveTriggered:
      adaptativeStatus.notifyPositiveTriggered &&
      adaptativeStatus.firstInteractionType === 'POSITIVE',
    displayHintTriggered:
      adaptativeStatus.displayHintTriggered &&
      adaptativeStatus.firstInteractionType === 'POSITIVE',
    reduceAlternativesTriggered:
      adaptativeStatus.reduceAlternativesTriggered &&
      adaptativeStatus.firstInteractionType === 'POSITIVE',
    firstInteractionType: adaptativeStatus.firstInteractionType,
  };
};

export default mapAdaptativeEventStatus;
