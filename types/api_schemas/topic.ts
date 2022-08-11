type topic = {
  relative_position: number;
  title?: string;
  icon_name?: string;
  default_knowledge?: number;
  successors?: topic[];
  predecessors?: topic[];
  id?: string;
  created_at?: string;
};
export default topic;
