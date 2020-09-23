import * as actionTypes from '../actions/actionTypes';

const  initialStore = {
    orders: [],
    loading: false,

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
    
        default:
            return state;
    }
}


export default orderReducer;
