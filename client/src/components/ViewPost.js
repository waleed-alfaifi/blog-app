import React from 'react';
import axios from 'axios';

import Comments from './Commetns';
import Message from './Message';
import BasicForm from './layout/BasicForm';

class ViewPost extends React.Component {
  state = {
    isLoading: false,
    isEditing: false,
    post: undefined,
    title: '',
    content: '',
    createdAt: '',
    errMsg: '',
    successMsg: '',
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    let postId = this.props.match.params.id;
    axios
      .get(`/api/posts/${postId}`)
      .then(response => {
        let post = response.data;

        this.setState({
          post,
          isLoading: false,
          title: post.title,
          content: post.content,
          createdAt: post.created_at,
          errMsg: '',
          successMsg: '',
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  inputChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      errMsg: '',
      successMsg: '',
    });
  };

  editPost = e => {
    e.preventDefault();

    const { title, content } = this.state;

    /* 
       Very bad way of validation. In production, 
       you should change it to a more reliable way. 
    */
    if (title === '' || content === '') {
      this.setState({
        errMsg: 'الرجاء إدخال البيانات المطلوبة.',
        successMsg: '',
      });
    } else if (
      title !== this.state.post.title ||
      content !== this.state.post.content
    ) {
      axios
        .put(`/api/posts/${this.state.post._id}`, { title, content })
        .then(response => {
          const { post } = response.data;
          this.setState({
            post,
            isEditing: false,
            errMsg: '',
            successMsg: 'تم تعديل التدوينة بنجاح.',
          });
        })
        .catch(err => {
          this.setState({ errMsg: err.response.data.message, successMsg: '' });
        });
    } else {
      this.setState({
        isEditing: false,
        errMsg: '',
        successMsg: '',
      });
    }
  };

  deletePost = () => {
    axios
      .delete(`/api/posts/${this.state.post._id}`)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ errMsg: err.response.data.message });
      });
  };

  renderActions = () => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');

    if (token && userId === this.state.post.author._id) {
      return (
        <span>
          <button
            className="btn btn-outline-dark"
            onClick={() => {
              this.setState({ isEditing: !this.state.isEditing });
            }}
          >
            تعديل
          </button>
          <button className="btn btn-outline-danger" onClick={this.deletePost}>
            حذف
          </button>
          {this.state.isEditing ? this.renderEditPost() : ''}
        </span>
      );
    }
  };

  renderModal = () => {
    return (
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">تعديل التدوينة</h4>
            </div>

            <div className="modal-body">
              <form>
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
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                إلغاء
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.editPost}
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderEditPost = () => {
    return (
      <div>
        <div className="row mt-2">
          <div className="form-group col-sm-6">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="عنوان التدوينة هنا"
              value={this.state.title}
              onChange={this.inputChangeHandler}
            />
          </div>
        </div>
        <BasicForm
          changingValue={this.state.content}
          changingValueName="content"
          cancelText="إلغاء"
          submitText="حفظ التعديلات"
          placeholder="محتوى التدوينة هنا"
          onChangeMethod={this.inputChangeHandler}
          submitMethod={this.editPost}
          cancelMethod={() => {
            this.setState({
              isEditing: !this.state.isEditing,
              title: this.state.post.title,
              content: this.state.post.content,
            });
          }}
        />
      </div>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Message
          text="الرجاء الانتظار..."
          position="center"
          marginDirection="t"
          marginSize={5}
        />
      );
    }

    if (!this.state.post) {
      return (
        <Message
          text="التدوينة غير موجودة"
          position="center"
          marginDirection="t"
          marginSize={5}
        />
      );
    }

    return (
      <React.Fragment>
        <p className="text-center text-danger">
          {this.state.errMsg ? this.state.errMsg : ''}
        </p>
        <p className="text-center text-success">
          {this.state.successMsg ? this.state.successMsg : ''}
        </p>

        <div className="container-fluid text-right">
          <h3 className="text-info">{this.state.title}</h3>
          <em className="text-success">{this.state.post.author.name}</em>
          <p className="text-secondary mt-2" dir="auto">
            {this.state.content}
          </p>
          <div className="my-3">
            {'تاريخ النشر: '}
            <span className="text-primary">
              {this.state.createdAt && this.state.createdAt.substring(0, 10)}
            </span>
          </div>
          {this.renderActions()}
        </div>

        <Comments postId={this.state.post._id} />
      </React.Fragment>
    );
  }
}

export default ViewPost;
