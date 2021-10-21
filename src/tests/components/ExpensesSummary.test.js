import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary for 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={235}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary for multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={5} expenseTotal={235125}/>);
    expect(wrapper).toMatchSnapshot();
});























