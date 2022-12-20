import React, {Component} from "react";
import ViewUserSub from "./ViewUserSub";


export default class UserSub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start_time: "",
            end_time: "",
            auto_renew: "True",
            plan_id: "",
            errors: "",
            su: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault(); // To make the form not act like HTML form
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        this.setState({
            su: true
        })
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("start_time", this.state.start_time);
        formdata.append("end_time", this.state.end_time);
        formdata.append("auto_renew", this.state.auto_renew);
        formdata.append("plan_id", this.state.plan_id);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/Accounts/manageusersubscription/", requestOptions)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        this.setState({['errors']: "The given plan_id is not found."});
                    } else if (response.status === 400) {
                        this.setState({['errors']: "Missing one of the four required fields."});
                    } else {
                        this.setState({['errors']: "Unexpected Error happened."});
                    }
                } else {
                    console.log("Subscription Created.")
                }
            })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                {this.state.su?
                <div><ViewUserSub/></div>:
                <div>
                    <h2>Make a Subscription</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="date"
                            name="start_time"
                            placeholder="Start Time"
                            value={this.state.start_time}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="end_time"
                            placeholder="End Time"
                            value={this.state.end_time}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="auto">Auto Renew</label>
                        <select name="auto_renew" id="auto" onChange={this.handleChange}>
                            <option value="True" onChange={this.handleChange}>Yes</option>
                            <option value="False" onChange={this.handleChange}>No</option>
                        </select>
                        <input
                            type="text"
                            name="plan_id"
                            placeholder="Plan ID"
                            value={this.state.plan_id}
                            onChange={this.handleChange}
                            required
                        />
                        <p>{this.state.errors}</p>
                        <button type="submit">Register</button>
                    </form>
                </div>}
            </div>
        )
    }
}



