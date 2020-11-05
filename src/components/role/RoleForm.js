import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRole } from "../../actions/roleActions";
import classnames from "classnames";

class RoleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
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
      description: this.state.description
    };

    this.props.addRole(newUser);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="modal-body">
        <form onSubmit={this.onSubmit}>

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
            <label htmlFor>Description *</label>
            <input
              type="text"
              placeholder="Description *"
              name="description"
              className={classnames("form-control", {
                "is-invalid": errors.description
              })}
              value={this.state.description}
              onChange={this.onChange}
            />
            {errors.description && (
              <div
                style={{
                  color: "#FF2F02",
                  fontSize: "12px",
                  paddingTop: "5px"
                }}
                className="invalid-feedback"
              >
                {errors.description}
              </div>
            )}
          </div>

          <button type="submit" className="mb-2 mr-1 btn btn-dark"> <i className="fa fa-plus" /> Submit</button>
        </form>
      </div>
    );
  }
}

RoleForm.propTypes = {
  addRole: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addRole }
)(RoleForm);
