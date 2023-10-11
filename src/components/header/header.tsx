import { useNavigate } from "react-router-dom";

import './style.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="menu-item" onClick={() => navigate("/")}>Games</div>
    </div>
  );
};

export default Header;
