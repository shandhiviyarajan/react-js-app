import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Blog</a>
            </li>
          </ul>
          <span className="copyright ml-auto my-auto mr-2">Copyright © 2018 <a href="https://designrevision.com" rel="nofollow">DesignRevision</a></span>
        </footer>
        )
    }
}

export default Footer;
