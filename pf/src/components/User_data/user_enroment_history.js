import React, {Component} from "react";
//import Login from "../Authentication/Login";
import './user.css'
export default class User_Enroment_History extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            ind:props.ind
        }
        this.componentDidMount=this.componentDidMount.bind(this)
        this.componentDidUpdate=this.componentDidUpdate.bind(this)
        console.log(this.props)
    }
    componentDidUpdate(prevProps){
        if(this.props.ind!==prevProps.ind){
            this.componentDidMount()
            this.setState({['ind']:this.props.ind})
    }

    }
    componentDidMount(){
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);
        var c = []
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        //var imgs = []
        fetch(this.props.url+"?index="+this.props.ind,requestOptions)
        .then(async reponse=>{
           const data =  JSON.parse(await reponse.text())
           //console.log(data)
           //console.log(this.state === undefined)
           //imgs=data
           this.setState({['data']:data})
           console.log('s')
           console.log(this.state)
           //this.create_studio_list(data)
        })
    }

    render(){
        return(
            <div style={{"textAlign": "center"}}>
                {this.state.ind}
            {this.state.data.map(d=>{
                    return(
                        
                            <div style={{"textAlign": "center"}}> 
                                <h3>Date: {d[0]}</h3>
                                Lesson: {d[1].name}
                            </div>
                        
                    )
                })}
            </div>
        )
    }



}