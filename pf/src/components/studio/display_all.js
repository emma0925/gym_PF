import { GoogleMap, LoadScript ,MarkerF} from '@react-google-maps/api';
import React, {Component} from "react";
import Studio_Detail from './studio_diteal'
import { Link } from 'react-router-dom';
import './display.css';

export default class Disolay_all extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            index:0,
            choosen:'-1',
            lat:0,
            lon:0,
            d:{}
        }
        this.get_studios=this.get_studios.bind(this)
        this.owner_change=this.owner_change.bind(this)
        this.set_coor=this.set_coor.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleLonChange=this.handleLonChange.bind(this)
    }
    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.set_coor)
        }
        this.get_studios()
    }
    set_coor(position){
        this.setState({['lat']:position.coords.latitude,['lon']:position.coords.longitude})
    }
    get_studios(){
        var lat= this.state.lat;
        var lon = this.state.lon;
        //const [displaying, changedisplaying]=useState()
        //var index=0;
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch('http://127.0.0.1:8000/Studios//?latitude='+lat+'&longitude='+lon+'&index='+this.state.index,requestOptions)
        .then(async reponse=>{
           const data =  JSON.parse(await reponse.text())
           console.log("dddddddddddddd")
           console.log(data)
           console.log(this.state === undefined)
           var updated_data = this.state.data.concat(data)
           this.setState({['data']:updated_data,['index']:updated_data.length})

           //this.create_studio_list(data)
        })
    }

    handleChange(event) {
        // Get the search term from the input field
        const searchTerm = event.target.value;
    
        // Update the search term state
        this.setState({ "lat": searchTerm });
        this.get_studios();
    }

    handleLonChange(event) {
        // Get the search term from the input field
        const searchTerm = event.target.value;
    
        // Update the search term state
        this.setState({ "lon": searchTerm });
        this.get_studios();
    }


    
    
    create_studio_list(d){
        console.log(d)
        console.log(this.state)
    }
    owner_change(i){
        //var s = JSON.parse(JSON.stringify(this.state))
        //s.choosen = i;
        //console.log(s)S
        this.setState({['choosen']:i.id,['d']:{lat:i.latitude,lon:i.longitude}})
        console.log(this.state)
    }
    
    render(){
        var key="AIzaSyCy3nD1IcmwjbT1K9zRW-mhLzJ7cq2O6t4"
        var la=0
        var ln = 0
        var count=this.state.data.length
        for (let i = 0; i < count; i++) {
            let d = this.state.data[i]
            la=la+Number(d.latitude)
            ln=ln+Number(d.longitude)

        }
    var center = {
                lat: Number(this.state.lat),
                lng: Number(this.state.lon)
              };
    console.log(center)
    const c = {
        lat: -1,
        lng: -32.5
      };
        return(
            <div style={{width: '100vw',height: '50vh', textAlign: 'center'}}>
        <LoadScript
          googleMapsApiKey={key}
        >
          <GoogleMap
            mapContainerStyle={ {width: '100%',height: '100%'}}
            center={center}
            zoom={5}
          >
            
            { this.state.data.map?this.state.data.map((d)=>{
                console.log({lat:Number(d.latitude),lng:Number(d.longitude)})
                return(
                <MarkerF position={{lat:Number(d.latitude),lng:Number(d.longitude)}} onClick={()=>this.owner_change(d)}/>
                
                )
            }):<MarkerF position={center}/>}
            
          </GoogleMap>
        </LoadScript>
            {/*
                <div style={{width:'19%', float: 'left'}}>
                {this.state.data.map(d=>{
                            var pos = {
                                lat:d.latitude,
                                lng: d.longitude
                              }
                    return(
                            <div> 
                                
                                <button onClick={()=>this.owner_change(d.id)}>{d.name}{d.id}</button>
                            </div>
                        
                    )
                })}
            </div>*/}<br></br>
            <div style={{textAlign: "center"}}>
           
            {this.state.d.lat&&this.state.d.lon? <button onClick={()=>{window.open(
                "https://www.google.com/maps/dir/?api=1&origin="+this.state.lat+","+this.state.lon+"&destination="+this.state.d.lat+","+this.state.d.lon
                )}}>
                find it on google map!
            </button>:<div></div>}
            </div>
                <input type="number" onChange={this.handleChange} placeholder="latitude"/><br/>


                <input type="number" onChange={this.handleLonChange} placeholder="longitude"/><br/>
            <button style={{fontSize: 10, width: "80px", height: "50px", padding: "10px"}} onClick={this.get_studios}>load more</button><br/>
            {this.state.d.lat&&this.state.d.lon? <button onClick={()=>{window.open(
                "https://www.google.com/maps/dir/?api=1&origin="+this.state.lat+","+this.state.lon+"&destination="+this.state.d.lat+","+this.state.d.lon
                )}}>
                find it on google map!
            </button>:<div></div>}
            
            <Link to={"studio_details/"+this.state.choosen+"/0"}> Click on Red Icons, and then click here to view studo details</Link>

            </div>
            
        );
    }
}


