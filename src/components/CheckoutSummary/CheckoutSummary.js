import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'



const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well!! </h1>
            <div style={{margin: 'auto', width: '100%', height: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.chekcoutCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.chekcoutContinue}>CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;