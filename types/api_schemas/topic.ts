type topic = {
  relative_position: number;
  title?: string;
  icon_name?: string;
  default_knowledge?: number;
  successors?: topic[];
  predecessors?: topic[];
  id?: string;
  leak_parameter?: number;
  created_at?: string;
  adaptative_object_id?: string;
};
export default topic;
