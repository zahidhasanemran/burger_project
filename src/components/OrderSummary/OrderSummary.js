import React, { Fragment } from 'react';
import Button from '../UI/Button/Button';


const OrderSummary = (props) => {
    let  ingreSummary = Object.keys(props.ingredients).map(inK => {
        return <li key={inK}> {inK} {props.ingredients[inK]} </li>
    });
    // console.log(props);
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Delicious Burger with following ingredients</p>
            <ul>
                {ingreSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)} </strong></p>
            <p>Continue to checkout? </p>
            <Button btnType="Danger" clicked={props.removeModal}>Cancel</Button>
            <Button btnType="Success" clicked={props.continuPurchse}>Continue</Button>
        </Fragment>
    );
};

export default OrderSummary;