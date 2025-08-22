import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for doesn't exist.</p>
        <Link to="/" className="home-link">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
