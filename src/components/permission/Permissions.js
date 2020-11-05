import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sitebar from "../layout/Navvar/Sitebar";
import Spinner from "../common/Spinner";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import PermissionForm from "./PermissionForm";
import PermissionFeed from "./PermissionFeed";
import { getPermissions } from "../../actions/permissionActions";
import { Button } from "shards-react";
import Modal from 'react-bootstrap/Modal';
class Permissions extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    this.state = {
      show: false,
      open: false,
    searchValue:"",
    };
  }

  componentDidMount() {
    this.props.getPermissions();
    if (!(this.props.auth.isAuthenticated)) {
      this.props.history.push('/login');
    }
  }
  
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  render() {
    const { permissions, loading } = this.props.permission;

    let permissionContent;

    if (permissions === null || loading) {
      permissionContent = <Spinner />;
    } else {
      permissionContent = <PermissionFeed permissions={permissions} />;
    }

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
          <h3 className="page-title">Permissions</h3>
        </div>
        {/* <div className="col-12 col-sm-6 text-sm-right mb-0">
            <Button pill outline size="sm" onClick={this.handleShow}  className="mb-2 ml-auto">
                <i className="material-icons mr-1">person_add</i> Add new Permissions
            </Button>
            </div> */}
      </div>
      {/* End Page Header */}
      {/* Default Light Table */}
      <div className="row">
      <div className="col-lg-12">
        <div className="mb-4 card card-small">
          <div className="border-bottom card-header">
            <h6 className="m-0">Create Permission</h6></div>
            <PermissionForm/>
        </div>
      </div>

        <div className="col">
          <div className="card card-small mb-4">
            <div className="card-header border-bottom">
              {/* <div className="form-row">
                <div className="form-group col-md-4">
                <input type="text" className="form-control" id="search" placeholder="Search" />
                </div>
                <div className="form-group col-md-4">
                <button type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i class="fas fa-search"></i> Search</button>
                </div>
            </div> */}
            </div>
            <div className="card-body p-0 pb-3 text-center">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">category</th>
                      <th scope="col">Created by</th>
                      <th scope="col">Action</th>
                  </tr>
                </thead>
                {permissionContent}
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* End Default Light Table */}
    </div>
    </main>

    <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create permission</Modal.Title>
          </Modal.Header>
          <PermissionForm/>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

  </div>      
    );
  }
}


Permissions.propTypes = {
  getPermissions: PropTypes.func.isRequired,
  permission: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  permission: state.permission,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPermissions }
)(Permissions);
