import moment from "moment";
import filtersReducer from '../../reducers/filters';

/* during 1st call of redux the initial object is created - we can see it in extension in dev chrome in bookmark redux;
* this object contains only one variable: @@INIT */
test('should setup default filter values', () => {
   const state =  filtersReducer(undefined, {type: '@@INIT'});
   expect(state).toEqual({
       text: '',
       sortBy: 'date',
       startDate: moment().startOf('month'),
       endDate: moment().endOf('month')
   });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    /* firstly setting a status to different than date*/
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set filter to text', () => {
    const text = 'text filter';
    const action = {
        type: 'SET_TEXT_FILTER',
        text: text
    }
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

test('should set filter to start date', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

test('should set filter to end date', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});
