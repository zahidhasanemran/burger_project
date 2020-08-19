import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/NavigationItems/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop'

class Layout extends Component {

    state = {
        sidebar: false
    }

    backdropRemoved = () => {
        this.setState({sidebar: false})
    }
    drawerToggle = () => {
        this.setState((prevState) => {
            return {sidebar: !prevState.sidebar}
        })
    }


    render(){
        return(
            <Fragment>
                <Backdrop
                    show = {this.state.sidebar}
                    clicked={this.backdropRemoved}

                />
                <Toolbar drawerToggleClicked={this.drawerToggle}/>
                <SideDrawer show = {this.state.sidebar}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
            )
    }
    
};
export default Layout;