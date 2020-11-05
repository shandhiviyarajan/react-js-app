import React, { Component } from 'react'
import  CheckBox  from './CheckBox';
import { BASE_URL_ADMIN } from "../../config";
import axios from "axios";
import PropTypes from "prop-types";
import Sitebar from "../layout/Navvar/Sitebar";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import {AddRolePermissionData} from "../../actions/permissionActions";
import { connect } from "react-redux";
class RolePermission extends Component {

  constructor(props) {
    super(props)
    this.state = {
      permissionlist: [],
      roleList:[]
    }
  }
  
  handleAllChecked = (event) => {
    let permissionlist = this.state.permissionlist
    permissionlist.forEach(fruite => fruite.isChecked = event.target.checked) 
    this.setState({permissionlist: permissionlist})
  }

  handleCheckChieldElement = (event) => {
    let permissionlist = this.state.permissionlist
    permissionlist.forEach(fruite => {
       if (fruite.value === event.target.value)
          fruite.isChecked =  event.target.checked
    })
    this.setState({permissionlist: permissionlist})
  }

  componentDidMount() {
    axios
    .get(BASE_URL_ADMIN+"/role-permission/"+this.props.match.params.id,{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }).then(res => {
        this.setState({ roleList: res.data.data.permissions });
        axios
    .get(BASE_URL_ADMIN+"/permission/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }).then(res1 => {

        var matches = []; 
        for ( var i = 0; i < res1.data.data.permissions.length; i++ ) {
            for ( var e = 0; e < res.data.data.permissions.length; e++ ) {
                if ( res1.data.data.permissions[i].pid === res.data.data.permissions[e].pid ){
                   matches.push( {id: res1.data.data.permissions[i].pid, name:res1.data.data.permissions[i].name, value: res1.data.data.permissions[i].name+res1.data.data.permissions[i].pid, isChecked: true} );
               }                
            }
        }

        let scope = {};
        scope.listOfItems = res1.data.data.permissions;
        scope.deleteList = res.data.data.permissions.map(({ pid }) => pid);

        for ( var i = scope.listOfItems.length; i--; ) {
            if ( scope.deleteList.indexOf( scope.listOfItems[i].pid ) !== -1 ) {
              scope.listOfItems.splice(i ,1);
            }
        }

        scope.listOfItems.map(row => matches.push({
            id: row.pid, value: row.name+row.pid, name:row.name, isChecked: false
          })
        );


       this.setState({ permissionlist: matches});
    });

    });

  }

    onSubmit(ev) {
      ev.preventDefault();  // prevent form submission
      let objArray = this.state.permissionlist;
      let pid = [];

      objArray.forEach(fruite => {
         if (fruite.isChecked === true)
         pid.push(fruite.id);
      })

      const newRolePermission = {
        role_id: this.props.match.params.id,
        permission: pid,
        };
        this.props.AddRolePermissionData(newRolePermission);
    }

    render() {



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
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-6 text-center text-sm-left mb-0">
              <h3 className="page-title">Role and Permission Mapping </h3>
            </div>
            <div className="col-12 col-sm-6 text-sm-right mb-0">
           
            </div>
          </div>
          <div className="row">
          <div className="col-lg-12">
            <div className="mb-4 card card-small">
              <div className="border-bottom card-header">
               </div>
                <div className="modal-body">
                      <form onSubmit={this.onSubmit.bind(this)}>
                      
                     
  
                      <div className="form-group">
                      <input type="checkbox" onClick={this.handleAllChecked}  value="checkedall" /> Check / Uncheck All
                        <ul>
                        {
                          this.state.permissionlist.map((fruite) => {
                            return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...fruite} />)
                          })
                        }
                        </ul>
                      </div>
  
                      <button type="submit" className="mb-2 mr-1 btn btn-dark"> Submit</button>
                      </form>
                  </div>
  
            </div>
          </div>
          </div>
        </div>
        
        </main>
        </div>
        )
    }
}

RolePermission.propTypes = {
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
)(RolePermission);
