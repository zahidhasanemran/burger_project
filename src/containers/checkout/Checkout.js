import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Redirect, Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'


class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        // console.log(query);
        const ingredients = {};
        let price = 0;

        for(let para of query.entries()){
            if(para[0] === 'price'){
                price = para[1]
            }else{
                ingredients[para[0]] = +para[1];
            }
            
        }

        // this.props.initPurchase()

        this.setState({ingredients: ingredients, total_price: price});
    }

    // componentDidMount(){
        
    // }

    chekcoutCancelHandle = () =>{
        this.props.history.goBack();
    }


    chekcoutContiHandle = () =>{
        this.props.history.replace('/checkout/contact-form')
    }
    
    
    render() {
        
        let chckout = <Redirect to="/"/>
        if(this.props.ing){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            chckout = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ing} 
                        chekcoutCancel={this.chekcoutCancelHandle}
                        chekcoutContinue={this.chekcoutContiHandle} 

                    />
                </div>
            )
        }

        return (
            <div>
                {chckout}
                <Route path={this.props.match.path + '/contact-form'}  component={ContactData}/>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerReducer.ingredients,
        price: state.orderReducer.total_price,
        purchased: state.orderReducer.purchased
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         initPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);