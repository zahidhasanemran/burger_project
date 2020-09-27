import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import orderInstance  from '../../axios/axios-order';
import ErrorHandling from '../../ErrorHandling/ErrorHandling'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';



class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        this.props.loadOrder(this.props.token);
        
    }


    render() {

        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadOrder : (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandling(Orders, orderInstance));