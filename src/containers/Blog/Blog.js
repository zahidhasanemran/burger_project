import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route } from 'react-router';
import NewPost from '../../containers/Blog/NewPost/NewPost'
import { NavLink } from 'react-router-dom';


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
                

                {/* <section>
                    <FullPost id={this.state.fullPostId} />
                </section>
                <section>
                    <NewPost />
                </section> */}

                <Route exact path="/" component={Posts} /> 
                <Route exact path="/new-post" component={NewPost} /> 
                
                
            </div>
        );
    }
}

export default Blog;