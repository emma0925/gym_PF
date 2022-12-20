import React, {Component} from "react";
import { useNavigate } from "react-router-dom";
import RetrieveProfile from "./RetriveProfile";
import Login from "./Login";


export default class Registration extends Component{
    constructor(props) {
        super(props);
        // const navigate = useNavigate();

        this.state = {
            username: "",
            password1: "",
            password2: "",
            email: "",
            first_name: "",
            last_name: "",
            avatar: "",
            errors: "",
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async handleSubmit(event){
        event.preventDefault(); // To make the form not act like HTML form
        const formdata = new FormData();
        formdata.append("username", this.state.username);
        formdata.append("password1", this.state.password1);
        formdata.append("password2", this.state.password2);
        formdata.append("email", this.state.email);
        formdata.append("first_name", this.state.first_name);
        formdata.append("last_name", this.state.last_name);
        formdata.append("avatar", this.state.avatar);
        this.setState({['success']:true})

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/Accounts/register/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div>

                
                {this.state.success?<Login/>:                 <div>
                <h2>Registraion</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password1"
                        placeholder="Password"
                        value={this.state.password1}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        value={this.state.password2}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="file"
                        name="avatar"
                        placeholder="Avatar"
                        value={this.state.avatar}
                        alt="Submit"
                        onChange={this.handleChange}
                     />
                    <button type="submit">Register</button>
                </form>
                </div>}
            </div>
        )
    }
}