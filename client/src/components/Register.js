import axios from 'axios';
import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('token')) {
      this.props.history.push('/');
    }

    this.state = {
      name: '',
      email: '',
      password: '',
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

    let { name, email, password } = this.state;
    let userData = {
      name,
      email,
      password,
    };

    axios
      .post('/register', userData)
      .then(response => {
        this.setState({
          name: '',
          email: '',
          password: '',
          errMsg: '',
          successMsg: 'تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول إلى حسابك.',
        });

        let { token, id } = response.data;

        // Save the token and id in the local sotrage.
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);

        // Save the token in the axios request headers so that it is sent every time a page is requested.
        axios.defaults.headers.common = { Authorization: token };
        this.props.history.push('/');
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
          <h1 className="text-primary text-center mt-4">إنشاء حساب جديد</h1>

          <hr />

          <p className="text-center text-danger">
            {this.state.errMsg ? this.state.errMsg : ''}
          </p>
          <p className="text-center text-success">
            {this.state.successMsg ? this.state.successMsg : ''}
          </p>

          <div className="form-group text-center">
            <label className="float-right">الاسم:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="أدخل اسمك هنا"
              value={this.state.name}
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className="form-group text-center">
            <label className="float-right">البريد الإلكتروني:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="أدخل بريدك الإلكتروني هنا"
              value={this.state.email}
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className="form-group text-center">
            <label className="float-right">كلمة المرور:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="أدخل كلمة المرور هنا"
              value={this.state.password}
              onChange={this.inputChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">
            إنشاء الحساب
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
