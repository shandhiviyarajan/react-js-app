import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAdminPagination, getAdmins,searchAdmin } from "../../actions/adminAction";
import swal from 'sweetalert';
import axios from "axios";
import { BASE_URL } from "../../config";

class AdminPagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    
    this.state = {
      show: false,
      open: false,
    searchValue:"",
    };

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onPaginationClick= ()=> {
    this.props.getAdminPagination(); 
  }

  onPaginationClickFirst= ()=> {
    this.props.getAdmins(); 
  }

  onOpenModal = id => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickSearch (id){
   
    this.props.searchAdmin(id);
  }
  
  onKeyPress = (e) => {
    if(e.which === 13) {
      this.onClickSearch (e.target.value);
    }
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      axios
    .post(BASE_URL+"/admin/admin/get-user",{"email": this.state.searchAdmin })
    .then(res =>{ window.location = '/profile/'+this.state.searchAdmin; }
    )
    .catch(err =>{swal("Warning!","Please enter valid data", "error")}
    );

     // this.props.searchAdmin(this.state.searchValue);
      //this.props.searchAdmin(this.state.searchValue);
    }
  }
  
  render() {
    const page = localStorage.getItem('page');

    return (
      <div className="form-row">
                    <div className="form-group col-md-4">
                    <input type="text" className="form-control" id="searchValue" onKeyPress={this.onKeyPress}name="searchValue" placeholder="Search by Email" value={this.state.searchValue} onChange={this.onChange} 
                    />
                    </div>
                    <div className="form-group col-md-4">
                    <button data-toggle="modal" onClick={this.onClickSearch.bind(this, this.state.searchValue)}  data-target="#searchModel" type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i class="fas fa-search"></i> Search</button>
                    </div>
                    <div className="form-group col-md-4">
                    <button type="button" onClick={this.onPaginationClickFirst.bind()} className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i className="fa fa-angle-double-left"></i> First  </button>
                    <button type="button" id="nextbtn" onClick={this.onPaginationClick.bind()} className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2" disabled={page==undefined}><i className="fas fa-angle-double-right"></i> Next  </button>
                  </div> 
                    </div>
    );
  }
}

AdminPagination.propTypes = {
  getAdminPagination: PropTypes.func.isRequired,
  searchAdmin: PropTypes.func.isRequired,
  getAdmins: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAdminPagination, searchAdmin, getAdmins}
)(AdminPagination);
