import * as React from 'react';
import MyTable from '../src';
import { testColumns, testRows } from '../example/testTable';
import { shallow } from 'enzyme';

describe('it', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MyTable columns={testColumns} rows={testRows} />);
    expect(wrapper.find('.myTable')).toHaveLength(1);
  });

  it('sort first column correctly', () => {
    const wrapper = shallow(<MyTable columns={testColumns} rows={testRows} />);
    const th = wrapper.find('th').at(0);
    th.simulate('click');
    const cells = wrapper
      .find('tbody')
      .find('tr')
      .map(tr =>
        tr
          .find('td')
          .at(0)
          .text()
      );
    expect(cells).toEqual(['User 1', 'User 2', 'User 3']);
  });
});
