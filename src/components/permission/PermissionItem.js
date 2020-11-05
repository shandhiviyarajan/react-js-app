import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePermission, getPermission } from "../../actions/permissionActions";
import { Link } from "react-router-dom";

import { Button } from "shards-react";
import Modal from 'react-bootstrap/Modal';

class PermissionItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    this.state = {
      show: false,
      open: false,
    searchValue:"",
    };
  }
  
  onDeleteClick= id=> {
    this.props.deletePermission(id);     
  }

  onOpenModalEdit(id){
    // alert(id);
  }

  handleShow(id) {
    this.setState({ show: true });
    
  }
  handleClose() {
    this.setState({ show: false });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { permission } = this.props; 

    return (
      <tbody>
      <td>{permission.name}</td>
      <td>{permission.description}</td>
      <td>{permission.category}</td>
      <td>{permission.created_by}</td>
      <td>
      <div class="blog-comments__actions">
          <div class="btn-group-sm btn-group">
              <a href="#" onClick={this.onDeleteClick.bind(this,permission.pid)} ><i className="fa fa-trash" />&nbsp;</a>&nbsp; |&nbsp; <Link  to={"/permissions/"+permission.pid}> <i className="fa fa-edit" /></Link>

          </div>
      </div>
      </td>
      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create permission</Modal.Title>
          </Modal.Header>
         
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </tbody>
      
    );
  }
}


PermissionItem.propTypes = {
  deletePermission: PropTypes.func.isRequired,
  getPermission: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePermission, getPermission }
)(PermissionItem);
