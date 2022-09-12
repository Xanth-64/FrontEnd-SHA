import adaptationCondition from './adaptationCondition';

type adaptativeEvent = {
  id: string;
  created_at: string;
  triggered_change:
    | 'HIGHLIGHT'
    | 'OBSCURE'
    | 'DISABLE'
    | 'HIDE'
    | 'NOTIFY_POSITIVE'
    | 'NOTIFY_NEGATIVE'
    | 'DISPLAY_HINT'
    | 'REDUCE_ALTERNATIVES';
  condition_aggregator: 'AND' | 'OR';
  relative_position: number;
  adaptative_object_id: string;
  adaptation_conditions: adaptationCondition[];
};

export default adaptativeEvent;
