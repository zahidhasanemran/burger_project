import React from 'react';
import classes from './OrderSummary.module.css';
import Button from '../UI/Button/Button';

const OrderSummary = (props) => {
    
    const ingr = Object.keys(props.ingredients).map(ing => {
    return <li key={ing}> {ing} : <strong>{props.ingredients[ing]}</strong> </li>
    })

    return (
        <div className={classes.OrderSummary}>
            <h3>Delicious burger with: </h3>
            <ul>
                {ingr}
            </ul>
            <p> <strong> Total Price: {props.totalPrice.toFixed(2)} </strong> </p>
            <p>You want to continue ? </p>
            <Button btnType="Success" clicked={props.orderContinue}>Continue</Button>
            <Button btnType="Danger" clicked={props.modalclose}>Cancel</Button>
        </div>
    );
};

export default OrderSummary;