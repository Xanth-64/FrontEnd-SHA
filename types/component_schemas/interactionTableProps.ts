import measurableInteraction from '../api_schemas/measurableInteraction';

type interactionTableProps = {
  measurableInteractions: measurableInteraction[];
  refetchData: () => void;
  updateMeasurableInteraction: (
    measurableInteraction: measurableInteraction
  ) => void;
};

export default interactionTableProps;
