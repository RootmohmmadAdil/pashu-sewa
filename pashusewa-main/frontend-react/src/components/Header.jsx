import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title, description, linkTo, linkText }) => {
  return (
    <header>
      <div className="logo">
        <h1>{title}</h1>
      </div>
      <p>{description}</p>
      {linkTo && linkText && (
        <Link to={linkTo} className="admin-link">
          {linkText}
        </Link>
      )}
    </header>
  );
};

export default Header;
