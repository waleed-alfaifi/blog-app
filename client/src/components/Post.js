import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  render() {
    return (
      <div className="container-fluid text-right">
        <h3 className="text-info">{this.props.title}</h3>
        <em className="text-success">{this.props.author}</em>
        <p className="text-secondary mt-2" dir="auto">
          {this.props.content && this.props.content.length > 100
            ? this.props.content.substring(0, 100) + '...'
            : this.props.content}
        </p>
        <div className="my-3 text-primary">
          {this.props.createdAt && this.props.createdAt.substring(0, 10)}
        </div>
        <Link to={`/posts/view/${this.props.id}`}>
          <button className="btn btn-outline-dark">عرض المزيد</button>
        </Link>
        <hr />
      </div>
    );
  }
}

export default Post;
