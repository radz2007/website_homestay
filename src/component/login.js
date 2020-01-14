import React, { Component } from 'react'
import firebase from '../asset/firebase';
import User from '../picture/user.png'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouterMatch,
  useParams
} from "react-router-dom";

export default class login extends Component {
  constructor(){ 
    super(); 
    this.state = { 
       isLogedin:false,
       member:[],
       Key_ID:'',
       email:'',
       pass:''
    } 
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    const itemsRef = firebase.database().ref('member');
                itemsRef.on('value',(snapshot) => {
                        let items1 = snapshot.val();         
                        let newState = [];         
                        for(let item in items1){            
                        newState.push({Key_ID:item,
                        email:items1[item].email,              
                        password:items1[item].password           
                        })         
                      }         
                      this.setState({
                      member:newState         
                    })      
                }) 
  }
  
  handleLoginClick() {
    this.state.member.map((item)=>{
      if(this.state.email===item.email && this.state.pass===item.password){
        return this.setState({isLogedin: true})
      }
    })
  }

  handleLogoutClick() {
    this.setState({isLogedin: false,email:'',pass:''});
  }
  handleChange(e){ 
    this.setState({ 
      [e.target.name]:e.target.value 
    })
}
    render() {
     if(this.state.email==="admin"){
        if(this.state.isLogedin){
          return (
            <div style={{marginTop:10,backgroundColor:"#e1e3e1",padding:10}}>
              <h5 class="card-title text-center">ยินดีต้อนรับ</h5><br/>
              <img src={User} width="40" height="40" class="d-inline-block align-top" style={{marginLeft:68}}/>
              <p class="text-center"><b>{this.state.email}</b></p><br/>
              <p class="card text-center" style={{backgroundColor:"#fff021"}}><Link to="/viewbooks" style={{textDecoration:"none"}}>รายการจองห้องพัก</Link></p>
              <p class="card text-center" style={{backgroundColor:"#fff021"}}><Link to="/addevent" style={{textDecoration:"none"}}>เพิ่มข่าวสาร/กิจกรรม</Link></p>
              <p class="card text-center" style={{backgroundColor:"#fff021"}}><Link to="/addphoto" style={{textDecoration:"none"}}>เพิ่มอัลบั้มภาพ</Link></p><br/>
              <div class="form-group">
              <button class="btn btn-primary btn-lg btn-block text-center" onClick={this.handleLogoutClick}>
              <Link to="/home" class="text-white" style={{textDecoration:"none"}}>Logout</Link></button>
              </div>
              <div class="form-group">
              </div>
              </div>
          );
        }
        else{
        return(
          <div style={{marginTop:10}}>
            <h5 class="card-title text-center">ระบบสมาชิก</h5>
            
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input name="email" type="username" class="form-control" placeholder="Enter Email" onChange={this.handleChange}/>
              
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input name="pass" type="password" class="form-control" placeholder="Password" onChange={this.handleChange}/>
            </div>
            <button class="btn btn-primary text-center"  style={{width:80,marginRight:35}} onClick={this.handleLoginClick}>Login</button>
            <button class="btn btn-primary text-center" style={{width:80}}><Link to="/regis" class="text-white" style={{textDecoration:"none"}}>Register</Link></button>
            </div>
        );}
      }
      else{
        if(this.state.isLogedin){
          return (
            <div style={{marginTop:10,backgroundColor:"#e1e3e1",padding:10}}>
              <h5 class="card-title text-center">ยินดีต้อนรับ</h5><br/>
              <img src={User} width="40" height="40" class="d-inline-block align-top" style={{marginLeft:68}}/>
              <p class="text-center"><b>{this.state.email}</b></p><br/>
              <div class="form-group">
              <button class="btn btn-primary btn-lg btn-block text-center" onClick={this.handleLogoutClick}>
              <Link to="/home" class="text-white" style={{textDecoration:"none"}}>Logout</Link></button>
              </div>
              <div class="form-group">
              </div>
              </div>
          );
        }else{
        return(
          <div style={{marginTop:10}}>
            <h5 class="card-title text-center">ระบบสมาชิก</h5>
            
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input name="email" type="username" class="form-control" placeholder="Enter Email" onChange={this.handleChange}/>
              
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input name="pass" type="password" class="form-control" placeholder="Password" onChange={this.handleChange}/>
            </div>
            <button class="btn btn-primary text-center"  style={{width:80,marginRight:35}} onClick={this.handleLoginClick}>Login</button>
            <button class="btn btn-primary text-center" style={{width:80}}><Link to="/regis" class="text-white" style={{textDecoration:"none"}}>Register</Link></button>
            </div>
        );}
      }
    }
}
