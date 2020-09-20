import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import orderInstance  from '../../axios/axios-order';
import ErrorHandling from '../../ErrorHandling/ErrorHandling'


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        orderInstance.get('/orders.json')
        .then(res => {
            // console.log(res.data);
            const fetchOrders = [];
            for (const key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchOrders})
            console.log(this.state.orders.length);
        })
        .catch(err => {
            this.setState({loading: false})
        })
    }


    render() {

        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default ErrorHandling(Orders, orderInstance);