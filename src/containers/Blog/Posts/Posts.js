import React, { Component, Fragment } from 'react';
import Post from '../../../components/Post/Post'
import Axios from 'axios';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router';


class Posts extends Component {


    state = {
        posts: [],
        error: false
    }

    componentDidMount(){
        // console.log(this.props);
        Axios.get('/posts').then(res =>{
            let maniDat = res.data.slice(0, 4);
            let updatePost = maniDat.map((post) => {
                return {
                    ...post,
                    author: 'max'
                }
            })
            return this.setState({posts: updatePost});
        })
        .catch(error => {
            console.log(error);
            // this.setState({error: true})
        });
    }

    passidFullpost = (id) =>{
        // this.props.history.push('/'+id)
        this.props.history.push({pathname:'/posts/'+id})
    }

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>

        if(!this.state.error){
            posts = this.state.posts.map((post, i) => {
                return (
                    // <Link to={'/'+post.id} key={post.id}>
                        <Post 
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.passidFullpost(post.id)}
                        />
                    // </Link>
                )
            })
        }

        return (
            <Fragment>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:postIdForRoute'} exact component={FullPost} /> 
            </Fragment>
        );
    }
}

export default Posts;