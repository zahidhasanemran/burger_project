import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import { Component } from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
     }

    // componentWillUpdate(){
    //     console.log("modal updated");
    // }

   render(){

    let classN = [this.props.show ? [classes.Modal] : [classes.hidden]];

    return (
        <Fragment>
            <Backdrop show={this.props.show} clicked={this.props.clicked} />
            <div className={classN}>
                {this.props.children}
            </div>
        </Fragment>
    );
   }
};

export default Modal;