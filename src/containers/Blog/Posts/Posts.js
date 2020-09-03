import React, { Component } from 'react';
import Post from '../../../components/Post/Post'
import Axios from 'axios';


class Posts extends Component {


    state = {
        posts: [],
        fullPostId: null,
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
        this.setState({fullPostId: id});
    }

    render() {

        

        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>

        if(!this.state.error){
            posts = this.state.posts.map((post, i) => {
                return <Post 
                    key={i}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.passidFullpost(post.id)}
                />
            })
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;