import React from 'react';
import refsHOC from '../../decorator/refsHOC.js';
import './Header.css';
import '../../style/elastic-in-down.css';

@refsHOC
class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="Header-box ani elastic-in-down">
          Header
        </div>
      </div>
    );
  }
};

export default Header;
