import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAdmin, getAdmin, activeAdmin,unActiveAdmin, profileAdmin } from "../../actions/adminAction";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
class AdminItem extends Component {
  
  onDeleteClick= id=> {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.deleteAdmin(id);
        swal("deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
     
  }
  onActiveClick(id) {
    this.props.activeAdmin(id);
  }
  onUnActiveClick(id) {
    this.props.unActiveAdmin(id);
  }

  onProfileClick(id){
    this.props.profileAdmin(id);
  }

  onOpenModal = id => {
    this.setState({ open: true });
    this.props.getAdmin(id);
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { admin } = this.props;
    const { user } = this.props.auth;
    const profile ="/profile/";
    let active = "";
    let adminData = "";
    let fcp = "";

    if(admin.Attributes[2] !== undefined){
      if(user.email != admin.Attributes[2].Value){
      fcp = (<a onClick={this.onDeleteClick.bind(this, admin.Attributes[2].Value)}><i className="fas fa-user-times" /></a>);
      }
    }else{
      if(user.email != admin.Attributes[1].Value){
      fcp = (<a onClick={this.onDeleteClick.bind(this, admin.Attributes[1].Value)}><i className="fas fa-user-times" /></a>);
      }
    }

      


    if(admin.Attributes[2] !== undefined){
      if(user.email != admin.Attributes[2].Value){
        if(admin.Enabled == true){
          active = (<a onClick={this.onActiveClick.bind(this, admin.Attributes[2].Value)} class="btn btn-success">Yes</a>);
        }else{
          active = (<a onClick={this.onUnActiveClick.bind(this, admin.Attributes[2].Value)} class="btn btn-warning">No</a>);
        }

        
      }else{

      }
     

      

      adminData = (<tr id={admin.Attributes[2].Value}>
        <td>
        {admin.Attributes[0].Value}
        </td>
        <td>
        {admin.Attributes[1].Value}
        </td>
        <td>
        {admin.Attributes[2].Value}
        </td>
        <td>{active}</td>
        <td className="text-center">
        <Link to={profile+admin.Attributes[2].Value}><i className="fas fa-list-alt" /></Link> | {fcp}
                             {/* <a data-toggle="modal" data-target="#myModalProfileForm" onClick={this.onOpenModal.bind(this, admin.Attributes[2].Value)} ><i className="fas fa-list-alt" /> </a> */}
                             
                          </td>
      </tr> 
    );
    }else{
     if(user.email != admin.Attributes[1].Value){
      if(admin.Enabled == true){
        active = (<a onClick={this.onActiveClick.bind(this, admin.Attributes[1].Value)} class="btn btn-success">Yes</a>);
      }else{
        active = (<a onClick={this.onUnActiveClick.bind(this, admin.Attributes[1].Value)} class="btn btn-warning">No</a>);
      }
      }else{

      }

      adminData = (
        <tr id={admin.Attributes[1].Value}>
          <td>
         <b>N/A</b>
        </td>
        <td>
        {admin.Attributes[0].Value}
        </td>
        <td>
        {admin.Attributes[1].Value}
        </td>
        <td>{active}</td>
        <td className="text-center">
          
          <Link to={profile+admin.Attributes[1].Value}><i className="fas fa-list-alt" /></Link> | {fcp}
                            {/* <a data-toggle="modal" data-target="#myModalProfileForm" onClick={this.onOpenModal.bind(this, admin.Attributes[1].Value)} ><i className="fas fa-list-alt" /> </a> */}
                            
                          </td>
        </tr>
      );
    }

    return (
      <tbody>
      {adminData}
      </tbody>
    );
  }
}


AdminItem.propTypes = {
  deleteAdmin: PropTypes.func.isRequired,
  activeAdmin: PropTypes.func.isRequired,
  unActiveAdmin: PropTypes.func.isRequired,
  profileAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAdmin, getAdmin, activeAdmin,unActiveAdmin,profileAdmin }
)(AdminItem);
