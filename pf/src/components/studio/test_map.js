import { GoogleMap, LoadScript ,MarkerF} from '@react-google-maps/api';
import { Component, useRef, useState } from "react";
import Marker_wrapper from './Marker_wrapper';
export default class Test_Map extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            map: null,
            curr:null
        }
        //this.componentDidMount=this.componentDidMount.bind(this)
    }
    
    //componentDidMount(){
      //  this.setState({['map']:new window.google.maps.Map(this.state.curr, {})})
    //}
    render(){
    var key="AIzaSyCy3nD1IcmwjbT1K9zRW-mhLzJ7cq2O6t4"
    const containerStyle = {width: '100vw',height: '100vw'};
      
      const center = {
        lat: 43.653225,
        lng: -79.383186
      };
      const pos=[{lat: 43.6532,lng: -77},{lat: 45,lng: -79.383},{lat: 43,lng: -79.383186},{lat: 43.653225,lng: -79}]
    return (
        <LoadScript
          googleMapsApiKey={key}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={100}
          >
            
            { pos.map((d)=>{return(
                <MarkerF position={d} onClick={()=>{console.log(d)}}/>)
            })}
            
          </GoogleMap>
        </LoadScript>
      )
    }
    
}