import React from 'react';
import './App.css';
import Navbar from './navbar'; // Import the navbar component
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Registration from "./components/Authentication/Registration";
import UpdateProfile from "./components/Authentication/UpdateProfile";
import RetrieveProfile from "./components/Authentication/RetriveProfile";
import Login from "./components/Authentication/Login";
import Disolay_all from './components/studio/display_all';
import Search_Studio_Class from './components/studio/search_studio_class.js';
import StudioSub from "./components/Subscription/StudioSub";
import UserSub from "./components/Subscription/UserSub";
import ViewStudioSub from "./components/Subscription/ViewStudioSub";
import ViewUserSub from "./components/Subscription/ViewUserSub";
import gym from "./fitness_centre.jpeg";
import AddPaymentMethod from "./components/Payment/AddPaymentMethod";
import ViewPaymentHistory from "./components/Payment/ViewPaymentHistory";
import User_Display, { User_Display_with_rotter } from './components/User_data/user_display';
import Image_Viewer from './components/image_viewer';
import ViewFuturePayment from "./components/Payment/ViewFuturePayment";
import Test_Map from "./components/studio/test_map"
import Studio_Detail, {Studio_Detail_with_rotter} from './components/studio/studio_diteal';
import Search_Class from './components/studio/search_class';
import { Search_result_with_rotter } from './components/studio/search_result';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar /> 
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
            <Route path="/" element={
              <React.Fragment> {/* Wrap the img element in a React.Fragment component */}
               {/* Add the navbar to a Route component */}
                <img src={gym} alt="Your image description here" className="full-size-img"/>
              </React.Fragment>
            } />
            <Route path="register" element={<Registration />} />
            <Route path="updateprofile" element={<UpdateProfile />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="retrieveprofile" element={<RetrieveProfile />} /> */}
            {/* <Route path="studiosub" element={<StudioSub />} /> */}
            <Route path="usersub" element={<UserSub />} />
            <Route path="viewstudiosub" element={<ViewStudioSub />} />
            <Route path="usersub" element={<UserSub />} />
            <Route path="viewstudiosub" element={<ViewStudioSub />} />
            <Route path="viewusersub" element={<ViewUserSub />} />
            <Route path="addpaymentmethod" element={<AddPaymentMethod />} />
            <Route path="viewpaymenthistory" element={<ViewPaymentHistory />} />
            <Route path='display_all' element={<Disolay_all/>}/>
            <Route path='search_studio_class' element={<Search_Studio_Class/>}/>
            <Route path='search_class' element={<Search_Class/>}/>
            <Route path='userData/:h/:f' element={<User_Display_with_rotter/>}/>
            <Route path='viewfuturepayment' element={<ViewFuturePayment/>}/>
            <Route path='test_image_display' element={<div style={{width: '50%', float: 'center'}}><Image_Viewer  src ={'https://www.allaboutbirds.org/news/wp-content/uploads/2020/07/STanager-Shapiro-ML.jpg'}/></div>}/>
            <Route path='test_map' element={<Test_Map/>}/>
            <Route path = 'search_result/:index/:searchType/:query' element={<Search_result_with_rotter/>}/>
            <Route path='display_all/studio_details/:choosen/:ind' element={<Studio_Detail_with_rotter/>}/>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
