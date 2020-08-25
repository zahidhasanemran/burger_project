import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';


const PRICE = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 0.5,
    meat: 1.6
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        total_price: 2,
        purchaseable: false,
        orderModal: false
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
        console.log("Order Continue...");
    }




    render() {
        return (
            <div>
                <Backdrop show={this.state.orderModal} clicked={this.modalClose} />
                <Modal show={this.state.orderModal}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        modalclose={this.modalClose}
                        orderContinue={this.orderContinue}
                        totalPrice={this.state.total_price}
                    />
                </Modal> 
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    add={this.addIngredient}
                    rmv={this.removeIngredient}
                    totalPrice={this.state.total_price}
                    purchaseable={this.state.purchaseable}
                    modalOpen={this.modalOpen}
                />
            </div>
        );
    }
}

export default BurgerBuilder;