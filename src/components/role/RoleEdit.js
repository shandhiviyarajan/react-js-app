import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoles, updateRole } from "../../actions/roleActions";
import InputGroup from "../common/InputGroup";
import classnames from "classnames";
import Sitebar from "../layout/Navvar/Sitebar";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import { BASE_URL_ADMIN } from "../../config";
import axios from "axios";
class RoleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description:"",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
     
    // if (nextProps.admin.admin) {
    //   const admin = nextProps.admin.admin.Attributes;

    //   const input = JSON.stringify(admin);
    //   if(admin){
    //     this.setState({
    //       email: admin[5].Value,
    //       name: admin[2].Value,
    //       phone_number: admin[4].Value,
    //     });
    //   }
    // }
  }

  componentDidMount() {
    this.props.getRoles(this.props.match.params.id);

    axios.get(BASE_URL_ADMIN +"/role/"+this.props.match.params.id,
    {
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }
    ).then(res => {
            this.setState({
              name: res.data.data.roles[0].name,
              description: res.data.data.roles[0].description
            });
      });
  }
 

  onSubmit(e) {
    e.preventDefault();

    const roleData = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.updateRole(this.props.match.params.id, roleData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
        <div>
        <Sitebar/>
        <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        
        <div className="main-navbar sticky-top bg-white">
        {/* Main Navbar */}
        <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
            <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
            <div className="input-group input-group-seamless ml-3">
                <div className="input-group-prepend">
                <div className="input-group-text">
                </div>
                </div>
            </div>
            </form>
            <ul className="navbar-nav border-left flex-row ">
            
            <UserActions/>
            </ul>
            <nav className="nav">
            <a href="#" className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left" data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
                <i className="material-icons"></i>
            </a>
            </nav>
        </nav>
        </div> {/* / .main-navbar */}
        <div className="main-content-container container-fluid px-4">
        <div className="row">
        <div className="col-lg-12">
          <div className="mb-4 card card-small">
            <div className="border-bottom card-header">
              <h6 className="m-0">Update Role</h6></div>
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

                    <button type="submit" className="mb-2 mr-1 btn btn-dark"> Update</button>
                    </form>
                </div>

          </div>
        </div>
        </div>
      </div>
      
      </main>
      </div>
    );
  }
}

updateRole.defaultProps = {
  showActions: true
};

RoleEdit.propTypes = {
  getRoles: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
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
  { getRoles, updateRole }
)(RoleEdit);
