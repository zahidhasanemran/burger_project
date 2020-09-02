import React, { Component } from 'react';
import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {

    state = {
        singlePost: null
    }

    componentDidUpdate(){
        if(this.props.id){
            if(!this.state.singlePost || (this.state.singlePost && this.state.singlePost.id !== this.props.id)){
                Axios.get('https://jsonplaceholder.typicode.com/posts/'+this.props.id)
                .then(response => {
                    this.setState({singlePost: response.data})
                })
            }
        }
    }

    deletePost = () => {
        Axios.delete('https://jsonplaceholder.typicode.com/posts/'+this.props.id)
                .then(response => {
                    console.log(response);
                })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a post .</p>;

        if(this.props.id){
            post = <p style={{textAlign: 'center'}}>Loading...</p>
        }
        if(this.state.singlePost){
            post = (
                <div className="FullPost">
                    <h1> {this.state.singlePost.title} </h1>
                    <p> {this.state.singlePost.body} </p>
                    <div className="Edit">
                        <button onClick={this.deletePost} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }

        
        return post;
    }
}

export default FullPost;