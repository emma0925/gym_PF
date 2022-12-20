import React, {Component} from "react";
export default class Amentities_Displayer extends Component{
    constructor(props){
        super(props)
        this.state={
            choosen:props.choosen,
            amenities:[],
        }
        //this.choosen=props.choosen
        //this.get_classes=this.get_classes.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.load_amentities=this.load_amentities.bind(this)
        console.log("amentities amentities")
        this.componentDidMount=this.componentDidMount.bind(this)
    }
    componentDidMount(){
        this.componentDidUpdate(1)
    }
    componentDidUpdate(prevProps){
        if(this.props.choosen!==prevProps.choosen){
            // this.load_amentities()
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
            fetch('http://127.0.0.1:8000/Studios/'+this.props.choosen+'/amenities/',requestOptions)
            .then(async reponse=>{
               const data =  JSON.parse(await reponse.text())
            console.log(data)
            //    console.log(this.state === undefined)
               this.setState({['amenities']: data})
               console.log("data.amentity output")
               console.log(this.state)
               console.log(data)
            })
            
        }
    
    }
     load_amentities(){
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
        fetch('http://127.0.0.1:8000/Studios/'+this.props.choosen+'/amenities/',requestOptions)
        .then(async reponse=>{
           const data =  JSON.parse(await reponse.text())
        console.log(data)
        //    console.log(this.state === undefined)
           this.setState({['amentities']:data.Amenity})
           console.log("data.amentity output")
           console.log(this.state)
        })
        // return c;
    }

    
    render(){
        return(
            <div>
                <div  style={{width: '50%', float: 'left'}}>
                {this.state.amenities.map?this.state.amenities.map(d=>{
                    return(        
                            <div> 
                                amenities {d.type} {d.quontity}
                            </div>    
                    )
                }):<div></div>}
                </div>
            </div>
        )
    }
}