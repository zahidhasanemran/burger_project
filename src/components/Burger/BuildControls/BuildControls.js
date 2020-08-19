import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type:"salad"},
    {label: "Cheese", type:"cheese"},
    {label: "Bacon", type:"bacon"},
    {label: "Meat", type:"meat"}
]

const BuildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: {props.currentPrice.toFixed(2)} </p>
            {controls.map(control => {
                return <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => props.added(control.type)}
                    price={props.price[control.type]}
                    removed={() => props.removed(control.type)}
                />
            })}
            <button 
            disabled={!props.purchasable} 
            className={classes.OrderButton}
            onClick={props.ordered}
            >ORDER NOW</button>
            
        </div>
    );
};


export default BuildControls;