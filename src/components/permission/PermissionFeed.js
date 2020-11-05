import React, { Component } from "react";
import PropTypes from "prop-types";
import PermissionItem from "./PermissionItem";

class PermissionFeed extends Component {
  render() {
    const { permissions } = this.props;
    return permissions.map(permission => <PermissionItem key={permission.pid} permission={permission} />);
  }
}

PermissionFeed.propTypes = {
  permissions: PropTypes.array.isRequired
};

export default PermissionFeed;
