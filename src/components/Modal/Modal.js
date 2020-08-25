import React from 'react';
import classes from './Modal.module.css';
import { Component } from 'react';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show 
     }

    componentWillUpdate(){
        console.log("modal updated");
    }

   render(){

    let classN = [this.props.show ? [classes.Modal] : [classes.hidden]];

    return (
        <div className={classN}>
            {this.props.children}
        </div>
    );
   }
};

export default Modal;