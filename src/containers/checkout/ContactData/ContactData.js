import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css';
import orderInstance from '../../../axios/axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'chepest', displayValue: 'Chepest'}
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 4,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandeled = (e) => {
        e.preventDefault();
        // console.log(this.props.ingredients);

        console.log("Order Continue...");
        this.setState({loading: true});
        const formData = {};
        for (const key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key]
        }
        console.log(formData);

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData : formData
            
        }
        orderInstance.post('/orders.json', order)
        .then(res => {
            this.setState({
                loading: false,
                // orderModal: false
            });
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({
                loading: false,
                // orderModal: false
            })
        });

    }

    inputChangeHandeler = (event, identifiesr) => {
        // console.log(identifiesr);

        let orderFrmCpd = {
            ...this.state.orderForm
        }
        // console.log(orderFrmCpd);

        let depClndOrderFrm = {
            ...orderFrmCpd[identifiesr]
        }
        depClndOrderFrm.value = event.target.value;
        depClndOrderFrm.valid = this.checkValidity(depClndOrderFrm.value, depClndOrderFrm.validation);
        depClndOrderFrm.touched = true;
        orderFrmCpd[identifiesr] = depClndOrderFrm;


        let isFormValid = true;
        for(let fromInput in orderFrmCpd){
            isFormValid = isFormValid && orderFrmCpd[fromInput].valid;
            console.log(orderFrmCpd[fromInput]);
        };
        this.setState({
            orderForm: orderFrmCpd,
            formIsValid: isFormValid
        })

        // console.log(depClndOrderFrm);


    }

    checkValidity (value, rules) {

        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    

    render() {

        let formElementArray = [];

        for (const key in this.state.orderForm) {
           formElementArray.push({
               id: key,
               config: this.state.orderForm[key]
           })
        }

        let form = (
            <form onSubmit={this.orderHandeled}>
                    
                    {formElementArray.map(singleEl => {
                        // console.log(singleEl);
                       return <Input 
                            elementType={singleEl.config.elementType}
                            elementConfig={singleEl.config.elementConfig}
                            value={singleEl.config.value}
                            key={singleEl.id}
                            shouldValidate={singleEl.config.validation}
                            invalid={!singleEl.config.valid}
                            touched={singleEl.config.touched}
                            changed={(event) => this.inputChangeHandeler(event, singleEl.id)}
                        />
                    })}
                    <Button 
                        btnType="Success"
                        disabled={!this.state.formIsValid}
                    >Order</Button>


                </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact data</h4>
                {form}
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

export default connect(mapStateToProps)(ContactData);