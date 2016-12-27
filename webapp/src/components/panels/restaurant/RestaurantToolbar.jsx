import React from 'react';

export default class RestaurantToolbar extends React.Component {
    render() {
        const {
            open,
            onMenuClick, onStartClick
        } = this.props;

        if (open) {
            return (
                <div className="toolbar">
                    <button className="button" onClick={onMenuClick}>View Menu</button>
                    <button className="button" onClick={onStartClick}>Start Order</button>
                    <button className="button">Suggest Order</button>
                </div>
            );
        } else {
            return (
                <button className="button" onClick={onMenuClick}>View Menu</button>
            );
        }
        
    }
}