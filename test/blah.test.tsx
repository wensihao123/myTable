import * as React from 'react';
import MyTable from '../src';
import { testColumns1, testRows1 } from '../example/testTable';
import { shallow } from 'enzyme';

describe('it', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <MyTable columns={testColumns1} rows={testRows1} />
    );
    expect(wrapper.find('.myTable')).toHaveLength(1);
  });

  it('sort first column correctly', () => {
    const wrapper = shallow(
      <MyTable columns={testColumns1} rows={testRows1} />
    );
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
    expect(cells).toEqual([
      'User 1',
      'User 2',
      'User 3',
      'User 4',
      'User 5',
      'User 6',
      'User 7',
      'User 8',
      'User 9',
      'User A',
    ]);
  });
  it('sort last column correctly', () => {
    const wrapper = shallow(
      <MyTable columns={testColumns1} rows={testRows1} />
    );
    const th = wrapper.find('th').at(5);
    th.simulate('click');
    const cells = wrapper
      .find('tbody')
      .find('tr')
      .map(tr =>
        tr
          .find('td')
          .at(5)
          .text()
      );
    expect(cells).toEqual([
      '25',
      '26',
      '28',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
    ]);
  });
  it('change page correctly', () => {
    const wrapper = shallow(
      <MyTable columns={testColumns1} rows={testRows1} />
    );
    const th = wrapper.find('span').at(1);
    th.simulate('click');
    const cells = wrapper
      .find('tbody')
      .find('tr')
      .map(tr =>
        tr
          .find('td')
          .at(5)
          .text()
      );
    expect(cells).toEqual([
      '41',
      '42',
      '43',
      '44',
      '45',
      '42',
      '46',
      '47',
      '48',
      '49',
    ]);
  });
});
