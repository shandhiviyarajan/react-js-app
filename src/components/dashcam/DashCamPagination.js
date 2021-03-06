import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDashCamPagination, getDashCam,searchDashCam } from "../../actions/dashCamAction";
class DashCamPagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {
      show: false,
      open: false,
    searchValue:"",
    };
  }

  onKeyPress = (e) => {
    if(e.which === 13) {
      this.onClickSearch (e.target.value);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onPaginationClick= ()=> {
    this.props.getDashCamPagination(); 
  }

  onPaginationClickFirst= ()=> {
    this.props.getDashCam(); 
  }


  onOpenModal = id => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickSearch = (id) =>{
    this.props.searchDashCam(id);
  }

  render() {
    const { admin, auth } = this.props;
    const { user } = this.props.auth;

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
                    <button type="button" onClick={this.onPaginationClick.bind()} className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i className="fas fa-angle-double-right"></i> Next  </button>
                  </div> 
                    </div>
    );
  }
}

DashCamPagination.propTypes = {
  getDashCamPagination: PropTypes.func.isRequired,
  searchDashCam: PropTypes.func.isRequired,
  getDashCam: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getDashCamPagination, searchDashCam, getDashCam}
)(DashCamPagination);
