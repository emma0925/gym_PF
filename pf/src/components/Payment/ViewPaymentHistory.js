import React, {Component} from "react";
import AddPaymentMethod from "./AddPaymentMethod";
import ViewFuturePayment from "./ViewFuturePayment";


export default class ViewPaymentHistory extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Payments: [],
            update: false
        }

        this.componentDidMount=this.componentDidMount.bind(this);
        this.Update=this.Update.bind(this);
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

        fetch("http://127.0.0.1:8000/Accounts/paymenthistory/", requestOptions)
            .then(async response => {
                const a = JSON.parse(await response.text())
                const payments = a.Payment

                this.setState({
                    ['Payments']: payments
                })

            })
            .catch(error => console.log('error', error));

    }
    Update(){
        this.setState({update: true})
    }

    render(){
        return(
            <div>
                {this.state.update?<div><AddPaymentMethod/></div>:
                <div className="userpay-info" style={{textAlign: "center"}}>
                    <h2>Payment History</h2>
                    <ul>
                        {
                            this.state.Payments.map(pay =>(
                                <li key={pay.id}>Payment ID: {pay.id}; Amount: {pay.amount}; Card Number: {pay.CardInfo_id}; Time: {pay.time}</li>
                            ))
                        }
                    </ul><br/><hr/>
                    
                    <div><ViewFuturePayment /></div><br/><br/>
                    <button onClick={this.Update}>Update Payment Method</button><br/>
                </div>}
            </div>
        );
    }

}