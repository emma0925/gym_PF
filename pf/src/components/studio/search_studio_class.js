import React, { Component } from "react";
import { Link } from "react-router-dom";
import './search_studio.css'

export default class Search_Studio_Class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",  // The search term, initially empty
      results: [],     // The search results, initially empty
      button_clicked: false,
      curr_ind:0
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClassButtonClick = this.handleClassButtonClick.bind(this);
    this.handleAmentityButtonClick = this.handleAmentityButtonClick.bind(this);
    this.handleNewButtonClick = this.handleNewButtonClick.bind(this);
    this.handleNameButtonClick = this.handleNameButtonClick.bind(this);
    this.handleCoachButtonClick = this.handleCoachButtonClick.bind(this);
  }

  // Function to handle changes to the search input
  handleSearchChange(event) {
    // Get the search term from the input field
    const searchTerm = event.target.value;

    // Update the search term state
    this.setState({ searchTerm });
  }

  // Function to handle clicks on the search button
  handleClassButtonClick() {
    // Update the button_clicked state
    this.setState({ button_clicked: true });
        // Set the mode option to 'cors' to enable CORS
    const requestOptions = {
      mode: "cors",
    };
    const searchTerm = this.state.searchTerm;
    // Make the fetch call using the search term in the URL and the request options
    fetch(`http://127.0.0.1:8000/Studios/search/studio/byclass?class=${searchTerm}`, requestOptions)
      .then(async (response) => {
        // Parse the response as JSON
        const data = JSON.parse(await response.text());
        // Update the results state with the fetched data
        this.setState((state) => {
          return { results: data.qualified_class };
        });
      })
      
      
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }

  handleAmentityButtonClick() {
    // Update the button_clicked state
    this.setState({ button_clicked: true });
        // Set the mode option to 'cors' to enable CORS
    const requestOptions = {
      mode: "cors",
    };
    const searchTerm = this.state.searchTerm;
    // Make the fetch call using the search term in the URL and the request options
    fetch(`http://127.0.0.1:8000/Studios/search/studio/byamentities?amentities=${searchTerm}`, requestOptions)
      .then(async (response) => {
        // Parse the response as JSON
        const data = JSON.parse(await response.text());
        // Update the results state with the fetched data
        this.setState((state) => {
          return { results: data.qualified_class };
        });
      })
      
      
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }

  handleNameButtonClick() {
    // Update the button_clicked state
    this.setState({ button_clicked: true });
        // Set the mode option to 'cors' to enable CORS
    const requestOptions = {
      mode: "cors",
    };
    const searchTerm = this.state.searchTerm;
    // Make the fetch call using the search term in the URL and the request options
    fetch(`http://127.0.0.1:8000/Studios/search/studio/name?name=${searchTerm}`, requestOptions)
      .then(async (response) => {
        // Parse the response as JSON
        const data = JSON.parse(await response.text());
        // Update the results state with the fetched data
        this.setState((state) => {
          return { results: data.qualified_class };
        });
      })
      
      
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }

  handleCoachButtonClick() {
    // Update the button_clicked state
    this.setState({ button_clicked: true });
        // Set the mode option to 'cors' to enable CORS
    const requestOptions = {
      mode: "cors",
    };
    const searchTerm = this.state.searchTerm;
    // Make the fetch call using the search term in the URL and the request options
    fetch(`http://127.0.0.1:8000/Studios/search/studio/bycoach?coach=${searchTerm}`, requestOptions)
      .then(async (response) => {
        // Parse the response as JSON
        const data = JSON.parse(await response.text());
        // Update the results state with the fetched data
        this.setState((state) => {
          return { results: data.qualified_class };
        });
      })
      
      
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }



  handleNewButtonClick() {
    // Update the button_clicked state
    this.setState({ button_clicked: false });
  }

  render() {
    console.log(this.state.results)
    return (
      <div>
        {this.state.button_clicked ? 
        (
          
          <div className="search-results">
            <h2>Studio Search results for: "{this.state.searchTerm}"</h2>
            {this.state.results.map(d=>{
            return(
              <div>
                <h3>Studio Name: {d.name}</h3>
                <p>Studio Address: {d.address}<br/>
                Studio Latitude: {d.latitude}<br/>
                Studio Longitude: {d.longitude}<br/>
                Studio Phone Number: {d.phone_number}<br/>
                Studio Postal Code: {d.postal_code}<br/></p>
              </div>
            )})}
            <button onClick={this.handleNewButtonClick}>Make Another Search</button>
          </div>
        ):(         
        <div className="search-form">
          <h2>Search For A Studio</h2>
        <input type="text" onChange={this.handleSearchChange} /><br/>
        <button onClick={this.handleClassButtonClick}>Search By Class</button>
        <button onClick={this.handleAmentityButtonClick}>Search By Amentity</button>
        <button onClick={this.handleNameButtonClick}>Search By Studio Name</button>
        <button onClick={this.handleCoachButtonClick}>Search By Coach</button>
        <Link to={"../search_result/0/name/name="+this.state.searchTerm}>
          by name
        </Link>
        <Link to={"../search_result/0/byamentities/byamentities="+this.state.searchTerm}>
          by amentities
        </Link>
        </div>
        ) 
        }
      </div>
    )
  }
}




