import React, { Component } from 'react';
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sitebar from "../layout/Navvar/Sitebar";
import Spinner from "../common/Spinner";
import UserFeed from "./UserFeed";
import UserPagination from "./UserPagination";
import { getUsers } from "../../actions/userAction";

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  state = {
    open: false,
    userTypeSel:""
  };

  onChangeFunc(event) {
    const name = event.target.value;
    this.props.getUsers(name);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

    render() {
    const { users, loading } = this.props.user;

    let userContent;

    if (users === null || loading) {
      userContent = <Spinner />;
    } else {
      userContent = <UserFeed users={users} />;
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
              <h3 className="page-title">User</h3>
            </div>
            <div className="col-12 col-sm-6 text-sm-right mb-0">
           
            </div>
          </div>
          {/* End Page Header */}
          {/* Default Light Table */}
          <div className="row">
            <div className="col">
              <div className="card card-small mb-4">
                <div className="card-header border-bottom">
                  <UserPagination/>
                </div>
                <div className="card-body p-0 pb-3 text-center">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Email</th>
                          <th scope="col">Active</th>
                          <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {userContent}
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* End Default Light Table */}
        </div>
        </main>
      </div>
        )
    }
}
Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);