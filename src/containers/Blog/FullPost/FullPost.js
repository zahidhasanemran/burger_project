import React, { Component } from 'react';
import './FullPost.css';
import Axios from 'axios';
import { withRouter } from 'react-router';

class FullPost extends Component {

    state = {
        singlePost: null
    }

    componentDidMount(){
        // console.log(this.props.match.params.postIdForRoute);
        this.loadData()
    }

    componentDidUpdate(){
        this.loadData()
    }

    loadData = () => {
        let id = this.props.match.params.postIdForRoute;
        if(id){
            if(!this.state.singlePost || (this.state.singlePost && this.state.singlePost.id != id)){
                Axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
                .then(response => {
                    this.setState({singlePost: response.data})
                })
            }
        }
    }

    deletePost = () => {
        Axios.delete('https://jsonplaceholder.typicode.com/posts/'+this.props.match.params.postIdForRoute)
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

export default withRouter(FullPost);