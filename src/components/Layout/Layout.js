import React from 'react';
import { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/NavigationItems/SideDrawer/SideDrawer';
import { Component } from 'react';

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
        return (
            <Fragment>
                <div>
                    <Toolbar
                        drawerClicked={this.SideDrawerTaggle}
                    />
                    <SideDrawer 
                        show={this.state.showSideDraw} 
                        clsoeSideDraw={this.clsoeSideDraw}
                        openSide={this.OpenSideDraw}
                        
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

export default Layout;