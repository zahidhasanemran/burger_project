import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';



const Burger = (props) => {

    // console.log(props);

    // Objectkeys(object) it gives an array of the keys 
    // Array(3) return 3 empty space with length of 3 

    let returnIngredients = Object.keys(props.ingredients).map( sin => {
        return [...Array(props.ingredients[sin])].map((_, i)=>{ return  <BurgerIngredient key={sin + i} type={sin} />  })
    }).reduce((prevValue, currentValue) => {
        // console.log(prevValue.concat(currentValue));
        return prevValue.concat(currentValue);
    }, []);
    
    // console.log(returnIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            
            {returnIngredients <= 0 ?  <p>Please Add some ingredient</p> : returnIngredients}
            
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default Burger;