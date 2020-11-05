import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/userAction";
import { updateAdminRoleUser } from "../../actions/permissionActions";
import { BASE_URL, BASE_URL_ADMIN } from "../../config";
import axios from "axios";
import Sitebar from "../layout/Navvar/Sitebar";
import avatar from "../../../src/img/profile-pic.png";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import "react-picky/dist/picky.css";
const FilterableTable = require('react-filterable-table');

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name:"",
      roleq:"",
      phone_number:"",
      username:"",
      dashcamList:[],
      vehicleList:[],
      value: '',
      arrayValue: [],
      errors: {}
    };

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    
    axios.post(BASE_URL +"/admin/user/get-user",{"email": this.props.match.params.id }).then(res => {
      if(res.data.data.Attributes){
        if(res.data.data.Attributes[5] !== undefined){
          this.setState({
            email: res.data.data.Attributes[5].Value,
            name: res.data.data.Attributes[2].Value,
            phone_number: res.data.data.Attributes[4].Value,
            username: res.data.data.Username,
          });
        }else {
          this.setState({
            email: res.data.data.Attributes[4].Value,
            name: "N/A",
            phone_number: res.data.data.Attributes[3].Value,
            username: res.data.data.Username,
          });
        }

        axios
      .get(BASE_URL_ADMIN+"/dash-cam/list/user/"+res.data.data.Username,{
          headers:{
          'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
          'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
        }).then(res => {
          this.setState({ dashcamList: res.data.data.userDashCam });
      });

      axios
      .get(BASE_URL_ADMIN+"/vehicle/list/user/"+res.data.data.Username,{
          headers:{
          'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
          'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
        }).then(res => {this.setState({ vehicleList: res.data.data.vehicles });
      });
      }
    });

  }


  render() {

    const fields = [
        { name: 'cam_id', displayName: "Dash-cam ID", inputFilterable: true, sortable: true },
        { name: 'position_id', displayName: "Position ID", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'status', displayName: "Status", inputFilterable: true, exactFilterable: true, sortable: true }
    ];

    const vehicleFields = [
      { name: 'vehicle_id', displayName: "vehicle ID", inputFilterable: true, sortable: true },
      // { name: 'alias', displayName: "Alias", inputFilterable: true, exactFilterable: true, sortable: true },
      // { name: 'chassis_no', displayName: "Chassis No", inputFilterable: true, exactFilterable: true, sortable: true },
      { name: 'reg_no', displayName: "Registration No", inputFilterable: true, exactFilterable: true, sortable: true },
      { name: 'status', displayName: "Status", inputFilterable: true, exactFilterable: true, sortable: true }
  ];

    return (<div>
        <Sitebar/>
        <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
        <div className="main-navbar bg-white sticky-top">
          <div className="p-0 container-fluid">
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
              <form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                <div className="ml-3 input-group input-group-seamless">
                  <div className="input-group-prepend"><span className="input-group-text"></span></div>
                </div>
              </form>
              <ul className="border-left flex-row navbar-nav">
                <UserActions/>
              </ul>
              <nav className="nav"><a href="#" className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"><i className="material-icons"></i></a></nav>
            </nav>
          </div>
        </div>
        <div className="main-content-container px-4 container-fluid">
          <div className="page-header py-4 no-gutters row">
            <div className="ml-sm-auto mr-sm-auto text-center text-md-left mb-sm-0 col-12 col-sm-4 col-md-12">
              <h3 className="page-title">Profile</h3></div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="mb-4 pt-3 card card-small">
                <div className="border-bottom text-center card-header">
                  <div className="mb-3 mx-auto"><img className="rounded-circle" src={avatar} alt={this.state.name} width={110} /></div>
                  <h4 className="mb-0">{this.state.name}</h4>
                  <span className="text-muted d-block mb-2">{this.state.phone_number}</span>
                  <span className="text-muted d-block mb-2">{this.state.email}</span>
                </div>
              </div>
            </div>

            

            <div className="col-lg-8">
              <div className="mb-4 card card-small">
                <div className="border-bottom card-header">
                  <h6 className="m-0">Dash Cam</h6></div>
                <ul className="list-group list-group-flush">
                  <li className="p-3 list-group-item">
                    <div className="row">
                      <div className="col">
                      <form>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                            <FilterableTable
                                namespace="People"
                                initialSort="name"
                                data={this.state.dashcamList}
                                fields={fields}
                                noRecordsMessage="There are no dash cam to display"
                                noFilteredRecordsMessage="No dash cam match your filters!"
                            />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb-4 card card-small">
                <div className="border-bottom card-header">
                  <h6 className="m-0">Vehicle</h6></div>
                <ul className="list-group list-group-flush">
                  <li className="p-3 list-group-item">
                    <div className="row">
                      <div className="col">
                      <form>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                            <FilterableTable
                                namespace="People"
                                initialSort="name"
                                data={this.state.vehicleList}
                                fields={vehicleFields}
                                noRecordsMessage="There are no vehicle to display"
                                noFilteredRecordsMessage="No vehicle match your filters!"
                            />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
    );
  }
}


UserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateAdminRoleUser: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUser,updateAdminRoleUser }
)(UserProfile);
