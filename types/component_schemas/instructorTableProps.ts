import user from '../api_schemas/user';
type instructorTableProps = {
  instructors: user[];
  toggleInstructor: (instructor: user) => void;
};

export default instructorTableProps;
