import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import Message from './Message';

class Posts extends Component {
  state = {
    posts: [],
    isLoading: false,
  };

  componentDidMount() {
    const userId = localStorage.getItem('id');
    const { isPersonalPosts } = this.props;
    this.setState({ isLoading: true });
    axios
      .get('/api/posts')
      .then(response => {
        const posts = isPersonalPosts
          ? response.data.filter(post => post.author._id === userId)
          : response.data;
        this.setState({ isLoading: false, posts });
      })
      .catch(err => console.error(err));
  }

  render() {
    let posts = this.state.posts.map(post => {
      return (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          author={post.author.name}
          createdAt={post.created_at}
        />
      );
    });

    if (this.state.isLoading) {
      return (
        <Message
          text="تحميل التدوينات..."
          position="center"
          marginDirection="t"
          marginSize={5}
        />
      );
    }

    if (this.state.posts.length === 0) {
      return (
        <Message
          text="لا يوجد تدوينات"
          position="center"
          marginDirection="t"
          marginSize={5}
        />
      );
    }

    return <React.Fragment>{posts}</React.Fragment>;
  }
}

export default Posts;
