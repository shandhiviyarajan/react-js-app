import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAdmin, updateAdmin } from "../../actions/adminAction";
import InputGroup from "../common/InputGroup";
import classnames from "classnames";
import Modal from 'react-bootstrap/Modal';
import avatar from "../../../src/img/profile";
class AdminSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.admin.admin) {
      const admin = nextProps.admin.admin.Attributes;

      const input = JSON.stringify(admin);
      if(admin){
        if(admin[5] !== undefined){
          this.setState({
            email: admin[5].Value,
            name: admin[2].Value,
            phone_number: admin[4].Value,
          });
        }else {
          this.setState({
            email: admin[4].Value,
            name: "N/A",
            phone_number: admin[3].Value,
          });
        }
        
      }
    }
  }

  componentDidMount() {
    this.props.getAdmin();
  }

  onSubmit(e) {
    e.preventDefault();

    const adminData = {
      email: this.state.email,
      phone_number: this.state.phone_number,
      name: this.state.name,
    };
    this.props.updateAdmin(this.state.email, adminData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
        <Modal.Body>
        <div className="mb-4 pt-3 card card-small">
          <div className="border-bottom text-center card-header">
            <div className="mb-3 mx-auto"><img className="rounded-circle" src={avatar} alt="{this.state.name}" width={110} /></div>
            <h4 className="mb-0">{this.state.name}</h4>
            <span className="text-muted d-block mb-2">{this.state.email}</span>
            <span className="text-muted d-block mb-2">{this.state.phone_number}</span>
          </div>

        </div>
        </Modal.Body>      
    );
  }
}

updateAdmin.defaultProps = {
  showActions: true
};

AdminSearch.propTypes = {
  getAdmin: PropTypes.func.isRequired,
  updateAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAdmin, updateAdmin }
)(AdminSearch);
