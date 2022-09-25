type template = {
  created_at: string;
  default_knowledge: number;
  description?: string;
  id: string;
  image_url?: string;
  knowledge_weight: number;
  relative_position: number;
  leak_parameter: number;
  title: string;
  topic_id: string;
  adaptative_object_id?: string;
};

export default template;
