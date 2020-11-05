import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class RoleNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <li className="nav-item">
            <i className="material-icons">vertical_split</i><span>Admin Role</span>
        </li>            
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/roles">
            <i className="material-icons">&#xE7FD;</i> User Roles
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/permissions">
            <i className="material-icons">&#xE7FD;</i> Permissions
          </DropdownItem>
          {/* <DropdownItem tag={Link} to="/role-permission">
            <i className="material-icons">&#xE7FD;</i> Role Permissions
          </DropdownItem> */}
        </Collapse>
      </NavItem>
    );
  }
}
