import React, { Fragment } from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map(sinIngre => {
        // console.log(sinIngre); salad,cheese,met, bacon
        return [...Array(props.ingredients[sinIngre])].map((x,y) => {
            return <BurgerIngredient
                key={sinIngre+y}
                type={sinIngre}
            ></BurgerIngredient>
        })
    }).reduce((prev, el)=>{
        return prev.concat(el)
    });

    if(transformedIngredient.length <= 0){
        transformedIngredient = <p>Please start adding ingredients!</p>
    }

    // console.log(transformedIngredient);
    return (
        <Fragment>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {transformedIngredient}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        </Fragment>
    );
};

export default Burger;