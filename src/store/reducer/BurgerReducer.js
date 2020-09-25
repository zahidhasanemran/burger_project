import * as actionType from '../actions/actionTypes';


let initailState = {
    ingredients: null,
    total_price: 2,
    error: false
    // purchaseable: false,
    // orderModal: false,
    // loading: false
}

const PRICE = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 0.5,
    meat: 1.6
}

const burgerReducer = (state = initailState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                total_price: state.total_price + PRICE[action.ingredientName]
            }
    
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                total_price: state.total_price - PRICE[action.ingredientName]
            }

            case actionType.FAILED_INGREDIENT:
                return {
                    ...state,
                    error: true
                }

            case actionType.SET_INGREDIENT:
                return {
                    ...state,
                    ingredients: action.ingredients, // check payload name 
                    error: false,
                    total_price: 2
                }
    
        default:
            return state;
    }
}

export default burgerReducer;