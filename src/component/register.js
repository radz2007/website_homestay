import React, { Component } from 'react'
import firebase from '../asset/firebase';

export default class register extends Component {
    constructor(){
        super();
        this.state={    
            Key_ID:'',
            name:'',
            date:'',
            idcard:'',
            address:'',
            email:'',
            password:''
            
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){ 
        this.setState({ 
          [e.target.name]:e.target.value 
        })
   }
   handleSubmit(e){
    e.preventDefault();        
    if(this.state.Key_ID !== ''){ 
    return this.updateItem()      
  }
  const itemsRef = firebase.database().ref('member')      
  const item = {
        name : this.state.name,
        date : this.state.date,
        idcard : this.state.idcard, 
        address : this.state.address, 
        email : this.state.email, 
        password : this.state.password,     
        }      
            itemsRef.push(item)      
            this.setState({Key_ID:'',name:'',date:'',idcard:'',address:'',email:'',password:''})
    }
    render() {
        return (
            <div class="container">
                <div className="col-12"> 
                    <div className="form-row">
                    <div className="col-4"> 
                    </div>
                    <div className="col-4"> 
                    <p class="text-center" style={{padding:10}}><h3><b>สมัครสมาชิก</b></h3></p>
                    <form>
                    <div class="form-group">
                     <label>ชื่อ-นามสกุล</label>
                        <input type="text" class="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                     <label>วันเกิด</label>
                        <input type="date" class="form-control" name="date" onChange={this.handleChange} value={this.state.date}/>
                    </div>
                    <div class="form-group">
                     <label>หมายเลขบัตรประชาชน</label>
                        <input type="text" class="form-control" name="idcard" placeholder="Enter Citizen ID" onChange={this.handleChange} value={this.state.idcard}/>
                    </div>
                    <div class="form-group">
                     <label>ที่อยู่</label>
                        <input type="text" class="form-control" name="address" placeholder="Enter Address" onChange={this.handleChange} value={this.state.address}/>
                    </div>
                    <div class="form-group">
                     <label>Email</label>
                        <input type="email" class="form-control" name="email" placeholder="Enter Email" onChange={this.handleChange} value={this.state.email}/>
                    </div>
                    <div class="form-group">
                     <label>Password</label>
                        <input type="password" class="form-control" name="password" placeholder="Enter Password" onChange={this.handleChange} value={this.state.password}/>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit}>Submit</button>
                    </form>
                    </div>
                    <div className="col-4"> 
                    </div>
                    </div> 
                    </div>
                
            </div>
        )
    }
}
