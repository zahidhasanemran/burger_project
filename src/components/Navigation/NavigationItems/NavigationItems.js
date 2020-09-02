import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem>Burger Builder</NavigationItem>
            <NavigationItem>Contact</NavigationItem>
        </ul>
    );
};

export default NavigationItems;