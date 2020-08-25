import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {

    let clasN = [props.show ? [classes.Backdrop] : ' '];

    return (
        <div onClick={props.clicked} className={clasN}>
            
        </div>
    );
};

export default Backdrop;