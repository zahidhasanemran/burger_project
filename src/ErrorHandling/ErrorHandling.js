import React, { Fragment } from 'react';
import { Component } from 'react';
import Modal from '../components/Modal/Modal';

const ErrorHandling = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props){
            super(props);
            this.state = {
                error: null
            }
        }
        
        componentDidMount(){
            axios.interceptors.request.use(request => {
                this.setState({error: null})
                return request;
            });

            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
        }
        
        
        

        errorClear = () => {
            this.setState({error: null});
        }

        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error} clicked={this.errorClear}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
};

export default ErrorHandling;