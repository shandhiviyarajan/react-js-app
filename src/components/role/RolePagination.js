import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRolePagination, getRoles,searchRole } from "../../actions/roleActions";
import swal from 'sweetalert';
import axios from "axios";
import { BASE_URL } from "../../config";
class RolePagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    
    this.state = {
      show: false,
      open: false,
    searchValue:"",
    page:0,
    };

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onPaginationClick= ()=> {
    let totpage = localStorage.getItem("rolepage");
    let noOfPage = totpage/10;
    if(noOfPage > this.state.page){
    this.state.page = this.state.page+1;
    this.props.getRolePagination(this.state.page); 
    }
    
  }

  onPaginationClickFirst= ()=> {
    this.state.page=0;
    this.props.getRoles(); 
  }

  onOpenModal = id => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickSearch (id){
   
    this.props.searchRole(id);
  }
  
  onKeyPress = (e) => {
    if(e.which === 13) {
      this.onClickSearch (e.target.value);
    }
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      axios
    .post(BASE_URL+"/admin/admin/get-user",{"email": this.state.searchRole })
    .then(res =>{ window.location = '/profile/'+this.state.searchRole; }
    )
    .catch(err =>{swal("Warning!","Please enter valid data", "error")}
    );

     // this.props.searchRole(this.state.searchValue);
      //this.props.searchRole(this.state.searchValue);
    }
  }
  
  render() {
    const page = localStorage.getItem('page');

    return (
      <div className="form-row">
                    <div className="form-group col-md-4">
                    {/* <input type="text" className="form-control" id="searchValue" onKeyPress={this.onKeyPress}name="searchValue" placeholder="Search by role name" value={this.state.searchValue} onChange={this.onChange} 
                    /> */}
                    </div>
                    <div className="form-group col-md-4">
                    {/* <button data-toggle="modal" onClick={this.onClickSearch.bind(this, this.state.searchValue)}  data-target="#searchModel" type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i class="fas fa-search"></i> Search</button> */}
                    </div>
                    <div className="form-group col-md-4">
                    <button type="button" onClick={this.onPaginationClickFirst.bind()} className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i className="fa fa-angle-double-left"></i> First  </button>
                    <button type="button" id="nextbtn" onClick={this.onPaginationClick.bind()} className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2" disabled={page==undefined}><i className="fas fa-angle-double-right"></i> Next  </button>
                  </div> 
                    </div>
    );
  }
}

RolePagination.propTypes = {
  getRolePagination: PropTypes.func.isRequired,
  searchRole: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRolePagination, searchRole, getRoles}
)(RolePagination);
