import React, { Component } from 'react'
import Sitebar from "../layout/Navvar/Sitebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { BASE_URL_ADMIN } from "../../config";
import SelectListGroup from "../common/SelectListGroup";
import axios from "axios";
import update from 'immutability-helper';
import {AddRolePermissionData} from "../../actions/permissionActions"
import { Link } from "react-router-dom";
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import {
  Card
} from "shards-react";

class AddRolePermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name:"",
      role:"",
      phone_number:"",
      roleList:[],
      permissionList:[],
      checkBoxArr:[],
      selections: {},
      errors: {},
      value: null,
      arrayValue: []
    };
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  selectMultipleOption(value) {
    console.count('onChange')
    console.log("Val", value);
    this.setState({ arrayValue: value });
  }
  
  handleSelect = (id) => {
    this.setState((prevState) => {
      if (prevState.selections[id]) {
        // { 1: true } -> {}
        return update(prevState, {
          selections: { $unset: [id] },
        });
      }
      // {} -> { 1: true }
      return update(prevState, {
        selections: { [id]: { $set: true } },
      });
    });
  }

  isItemSelected = id => this.state.selections[id];

  componentDidMount() {
    axios
    .get(BASE_URL_ADMIN+"/role/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }).then(res => {
      this.setState({ roleList: res.data.data.roles });
    });

    axios
    .get(BASE_URL_ADMIN+"/permission/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }).then(res => {
      this.setState({ permissionList: res.data.data.permissions });
    });

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit( e) {
    e.preventDefault();
    let objArray = this.state.arrayValue;
     let result = objArray.map(({ id }) => id)
    const newRolePermission = {
      role_id: this.state.role,
      permission: result,
      };

    this.props.AddRolePermissionData(newRolePermission);

  }



    render() {
      
      const { errors } = this.state;

      const roleOBJ = [
        { label: "* Select a Role", value: "" }
      ].concat(
        this.state.roleList.map(row => ({
          label: row.name+' ('+row.description +')',
          value: row.id
        }))
      );

      const permissionOBJ = [].concat(
        this.state.permissionList.map(row => ({
          id: row.pid,
          name: row.name,
          isChecked: true
        }))
      );

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
      {/* Page Header */}
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-6 text-center text-sm-left mb-0">
          <h3 className="page-title">Role Permissions</h3>
        </div>
      </div>
      {/* End Page Header */}
      {/* Default Light Table */}
      <form onSubmit={this.onSubmit}>
      <div className="row">
        <div className="col">
          <div className="card card-small mb-4">
            <div className="card-header border-bottom">
              <div className="form-row">
                <div className="form-group col-md-12">
                <SelectListGroup
                                placeholder="role"
                                name="role"
                                value={this.state.role}
                                onChange={this.onChange}
                                options={roleOBJ}
                                error={errors.role}
                              />
                </div>
            </div>
            </div>

            <div className="card-header border-bottom">
              <div className="form-row">
                <div className="form-group col-md-12">
                <Picky
                value={this.state.arrayValue}
                options={permissionOBJ}
                onChange={this.selectMultipleOption}
                // open={true}
                valueKey="id"
                checked ={true}
                labelKey="name"
                multiple={true}
                includeSelectAll={true}
                includeFilter={true}
                dropdownHeight={600}
                className={classnames('form-control form-control-lg')}
              />
                </div>
                <button type="submit" className="mb-2 mr-1 btn btn-dark">  Submit</button>
            </div>
            </div>
          </div>
        </div>
      </div>
      </form>
      
      <Card>
          <div className="card-body p-0 pb-3 text-center">
              <table className="table mb-0">
                <thead className="bg-left">

                </thead>
                { this.state.roleList.map(obj => {
                    return (
                      <tr key={ obj.id }>
                        <td>{ obj.name }</td>
                        <td><Link  to={"/edit-role-prmission/"+obj.id}> <i className="fa fa-edit" /></Link></td>
                      </tr>
                    );
                  }) 
                }
              </table>
            </div>
      </Card>
      

    </div>
    </main>
  </div>  
        )
    }
}



AddRolePermission.propTypes = {
  AddRolePermissionData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { AddRolePermissionData }
)(AddRolePermission);