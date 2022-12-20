import React, {Component} from "react";
import RetrieveProfile from "./RetriveProfile";
import UpdateP from "./UpdateProfile";
import './login.css';
import Registration from './Registration';


export default class Account extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            username: "",
            password: "",
            errors: "",
            show_log_In: false,
            UpdateProfile: false,
            new_account: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.UpdateProfile = this.UpdateProfile.bind(this);
        this.Register = this.Register.bind(this);
    }
    handleSubmit(event){
        event.preventDefault(); // To make the form not act like HTML form

        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/Accounts/api/token/", requestOptions)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        console.log(1)
                        this.setState({['errors']: "Either Username or Password is incorrect."});
                    } else if (response.status === 400) {
                        this.setState({['errors']: "Either Username or Password is missing."});
                    } else {
                        this.setState({['errors']: "Unexpected Error happened."});
                    }
                } else {
                    const a = JSON.parse(await response.text());
                    localStorage.setItem("authToken", a.access);
                    console.log(localStorage.getItem("authToken"));
                    this.setState({['show_log_In']:!this.state.show_log_In})
                   
                }
            })
            .catch(error => {
                console.log(error)
            });


    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    logout() {
        // remove the auth token from local storage
        localStorage.removeItem("authToken");
      
        // update the component state to show the login form again
        this.setState({
          show_log_In: false,
        });
      }

      Register() { 
        // update the component state to show the login form again
        this.setState({
          new_account: true,
        });
        console.log("clicked")
      }


      UpdateProfile() {
        // remove the auth token from local storage
      
        // update the component state to show the login form again
        this.setState({
          UpdateProfile: true,
        });
      }
      

    render() {
        return (
          <div>
            {this.state.show_log_In ? (
              <div style={{ textAlign: "center" }}>
                {this.state.UpdateProfile ?
                    <div><UpdateP/></div>:
                    <div>
                        <RetrieveProfile /><br/>
                        <button onClick={this.UpdateProfile}>Update Profile</button><br/><br/>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                }
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                {this.state.new_account ?
                <div><Registration/></div>:
                <div >
                    <h2>Log In</h2>
                    <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <p>{this.state.errors}</p>
                    <button type="submit">Login</button>
                    </form>
                    <button onClick={this.Register}>No Account? Register Now</button>
                    </div>
            }
              </div>
            )}
          </div>
        );
      }
      
}