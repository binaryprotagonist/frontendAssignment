import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import Header from '../../common/header'
import UserInfo from '../UserInfo/userInfo'
import axios from 'axios';
// import SlimSelect from 'slim-select'


export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            users : [],
            user:'',
            userId:'',
            userSetting:[],
            inputValue: '',
            name: "",
            settingType:'',
            shareholders: [{ name: "" }],settingName:''
          }
    }


    componentDidMount() {
        this.getData()
    }

    getUserDetails(value){
        // var userId=value
        const params = JSON.stringify({
          "userId": value,  
          
          });
        axios.post(`http://localhost:3000/getUser`, params,{
          "headers": {      
          "content-type": "application/json",      
          },
          
          })
        .then(res => {
          const user = res.data.data;    
          this.setState({ user:user });
    
        }).catch(err=>{
    
        })
      }

      getUserSettings(value){
        // var userId=value
        const params = JSON.stringify({
          "userId": value,  
          
          });
        axios.post(`http://localhost:3000/getSettings`, params,{
          "headers": {      
          "content-type": "application/json",      
          },
          
          })
        .then(res => {
          const userSetting = res.data.data.settings;
          console.log(userSetting)
    
          this.setState({ userSetting:userSetting });
    
        }).catch(err=>{
    
        })
      }


    getData(){
        axios.get(`http://localhost:3000/getUsers`)
        .then(res => {
    
          const users = res.data.data;
          this.setState({ users });     
        }).catch(err=>{
          alert(err)
    
        })
      }

      handleSelectChange = (event) => {
        this.setState({ userId:event.target.value });     

        this.getUserDetails(event.target.value);
        this.getUserSettings(event.target.value)
      }
      SelectType=(event)=>{
        this.setState({ settingType:event.target.value });

      }
      updateInputValue=(evt)=> {
        this.setState({
          settingName: evt.target.value
        });
      }
      handleNameChange = evt => {
        this.setState({ name: evt.target.value });
      };
    
      handleShareholderNameChange = idx => evt => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, name: evt.target.value };
        });
    
        this.setState({ shareholders: newShareholders });
      };
    
      handleSubmit = evt => {
        const { name, shareholders } = this.state;
        alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
      };
    
      handleAddShareholder = () => {

        this.setState({
          shareholders: this.state.shareholders.concat([{ name: "" }])
        });
      };
    
      handleRemoveShareholder = idx => () => {
        this.setState({
          shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        });
      };
      onItemClick=()=>{
        const params = {          
          "userId":this.state.userId,
          "settings": {
            "settingType": this.state.settingType,
            "settingName": this.state.settingName,
            "options":this.state.shareholders
                
            
          }
          
          };
        axios.post(`http://localhost:3000/addSetting`, params,{
          "headers": {      
          "content-type": "application/json",      
          },
          
          })
        .then(res => {
          console.log(res)
          this.getUserDetails(this.state.userId);
        this.getUserSettings(this.state.userId)
          // const userSetting = res.data.data.settings;
          // console.log(userSetting)
    
          // this.setState({ userSetting:userSetting });
    
        }).catch(err=>{
    
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
         

                 <select id="slim-select" onClick={this.handleSelectChange}>
                {this.state.users.map(user => <option  value={user._id}>{ user.firstName }</option>)}
                    
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

        <div>
                <div className="container">

                    <h1 className="head_user">User Information</h1>
                    <div className="col-xl-4">
                                <button type="button" class="" data-toggle="modal" data-target="#exampleModal">Add Settings</button>
                            </div>
                    <div className="box_ui">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label>firstName</label>
                                    <input value={this.state.user.firstName} type="text" placeholder="First Name" />
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input value={this.state.user.lastName} type="text" placeholder="Last Name" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="head_user">Settings</h1>

                    <div className="box_ui" >
                        
                        <div className="row">
                        {this.state.userSetting.map(setting =><div className="col-xl-8">
                        {setting.settingType.toLowerCase()=='radio'?<div className="form-group">
                                       <label>{setting.settingName}</label>
                                       {setting.options.map(option=><div>
                                          <input type="radio" placeholder="" name="gender" /> <span>{option.name}</span>

                                       </div>

                                        )}
                                  </div>:setting.settingType.toLowerCase()=='checkbox'?<div className="form-group">
                                       <label>{setting.settingName}</label>
                                       {setting.options.map(option=><div>
                                        <input type="checkbox" placeholder="Title" name="title" / >
                                       <label for="vehicle3"> {option.name}</label>


                                       </div>

                                        )}


                                  </div>:setting.settingType.toLowerCase()=='dropdown'?<div className="form-group">
                                  <label>{setting.settingName}</label>
                                  <input type="checkbox" placeholder="Title" name="title" / >

                                  <div>

                                       <select id="slim-select" >
                                          {setting.options.map(option => <option>{ option.name }</option>)}
                    
                                          
                                      </select>

                                       </div>

                                      

                                  </div>:setting.settingType.toLowerCase()=='input'?<div className="form-group">
                                  <label>{setting.settingName}</label>
                                  <input type="text" placeholder="Title" name="title" / >
                                    

                                  </div>:''}
                                                            {/* <div className="form-group">
                                       <label>Gender</label>
                                       <input type="Checkbox" placeholder="" name="gender" /> <span>Male</span>
                                       <input type="Checkbox" placeholder="" name="gender" /> <span>Female</span>
                                       <input type="Checkbox" placeholder="" name="gender" /> <span>Other</span>
                                  </div> */}
                                  {/* <div className="form-group">
                                       <label>Add Multiple Skills</label>
                                      <select id="multiple" multiple>
                                          <option>Html</option>
                                          <option>Css</option>
                                          <option>React</option>
                                          <option>Angular</option>
                                          <option>Node js</option>
                                      </select>
                                  </div> */}
                             </div> )}

                             
                        </div>
                    </div>

                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Setting</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div className="form-group">
                            <label>Type</label>
                            <select id="form_type" onClick={this.SelectType} >
                              <option disabled>Select Type</option>
                              <option>Radio</option>
                              <option>Checkbox</option>
                              <option>Input</option>
                              <option>Dropdown</option>
                            </select>
                        </div>
                        <div className="form-group">
                        <label className="d-block">Setting Name</label>
                        <input value={this.state.settingName} type="text" placeholder="Add options" onChange={this.updateInputValue} />
                        </div>

                        {/* <div className="form-group">
                        <label className="d-block">Add Multiple Select</label>
                        <input value={this.state.inputValue} type="text" placeholder="Add options" onChange={this.updateInputValue} />

                
                        </div> */}
                        {this.state.settingType.toLowerCase()=="dropdown" || this.state.settingType.toLowerCase()=="radio" ||this.state.settingType.toLowerCase()=="checkbox"?<form onSubmit={this.handleSubmit}>
        

        <label className="d-block">Add Multiple Option</label>
        
                {this.state.shareholders.map((shareholder, idx) => (
                  <div className="form-group">
                    
                    <input
                      type="text"
                      placeholder={`option #${idx + 1} name`}
                      value={shareholder.name}
                      onChange={this.handleShareholderNameChange(idx)}
                    />
                    <button
                      type="button"
                      onClick={this.handleRemoveShareholder(idx)}
                      className="small"
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={this.handleAddShareholder}
                  className="small"
                >
                  Add Options
                </button>
              </form>
        :''}


      </div>
                        <div class="modal-footer">
                            <button type="button"  class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.onItemClick} class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

                

            </div>
        )
    }
}
