import { GoogleMap, LoadScript ,MarkerF} from '@react-google-maps/api';
import { Component, useRef, useState } from "react";
export default class Marker_wrapper extends Component{
    constructor(props) {
        super(props);
        
        //this.componentDidMount=this.componentDidMount.bind(this)
    }
    render(){
        return(
            <MarkerF position={this.props.position} onClick={()=>{console.log(this.props.position)}}/>
        )
    }
}