import React, {Component} from "react";


export default class ViewFuturePayment extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Payments: [],}
    }
    componentDidMount(){
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);


        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/Accounts/futurepayment/", requestOptions)
            .then(async response => {
                const a = JSON.parse(await response.text())
                const payments = a.Future_Payments

                this.setState({
                    ['Payments']: payments
                })

            })
            .catch(error => console.log('error', error));


    }

    render(){
        return(
            <div className="userpay-info">
                <h2>Future Payments</h2>
                <ul>
                    {
                        this.state.Payments.map(pay =>(
                            <li key={pay.id}>Payment Time: {pay.Payment_time}; Amount: {pay.price}; For Plan ID: {pay.plan_id}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }

}