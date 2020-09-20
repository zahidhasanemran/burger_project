import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from 'axios';
import orderInstance from '../../axios/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandling from '../../ErrorHandling/ErrorHandling';


const PRICE = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 0.5,
    meat: 1.6
}

class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // total_price: 2,
        // purchaseable: false,
        // orderModal: false,
        // loading: false
    }

    componentDidMount(){

        // console.log(this.props);

        axios.get('https://react-burger-007.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients: res.data});
        })
        .catch(error => {
            console.log(error);
        })
    }


    updatePurchse = (ingredients) => {
        let sum = Object.keys(ingredients).map(ink => {
            return ingredients[ink]
        }).reduce((prev, curr) => {
            return prev + curr;
        }, 0);
        
        this.setState({purchaseable: sum > 0})
    }

    addIngredient = (type) => {
        let oldCount = this.state.ingredients[type],
        updateCount = oldCount + 1,
        updateState = {...this.state.ingredients};
        updateState[type] = updateCount;

        let totalPrice = this.state.total_price,
        newPrice = PRICE[type] + totalPrice;

        this.setState({
            ingredients: updateState,
            total_price: newPrice
        })
        this.updatePurchse(updateState);

    };

    removeIngredient = (type) => {
        let el = this.state.ingredients[type],
        redEl = el - (this.state.ingredients[type] === 0 ? 0 : 1),
        updateState = {...this.state.ingredients};
        updateState[type] = redEl;

        let totalPrice = this.state.total_price,
        updatePrice = totalPrice - (this.state.ingredients[type] === 0 ? 0 : PRICE[type]);

        this.setState({
            ingredients: updateState,
            total_price: updatePrice
        })
        this.updatePurchse(updateState);
    }

    modalClose = () => {
        this.setState({orderModal: false})
    }

    modalOpen = () => {
        this.setState({orderModal: true})
    }

    
    orderContinue = () => {
        // console.log("Order Continue...");
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.total_price,
        //     customer: {
        //         name: "Zahid Hasan Emran",
        //         age: '26',
        //         address: {
        //             street: "Test street",
        //             country: "Bangladesh"
        //         },
        //         email: "demo@gmail.com"
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // orderInstance.post('/orders.json', order)
        // .then(res => {
        //     this.setState({
        //         loading: false,
        //         orderModal: false
        //     })
        // })
        // .catch(error => {
        //     this.setState({
        //         loading: false,
        //         orderModal: false
        //     })
        // });

        const queryPar = [];

        for (let i in this.state.ingredients) {
            queryPar.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            
        }
        queryPar.push('price=' + this.state.total_price);

        const queryString = queryPar.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })




    }




    render() {

        let OrderSummaryVar = null;
        let burger = <Spinner />
        if(this.state.ingredients){
            OrderSummaryVar = <OrderSummary 
            ingredients = {this.state.ingredients}
            modalclose={this.modalClose}
            orderContinue={this.orderContinue}
            totalPrice={this.state.total_price}
        />;

        burger = (
        <Fragment>
            <Burger ingredients={this.state.ingredients}></Burger>
            <BuildControls 
                add={this.addIngredient}
                rmv={this.removeIngredient}
                totalPrice={this.state.total_price}
                purchaseable={this.state.purchaseable}
                modalOpen={this.modalOpen}
            />
        </Fragment>
        )


        }

        if(this.state.loading) {
            OrderSummaryVar = <Spinner/>
        }

        return (
            <div>
                
                <Modal show={this.state.orderModal} clicked={this.modalClose}>
                    {OrderSummaryVar}
                </Modal> 
                {burger}
            </div>  
        );
    }
}

export default ErrorHandling(BurgerBuilder, orderInstance);