// import React, { useState } from "react";

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState(""); // Initialize the search term state with an empty string
//   const [data, setData] = useState([]);
//   // Update the search term state with the value entered in the textbox
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Set the mode option to 'cors' to enable CORS
//   const requestOptions = {
//     mode: "cors",
//   };

//   // Function to handle the fetch request
//   const handleFetchData = () => {
//     // Make the fetch call using the search term in the URL and the request options
//     fetch(`http://127.0.0.1:8000/Studios/search/studio/byclass?class=${searchTerm}`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         // Do something with the data
//         this.setData(data)
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error(error);
//       });
//   };
  
//   return (
//     <div>
//       {this.state.show_log_In?
//       <div>
//         <h1>The studio that offers {searchTerm} is as foolowed:</h1>
//         {this.state.data.map(d=>{
//           return(
//             <div>
//               {d[0]}:{d[1]}
//             </div>
//           )
//         })
//         }
//       </div>:
//       <div>      
//         <input type="text" onChange={handleSearchChange} />
//         <button onClick={handleFetchData}>Fetch Data</button>
//       </div>
// }

//     </div>
//   );
  
// };

// export default App;

// import React, {Component} from "react";


// export default class ViewStudioSub extends Component{
//     constructor(props) {
//         super(props);
//         const search = window.location.search;
//         const searchParams = new URLSearchParams(search);
//         const id = searchParams.get("studio_id");
//         this.state = {
//             subscriptions: [],
//             searchTerm: id
//         }
//        // this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }
//     componentDidMount(){
//         const myHeaders = new Headers();
//         const token = localStorage.getItem("authToken");
//         myHeaders.append("Authorization", `Bearer ${token}`);

//         const requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//             redirect: 'follow'
//         };

//         fetch(`http://127.0.0.1:8000/Studios/search/studio/byclass?class=${searchTerm}`, requestOptions)
//             .then(async response => {
//                 const a = JSON.parse(await response.text())
//                 const subs = a.subscriptions
//                 this.setState({
//                     ['subscriptions']: subs,

//                 })

//             })
//             .catch(error => console.log('error', error));

//          // this.render()
//     }

//     handleChange(event){
//         this.setState({
//             [event.target.name]: event.target.value
//         })
//     }

//     render(){
//         return(
//             <div className="sub_info">
//                 <form onSubmit={this.handleSubmit}>
//                   <input
//                         type="text"
//                         name="studio_id"
//                         placeholder="Studio id"
//                         value={this.state.studio_id}
//                         onChange={this.handleChange}
//                         required
//                     />
//                     <button type="submit">Retrieve</button>
//                 </form>
//                 <h2>Subscription Plans</h2>
//                 <ul>
//                     {
//                         this.state.subscriptions.map(sub =>(
//                             <li key={sub.id}>Plan ID:{sub.id}; Type: {sub.subscription_type}; Rate: {sub.rate};</li>
//                         ))
//                     }
//                 </ul>
//             </div>
//         );
//     }

// }