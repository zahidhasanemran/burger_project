import React, { Component } from 'react';
import './NewPost.css';
import Axios from 'axios';
import { Redirect } from 'react-router';


class NewPost extends Component {

    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    postData = () => {

        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        Axios.post('/posts', data)
        .then(res => {
            console.log(res);
            // this.setState({submitted: true});
            // this.props.history.replace('/posts');
            this.props.history.push('/posts');
        });

    }

    componentDidMount(){
        console.log(this.props);
    }

    render () {

        let redirect = null
        if(this.state.submitted){
            redirect = <Redirect to="/posts" />
        }

        return (
            <div className="NewPost">
                {/* {redirect} */}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postData}>Add Post</button>
            </div>
        );
    }

}

export default NewPost;