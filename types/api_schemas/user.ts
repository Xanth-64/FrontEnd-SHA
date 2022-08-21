import role from "./role";

type user = {
  email: string;
  first_name?: string;
  id?: string;
  created_at?: string;
  image_url?: string;
  last_name?: string;
  role? : role[];
};
export default user;
