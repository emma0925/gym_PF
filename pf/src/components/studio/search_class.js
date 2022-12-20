import React, { Component } from "react";
import './search_studio.css'

export default class Search_Class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",  // The search term, initially empty
      results: [],     // The search results, initially empty
      button_clicked: false,
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
  handleClassButtonClick() { //search for a date range
    // Update the button_clicked state
    this.setState({ button_clicked: true });
        // Set the mode option to 'cors' to enable CORS
    const requestOptions = {
      mode: "cors",
    };
    const searchTerm = this.state.searchTerm;
    // Make the fetch call using the search term in the URL and the request options
    fetch(`http://127.0.0.1:8000/Studios/search/class/bydaterange?time=${searchTerm}`, requestOptions)
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

  handleAmentityButtonClick() { //amentity is for by time overhere
    // Update the button_clicked state
    this.setState({ button_clicked: true });
        // Set the mode option to 'cors' to enable CORS
    const requestOptions = {
      mode: "cors",
    };
    const searchTerm = this.state.searchTerm;
    // Make the fetch call using the search term in the URL and the request options
    fetch(`http://127.0.0.1:8000/Studios/search/class/bydate?time=${searchTerm}`, requestOptions)
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
    fetch(`http://127.0.0.1:8000/Studios/search/class/byname?name=${searchTerm}`, requestOptions)
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
    fetch(`http://127.0.0.1:8000/Studios/search/class/bycoach?coach=${searchTerm}`, requestOptions)
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
            <h2>Class Search results for "{this.state.searchTerm}"</h2>
            {this.state.results.map(d=>{
            return(
              <div>
                <h3>Class_name: {d.name}</h3>
                <p>Studio(id): {d.studio_id}<br/>
                Description: {d.description}<br/>
                Coach ID: {d.coach_id}<br/>
                Start Time: {d.start_time}<br/>
                End Time: {d.end_time}<br/>
                Recurse Time: {d.recurseTime}<br/>
                Class Size: {d.class_size}<br/>
                Start Date: {d.start_Date}<br/>
                </p>
              </div>
            )})}
            <button onClick={this.handleNewButtonClick}>Make Another Search</button>
          </div>
        ):(         
        <div className="search-form">
          <h2>Search For a Class</h2>
        <input type="text" onChange={this.handleSearchChange} /><br/>
        <button onClick={this.handleClassButtonClick}>Search By A Date Range</button>
        <button onClick={this.handleAmentityButtonClick}>Search By Date</button>
        <button onClick={this.handleNameButtonClick}>Search By Studio Name</button>
        <button onClick={this.handleCoachButtonClick}>Search By Coach</button><br/>
        <p>Please Note, all dates should be in the format of "yyyy-mm-dd" and 
            if you want to search by a date range, please separate the start date and the end date with a space</p>
        </div>
        ) 
        }
      </div>
    )
  }
}


