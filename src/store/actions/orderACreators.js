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



export const orderStored = (orderData) => {
    return dispatch => {
        orderInstance.post('/orders.json', orderData)
        .then(res => {
            dispatch(successOrder(res.data, orderData));
        })
        .catch(error => {
           dispatch(failedOrder(error));
        });
    }
};