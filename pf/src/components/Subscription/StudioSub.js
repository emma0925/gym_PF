import React, {Component} from "react";


export default class StudioSub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studio_id: "",
            type: "Monthly",
            rate: "",
            errors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault(); // To make the form not act like HTML form
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        console.log(token)
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("studio_id", this.state.studio_id);
        formdata.append("type", this.state.type);
        formdata.append("rate", this.state.rate);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/Accounts/managesubscription/", requestOptions)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        console.log(1)
                        this.setState({['errors']: "Current user is not super user, can't create subscription"});
                    } else if (response.status === 400) {
                        this.setState({['errors']: "Missing one of the three required fields."});
                    } else if (response.status === 404) {
                        this.setState({['errors']: "The given studio_id is not found."});
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
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="studio_id"
                        placeholder="Studio id"
                        value={this.state.studio_id}
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" onChange={this.handleChange}>
                        <option value="Monthly" onChange={this.handleChange}>Monthly</option>
                        <option value="Yearly" onChange={this.handleChange}>Yearly</option>
                    </select>
                    <input
                        type="text"
                        name="rate"
                        placeholder="Rate"
                        value={this.state.rate}
                        onChange={this.handleChange}
                    />
                    <p>{this.state.errors}</p>
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}



