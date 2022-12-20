import React, {Component} from "react";
import User_Enroment_History from "./user_enroment_history";
import {    useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import './user.css'
export default class User_Display extends Component{
    constructor(props){
        super(props)
        this.state={
            h:props.h,
            f:props.f
        }
        //this.choosen=props.choosen
        //this.get_classes=this.get_classes.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }
    componentDidUpdate(prevProps){
        if(this.props.h!==prevProps.h){
            this.setState({['h']:this.props.h})
        }
        if(this.props.f!==prevProps.f){
            this.setState({['f']:this.props.f})
        }
    }


    render(){
        const amount = Number(10)
        var lasth=(Number(this.props.h)-amount)>0?Number(this.props.h)-amount:0
        var nexth = Number(this.props.h)+amount
        var lastf=(Number(this.props.f)-amount)>0?Number(this.props.f)-amount:0
        var nextf = Number(this.props.f)+amount
        
        return(
            <div style={{"textAlign": "center", "whiteSpace": "normal"}}>
                <h2>Past Courses</h2>
                <Link to={"../userData/"+lasth+'/'+this.props.f}  onClick={() => {this.setState({['h']: lasth} )}}>last</Link> or_
                <Link to={"../userData/"+nexth+'/'+this.props.f}  onClick={() => {this.setState({['h']: nexth} )}}>next</Link><br/>
                <User_Enroment_History url={'http://127.0.0.1:8000/Studios/classes/deleat_class/?h=1'} ind = {this.props.h}/>
               
                <h2>upcomming courses</h2>
                <User_Enroment_History url={'http://127.0.0.1:8000/Studios/classes/deleat_class/'}  ind = {this.props.f}/>
                <Link to={"../userData/"+this.props.h+'/'+lastf}  onClick={() => {this.setState({['f']: lasth} )}}>last</Link> or_
                <Link to={"../userData/"+this.props.h+'/'+nextf}  onClick={() => {this.setState({['f']: nexth} )}}>next</Link>
            </div>
        )
    }
}
export function User_Display_with_rotter(){
    let c=useParams()
    console.log('cccccccccccccc')
    console.log(c)
    return(
        <User_Display h={c.h} f ={c.f}/>
    )
}