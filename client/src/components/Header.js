import "./Header.css";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className="header">
      <Link to="/">
        <div className="d-flex align-items-center logo">
          <div className="brand-name">
            <p>Hard</p>
            <p>Back</p>
            <p>Life</p>
          </div>
          <Icon icon="bx:book" color="#f8f8f8" height={72}/>
        </div>
      </Link>
    </header>
  );
};

export default Header;
