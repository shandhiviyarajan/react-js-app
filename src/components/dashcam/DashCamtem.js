import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteRole, getRole } from "../../actions/dashCamAction";
import swal from 'sweetalert';
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import Modal from 'react-bootstrap/Modal';

class RoleItem extends Component {
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
   this.props.deleteRole(id);     
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
    const { role, auth } = this.props;
    let active = "";
    let roleData = "";
    

    return (
      <tbody>
      <td>{role.name}</td>
      <td>{role.description}</td>
      <td>{role.created_by}</td>
      <td>
      <div className="blog-comments__actions"><div className="btn-group-sm btn-group">
      <Link to={"/role-prmission/"+role.id} className="btn btn-white">
          <span className="text-light">
            <i className="material-icons">more_vert</i>
            </span> Role Permissions</Link>
            </div>
      </div>
      </td>
      <td>
      <div class="blog-comments__actions">
          <div class="btn-group-sm btn-group">
              {/* <button class="btn btn-white" onClick={this.onDeleteClick.bind(this,role.id)} ><span class="text-danger"><i class="material-icons">clear</i></span> Delete</button> */}
              <a href="#" onClick={this.onDeleteClick.bind(this,role.id)}><i className="fa fa-trash" />&nbsp;</a>&nbsp; <Link  to={"/roles/"+role.id}> <i className="fa fa-edit" /></Link>
            
          </div>
      </div>
      </td>
      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Role</Modal.Title>
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

// RoleItem.defaultProps = {
//   showActions: true
// };

RoleItem.propTypes = {
  deleteRole: PropTypes.func.isRequired,
  getRole: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteRole, getRole }
)(DashCamtem);
