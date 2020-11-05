import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import {changePassword} from "../../actions/userAction";
import { updateAdmin, getAdmin } from "../../actions/adminAction";
import { BASE_URL } from "../../config";
import Sitebar from "../layout/Navvar/Sitebar";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import avatar from "../../../src/img/profile-pic.png";
import axios from "axios";
class ChangePasswoed extends Component {
    constructor(props) {
        super(props);
        this.state = {
          oldPassword: "",
          inputNewPassword: "",
          email:"",
          name:"",
          phone_number:"",
          errors: {}
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitProfile = this.onSubmitProfile.bind(this);
      }

  onChangeFunc(event) {

  }

  onOpenModal = () => {
    this.setState({ open: true });
  };


  componentDidMount() {
    axios.post(BASE_URL +"/admin/admin/get-user",{"email": this.props.match.params.id }).then(res => {
      if(res.data.data.Attributes){
        if(res.data.data.Attributes[5] !== undefined){
          this.setState({
            email: res.data.data.Attributes[5].Value,
            name: res.data.data.Attributes[2].Value,
            phone_number: res.data.data.Attributes[4].Value,
            username: res.data.data.Username,
          });
        }else {
          this.setState({
            email: res.data.data.Attributes[4].Value,
            name: "N/A",
            phone_number: res.data.data.Attributes[3].Value,
            username: res.data.data.Username,
          });
        }
        
      }
    });

  }


  onSubmit(e) {
    e.preventDefault();

    const data = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.inputNewPassword
    };

    this.props.changePassword(data);
    this.setState({ oldPassword: "" });
    this.setState({ inputNewPassword: "" });
  }


  onSubmitProfile(e){
    e.preventDefault();
    const adminData = {
      email: this.state.email,
      phone_number: this.state.phone_number,
      name: this.state.name,
    };
    this.props.updateAdmin(this.props.match.params.id, adminData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {errors } = this.state;
    const profile = (<div className="modal-body">
    <form onSubmit={this.onSubmitProfile}>

      <div className="form-group">
        <label htmlFor>Email *</label>
        <input
          type="text"
          placeholder="Email Address *"
          name="email"
          className={classnames("form-control", {
            "is-invalid": errors.email
          })}
          value={this.state.email}
          onChange={this.onChange}
        />

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
          id="phone_number"
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
      <input type="submit" value="Update Admin" className="btn btn-info btn-block mt-4" />
    </form>
  </div>);
    const passwordChange = (   <div className="feed">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
    <div className="card card-register mx-auto mt-5">
      <div className="card-header">Change Password</div>
      <div className="card-body">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-12">
                <div className="form-label-group">
                <input
                    type="password"
                    id="oldPassword"
                    placeholder="Old Password*"
                    name="oldPassword"
                    className={classnames("form-control", {
                        
                    })}
                    value={this.state.oldPassword}
                    onChange={this.onChange}
                    />
                 
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <input
                    type="password"
                    id="inputNewPassword"
                    placeholder="New Password *"
                    name="inputNewPassword"
                    className={classnames("form-control", {
                        
                    })}
                    value={this.state.inputNewPassword}
                    onChange={this.onChange}
                    />

              
            </div>
          </div>
          <button type="submit" value="Submit" class="btn btn-primary btn-block">Change Password</button>
        </form>
     
      </div>
    </div>
        </div>
      </div>
    </div>
  </div>);
    return (
      <div>
          <Sitebar/>
        <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
        <div className="main-navbar bg-white sticky-top">
          <div className="p-0 container-fluid">
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
              <form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                <div className="ml-3 input-group input-group-seamless">
                  <div className="input-group-prepend"></div>
                </div>
              </form>
              <ul className="border-left flex-row navbar-nav">
                <UserActions/>
              </ul>
              <nav className="nav"><a href="#" className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"><i className="material-icons"></i></a></nav>
            </nav>
          </div>
        </div>
        <div className="main-content-container px-4 container-fluid">
          <div className="page-header py-4 no-gutters row">
            <div className="ml-sm-auto mr-sm-auto text-center text-md-left mb-sm-0 col-12 col-sm-4 col-md-12">
              <h3 className="page-title">User Profile</h3></div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="mb-4 pt-3 card card-small">
                <div className="border-bottom text-center card-header">
                  <div className="mb-3 mx-auto"><img className="rounded-circle" src={avatar} alt={this.state.name} width={110} /></div>
                  <h4 className="mb-0">{this.state.name}</h4>
                  {/* <span className="text-muted d-block mb-2">Project Manager</span> */}
                  {passwordChange}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="mb-4 card card-small">
                <div className="border-bottom card-header">
                  <h6 className="m-0">Account Details</h6></div>
                  <div className="classic-tabs">
                    
                    <div className="tab-content border-right border-bottom border-left rounded-bottom" id="myClassicTabContent">
                    <div className="tab-pane fade active show" id="profile-classic" role="tabpanel" aria-labelledby="profile-tab-classic">
                        {profile}
                    </div>
                    <div className="tab-pane fade" id="follow-classic" role="tabpanel" aria-labelledby="password-tab-classic">
                        {passwordChange}
                    </div>
                    </div>
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


ChangePasswoed.propTypes = {
  user: PropTypes.object.isRequired,
  getAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,{changePassword,getAdmin, updateAdmin}
)(ChangePasswoed);
