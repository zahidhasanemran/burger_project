import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/checkout">Checkout</NavigationItem>
            {props.isAuth ?  <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {
                props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> :  <NavigationItem link="/auth">Auth</NavigationItem>
            }
            
        </ul>
    );
};

export default NavigationItems;