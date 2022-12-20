import React, {Component} from "react";
import './profile.css'
import Image from '../image'
import gym from "../../fitness_centre.jpeg";



export default class RetrieveProfile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            avatar: "",
            Card_Number: "",
            Expiry_Date: "",
            errors: ""}
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

        fetch("http://127.0.0.1:8000/Accounts/getprofile/", requestOptions)
            .then(async response => {
                    const a = JSON.parse(await response.text())
                    const user_info = a.user
                    const avatar = a.avatar
                    const Payment_Method = a.Payment_Method
                this.setState({
                    ['user_id']: user_info.id,
                    ['username']: user_info.username,
                    ['first_name']: user_info.first_name,
                    ['last_name']: user_info.last_name,
                    ['email']: user_info.email,
                })
                if(avatar){
                    this.setState({
                        ['avatar']: avatar,
                    })
                }
                if(Payment_Method){
                    this.setState({
                        ['Card_Number']: Payment_Method.card_num,
                        ['Expiry_Date']: Payment_Method.expiry_date,
                    })
                }

            })
            .catch(error => console.log('error', error));

            fetch("http://127.0.0.1:8000/Accounts/image/", requestOptions).then(async response =>{

            })

    }

    render(){
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var imd={    
            uri: 'http://127.0.0.1:8000/Accounts/image/',
            method: 'GET',
            headers: myHeaders
            }
        return(
            <div className="account-info">
                <h2>Account Information</h2>
                <p>User id: {this.state.user_id}</p>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
                <p>First Name: {this.state.first_name}</p>
                <p>Last Name: {this.state.last_name}</p>
                <p>Payment Card: {this.state.Card_Number} </p>
                <p>Payment Card Expiry Date: {this.state.Expiry_Date} </p>
                <p>Avatar:</p><img id ='avatar' src={'http://127.0.0.1:8000/Accounts/image/?t='+this.state.user_id} /><br/>
            </div>
        );
    }

}
