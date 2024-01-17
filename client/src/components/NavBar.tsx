import { useNavigate } from 'react-router-dom';

import Button from './Button';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <Button onClick={() => navigate(`/new`)}>+</Button>
    </nav>
  );
};

export default NavBar;
