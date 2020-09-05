import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route } from 'react-router';
import NewPost from '../../containers/Blog/NewPost/NewPost'
import { NavLink, Switch, Redirect } from 'react-router-dom';

class Blog extends Component {

    

    

    render () {

        

        return (
            <div className="Blog">
                <ul>
                    <li>
                        <NavLink activeClassName="highlight" to="/posts" exact >Posts</NavLink>
                        <NavLink to="/new-post" exact activeStyle={{color: 'red',textDecoration: 'underline'}} >New Post</NavLink>
                    </li>
                </ul>
                

               <Switch>
                    <Route path="/new-post" component={NewPost} /> 
                    <Route path="/posts" component={Posts} /> 
                    <Redirect from="/" to="/posts" />
                    
               </Switch>

                
                
                
            </div>
        );
    }
}

export default Blog;