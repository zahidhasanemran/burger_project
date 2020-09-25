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
        this.props.loadOrder();
        // orderInstance.get('/orders.json')
        // .then(res => {
        //     // console.log(res.data);
        //     const fetchOrders = [];
        //     for (const key in res.data) {
        //         fetchOrders.push({
        //             ...res.data[key],
        //             id: key
        //         });
        //     }
        //     this.setState({loading: false, orders: fetchOrders})
        //     console.log(this.state.orders.length);
        // })
        // .catch(err => {
        //     this.setState({loading: false})
        // })
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
        loading: state.orderReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadOrder : () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandling(Orders, orderInstance));