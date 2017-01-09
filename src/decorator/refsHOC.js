import React from 'react';

function refsHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      console.log('ref bind');
    }

    componentDidMount() {
      console.log('refsHot didMount..');
    }

    render() {

      const props = Object.assign(
        {},
        this.props,
        {ref: this.proc.bind(this)}
      );

      return <WrappedComponent {...props}/>
    }
  }
}

export default refsHOC;
