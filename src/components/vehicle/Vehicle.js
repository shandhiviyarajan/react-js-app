import React, { Component } from 'react'
import Sitebar from "../layout/Navvar/Sitebar";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import {  BASE_URL_ADMIN } from "../../config";
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import {Button} from "shards-react";
import swal from 'sweetalert';
class Vehicle extends Component {

    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.state = {
          vehicleList:[],
          searchData:[],
          vehicle_id:"",
          errors: {},
          show: false,
          open: false,
          searchValue:"",
          page:0,
        };
      }

      onKeyPress = (e) => {
        if(e.which === 13) {
            if(e.target.value){
                axios.get(BASE_URL_ADMIN+"/vehicle/list/?search="+e.target.value)
                .then(res => {
                    this.setState({ vehicle_id: res.data.data.vehicles[0].vehicle_id })
                    this.setState({ position_id: res.data.data.vehicles[0].position_id })
                    this.setState({ status: res.data.data.vehicles[0].status })
                    this.setState({ created_at: res.data.data.vehicles[0].created_at })
                    this.setState({ show: true })
                })
                .catch(err =>{swal("Warning!","The number of search results are null", "error")}
                );
            }else{
                swal("Warning!","Search input field is empty", "error") 
            }
        }
      }

      handleClose() {
        this.setState({ show: false });
        this.setState({vehicle_id:""});
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onPaginationClick= ()=> {
        let totpage = localStorage.getItem("dashcampage");
        let noOfPage = totpage/10;
        if(noOfPage > this.state.page){
        this.state.page = this.state.page+1;

        axios.get(BASE_URL_ADMIN+"/vehicle/list?page="+this.state.page)
        .then(res => {
            this.setState({ vehicleList: res.data.data.vehicles })
            localStorage.setItem('dashcampage', res.data.data.total)
          });
        }
        
      }
    
      onPaginationClickFirst= ()=> {
        axios.get(BASE_URL_ADMIN+"/vehicle/list")
        .then(res => {
            this.setState({ vehicleList: res.data.data.vehicles })
            localStorage.setItem('dashcampage', res.data.data.total)
          });
      }

    componentDidMount() {  
        axios.get(BASE_URL_ADMIN+"/vehicle/list")
        .then(res => {
            this.setState({ vehicleList: res.data.data.vehicles })
            localStorage.setItem('dashcampage', res.data.data.total)
          });
    
      }

      onClickSearch = (id) =>{
        if(id){
            axios.get(BASE_URL_ADMIN+"/vehicle/list/?search="+id)
            .then(res => {
                this.setState({ vehicle_id: res.data.data.vehicles[0].vehicle_id })
                this.setState({ position_id: res.data.data.vehicles[0].position_id })
                this.setState({ status: res.data.data.vehicles[0].status })
                this.setState({ created_at: res.data.data.vehicles[0].created_at })
                this.setState({ show: true })
            })
            .catch(err =>{swal("Warning!","The number of search results are null", "error")}
            );
        }else{
            swal("Warning!","Search input field is empty", "error") 
        }
      }

    render() {


        return (
            <div>
               <Sitebar/>
        <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        
        <div className="main-navbar sticky-top bg-white">
          {/* Main Navbar */}
          <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
            <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
              <div className="input-group input-group-seamless ml-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                  </div>
                </div>
              </div>
            </form>
            <ul className="navbar-nav border-left flex-row ">
              
              <UserActions/>
            </ul>
            <nav className="nav">
              <a href="#" className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left" data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
                <i className="material-icons"></i>
              </a>
            </nav>
          </nav>
        </div> {/* / .main-navbar */}
        <div className="main-content-container container-fluid px-4">
          {/* Page Header */}
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-6 text-center text-sm-left mb-0">
              <h3 className="page-title">Vehicle</h3>
            </div>
            <div className="col-12 col-sm-6 text-sm-right mb-0">
           
            </div>
          </div>
          {/* End Page Header */}
          {/* Default Light Table */}
          <div className="row">
            <div className="col">
              <div className="card card-small mb-4">
                <div className="card-header border-bottom">
                {/* <div className="form-row">
                    <div className="form-group col-md-4">
                    <input type="text" className="form-control" id="searchValue" onKeyPress={this.onKeyPress}name="searchValue" placeholder="Search by vehicle ID" value={this.state.searchValue} onChange={this.onChange} 
                    />
                    </div>
                    <div className="form-group col-md-4">
                    <button data-toggle="modal" onClick={this.onClickSearch.bind(this, this.state.searchValue)}  data-target="#searchModel" type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i class="fas fa-search"></i> Search</button>
                    </div>
                    <div className="form-group col-md-4">
                    <button type="button" onClick={this.onPaginationClickFirst.bind()} className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i className="fa fa-angle-double-left"></i> First  </button>
                    <button type="button" onClick={this.onPaginationClick.bind()} className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2"><i className="fas fa-angle-double-right"></i> Next  </button>
                  </div> 
                    </div> */}
                </div>
                <div className="card-body p-0 pb-3 text-center">


                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                          <th scope="col">Vehicle ID</th>
                          {/* <th scope="col">Alias</th>
                          <th scope="col">Chassis No</th> */}
                          <th scope="col">Registration No</th>
                          <th scope="col">Status</th>
                      </tr>
                    </thead>
                    {this.state.vehicleList.map(row => {
                        return(
                            <tr>
                            <td key={row.vehicle_id}>{row.vehicle_id}</td>
                            {/* <td key={row.alias}>{row.alias}</td>
                            <td key={row.chassis_no}>{row.chassis_no}</td> */}
                            <td key={row.reg_no}>{row.reg_no}</td>
                            <td key={row.status}>{row.status}</td>
                            </tr>
                        )
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* End Default Light Table */}
        </div>
        </main> 

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dash Cam</Modal.Title>
          </Modal.Header>
          <Modal.Body>

                  <div class="card-body p-0">
                    <ul class="list-group list-group-small list-group-flush">
                      <li class="list-group-item d-flex px-3">
                      <label htmlFor>vehicle ID : </label>
                        <span class="ml-auto text-right text-semibold text-reagent-white">{this.state.vehicle_id}</span>
                      </li>
                      <li class="list-group-item d-flex px-3">
                      <label htmlFor>Position ID : </label>
                        <span class="ml-auto text-right text-semibold text-reagent-white">{this.state.position_id}</span>
                      </li>
                      <li class="list-group-item d-flex px-3">
                      <label htmlFor>Status : </label>
                        <span class="ml-auto text-right text-semibold text-reagent-white">{this.state.status}</span>
                      </li>
                      <li class="list-group-item d-flex px-3">
                      <label htmlFor>created At : </label>
                        <span class="ml-auto text-right text-semibold text-reagent-white"> {
                            Date(this.state.created_at)}</span>
                      </li>
                    </ul>
                  </div>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
            </div>
        )
    }
}

export default Vehicle;
