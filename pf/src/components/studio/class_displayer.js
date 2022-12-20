import React, {Component} from "react";
import Class_detail_Display from "./class_detail_display";
export default class Class_Displayer extends Component{
    constructor(props){
        super(props)
        this.state={
            choosen:props.choosen,
            classes:[],
            a:false
        }
        //this.choosen=props.choosen
        //this.get_classes=this.get_classes.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.load_classes=this.load_classes.bind(this)
        this.reload=this.reload.bind(this)
        this.componentDidMount=this.componentDidMount.bind(this)
    }
    componentDidMount(){
        this.componentDidUpdate(1)
    }
    componentDidUpdate(prevProps){
        if(this.props.index!==prevProps.index && this.props.index!==undefined){
            this.load_classes()
            console.log("from did updata")
    }
    
    }
     load_classes(){
        var index=0;
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);
        var c = []
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        //c=[]
        fetch('http://127.0.0.1:8000/Studios/'+this.props.choosen+'/classes/?index='+this.props.index+"&amount="+this.props.amount,requestOptions)
        .then(async reponse=>{
           const data =  JSON.parse(await reponse.text())
           console.log(data)
           console.log(this.state === undefined)
           //c=data
           this.setState({['classes']:data})
           //this.create_studio_list(data)
        })
        return c;
    }
    reload(){
        console.log(this.state)
        this.setState({['a']:!this.state.a})
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(this.state)
    }
    
    render(){
        return(
            <div>
                <div  style={{width: '50%', float: 'left'}}>
                {this.state.classes.map(d=>{
                    return(
                        
                            <div> 
                                <Class_detail_Display
                                    date={d[0]}
                                    data={d[1]}
                                    reload = {this.reload}
                                    a={this.state.a}
                                />
                                {d[0]}:{d[1].name}{d[1].Class_id}
                            </div>
                        
                    )
                })}
            </div>
            
            
            </div>
        )
    }
}