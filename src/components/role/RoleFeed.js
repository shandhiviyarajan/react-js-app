import React, { Component } from "react";
import PropTypes from "prop-types";
import RoleItem from "./RoleItem";

class RoleFeed extends Component {
  render() {
    const { roles } = this.props;
    return roles.map(role => <RoleItem key={role.id} role={role} />);
  }
}

RoleFeed.propTypes = {
  roles: PropTypes.array.isRequired
};

export default RoleFeed;
