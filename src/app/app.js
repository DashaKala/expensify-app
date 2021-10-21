import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from '../routers/AppRouter';
import configureStore from "../store/configureStore";
import { startSetExpenses } from '../actions/expenses';
import { login, logout } from "../actions/auth";
import 'normalize.css/normalize.css';
import '../styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from '../firebase/firebase';
import LoadingPage from '../components/LoadingPage';
const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        /* condition for fetching user data once at all */
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

// rendering gif on page before fetching data from firebase
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// setting activity to be done during user logging in and out
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(login(user.uid));
        // console.log('uid:', user.uid);
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});