import React, {Component} from "react";
import Login from "./Authentication/Login";
export default class Image_Viewer extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            full_screened: false}
    }

    render(){
        const a = {
        zIndex:1000,
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',}
         const b ={width: '10%',
         zIndex:0,
         height: '10%',
         position: 'static',
          float: 'left'}
        const c={
            width:'100vw',
            height:'100vw'
        }
        return(
            <div style={this.state.full_screened?a:{}}>
                <img
                src = {this.props.src} 
                style={!this.state.full_screened?{width:'10%'}:{width:'100%'}}
                onClick={()=>{this.setState({['full_screened']:!this.state.full_screened})}}
                />
            </div>
        )
    }



}