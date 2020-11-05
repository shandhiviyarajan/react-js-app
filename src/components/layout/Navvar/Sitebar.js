import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAdminAuthCheck } from "../../../actions/adminAction";
import logo from "../../../img/ic_launcher.png";
import RoleNavbar from "./../MainNavbar/NavbarNav/RoleNavbar";
  
class Sitebar extends Component {

  componentDidMount() {
  }


    render() {

        return (
            <aside className="main-sidebar px-0 col-12 col-md-3 col-lg-2">
              <div className="main-navbar">
                <nav className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                  <Link to="/dashboard" className="w-100 mr-0 navbar-brand" style={{lineHeight: '25px'}}>
                    <div className="d-table m-auto"><img id="main-logo" className="d-inline-block align-top mr-1" src={logo} alt="Cedar Electronics" style={{maxWidth: '150px'}} /></div>
                  </Link><a className="toggle-sidebar d-sm-inline d-md-none d-lg-none"><i className="material-icons"></i></a>
                </nav>
              </div>
              
              <div className="nav-wrapper">
                <ul className="nav--no-borders flex-column nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admins">
                      <div className="d-inline-block item-icon-wrapper"><i className="material-icons">person</i></div><span>Admin</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      <div className="d-inline-block item-icon-wrapper"><i className="material-icons">person</i></div><span>Users</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/vehicle">
                      <div className="d-inline-block item-icon-wrapper"><i class="material-icons">view_module</i></div><span>Vehicle</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dash-cam">
                      <div className="d-inline-block item-icon-wrapper"><i class="material-icons">view_module</i></div><span>Dash Cam</span></Link>
                  </li>
                  <li className="nav-item">
                  <RoleNavbar/>
                  </li>
                </ul>
              </div>
            </aside>
        )
    }
}


Sitebar.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAdminAuthCheck: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAdminAuthCheck }
)(Sitebar);

// export default Sitebar;
