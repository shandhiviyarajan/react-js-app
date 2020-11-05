import React, { Component } from 'react'
import Sitebar from "../layout/Navvar/Sitebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import AdminFeed from "./AdminFeed";
import AdminForm from "./AdminForm";
import AdminPagination from "./AdminPagination";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import { getAdmins, prosearch } from "../../actions/adminAction";
import {Button} from "shards-react";
import Modal from 'react-bootstrap/Modal'

class Admins extends Component {
      constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
        this.state = {
          show: false,
          open: false,
        searchValue:"",
        };
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      componentDidMount() {
        this.props.getAdmins();
        if (!(this.props.auth.isAuthenticated)) {
          this.props.history.push('/login');
        }
      }
      
      onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };
      
      render() {
        const { admins, loading } = this.props.admin;
        let adminContent;
    
        if (admins === null || loading) {
          adminContent = <Spinner />;
        } else {
          adminContent = <AdminFeed admins={admins} />;
        }
        return (<div>
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
              <h3 className="page-title">Admin</h3>
            </div>
            <div className="col-12 col-sm-6 text-sm-right mb-0">
            <Button pill outline size="sm" onClick={this.handleShow}  className="mb-2 ml-auto">
                <i className="material-icons mr-1">person_add</i> Add new user
            </Button>
            </div>
          </div>
          {/* End Page Header */}
          {/* Default Light Table */}
          <div className="row">
            <div className="col">
              <div className="card card-small mb-4">
                <div className="card-header border-bottom">
                <div className="form-group col-md-4">
                </div>
                    <AdminPagination/>
  
                </div>
                <div className="card-body p-0 pb-3 text-center">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">Name</th>
                        <th scope="col" className="border-0">Phone Number</th>
                        <th scope="col" className="border-0">Email</th>
                        <th scope="col" className="border-0">Active</th>
                        <th scope="col" className="border-0">Action</th>
                      </tr>
                    </thead>
                    {adminContent}
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
            <Modal.Title>Create Admin</Modal.Title>
          </Modal.Header>
          <AdminForm/>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
        )
    }
}

Admins.propTypes = {
    getAdmins: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    prosearch: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    admin: state.admin,
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { getAdmins, prosearch }
  )(Admins);