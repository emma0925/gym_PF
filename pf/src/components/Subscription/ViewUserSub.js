import React, {Component} from "react";
import UserSub from "./UserSub";


export default class ViewUserSub extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Subscriptions: [],
            new: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.NewSub=this.NewSub.bind(this);
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

        fetch("http://127.0.0.1:8000/Accounts/manageusersubscription/", requestOptions)
            .then(async response => {
                const a = JSON.parse(await response.text())
                const subs = a.Subscriptions

                this.setState({
                    ['Subscriptions']: subs
                })

            })
            .catch(error => console.log('error', error));
    }
    NewSub(){
        this.setState({
            new: true,
          });
    }

    render(){
        return(
            <div className="usersub-info">
                {this.state.new?
                <div><UserSub /></div>:
                
                <div style={{ textAlign: "center" }}>
                    <h2>Your Subscriptions</h2>
                    <ul>
                        {
                            this.state.Subscriptions.map(sub =>(
                                <li key={sub.id}>Plan ID:{sub.subscription_id}; Start Time:{sub.start_time}; End Time: {sub.end_time}; Auto Renew: {sub.auto_renew}</li>
                            ))
                        }
                    </ul>
                    <button onClick={this.NewSub}>Make a Subscription</button>
                </div>}
            </div>
        );
    }

}