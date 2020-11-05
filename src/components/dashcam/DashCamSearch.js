import React, { Component } from 'react'
import classnames from "classnames";
import Modal from 'react-bootstrap/Modal';

class DashCamSearch extends Component {
    render() {
        return (
            <Modal.Body>
        <div className="modal-body">
        <form >

          <div className="form-group">
            <label htmlFor>Email *</label>
            
            
          </div>

          
          <button type="submit" className="mb-2 mr-1 btn btn-dark"> <i className="fa fa-plus" /> Create Admin</button>
        </form>
      </div>
        </Modal.Body>
        )
    }
}

export default DashCamSearch;
