import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteUser, getUser, activeUser,unActiveUser } from "../../actions/userAction";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
class UserItem extends Component {
  onDeleteClick= id=> {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.deleteUser(id);
        swal("deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  }
  onActiveClick(id) {
    this.props.activeUser(id);
  }
  onUnActiveClick(id) {
    this.props.unActiveUser(id);
  }


  onOpenModal = id => {
    this.setState({ open: true });
    this.props.getUser(id);
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const profile ="/user-profile/";
    const { user } = this.props;
    let active = "";
    let usermail = "";
    if(user.Attributes[2] !== undefined){
      usermail = user.Attributes[2].Value;
    }else{
      usermail = user.Attributes[1].Value;
    }
    if(user.Enabled == true){
      active = (<a onClick={this.onActiveClick.bind(this, usermail)} class="btn btn-success">Yes</a>);
    }else{
      active = (<a onClick={this.onUnActiveClick.bind(this, usermail)} class="btn btn-warning">No</a>);
    }

    return (
      <tr>
        <td>
        {user.Attributes[0].Value}
        </td>
        <td>
        {user.Attributes[1].Value}
        </td>
        <td>
        {usermail}
        </td>
        <td>{active}</td>
        <td><a href="#" onClick={this.onDeleteClick.bind(this, usermail)}><i className="fas fa-user-times" /></a> | <Link to={profile+user.Attributes[2].Value}><i className="fas fa-list-alt" /></Link>
        </td>
      </tr>
    );
  }
}

// UserItem.defaultProps = {
//   showActions: true
// };

UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  activeUser: PropTypes.func.isRequired,
  unActiveUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteUser, getUser, activeUser,unActiveUser }
)(UserItem);
