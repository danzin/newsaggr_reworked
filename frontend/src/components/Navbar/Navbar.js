import React, { useState } from 'react';
import './navbar.css';
import { useArticles } from '../../hooks/useArticles';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
function Navbar() {
  const { setSearch } = useArticles();
  const [searchText, setSearchText] = useState('');
  const { auth } = useAuth();
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearch(searchText);
    setSearchText('');
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-spacer">
        <span></span>
      </div>

      <form onSubmit={handleSubmit} className="app__navbar-searchbox">
        <span className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </span>
        <input
          type="search"
          onChange={handleChange}
          value={searchText}
          placeholder="Search.."
        />
        <button className="submit"></button>
      </form>

      <div className="app__navbar-buttons">
        {auth?.uname ? (
          <button className="app__navbar-buttons-login btn">
            {/* <a href="/profile">Profile </a> */}
            <Link to="/profile">Profile</Link>
          </button>
        ) : (
          <>
            <button className="app__navbar-buttons-login btn">
              <a href="/login">Login</a>
            </button>
            <button className="app__navbar-buttons-signup btn">
              <a href="/login">Sign Up</a>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
