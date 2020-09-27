import orderInstance from '../../axios/axios-order';
import * as actionTypes from '../actions/actionTypes';


export const successOrder = (id, orderData) => {
    return {
        type: actionTypes.SUCCESS_ORDER,
        orderId: id,
        orderData: orderData
    }
};

export const failedOrder = (error) => {
    return {
        type: actionTypes.FAILED_ORDER,
        error: error
    }
};



export const orderStart = () => {
    return {
        type: actionTypes.ORDER_START
    }
};


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};



export const orderStored = (orderData, token) => {
    return dispatch => {
        orderInstance.post('/orders.json?auth=' + token, orderData)
        .then(res => {
            dispatch(successOrder(res.data.name, orderData));
        })
        .catch(error => {
           dispatch(failedOrder(error));
        });
    }
};




export const fetchOrderSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: order
    }
};

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
};
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT
    }
};


export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        orderInstance.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchOrders = [];
            for (const key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch(error => {
           dispatch(fetchOrderFailed(error));
        });
    }
};