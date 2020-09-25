import * as actionTypes from '../actions/actionTypes';

const  initialStore = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialStore, action) => {
    switch (action.type) {
        case actionTypes.SUCCESS_ORDER:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
               loading: false,
               purchased: true,
               orders: state.orders.concat(newOrder) // check
            }

            case actionTypes.FAILED_ORDER:
                return {
                    ...state,
                    loading: false,
                    
                }

            case actionTypes.ORDER_START:
                return {
                    ...state,
                    loading: true
                    
                }

            case actionTypes.PURCHASE_INIT:
                return {
                    ...state,
                    loading: true,
                    purchased: false
                }

            case actionTypes.FETCH_ORDER_INIT:
                return {
                    ...state,
                    loading: true
                }

            case actionTypes.FETCH_ORDER_SUCCESS:
                return {
                    ...state,
                    orders: action.orders,
                    loading: false
                }

            case actionTypes.FETCH_ORDER_FAILED:
                return {
                    ...state,
                    loading: false,
                    
                }


    
        default:
            return state;
    }
}


export default orderReducer;
