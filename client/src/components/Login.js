import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('token')) {
      this.props.history.push('/');
    }

    this.state = {
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

    let { email, password } = this.state;
    let userData = {
      email,
      password,
    };

    axios
      .post('/api/auth', userData)
      .then(response => {
        this.setState({
          email: '',
          password: '',
          errMsg: '',
          successMsg: 'تم تسجيل دخولك بنجاح.',
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
          <h1 className="text-primary text-center mt-4">تسجيل الدخول</h1>

          <hr />

          <p className="text-center text-danger">
            {this.state.errMsg ? this.state.errMsg : ''}
          </p>
          <p className="text-center text-success">
            {this.state.successMsg ? this.state.successMsg : ''}
          </p>

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
            تسجيل الدخول
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
