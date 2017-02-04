import React from 'react';
import renderLog from '../../decorator/renderLog.js';
import pureRender from '../../decorator/pureRender.js';

@pureRender
@renderLog
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'cyt',
    };
    this.handleBoxClick = this.handleBoxClick.bind(this);
  }

  handleBoxClick() {
    this.setState({ name: 'eq' });
  }

  render () {
    return (
      <ul onClick={this.handleBoxClick}>
        {this.props.children}
      </ul>
    );
  }
}

export default Navbar;
