import React, {Component} from "react";


export default class ViewStudioSub extends Component{
    constructor(props) {
        super(props);
        const search = window.location.search;
        const searchParams = new URLSearchParams(search);
        // const id = searchParams.get("studio_id");
        this.state = {
            subscriptions: [],
            studio_id: 0,
            search: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.search_sub = this.search_sub.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleButtonClicked=this.handleButtonClicked.bind(this);

    }
    handleButtonClicked(){
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        myHeaders.append("Authorization", `Bearer ${token}`);
        console.log(this.state.studio_id)

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const searchTerm = this.state.studio_id;
        fetch(`http://127.0.0.1:8000/Accounts/managesubscription/?studio_id=${searchTerm}`, requestOptions)
            .then(async response => {
                const a = JSON.parse(await response.text())
                const subs = a.subscriptions
                this.setState({
                    ['subscriptions']: subs,
                    search: true

                })

            })
            .catch(error => console.log('error', error));
        //     this.setState({
        //         search: true
        //       });
        //  // this.render()
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    search_sub(event){
        event.preventDefault();
        this.setState({
            search: true
          });
          console.log("clicked")
          console.log(this.state.studio_id)
    }

    handleSearchChange(event) {
        // Get the search term from the input field
        const a = event.target.value;
    
        // Update the search term state
        this.setState({ studio_id: a });
        
    }

    render(){
        return(
            <div>
                {!this.state.search?
               <div style={{ textAlign: "center" }}><h2>View a Subscirption</h2>
                <input type="number" placeholder="Studio id" onChange={this.handleSearchChange} /><br/>
                <button onClick={this.handleButtonClicked}>Search Subscirption for this Studio_id</button>
                </div>:
                <div className="sub_info">
                    {/* <form onSubmit={this.handleSubmit}>
                    <input
                            type="text"
                            name="studio_id"
                            placeholder="Studio id"
                            value={this.state.studio_id}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit">Retrieve</button>
                    </form> */}
                    <h2>Subscription Plans</h2>
                    <ul>
                        {
                            this.state.subscriptions.map(sub =>(
                                <li key={sub.id}>Plan ID:{sub.id}; Type: {sub.subscription_type}; Rate: {sub.rate};</li>
                            ))
                        }
                    </ul>
                </div>}
            </div>
        );
    }

}