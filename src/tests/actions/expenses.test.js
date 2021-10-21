import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import {
    addExpense,
    startAddExpense,
    removeExpense,
    startRemoveExpense,
    editExpense,
    startEditExpense,
    setExpenses,
    startSetExpenses,
} from '../../actions/expenses';
import expenses from "../fixtures/expenses";
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});


test('should setup remove expense action object', () => {
    const action = removeExpense({ id: 'abc123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc123'
    });
});


test('should remove expense from firebase', done => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});


test('should setup edit expense action object', () => {
    const action = editExpense('abc123', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            note: 'New note value'
        }
    });
});


test('should edit expense from firebase', done => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 200000 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});


test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});


/* using firebase all code is asynchronous but jest is not; due to it we have to declare him to wait for actions
returning data we want to work with on */
/* we need to force JEST to wait until a specific point in time - for it we have to provide an argument "done"
* this test case is no longer going to be considered a success or a failure until after we call "done" */
test('should add expense to database and store', done => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Notebook',
        amount: 10,
        note: '',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        /* we can actually query the database and make sure the data was stored and it was stored in the right location
           by putting database.ref into return - we create new Promise, which processes following "then" */
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');

    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test('should add expense with defaults to database and store', done => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');

    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});


test('should setup set expenses action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    });
});


test('should fetch expenses from firebase', done => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});






























