import adaptativeEvent from '../api_schemas/adaptativeEvent';

type adaptativeEventTableProps = {
  adaptativeEvents?: adaptativeEvent[];
  refetchData: () => void;
  updateAdaptativeEvent: (adaptativeEvent: adaptativeEvent) => void;
};

export default adaptativeEventTableProps;
