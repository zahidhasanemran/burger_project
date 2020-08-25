import React, { Fragment } from 'react';
import classes from './SideDrawer.module.css'
import Logo from '../../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems';
import Backdrop from '../../../UI/Backdrop/Backdrop';


const SideDrawer = (props) => {
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.clsoeSideDraw}/>
            <div className={[classes.SideDrawer, [props.show ? [classes.Open] : [classes.Close] ]].join(' ')}>
                <div className={classes.Logo}>
                <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;