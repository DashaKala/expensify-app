import React from 'react';
import { shallow } from 'enzyme';

// when we're testing our re-act components we actually want to test the unconnected version
//      because we want to be able to provide a set of dynamic props
//      we don't actually want these props to come from the store instead we're just going to provide
//      expenses directly

import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test('should render ExpenseList with expenses', () => {
    /* assignment of the expenses of ExpenseList.props to the variable expenses imported from "../fixtures/expenses" */
    const wrapper = shallow(<ExpenseList expenses={expenses}/>)
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>)
    expect(wrapper).toMatchSnapshot();
});
