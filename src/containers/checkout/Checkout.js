import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Redirect, Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';



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

        this.setState({ingredients: ingredients, total_price: price});
    }

    chekcoutCancelHandle = () =>{
        this.props.history.goBack();
    }


    chekcoutContiHandle = () =>{
        this.props.history.replace('/checkout/contact-form')
    }
    
    
    render() {
        
        let chckout = <Redirect to="/"/>
        if(this.props.ing){
            chckout = (
                <CheckoutSummary 
                    ingredients={this.props.ing} 
                    chekcoutCancel={this.chekcoutCancelHandle}
                    chekcoutContinue={this.chekcoutContiHandle} 

                />
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
        ing: state.ingredients,
        price: state.total_price
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
        
//     }
// }

export default connect(mapStateToProps)(Checkout);