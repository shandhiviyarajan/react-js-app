import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import 'react-picky/dist/picky.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import Users from './components/users/Users';
import UserProfile from './components/users/UserProfile';
import DashCam from './components/dashcam/DashCam';
import Admins from './components/admins/Admins';
import Vehicle from './components/vehicle/Vehicle';
import Login from './components/auth/Login';
import SettingPassword from './components/settingPassword/SettingPassword';
import ConfirmPassword from './components/settingPassword/confirmPassword';
import AdminAuth from './components/settingPassword/AdminAuth';
import AuthChallenge from './components/settingPassword/AuthChallenge';
import ChangePassword from "./components/setting/change_password";
import Profile from './components/admins/AdminProfile';
import Roles from './components/role/Roles';
import RoleEdit from './components/role/RoleEdit';
import RolePermission from './components/role/RolePermission';
import Permissions from './components/permission/Permissions';
import PermissionEdit from './components/permission/PermissionEdit';
import AddRolePermission from './components/role-permission/AddRolePermission';
import UserSearch from './components/users/UserSearch';
import Dashboard from './components/dashboard/Dashboard';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forget-password" component={SettingPassword} />
              <Route exact path="/confirmPassword/:id" component={ConfirmPassword} />
              <Route exact path="/adminAuth" component={AdminAuth} /> 
              <Route exact path="/auth-challenge/:id" component={AuthChallenge} /> 
          <Switch>
                <PrivateRoute exact path="/admins" component={Admins} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/changePassword/:id" component={ChangePassword} />
                <PrivateRoute exact path="/users" component={Users} />
                <PrivateRoute exact path="/dash-cam" component={DashCam} />
                <PrivateRoute exact path="/vehicle" component={Vehicle} />
                <PrivateRoute exact path="/user-profile/:id" component={UserProfile} />
                <PrivateRoute exact path="/roles" component={Roles} />
                <PrivateRoute exact path="/roles/:id" component={RoleEdit} />
                <PrivateRoute exact path="/permissions" component={Permissions} />
                <PrivateRoute exact path="/permissions/:id" component={PermissionEdit} />
                <PrivateRoute exact path="/role-permission/" component={AddRolePermission} />
                <PrivateRoute exact path="/role-prmission/:id" component={RolePermission} />
                <PrivateRoute exact path="/userSearch/:id" component={UserSearch} />
          </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;