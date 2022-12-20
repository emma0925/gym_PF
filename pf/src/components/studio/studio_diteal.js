import React, {Component} from "react";
import Class_Displayer from "./class_displayer";
import Image_Displayer from "./image_displayer";
import Amentities_Displayer from "./amenities_displayer";
import { withRouter } from "react-router";
import {    useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
  
export default class Studio_Detail extends Component{

    constructor(props){
        super(props)
        this.state={
            choosen:props.choosen,
            ind:props.ind,
            currpage:0,
            d:{}        }
        const searchParams = new URLSearchParams(document.location.search)
        //this.choosen=props.choosen
        //this.get_classes=this.get_classes.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        //this.load_images=this.load_images.bind(this)
    }
    componentDidUpdate(prevProps){
        if(this.props.ind!==prevProps.ind){
            this.setState({['ind']:this.props.ind})
        }}
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
        
        fetch('http://127.0.0.1:8000/Studios/'+this.props.choosen+'/',requestOptions)
        .then(async reponse=>{
           const data =  JSON.parse(await reponse.text())
           console.log('adejnnhjnuwg')
           console.log(data)
           console.log(this.state === undefined)
           //c=data
           this.setState({['d']:data})
           //this.create_studio_list(data)
        })
    }
    render(){
        const amount = Number(5)
        var last=(Number(this.props.ind)-amount)>0?Number(this.props.ind)-amount:0
        var next = Number(this.props.ind)+amount
        return(
            <div style={{"textAlign": "center"}}>
                {this.state.d.name?<div>Studio: {this.state.d.name}<br/> Address: {this.state.d.address}<br/>Longitude:{this.state.d.longitude}<br/> Latitude: {this.state.d.latitude}<br/> </div>:<div></div>}
                <Image_Displayer
                    choosen={this.props.choosen}
                />
                <Class_Displayer choosen={this.props.choosen} index={this.state.ind} amount={amount}/>
                <Amentities_Displayer choosen={this.props.choosen}/>
                <Link to={"../display_all/studio_details/"+this.props.choosen+'/'+last}  onClick={() => {this.setState({['ind']: last} )}}>last</Link>
                <Link to={"../display_all/studio_details/"+this.props.choosen+'/'+(Number(this.props.ind)+amount)} onClick={() => {this.setState({['ind']:next } );console.log(this.state)}}>next</Link>
            </div>
        )
    }
}
export function Studio_Detail_with_rotter(){
    let c=useParams()
    return(
        <Studio_Detail choosen={c.choosen} ind ={c.ind}/>
    )
}