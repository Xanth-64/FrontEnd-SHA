import page from './page';

type learningContent = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  page_id?: string;
  page?: page;
};

export default learningContent;
