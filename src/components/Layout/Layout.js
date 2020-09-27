import React from 'react';
import { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/NavigationItems/SideDrawer/SideDrawer';
import { Component } from 'react';
import { connect } from 'react-redux';



class Layout extends Component {

    state = {
        showSideDraw: false
    }

    clsoeSideDraw = () => {
        this.setState({showSideDraw: false});
    }

    OpenSideDraw = () => {
        this.setState({showSideDraw: true});
    }

    SideDrawerTaggle = () => {
        this.setState((prevState) => {
            return {showSideDraw: !prevState.showSideDraw}
        })
    }

    render(){
        // console.log(this.props.isAuth);
        return (
            <Fragment>
                <div>
                    <Toolbar
                        drawerClicked={this.SideDrawerTaggle}
                        isAuth={this.props.isAuth}
                    />
                    <SideDrawer 
                        show={this.state.showSideDraw} 
                        clsoeSideDraw={this.clsoeSideDraw}
                        openSide={this.OpenSideDraw}
                        isAuth={this.props.isAuth}
                        />
                    Backdrop
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);