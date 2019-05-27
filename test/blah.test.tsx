import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MyTable from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MyTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
