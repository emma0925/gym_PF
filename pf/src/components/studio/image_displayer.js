import React, {Component} from "react";
import Image_Viewer from "../image_viewer";
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Image_Displayer extends Component{
    constructor(props){
        super(props)
        this.state={
            choosen:props.choosen,
            images:[],
        }
        //this.choosen=props.choosen
        //this.get_classes=this.get_classes.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.componentDidMount=this.componentDidMount.bind(this)
        //this.load_images=this.load_images.bind(this)
    }
    componentDidMount(){
        this.componentDidUpdate(1)
    }
    componentDidUpdate(prevProps){
        if(this.props.choosen!==prevProps.choosen){
            
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
        //var imgs = []
        fetch('http://127.0.0.1:8000/Studios/'+this.props.choosen+'/images/',requestOptions)
        .then(async reponse=>{
           const data =  JSON.parse(await reponse.text())
           console.log(data)
           console.log(this.state === undefined)
           //imgs=data
           this.setState({['images']:data})
           console.log('image')
           console.log(this.state)
           //this.create_studio_list(data)
        })
    }
    
    }
    
    render(){
        //return(
          //  <div  style={{width: '100%', float: 'left', flexDirection:'row'}}>
            //    {this.state.images.map?this.state.images.map(d=>{
              //      return(
                //            <div style={{width: '20vw'}}>
                  //              <Image_Viewer  src ={"http://127.0.0.1:8000/Studios/images/"+d.id}/>
                    //        </div>
                    //)
                //}):<div>
                  //  </div>}
            //</div>
        //)
        return(
            <Carousel className="Carousel">
                {this.state.images.map?this.state.images.map(d=>{
                        return(
                            <Carousel.Item className="CarouselElement">
                                    <Image_Viewer  src ={"http://127.0.0.1:8000/Studios/images/"+d.id}/>
                            
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                            
                                
                        )
                    }):<div>
                        </div>}
            </Carousel>
        )
}
}
