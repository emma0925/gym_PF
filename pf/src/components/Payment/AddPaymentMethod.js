import React, {Component} from "react";


export default class AddPaymentMethod extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card_num: "",
            expiry_date: "",
            errors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault(); // To make the form not act like HTML form
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("card_num", this.state.card_num);
        formdata.append("expiry_date", this.state.expiry_date);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/Accounts/addcard/", requestOptions)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        this.setState({['errors']: "Missing one of the two required fields."});
                    } else {
                        this.setState({['errors']: "Unexpected Error happened."});
                    }
                } else {
                    const myHeaders = new Headers();
                    const token = localStorage.getItem("authToken");
                    myHeaders.append("Authorization", `Bearer ${token}`);

                    var formdata = new FormData();
                    formdata.append("card_num", this.state.card_num);

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: formdata,
                        redirect: 'follow'
                    };
                    fetch("http://127.0.0.1:8000/Accounts/updatepayment/", requestOptions)
                        .then(() => {
                            this.setState({['errors']: "Payment Successfully updated."});
                        })
                        .catch(error => console.log('error', error));
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
                <h2>Update Payment Method</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="card_num"
                        placeholder="Card Number"
                        value={this.state.card_num}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="expiry_date"
                        placeholder="Expiry Date"
                        value={this.state.expiry_date}
                        onChange={this.handleChange}
                        required
                    />
                    <p>{this.state.errors}</p>
                    <button type="submit">Update</button>
                </form>
            </div>
        )
    }
}



