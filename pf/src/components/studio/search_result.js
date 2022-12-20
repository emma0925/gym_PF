import React from "react";
import {    useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
export default class Search_Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: props.query ,  // The search term, initially empty
      results: [],     // The search results, initially empty
      curr_ind:props.index,
      searchType:props.t,
      a:0
    }
    this.componentDidUpdate=this.componentDidUpdate.bind(this)
    this.get_data=this.get_data.bind(this)
    this.componentDidMount=this.componentDidMount.bind(this)
    //console.log(`http://127.0.0.1:8000/Studios/search/studio/`+this.props.t+'?'+this.props.query+"&index="+this.props.ind+"&amount=5")
  }
  componentDidMount(){
    this.get_data()
  }
  componentDidUpdate(prevProps){
    console.log('called')
  
    console.log(this.props.ind)
    if(this.props.ind!==prevProps.ind){
        //sthis.setState({['ind']:this.props.index})
        console.log('updated')
        this.get_data()
    }}
  get_data(){
    const requestOptions = {
      mode: "cors",
    };
    const searchTerm = this.state.searchTerm;
    // Make the fetch call using the search term in the URL and the request options
    fetch(`http://127.0.0.1:8000/Studios/search/studio/`+this.props.t+'?'+this.props.query+"&index="+this.props.ind+"&amount=5", requestOptions)
      .then(async (response) => {
        console.log(`http://127.0.0.1:8000/Studios/search/studio/`+this.props.t+'?'+this.props.query+"&index="+this.props.ind+"&amount=5")
        // Parse the response as JSON
        const data = JSON.parse(await response.text());
        // Update the results state with the fetched data
        //this.state.results=data.qualified_class
        console.log("aaaaaaaaaa")
        console.log(data)
        console.log(data.qualified_class)
        this.setState({['results']:data.qualified_class})
        console.log(this.state.results)

      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
  
  render(){
    return(
      <div>
        {this.state.a}
        {this.state.results.map?this.state.results.map(d=>{
                    return(        
                            <div> 
                                <div>
                <h3>Studio Name: {d.name}</h3>
                <p>Studio Address: {d.address}<br/>
                Studio Latitude: {d.latitude}<br/>
                Studio Longitude: {d.longitude}<br/>
                Studio Phone Number: {d.phone_number}<br/>
                Studio Postal Code: {d.postal_code}<br/></p>
              </div>
                            </div>    
                    )
                }):<div></div>}
            <Link to={'../search_result/'+(Number(this.props.ind)+5)+"/"+this.props.t+'/'+this.props.query} onClick={()=>{this.setState({['a']:(Number(this.props.ind)+5)})}}>
              next
            </Link>
            <Link to={'../search_result/'+(Number(this.props.ind)-5>0?Number(this.props.ind)-5:0)+"/"+this.props.t+'/'+this.props.query} onClick={()=>{this.setState({['a']:((Number(this.props.ind)-5>0?Number(this.props.ind)-5:0))})}}>
              last
            </Link>
      </div>
    )
  }

}

export function Search_result_with_rotter(){
  let c=useParams()
  console.log(c.index)
  console.log(c.query)
  return(
      <Search_Result query={c.query} ind ={c.index} t={c.searchType}/>
  )
}