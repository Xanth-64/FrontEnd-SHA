import prelation from '../api_schemas/prelation';
import topic from '../api_schemas/topic';

type precedenceGraphCardProps = {
  updatePrecedenceGraph: () => void;
  graphData: { nodes: topic[]; links: prelation[] };
  loadingState: boolean;
};
export default precedenceGraphCardProps;
