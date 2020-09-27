import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';



class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        // loggedIn: false
    }

    switchSign = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    inputChangeHandeler = (event, identifiesr) => {
        const updatedControls = {
            ...this.state.controls,
            [identifiesr]: {
                ...this.state.controls[identifiesr],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[identifiesr].validation),
                touched: true
            }
        };
        this.setState({
            controls: updatedControls
        })


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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }


    render() {

        // console.log(this.props);

        let formElementArray = [];

        for (const key in this.state.controls) {
           formElementArray.push({
               id: key,
               config: this.state.controls[key]
           })
        }

        let form = formElementArray.map(formEl => (
                
                <Input 
                    key={formEl.id}
                    elementType={formEl.config.elementType}
                    elementConfig={formEl.config.elementConfig}
                    value={formEl.config.value}
                    shouldValidate={formEl.config.validation}
                    invalid={!formEl.config.valid}
                    touched={formEl.config.touched}
                    changed={(event) => this.inputChangeHandeler(event, formEl.id)}

                />
                
            
        ))

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p> {this.props.error.message} </p>
        }

        let authStatus = <p>Please Log In. </p>;
        if(this.props.isLoggedIn){
            authStatus = <p> Welcome {this.state.controls.email.value} </p>;
        }

        // console.log(this.props.isLoggedIn);

        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to="/" />
        }

        return (
            <div  className={classes.AuthData}>
                {authRedirect}
                {errorMessage}
                {authStatus}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                    <Button btnType="Danger" clicked={this.switchSign}>Switch to {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'} </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isLoggedIn: state.authReducer.loggedIn,
        isAuth: state.authReducer.token !== null
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, pass, method) => dispatch(actions.auth(email,pass, method))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);