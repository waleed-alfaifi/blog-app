import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

function Header() {
  let token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <Link className="navbar-brand" to="/">
        تطبيق مدونتي
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse text-center"
        id="collapsibleNavbar"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              الرئيسية
            </Link>
          </li>

          {!token && (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  حساب جديد
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  دخول
                </Link>
              </li>
            </React.Fragment>
          )}

          {token && (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/user/profile">
                  ملفي الشخصي
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts/add">
                  إضافة تدوينة
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  تسجيل الخروج
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  axios.defaults.headers.common = { Authorization: '' };
};

export default withRouter(Header);
