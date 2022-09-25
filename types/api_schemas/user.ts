import role from './role';

type user = {
  email: string;
  first_name?: string;
  id?: string;
  created_at?: string;
  image_url?: string;
  last_name?: string;
  role?: role[];
  vark_completed: boolean;
  learning_style?: {
    aural: number;
    kinesthetic: number;
    textual: number;
    visual: number;
  };
};
export default user;
