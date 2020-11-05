import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser, updateUser } from "../../actions/userAction";
import { updateAdminRoleUser } from "../../actions/permissionActions";
import { BASE_URL, BASE_URL_ADMIN } from "../../config";
import axios from "axios";
import Sitebar from "../layout/Navvar/Sitebar";
import avatar from "../../../src/img/profile-pic.png";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import "react-picky/dist/picky.css";

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name:"",
      roleq:"",
      phone_number:"",
      roleList:[],
      username:"",
      permissionList:[],
      value: 'coconut',
      arrayValue: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }

  selectMultipleOption(value) {
    console.count('onChange')
    console.log("Val", value);
    this.setState({ arrayValue: value });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    axios
      .get(BASE_URL_ADMIN+"/role-permission/"+event.target.value,{
          headers:{
          'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
          'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
        }).then(res => {
          this.setState({ permissionList: res.data.data.permissions });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.admin.admin) {
      const admin = nextProps.admin.admin.Attributes;
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
    axios.post(BASE_URL +"/admin/user/get-user",{"email": this.props.match.params.id }).then(res => {
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

    axios
    .get(BASE_URL_ADMIN+"/role/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }).then(res => {
      this.setState({ roleList: res.data.data.roles });
    });

  }

  onSubmit(e) {
    e.preventDefault();
    const newRolePermission = {
      role_id: this.state.value,
    };
   this.props.updateAdminRoleUser(this.state.username, newRolePermission);
  }

  onSelectChanged(value) {
    alert(this.state.role);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    alert(this.state.roleq);
  }
  render() {
    return (<div>
        <Sitebar/>
        <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
        <div className="main-navbar bg-white sticky-top">
          <div className="p-0 container-fluid">
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
              <form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                <div className="ml-3 input-group input-group-seamless">
                  <div className="input-group-prepend"><span className="input-group-text"></span></div>
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
                  <span className="text-muted d-block mb-2">{this.state.phone_number}</span>
                  <span className="text-muted d-block mb-2">{this.state.email}</span>
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

updateUser.defaultProps = {
  showActions: true
};

UserSearch.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateAdminRoleUser: PropTypes.func.isRequired,
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
  { getUser, updateUser,updateAdminRoleUser }
)(UserSearch);
