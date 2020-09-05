import React, { Component, Suspense } from 'react';
import './Blog.css';
// import Posts from './Posts/Posts';
import { Route } from 'react-router';
// import NewPost from '../../containers/Blog/NewPost/NewPost'
import { NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComLoader from '../../hoc/asyncComLoader';
const Posts = React.lazy(() => import('./Posts/Posts'))


const asyCoLoaderCalled = asyncComLoader(()=>{
    return import('../../containers/Blog/NewPost/NewPost');
});

class Blog extends Component {

    state ={
        auth: false
    }

    

    render () {

        

        return (
            <div className="Blog">
                <ul>
                    <li>
                        <NavLink activeClassName="highlight" to="/posts" exact >Posts</NavLink>
                        <NavLink to="/new-post" exact activeStyle={{color: 'red',textDecoration: 'underline'}} >New Post</NavLink>
                        <NavLink to="/login" onClick={() => this.setState({auth: !this.state.auth})}> {this.state.auth ? 'Dashboard' : 'Login'} </NavLink>
                    </li>
                </ul>
                

               <Switch>
                    {this.state.auth ? <Route path="/new-post" component={asyCoLoaderCalled} /> : null } 
                    <Route exact path="/" render={()=> <h1>Home page</h1>} /> 
                    <Route path="/posts" render={() => 
                        <Suspense fallback={<div>Loading...</div>}>
                            <Posts {...this.props} />
                        </Suspense>
                    } /> 
                    {/* <Redirect from="/" to="/posts" /> */}
                    <Route render={() => <h2>Not Found</h2>} />
                    {/* <Route component={errorPage} /> */}
                    
               </Switch>

                
                
                
            </div>
        );
    }
}

export default Blog;