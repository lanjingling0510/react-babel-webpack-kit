import React from 'react';
import styles from './Header.css';
import '../../style/elastic-in-down.css';
import renderLog from '../../decorator/renderLog.js';
import Navbar from '../Navbar/Navbar.jsx';
import pureRender from '../../decorator/pureRender.js';

@pureRender
@renderLog
class Header extends React.Component {

  render() {
    return (
      <div className={styles.root}>
        <Navbar>
          <li>Home</li>
          <li>Profile</li>
          <li>Contact</li>
        </Navbar>
        <div
          className={`${styles.box} ani elastic-in-down`}>
          Header
        </div>
      </div>
    );
  }
};

export default Header;
