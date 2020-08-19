import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem linke='/' active >Burger Builder</NavigationItem>
            <NavigationItem linke='/' active={false} >Checkout</NavigationItem>
        </ul>
    );
};

export default NavigationItems;