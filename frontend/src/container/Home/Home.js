import React from 'react';
import Menu from '../../components/Menu/Menu.js';
import Feed from '../../components/Feed/Feed.js';
import Navbar from '../../components/Navbar/Navbar.js';
const Home = () => {
  return (
    <div className="grid">
      <div className="grid__container">
        <Navbar />
        <Menu />
        <Feed />
      </div>
    </div>
  );
};

export default Home;
