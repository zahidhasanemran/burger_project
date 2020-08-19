import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';


const PRICE = {
    salad: 0.4,
    bacon: 0.6,
    meat: 1.3,
    cheese: 0.7
}


class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        total_price: 0.5,
        purchasable: false,
        purchasing: false

    }

    updatePurchase = (ingredients) => {
        
        let sum = Object.keys(ingredients).map(ing => {
            
            return ingredients[ing]
        }).reduce((sum, el)=>{
            return sum + el;
        },0);
        console.log(sum);
        
        this.setState({
            purchasable: sum > 0
        });

    }

    addIngredients = (type) => {
        let menu = this.state.ingredients[type] + 1;
        let updateState = {
            ...this.state.ingredients,
            ...this.state.total_price
        }
        updateState[type] = menu;

        let price = this.state.total_price + Number(PRICE[type]);
        

        this.setState({
            ingredients: updateState,
            total_price: price
        })
        this.updatePurchase(updateState)
        // console.log(updateState);
    }

    removeIngredient = (type) => {
        let updateState = {
            ...this.state.ingredients,
            ...this.state.total_price
        }
        let menu = this.state.ingredients[type] === 0 ? this.state.ingredients[type] : this.state.ingredients[type] - 1;
        updateState[type] = menu;

        let price = this.state.total_price - (this.state.ingredients[type] === 0 ? this.state.ingredients[type] : Number(PRICE[type]))

        this.setState({
            ingredients: updateState,
            total_price: price
        })
        this.updatePurchase(updateState)


    }

    purchasingModal = () => {
        this.setState({purchasing: true});
    }
    purchaseContinue = () => {
        alert('you continue')
    }

    removeModalBackdrop = () => {
        this.setState({purchasing: false});
    }

    render() {
        return (
            <Fragment>
                
                <Modal show={this.state.purchasing} removeModal={this.removeModalBackdrop}> 
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    removeModal={this.removeModalBackdrop}
                    continuPurchse={this.purchaseContinue}
                    price={this.state.total_price}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} ></Burger>
                <BuildControls 
                    currentPrice={this.state.total_price} 
                    added={this.addIngredients} 
                    price={PRICE} 
                    removed={this.removeIngredient}
                    purchasable={this.state.purchasable}
                    ordered = {this.purchasingModal}

                ></BuildControls>
            </Fragment>
        );
    }
}

export default BurgerBuilder;