import React, {Component} from "react";
export default class Class_detail_Display extends Component{
    constructor(props){
        super(props)
        this.state={
            date:props.date,
            data:props.data,
            showing:false,
            enrolled:'',
            a:props.a
        }
        console.log("prob")
        console.log(props)
        this.componentDidMount=this.componentDidMount.bind(this)
        this.check_enrolled=this.check_enrolled.bind(this)
        this.enroll=this.enroll.bind(this)
        this.drop=this.drop.bind(this)
        this.componentDidUpdate=this.componentDidUpdate.bind(this)
        
    }
    componentDidMount(){
        this.check_enrolled()
    }
    componentDidUpdate(prevProps){
        if(this.props.a!==prevProps.a){
            this.check_enrolled()
            console.log("from did updata")
            console.log(this.state)
    }
    
    }
    check_enrolled(){
        var cid = this.props.data.id
        var d = this.props.date
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
        fetch('http://127.0.0.1:8000/Studios/'+cid+'/enrolled/?date='+d,requestOptions)
        .then(async reponse=>{
           const data =  JSON.parse(await reponse.text())
           //console.log(data)
           //console.log(this.state === undefined)
           //imgs=data
           this.setState({['enrolled']:data})
           console.log('s')
           console.log(this.state)
           //this.create_studio_list(data)
        })
    }
    enroll(d){
        var cid = this.props.data.id
        //var d = this.props.date
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);
        var c = []
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            mode:'cors'
        };
        //var imgs = []
        fetch('http://127.0.0.1:8000/Studios/classes/'+cid+'/'+d+'/',requestOptions)
        .then(async reponse=>{
            this.check_enrolled()
        }).catch(error => console.log('error', error))
    }

    drop(d){
        var cid = this.props.data.id
        //var d = this.props.date
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);
        var c = []
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            mode:'cors'
        };
        //var imgs = []
        fetch('http://127.0.0.1:8000/Studios/classes/'+cid+'/'+d+'/',requestOptions)
        .then(async reponse=>{
            this.check_enrolled()
        }).catch(error => console.log('error', error))
    }

    render(){
        return(
            <div>
                <button onClick={()=>{this.setState({['showing']:!this.state.showing})}}>
                    {this.props.date}:{this.props.data.name}
                </button>
                {this.state.showing?<div>
                    {this.state.enrolled?<button onClick={()=>this.drop(this.state.date)}>drop</button>:<button onClick={()=>this.enroll(this.state.date)}>enroll</button>}
                    <button onClick={()=>{this.enroll('all'); this.props.reload()}}>Subscript</button>
                    <button onClick={()=>{this.drop('all'); this.props.reload()}}>Unsubscript</button>
                </div>:<div></div>}
            </div>
        )
    }

}