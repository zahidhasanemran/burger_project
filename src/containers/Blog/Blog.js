import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route } from 'react-router';
import NewPost from '../../containers/Blog/NewPost/NewPost'
import { NavLink, Switch } from 'react-router-dom';
import FullPost from '../../containers/Blog/FullPost/FullPost'

class Blog extends Component {

    

    

    render () {

        

        return (
            <div className="Blog">
                <ul>
                    <li>
                        <NavLink activeClassName="highlight" to="/" exact >Home</NavLink>
                        <NavLink to="/new-post" exact activeStyle={{
                            color: 'red',
                            textDecoration: 'underline'
                        }} >New Post</NavLink>
                    </li>
                </ul>
                

               <Switch>
                    <Route exact path="/" component={Posts} /> 
                    <Route path="/new-post" component={NewPost} /> 
                    <Route path="/:postIdForRoute" component={FullPost} /> 
               </Switch>

                
                
                
            </div>
        );
    }
}

export default Blog;