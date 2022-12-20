import React, {Component} from "react";
import Account from './Login'


export default class UpdateP extends Component{
    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            username: "",
            password: "",
            email: "",
            first_name: "",
            last_name: "",
            avatar: "",
            errors: "",
            updated: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }
    handleSubmit(event){
        event.preventDefault(); // To make the form not act like HTML form
        this.setState({['updated']:true})
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        // console.log(`Bearer ${token}`)
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("user_id", this.state.user_id);
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);
        formdata.append("email", this.state.email);
        formdata.append("first_name", this.state.first_name);
        formdata.append("last_name", this.state.last_name);
        formdata.append("avatar", this.state.avatar);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/Accounts/updateprofile/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        


    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleFileChange(event) {
        this.setState({
          avatar: event.target.files[0],
        });
      }
      
    render(){
        return(
            <div>
                {this.state.updated ?
                <div><Account/></div>:
                <div>
                    <h2>Update Profile</h2>
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
                        <br></br>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                        /><br></br>
                        <label htmlFor="avatar">Avatar:</label>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={this.handleFileChange}
                        />
                        <br></br>
                        <button type="submit">Update</button>
                    </form>
                </div>}
            </div>
        )
    }
}