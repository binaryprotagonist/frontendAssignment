import React, { Component } from 'react'
import SlimSelect from 'slim-select'
import axios from 'axios';

export default class header extends Component {
  constructor() {
    super()
      this.state = {
        users : []
      }
  }
  
 
  componentDidMount() {
    new SlimSelect({
      select: '#slim-select'
    });
    this.getData()
  }
   getData(){
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">


            <a className="navbar-brand" href="#">Logo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
               
                <a className="nav-link" href="#">
                <select id="slim-select">
                    
                      <option>User Info</option>
                      <option>Hussain Ali</option>
                      <option>Shimon </option>
                      <option>Krishna</option>
                    </select>
                    </a>
                </li>
              
                <li className="nav-item active">
                  <a className="nav-link" href="#">User List </a>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
