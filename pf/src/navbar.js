import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
//import Page from './components/image_viewer';


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/register">Registration</Link></li>
        <li><Link to="/updateprofile">Update Profile</Link></li> */}
        <li><Link to="/login">My Account</Link></li>
        <li><Link to="/userData/0/0">Enrolled</Link></li>
        {/* <li><Link to="/studiosub">Studio Subscription</Link></li> */}
        {/* <li><Link to="/usersub">User Subscription</Link></li> */}
        <li><Link to="/viewstudiosub">Plans</Link></li>
        <li><Link to="/viewusersub">Subscription</Link></li>
        <li><Link to="/display_all">Display All Studios</Link></li>
        <li><Link to="/search_studio_class">Search Studios</Link></li>
        <li><Link to="/search_class">Search Class</Link></li>
        <li><Link to="/viewpaymenthistory">Payment</Link></li>
        {/* <li><Link to="/viewfuturepayment">View Future Payment</Link></li>
        <li><Link to="/addpaymentmethod">Update Payment Method</Link></li> */}


      </ul>
    </nav>
  );
}

export default Navbar;
