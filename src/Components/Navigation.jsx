import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Recipe Book
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/add-recipe" 
            className={`nav-link ${location.pathname === '/add-recipe' ? 'active' : ''}`}
          >
            Add Recipe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
