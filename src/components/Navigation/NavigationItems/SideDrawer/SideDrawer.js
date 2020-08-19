import React from 'react';
import classes from './SideDrawer.module.css'
import Logo from '../../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems';


const SideDrawer = (props) => {

    let attachClass = props.show ? [classes.SideDrawer,classes.Open] : [classes.SideDrawer,classes.Close]; 
    

    return (
        <div className={attachClass.join(' ')}>
            <div className={classes.Logo}>
            <Logo></Logo>
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default SideDrawer;