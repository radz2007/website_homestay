import React, { Component } from 'react'
import a from '../picture/band.jpg';
import firebase from '../asset/firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouterMatch,
    useParams
  } from "react-router-dom";



export default class home extends Component {
  constructor(){
    super();
    this.state={
      event:[],
      photo:[]
    }
  }
  componentDidMount(){
    const itemsRef = firebase.database().ref('photo').limitToLast(5);
                itemsRef.on('value',(snapshot) => {
                        let items1 = snapshot.val();         
                        let newState = [];         
                        for(let item in items1){            
                        newState.push({Key_ID:item,
                        imageURL:items1[item].imageURL         
                        })         
                      }         
                      this.setState({
                      photo:newState         
                    })      
                })
                const itemsRef1 = firebase.database().ref('event').limitToLast(5);
                itemsRef1.on('value',(snapshot) => {
                        let items1 = snapshot.val();         
                        let newState = [];         
                        for(let item1 in items1){            
                        newState.push({Key_ID:item1,
                        imageURL:items1[item1].imageURL ,
                        title:items1[item1].title        
                        })         
                      }         
                      this.setState({
                      event:newState         
                    })      
                }) 
  }
    render() {
      let listReview = this.state.photo.map((item)=>{
        return(
            <div class="card" style={{width:205,height:205,marginRight:5,float:"left"}}>
            <img src={item.imageURL} style={{width:205,height:205}} class="card-img-top"/>
            </div>
        )
})
        let listevent = this.state.event.map((item1)=>{
       return(
            <div class="card" style={{width: "13rem",marginRight:5,float:"left"}}>
            <img src={item1.imageURL} style={{width:205,height:205}} class="card-img-top"/>
             <div class="card-body" style={{backgroundColor:"#4c4d4c"}}>
            <p class="card-text text-light">{item1.title}</p>
            </div>
            </div>
  )
})
        return (
            
                <div>
           
                <div class="container">
<div class="mb-3" style={{width:900,marginTop:10}}>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src={a} class="card-img"/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title"><b>บ้านพริกหวาน ฟาร์มสเตย์</b></h3>
        <h5 class="card-title"><b>Sweet Chilli House</b></h5>
        <p class="card-text">1 คน / 400 บาท รวมอาหารเช้า</p>
        <p class="card-text"><small class="text-muted">บ้านพักส่วนตัว พร้อมอาหารเช้า  ติดแม่น้ำโขง <br/>Private house near KHONG RIVER 
        Free WIFI ,Aircondition,TV,Hot Water</small></p>
        <button class="btn btn-danger"><Link style={{textDecoration:"none"}} to="/books" class="text-center text-white"><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>จองเลย</Link></button>
      </div>
    </div>
    
  </div>
</div>
            
        <table class="table table-borderless">
            <tr class="thead-dark">
            <th>
            ข่าวสาร/กิจกรรม <small class="text-right"><Link style={{textDecoration:"none"}} to="/event">show more..</Link></small>
            </th>
            </tr>
            <tr class="thead-light">
                <th>
                {listevent}
                </th>
            </tr>
        </table>

        <table class="table table-borderless">
            <tr class="thead-dark">
            <th>
            อัลบั้มภาพ <small class="text-right"><Link style={{textDecoration:"none"}} to="/photo">show more..</Link></small>
            </th>
            </tr>
            <tr class="thead-light">
                <th>
                {listReview}
                </th>
            </tr>
        </table>
            </div>
            </div>
                
        )
    }
}
