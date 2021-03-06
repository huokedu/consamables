import fetchActiveOrders from './activeOrders';
import fetchPendingOrders from './pendingOrders';
import { fetchRestaurants, updateRestaurantHours } from './restaurants';
import { showMenu, hideMenu } from './menus';

import {
    verifyUser, verifyAndAuthenticateWithSplitwise,
    updateUsernameField, updatePasswordField,
    submitLogin, logOut, goToCreateAccount
} from './login';

import { updateConfirmPasswordField, submitNewAccount, goToLogin } from './createAccount';

import {
    startOrder, joinOrder, activateOrder,
    addItemToOrder, removeItemFromOrder,
    incrementItem, decrementItem, setQuantity,
    continueOrder, goBackToMenu,
    setOrderType, setOrderDuration, setOverhead,
    submitNewGroup, submitNewOrder, submitActivatedGroup,
    showOrderDetails, hideOrderDetails
} from './order';

import {
    openPizzaBuilder, closePizzaBuilder,
    setPizzaSize,
    toggleTopping, changeToppingSide,
    setInitialSauce, setMaxToppings,
    changeSauce, changeCheese
} from './pizzaBuilder';

import {
    openSuggestOrder, closeSuggestOrder,
    toggleDelivery, toggleCarryout, toggleOuting,
    setDrivingPreference, setWaitTime, setMinPeople,
    submitSuggestion, submitVote
} from './suggestOrder';

import {
    showGroupDetails, hideGroupDetails,
    markGroupOrdered, markGroupComplete
} from './organizer';

export {
    fetchActiveOrders,
    fetchPendingOrders,
    fetchRestaurants,
    updateRestaurantHours,

    showMenu,
    hideMenu,

    startOrder,
    joinOrder,
    activateOrder,
    addItemToOrder,
    removeItemFromOrder,
    incrementItem,
    decrementItem,
    setQuantity,

    openPizzaBuilder,
    closePizzaBuilder,
    setPizzaSize,
    toggleTopping,
    changeToppingSide,
    setInitialSauce,
    setMaxToppings,
    changeSauce,
    changeCheese,

    continueOrder,
    goBackToMenu,
    setOrderType,
    setOrderDuration,
    setOverhead,
    submitNewGroup,
    submitNewOrder,
    submitActivatedGroup,

    openSuggestOrder,
    closeSuggestOrder,
    toggleDelivery,
    toggleCarryout,
    toggleOuting,
    setDrivingPreference,
    setWaitTime,
    setMinPeople,
    submitSuggestion,
    submitVote,

    verifyUser,
    verifyAndAuthenticateWithSplitwise,
    updateUsernameField,
    updatePasswordField,
    submitLogin,
    logOut,

    goToLogin,
    goToCreateAccount,
    updateConfirmPasswordField,
    submitNewAccount,

    showGroupDetails,
    hideGroupDetails,
    markGroupOrdered,
    markGroupComplete,

    showOrderDetails,
    hideOrderDetails
};
