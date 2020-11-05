import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="mt-12" >
        <div className="icon-sidebar-nav container-fluid" >
          <div className="row">
            <main className="main-content col col">
              <div className="main-content-container h-100 px-4 container-fluid">
                <div className="h-100 no-gutters row">
                  <div className="auth-form mx-auto my-auto col-md-5 col-lg-3">
                    <br/><br/>
                    <div className="card" style={{marginTop: '50px !important'}}>
                      <div className="card-body">
                        <h5 className="auth-form__title text-center mb-4">Access Your Account</h5>
                        <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <TextFieldGroup
                              placeholder="Enter email"
                              name="email"
                              type="email"
                              id="email"
                              autoComplete="email"
                              value={this.state.email}
                              onChange={this.onChange}
                              error={errors.email}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <TextFieldGroup
                              placeholder="Password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              value={this.state.password}
                              onChange={this.onChange}
                              id="password"
                              error={errors.password}
                            />
                          </div>
                          
                          <button type="submit" className="d-table mx-auto btn btn-accent btn-pill">Access Account</button>
                        </form>
                      </div>
                    </div>
                    <div className="auth-form__meta d-flex mt-4">
                    <Link to="/forget-password">Forget password</Link></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, 
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
