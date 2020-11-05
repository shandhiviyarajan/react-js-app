
import React, { Component } from "react";
import PropTypes from "prop-types";
import AdminItem from "./AdminItem";

class AdminFeed extends Component {
  render() {
    const { admins } = this.props;
    return admins.map(admin => <AdminItem key={admin.id} admin={admin} />);
  }
}

AdminFeed.propTypes = {
  admins: PropTypes.array.isRequired
};

export default AdminFeed;
