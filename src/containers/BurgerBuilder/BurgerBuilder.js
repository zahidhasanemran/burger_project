import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
// import axios from 'axios';
import orderInstance from '../../axios/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandling from '../../ErrorHandling/ErrorHandling';
import { connect } from 'react-redux';
import * as burgerActions from '../../store/actions/index'



class BurgerBuilder extends Component {

    state = {
        purchaseable: false,
        orderModal: false,
        loading: false
    }

    componentDidMount(){

        // console.log(this.props);
        this.props.initIngredt();
        // axios.get('https://react-burger-007.firebaseio.com/ingredients.json')
        // .then(res => {
        //     this.setState({ingredients: res.data});
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }


    updatePurchse = (ingredients) => {
        let sum = Object.keys(ingredients).map(ink => {
            return ingredients[ink]
        }).reduce((prev, curr) => {
            return prev + curr;
        }, 0);
        
        return sum > 0
    }


    modalClose = () => {
        this.setState({orderModal: false})
    }

    modalOpen = () => {
        if(this.props.isAuth){
            this.setState({orderModal: true})
        }else{
            this.props.history.push('/auth')
        }
    }

    
    orderContinue = () => {
        this.props.initPurchase()
        this.props.history.push('/checkout')
    }




    render() {

        let OrderSummaryVar = null;
        let burger = <Spinner />;
        if(this.props.ing){
            OrderSummaryVar = <OrderSummary 
                ingredients = {this.props.ing}
                modalclose={this.modalClose}
                orderContinue={this.orderContinue}
                totalPrice={this.props.price}
            />;
            // console.log(this.props);
        burger = (
            <Fragment>
                <Burger ingredients={this.props.ing}></Burger>
                <BuildControls
                    add={this.props.onAddIng}
                    rmv={this.props.onRemoveIng}
                    totalPrice={this.props.price}
                    purchaseable={this.updatePurchse(this.props.ing)}
                    modalOpen={this.modalOpen}
                    isAuth={this.props.isAuth}
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

const mapStateToProps = state => {
        console.log(state);
    return {
        ing: state.burgerReducer.ingredients,
        price: state.burgerReducer.total_price,
        error: state.burgerReducer.error,
        isAuth: state.authReducer.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    // console.log(dispatch);
    return {
        onAddIng: (ingName) => dispatch(burgerActions.addIngredient(ingName)),
        onRemoveIng: (ingName) => dispatch(burgerActions.removeIngredient(ingName)),
        initIngredt: () => dispatch(burgerActions.initIngredinets()),
        initPurchase: () => dispatch(burgerActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandling(BurgerBuilder, orderInstance));