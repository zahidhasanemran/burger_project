import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../NavigationItems/SideDrawer/DrawerToggle/DrawerToggle';


const Toolbar = (props) => {
    return (
        <div className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerClicked}></DrawerToggle>
            <div className={classes.Logo}><Logo></Logo></div>
            <nav>
                <NavigationItems></NavigationItems>
            </nav>
        </div>
    );
};

export default Toolbar;