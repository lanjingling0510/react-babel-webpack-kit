import React from 'react';

import {DateSelect, DateRangeSelect} from 'react-cqtoolbox/lib/date_select';
import Select from 'react-cqtoolbox/lib/select';

class Root extends React.Component {
  render () {

    const selectProps = {
      data: [{
        label: 'xxxx',
        value: 'Join',
      }, {
        label: 'yyyy',
        value: 'aaaa',
      }]
    }

    return (
      <div>
        <DateSelect />
        <DateRangeSelect />
        <Select {...selectProps} />
      </div>
    );
  }
}

export default Root;
