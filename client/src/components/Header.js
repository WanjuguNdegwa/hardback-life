import "./Header.css";
import { Icon } from '@iconify/react';

const Header = () => {

  return (
    <header className="header">
      <div className="d-flex align-items-center logo">
        <div className="brand-name">
          <p>Hard</p>
          <p>Back</p>
          <p>Life</p>
        </div>
        <Icon icon="bx:book" color="#f8f8f8" height={72}/>
      </div>
    </header>
  );
};

export default Header;
