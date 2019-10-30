import React from 'react';
import Posts from './Posts';
import axios from 'axios';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    openPosts: false,
  };

  componentDidMount() {
    axios
      .get('/api/auth/me')
      .then(response => {
        const { name, email } = response.data;
        this.setState({
          name,
          email,
        });
      })
      .catch(err => console.error(err));
  }

  toggleOpenPosts = () => {
    this.setState(prevState => {
      // this.setState({ openPosts: !prevState.openPosts });
      return {
        openPosts: !prevState.openPosts,
      };
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-primary text-center mt-4">بياناتي الشخصية</h1>
        <hr />

        <form>
          <fieldset className="form-group text-right">
            <div className="form-group">
              <label className="from-control-label" htmlFor="nameField">
                الاسم:
              </label>

              <input
                type="text"
                name="name"
                id="nameField"
                className="form-control"
                value={this.state.name}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="from-control-label" htmlFor="emailField">
                البريد الإلكتروني:
              </label>
              <input
                type="email"
                name="email"
                id="emailField"
                className="form-control"
                value={this.state.email}
                disabled
              />
            </div>
          </fieldset>
        </form>

        <h1
          className="text-secondary text-center mt-4 clickable"
          onClick={this.toggleOpenPosts}
        >
          تدويناتي
        </h1>
        <hr />
        {this.state.openPosts ? <Posts isPersonalPosts={true} /> : ''}
      </div>
    );
  }
}

export default Profile;
