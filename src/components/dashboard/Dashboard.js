import React, { Component } from 'react'
import Sitebar from "../layout/Navvar/Sitebar";
import UserActions from "../layout/MainNavbar/NavbarNav/UserActions";
import { Container, Button } from "shards-react";
class Dashboard extends Component {
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

        <Container fluid className="main-content-container px-4 pb-4">
            <div className="error">
            <div className="error__content">
                <h2>Welcome</h2>
                <h3>Dashboard</h3>
                
            </div>
            </div>
        </Container>
   
        </main>
      </div>
        )
    }
}

export default Dashboard;
