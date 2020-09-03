import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route } from 'react-router';
import NewPost from '../../containers/Blog/NewPost/NewPost'
import { Link } from 'react-router-dom';


class Blog extends Component {

    

    

    render () {

        

        return (
            <div className="Blog">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="/new-post">New Post</Link>
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