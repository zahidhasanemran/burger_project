import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    // console.log(props);

    const ingredient = [];

    for (const ingName in props.ingredients) {
        ingredient.push({
            name: ingName,
            amount: props.ingredients[ingName]
        })
    }

    const ingOutput = ingredient.map((ing, indx) => {
        return <span key={indx}> {ing.name} : ({ing.amount}) </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredient: {ingOutput} </p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)} </strong></p>
        </div>
    );
};

export default Order;