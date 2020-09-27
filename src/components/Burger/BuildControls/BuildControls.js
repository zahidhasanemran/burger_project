import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


let controls = [
    {label: 'Salad', type:"salad"},
    {label: 'Bacon', type:"bacon"},
    {label: 'Cheese', type:"cheese"},
    {label: 'Meat', type:"meat"}
]

const BuildControls = (props) => {
    // console.log(props);
    return (
        <div className={classes.BuildControls}>
            <p> Total Price: {props.totalPrice.toFixed(2)} </p>
            {controls.map(con => {
                // console.log(con);
               return <BuildControl 
                label={con.label} 
                key={con.label} 
                remove={() => props.rmv(con.type)}
                add={() => props.add(con.type)}
               />
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.modalOpen}
            >{props.isAuth ? 'Order Now' : 'Signup to Order'}</button>
        </div>
    );
};

export default BuildControls;