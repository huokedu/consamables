import { Map } from 'immutable';

import { LOCATION_CHANGE } from 'react-router-redux';

import {
    UPDATE_USERNAME_FIELD, UPDATE_PASSWORD_FIELD,
    SEND_LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, SET_USER_INFO,
    SEND_NEW_ACCOUNT, NEW_ACCOUNT_SUCCESS, NEW_ACCOUNT_FAILURE,
    UPDATE_CONFIRM_PASSWORD_FIELD,
    GOTO_LOGIN, GOTO_CREATE_ACCOUNT
} from '../../actions/actionTypes';

const login = (state = Map({ username: '', password: '', confirmPassword: '' }), action) => {
    switch (action.type) {
        case UPDATE_USERNAME_FIELD:
            return state.set('username', action.value)
                        .delete('error');

        case UPDATE_PASSWORD_FIELD:
            return state.set('password', action.value)
                        .delete('error');

        case UPDATE_CONFIRM_PASSWORD_FIELD:
            return state.set('confirmPassword', action.value)
                        .delete('error');

        case SEND_LOGIN:
        case SEND_NEW_ACCOUNT:
            return state.set('loading', true)
                        .delete('error');

        case LOGIN_FAILURE:
        case NEW_ACCOUNT_FAILURE:
            return state.set('loading', false)
                        .set('error', action.error);

        case LOGIN_SUCCESS:
        case NEW_ACCOUNT_SUCCESS:
        case SET_USER_INFO:
            return state.set('loading', false)
                        .set('username', '')
                        .set('password', '')
                        .delete('confirmPassword')
                        .delete('error');

        case LOCATION_CHANGE:
            return state.delete('error');

        default:
            return state;
    }
};

export default login
