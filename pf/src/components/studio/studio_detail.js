import React, {Component} from "react";
export default class Studio_Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            choosen:''
        }
        this.update_choosen=update_choosen.bind(this)
    }
    render(){
        return(
            <div>
                1{this.state.choosen}
            </div>
        )
    }
}
export function update_choosen(i){
    this.setState({['choosen']:i})
}