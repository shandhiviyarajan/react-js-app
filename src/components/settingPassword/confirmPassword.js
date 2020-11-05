import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addConfirmPassword } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class confirmPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      confirmationCode: '',
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
      email: this.props.match.params.id,
      confirmationCode: this.state.confirmationCode,
      password: this.state.password,
    };

    this.props.addConfirmPassword(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div>
        <div className="icon-sidebar-nav container-fluid">
          <div className="row">
            <main className="main-content col col">
              <div className="main-content-container h-100 px-4 container-fluid">
                <div className="h-100 no-gutters row">
                  <div className="auth-form mx-auto my-auto col-md-5 col-lg-3">
                    <br/>
                    <br/>
                    <br/>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="auth-form__title text-center mb-4">Confirm Password</h5>
                        <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <label htmlFor="confirmationCode">Confirmation Code</label>
                            <TextFieldGroup
                            placeholder="Confirmation Code"
                            name="confirmationCode"
                            type="text"
                            value={this.state.confirmationCode}
                            onChange={this.onChange}
                            error={errors.confirmationCode}
                            />

                          </div>

                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <TextFieldGroup
                            placeholder="password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            />

                          </div>
                          
                          <button type="submit" className="d-table mx-auto btn btn-accent btn-pill">Submit</button>
                        </form>
                      </div>
                    </div>
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

confirmPassword.propTypes = {
  addConfirmPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, 
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addConfirmPassword })(confirmPassword);
