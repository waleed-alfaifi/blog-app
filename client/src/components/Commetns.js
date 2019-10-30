import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import BasicForm from './layout/BasicForm';

class Comments extends Component {
  state = {
    comments: [],
    comment: '',
    addingComment: false,
  };

  componentDidMount() {
    let token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`/api/comments/${this.props.postId}`)
        .then(response => {
          this.setState({ comments: response.data });
        })
        .catch(err => console.error(err));
    }
  }

  saveUserInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  addComment = e => {
    e.preventDefault();

    axios
      .post(`/api/comments/${this.props.postId}`, {
        content: this.state.comment,
      })
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  renderAddCommentToggler = () => {
    return (
      <div className="form-group clearfix">
        <input
          type="button"
          value="أضف تعليق"
          className="btn btn-outline-primary float-right"
          onClick={() => {
            this.setState({ addingComment: !this.state.addingComment });
          }}
        />
      </div>
    );
  };

  renderAddComment = () => {
    return (
      <BasicForm
        changingValue={this.state.comment}
        changingValueName="comment"
        cancelText="إلغاء"
        submitText="نشر التعليق"
        placeholder="أضف تعليقك هنا"
        onChangeMethod={this.saveUserInput}
        submitMethod={this.addComment}
        cancelMethod={() => {
          this.setState({
            addingComment: !this.state.addingComment,
            comment: '',
          });
        }}
      />
    );

    // return (
    //   <form onSubmit={this.addComment}>
    //     <div className="row">
    //       <div className="form-group col-sm-6">
    //         <textarea
    //           className="form-control"
    //           name="comment"
    //           cols="10"
    //           rows="5"
    //           placeholder="أضف تعليقك هنا"
    //           value={this.state.comment}
    //           onChange={this.saveUserInput}
    //           required
    //         />
    //       </div>
    //     </div>

    //     <div className="form-group">
    //       <div className="clearfix">
    //         <input
    //           type="submit"
    //           value="نشر التعليق"
    //           className="btn btn-outline-success float-right"
    //         />
    //         <input
    //           type="button"
    //           value="إلغاء"
    //           className="btn btn-outline-danger float-right"
    //           onClick={() => {
    //             this.setState({
    //               addingComment: !this.state.addingComment,
    //               comment: '',
    //             });
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </form>
    // );
  };

  renderComments = () => {
    const renderedComments = this.state.comments.map((comment, index) => {
      return (
        <div key={comment._id} className="text-right p-3 mb-2 bg-light">
          <p className="p-2 comment-author-name">
            <span className="text-info">{comment.author.name}</span>:
          </p>
          <p className="p-2" dir="auto">
            {comment.content}
          </p>
        </div>
      );
    });

    return (
      <div className="container-fluid mt-3">
        {this.renderAddCommentToggler()}
        {this.state.addingComment ? this.renderAddComment() : ''}
        <Message
          text="التعليقات"
          position="right"
          marginDirection="t"
          marginSize="5"
        />
        <hr />
        {renderedComments}
      </div>
    );
  };

  render() {
    let token = localStorage.getItem('token');

    if (!token) {
      return (
        <div className="container-fluid mt-3">
          <Message
            text="قم بتسجيل الدخول لإضافة ورؤية التعليقات"
            position="right"
            marginDirection="y"
            marginSize={5}
          />
        </div>
      );
    }

    if (this.state.comments.length === 0) {
      return (
        <div className="container-fluid mt-3">
          {this.renderAddCommentToggler()}
          {this.state.addingComment ? this.renderAddComment() : ''}
          <Message
            text="لا يوجد تعليقات"
            position="right"
            marginDirection="y"
            marginSize={5}
          />
        </div>
      );
    }

    if (this.state.comments.length > 0) {
      return this.renderComments();
    }
  }
}

export default Comments;
