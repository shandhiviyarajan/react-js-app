import React, { Component } from 'react'
import Sitebar from "../layout/Navvar/Sitebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputGroup from "../common/InputGroup";
import classnames from "classnames";
import { BASE_URL, BASE_URL_ADMIN } from "../../config";
import SelectListGroup from "../common/SelectListGroup";
import axios from "axios";
import { Checkbox, Table } from 'semantic-ui-react';
import update from 'immutability-helper';
import {AddRolePermissionData} from "../../actions/permissionActions"
import { Link } from "react-router-dom";
import { render } from "react-dom";
import Picky from "react-picky";
import "react-picky/dist/picky.css";
class EditRolePermission extends Component {
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
          keepOpen:false,
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

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit( e) {
        e.preventDefault();
        let objArray = this.state.arrayValue;
         let result = objArray.map(({ id }) => id)
         alert(JSON.stringify(result));
    
        const newRolePermission = {
          role_id: this.state.role,
          permission: result,
        };
        this.props.AddRolePermissionData(newRolePermission);
      }

    componentDidMount() {
        axios.get(BASE_URL_ADMIN +"/role-permission/"+this.props.match.params.id,{
            headers:{
            'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
            'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
          })
        .then(res => {
        })

        axios
        .get(BASE_URL_ADMIN+"/permission/list",{
            headers:{
            'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
            'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
        }).then(res => {
        this.setState({ permissionList: res.data.data.permissions });
        });
    }
    render() {

    //   const roleOBJ = [
    //     { label: "* Select a Role", value: "" }
    //   ].concat(
    //     this.state.roleList.map(row => ({
    //       label: row.name+' ('+row.description +')',
    //       value: row.id
    //     }))
    //   );

      const permissionOBJ = [].concat(
        this.state.permissionList.map(row => ({
          id: row.pid,
          name: row.name,
          description: row.description,
          category: row.category,
          defaultChecked:true
        }))
      );
        return (
            <div>
    <Sitebar/>
    <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="main-navbar sticky-top bg-white">
            <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
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
            {/* End Page Header */} {/* Default Light Table */}
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="card card-small mb-4">
                            <div className="card-header border-bottom">
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        {/* <SelectListGroup placeholder="role" name="role" value={this.state.role} onChange={this.onChange} options={roleOBJ} /> */}
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
                                        open={true} 
                                        valueKey="id" 
                                        labelKey="name" 
                                        multiple={true} 
                                        includeSelectAll={true} 
                                        includeFilter={true} 
                                        dropdownHeight={600} 
                                        
                                        className={classnames( 'form-control form-control-lg')} 
                                        /> 
                                    </div>
                                    <button type="submit" className="mb-2 mr-1 btn btn-dark"> Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main>
</div>
        )
    }
}

export default EditRolePermission;