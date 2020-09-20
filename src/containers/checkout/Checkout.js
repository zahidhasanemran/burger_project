import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';



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
        // console.log(this.props.match.path);
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    chekcoutCancel={this.chekcoutCancelHandle}
                    chekcoutContinue={this.chekcoutContiHandle} 

                />
                <Route path={this.props.match.path + '/contact-form'}  
                render={(props) => (
                <ContactData 
                    ingredients={this.state.ingredients} 
                    price={this.state.total_price}
                    {...props}
                />
                
                )} />


            </div>
        );
    }
}

export default Checkout;