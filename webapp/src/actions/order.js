import 'whatwg-fetch';

import { Map, List, fromJS } from 'immutable';
import { push } from 'react-router-redux';

import {
    START_ORDER, JOIN_ORDER, ACTIVATE_ORDER,
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM, SET_QUANTITY,
    CONTINUE_ORDER, GO_BACK_TO_MENU,
    SET_ORDER_TYPE, SET_ORDER_DURATION, SET_OVERHEAD,
    SEND_NEW_GROUP, NEW_GROUP_SUCCESS, NEW_GROUP_FAILURE,
    SEND_NEW_ORDER, NEW_ORDER_SUCCESS, NEW_ORDER_FAILURE,
    SEND_ACTIVATED_GROUP, ACTIVATED_GROUP_SUCCESS, ACTIVATED_GROUP_FAILURE,
    REQUEST_MY_ORDERS, RECEIVE_MY_ORDERS,
    SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS
} from './actionTypes';

import fetchActiveOrders from './activeOrders';
import fetchPendingOrders from './pendingOrders';
import { fetchOrganizedOrders } from './organizer';
import { buildPostInit, buildGetInit } from '../helpers';

export const startOrder = restaurantId => ({
    type: START_ORDER,
    restaurantId: restaurantId
});

export const joinOrder = (restaurantId, groupId) => ({
    type: JOIN_ORDER,
    restaurantId: restaurantId,
    groupId: groupId
});

export const activateOrder = (restaurantId, groupId) => ({
    type: ACTIVATE_ORDER,
    restaurantId: restaurantId,
    groupId: groupId
});

export const addItemToOrder = (itemId, data) => ({
    type: ADD_ITEM_TO_ORDER,
    id: itemId,
    data: data
});

export const removeItemFromOrder = index => ({
    type: REMOVE_ITEM_FROM_ORDER,
    index: index
});

export const incrementItem = index => ({
    type: INCREMENT_ITEM,
    index: index
});

export const decrementItem = index => ({
    type: DECREMENT_ITEM,
    index: index
});

export const setQuantity = (index, quantity) => ({
    type: SET_QUANTITY,
    index: index,
    quantity: quantity
});

export const continueOrder = () => ({ type: CONTINUE_ORDER });

export const goBackToMenu = () => ({ type: GO_BACK_TO_MENU });

export const setOrderType = orderType => ({
    type: SET_ORDER_TYPE,
    value: orderType
});

export const setOrderDuration = numMinutes => ({
    type: SET_ORDER_DURATION,
    value: numMinutes
});

export const setOverhead = percent => ({
    type: SET_OVERHEAD,
    value: percent
});

const sendNewGroup = () => ({ type: SEND_NEW_GROUP });

const newGroupSuccess = () => ({ type: NEW_GROUP_SUCCESS });

const newGroupFailure = error => ({
    type: NEW_GROUP_FAILURE,
    error: error
});

export const submitNewGroup = data => {
    return dispatch => {
        dispatch(sendNewGroup());
        fetch('/api/groups/start', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(newGroupSuccess());
                    dispatch(push('/'));
                    dispatch(fetchActiveOrders());
                    dispatch(fetchOrganizedOrders());
                } else if (response.status == 401) {
                    dispatch(newGroupFailure('Logged out.'));
                    dispatch(push('/login'));
                }
            })
            .catch( error => dispatch(newGroupFailure(error)) );
    };
};

const sendNewOrder = () => ({ type: SEND_NEW_ORDER });

const newOrderSuccess = () => ({ type: NEW_ORDER_SUCCESS });

const newOrderFailure = error => ({
    type: NEW_ORDER_FAILURE,
    error: error
});

export const submitNewOrder = data => {
    return dispatch => {
        dispatch(sendNewOrder());
        fetch('/api/groups/join', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(newOrderSuccess());
                    dispatch(push('/'));
                    dispatch(fetchMyOrders());
                } else if (response.status == 401) {
                    dispatch(newOrderFailure('Logged out.'));
                    dispatch(push('/login'));
                }
            })
            .catch( error => dispatch(newGroupFailure(error)) );
    };
};

const sendActivatedGroup = () => ({ type: SEND_ACTIVATED_GROUP });

const activatedGroupSuccess = () => ({ type: ACTIVATED_GROUP_SUCCESS });

const activatedGroupFailure = error => ({
    type: ACTIVATED_GROUP_FAILURE,
    error: error
});

export const submitActivatedGroup = data => {
    return dispatch => {
        dispatch(sendActivatedGroup());
        fetch('/api/groups/activate', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(activatedGroupSuccess());
                    dispatch(push('/'));
                    dispatch(fetchOrganizedOrders());
                    dispatch(fetchActiveOrders());
                    dispatch(fetchPendingOrders());
                } else if (response.status == 401) {
                    dispatch(activatedGroupFailure('Logged out.'));
                    dispatch(push('/login'));
                }
            })
            .catch( error => dispatch(activatedGroupFailure(error)) );
    };
};

const requestMyOrders = () => ({ type: REQUEST_MY_ORDERS });

const receiveMyOrders = json => ({
    type: RECEIVE_MY_ORDERS,
    myOrders: json.reduce((all, order) => {
        return all.set(order.orderId, Map({ groupId: order.groupId }))
            .updateIn(
                [order.orderId, 'orderItems'],
                List(),
                orderItems => orderItems.concat(fromJS(order.orderItems))
            );
    }, Map())
});

export const fetchMyOrders = () => {
    return dispatch => {
        fetch(requestMyOrders());
        fetch('/api/orders/my-orders', buildGetInit())
            .then(response => {
                response.json().then(json => {
                    if (response.ok) {
                        dispatch(receiveMyOrders(json));
                    } else if (response.status == 401) {
                        dispatch(push('/login'));
                    }
                });
            });
    };
};

export const showOrderDetails = orderId => ({
    type: SHOW_ORDER_DETAILS,
    id: orderId
});

export const hideOrderDetails = () => ({ type: HIDE_ORDER_DETAILS });
