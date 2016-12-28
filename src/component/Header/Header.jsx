import React from 'react';
import classPrefix from '../../decorator/classPrefix.js';
import './Header.css';
import '../../style/elastic-in-down.css';

@classPrefix('Header')
class Header extends React.Component {
  render() {
    return (
      <div className={this.ns()}>
        <div className="Header-box ani elastic-in-down">
          Header
        </div>
      </div>
    );
  }
};

export default Header;
