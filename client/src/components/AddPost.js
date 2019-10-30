import React, { Component } from 'react';
import axios from 'axios';

class AddPost extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }

    this.state = {
      title: '',
      content: '',
      errMsg: '',
      successMsg: '',
    };
  }

  inputChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      errMsg: '',
      successMsg: '',
    });
  };

  formSubmitHandler = e => {
    e.preventDefault();

    let { title, content } = this.state;
    let userData = {
      title,
      content,
    };

    axios
      .post('/api/posts', userData)
      .then(response => {
        this.setState({
          title: '',
          content: '',
          errMsg: '',
          successMsg: 'تم إضافة التدوينة بنجاح.',
        });
        console.log(response);
      })
      .catch(err => {
        let errMsg = err.response.data.message;
        this.setState({ errMsg, successMsg: '' });
      });
  };

  render() {
    return (
      <div>
        <form
          method="POST"
          className="container"
          onSubmit={this.formSubmitHandler}
        >
          <h1 className="text-primary text-center mt-4">إضافة تدوينة</h1>

          <hr />

          <p className="text-center text-danger">
            {this.state.errMsg ? this.state.errMsg : ''}
          </p>
          <p className="text-center text-success">
            {this.state.successMsg ? this.state.successMsg : ''}
          </p>

          <div className="form-group text-center">
            <label className="float-right">العنوان:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="أدخل عنوان التدوينة هنا"
              value={this.state.title}
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className="form-group text-center">
            <label className="float-right">المحتوى:</label>
            <textarea
              name="content"
              className="form-control"
              placeholder="أدخل محتوى التدوينة هنا"
              value={this.state.content}
              onChange={this.inputChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">
            أضف تدوينة
          </button>
        </form>
      </div>
    );
  }
}

export default AddPost;
