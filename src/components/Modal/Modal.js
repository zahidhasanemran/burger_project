import React, {Fragment, Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';



class Modal extends Component {

    
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }

    componentWillUpdate(){
        console.log('Modal  update');
    }

    render(){
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.removeModal}/>
                    <div className={this.props.show ? `${classes.Modal}` : `${classes.hidden}`}>
                        {this.props.children}
                    </div>
            </Fragment>
        );
    }
};

export default Modal;