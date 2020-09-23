import orderInstance from '../../axios/axios-order';
import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const saveIngredient  = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const failedIngredient  = () => {
    return {
        type: actionTypes.FAILED_INGREDIENT
    }
}

export const initIngredinets = () => {
    return dispatch => {
        orderInstance.get('https://react-burger-007.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(saveIngredient(res.data))
        })
        .catch(error => {
            dispatch(failedIngredient())
        })
    }
}