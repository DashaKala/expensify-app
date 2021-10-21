import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

/* using moment library causes (where time is generated in every actual time) the different time in snapshot and in
* currently running test - for these cases jest allows us to create "manual mocks" for various libraries */

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>)
    expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        /* in onSubmit we declare preventDefault to avoid a browser refreshes a page - but now jest does not know
        * how to process this method - so we declare it as an empty function */
        preventDefault: () => {}
    });
    // enzyme allows a control of the status of the component; thanks to it we can use method "state"
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'new description';
    const wrapper = shallow(<ExpenseForm />);
    /* we use "at" method to specify which element of the same type we want to use (there are 2 inputs: amount and description)*/
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'new note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '23.501';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

// test case that makes sure when we have valid data the error gets cleared and the prop "onSubmit"
//      gets called with the correct stuff
test('should call onSubmit prop for valid form submission', () => {
    // firstly we save mock function (spy) into variable
    const onSubmitSpy = jest.fn();
    // we assign its output to props "onSubmit"
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    // correct submission: there is no error - string is empty
    expect(wrapper.state('error')).toBe('');
    /* checking the correct object was followed to expense; we cannot use fixtures expenses as they contain ID as well;
    * so we put manually what should be compared */
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toEqual(focused);
});
























