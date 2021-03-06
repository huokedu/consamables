import React from 'react';
import { connect } from 'react-redux';

import Link from '../Link';
import TimeDisplay from './TimeDisplay';
import RestaurantToolbar from './RestaurantToolbar';
import { startOrder, openSuggestOrder } from '../../../actions';

class RestaurantBox extends React.Component {
    render() {
        const {
            loggedIn, restaurantId, name, location, url, open, openTime, closeTime,
            onStartClick, onSuggestClick
        } = this.props;

        return (
            <div className="restaurant-box">
                <div className="box-title">{name}</div>
                <div className="info">
                    {location.address.street}, {location.address.city}
                </div>
                <Link url={url}/>
                <TimeDisplay open={open} openTime={openTime} closeTime={closeTime}/>
                <RestaurantToolbar
                    id={restaurantId}
                    loggedIn={loggedIn}
                    open={open}
                    onStartClick={() => onStartClick(restaurantId)}
                    onSuggestClick={() => onSuggestClick(restaurantId)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.currentUser.get('loggedIn')
});

const mapDispatchToProps = dispatch => ({
    onStartClick: id => dispatch(startOrder(id)),
    onSuggestClick: id => dispatch(openSuggestOrder(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantBox)
