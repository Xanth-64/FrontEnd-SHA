import prelation from '../api_schemas/prelation';

type precedenceTableProps = {
  updatePrelation: (precedence: prelation) => void;
  prelations: prelation[];
};

export default precedenceTableProps;
