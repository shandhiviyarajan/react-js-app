import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAdmin } from "../../actions/adminAction";
import classnames from "classnames";
import Modal from 'react-bootstrap/Modal';
class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phone_number: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      phone_number: this.state.phone_number,
      email: this.state.email
    };

    this.props.addAdmin(newUser);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <Modal.Body>
        <div className="modal-body">
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label htmlFor>Email *</label>
            <input
              type="email"
              placeholder="Email *"
              name="email"
              className={classnames("form-control", {
                "is-invalid": errors.email
              })}
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div
                style={{
                  color: "#FF2F02",
                  fontSize: "12px",
                  paddingTop: "5px"
                }}
                className="invalid-feedback"
              >
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor>Name *</label>
            <input
              type="text"
              placeholder="Name *"
              name="name"
              className={classnames("form-control", {
                "is-invalid": errors.name
              })}
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div
                style={{
                  color: "#FF2F02",
                  fontSize: "12px",
                  paddingTop: "5px"
                }}
                className="invalid-feedback"
              >
                {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor>Phone Number *</label>
            <input
              type="text"
              placeholder="Phone Number *"
              name="phone_number"
              className={classnames("form-control", {
                "is-invalid": errors.phone_number
              })}
              value={this.state.phone_number}
              onChange={this.onChange}
            />
            {errors.phone_number && (
              <div
                style={{
                  color: "#FF2F02",
                  fontSize: "12px",
                  paddingTop: "5px"
                }}
                className="invalid-feedback"
              >
                {errors.phone_number}
              </div>
            )}
          </div>
          <button type="submit" className="mb-2 mr-1 btn btn-dark"> <i className="fa fa-plus" /> Create Admin</button>
        </form>
      </div>
        </Modal.Body> 
    );
  }
}

AdminForm.propTypes = {
  addAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addAdmin }
)(AdminForm);
