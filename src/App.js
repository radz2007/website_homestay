import React, { Component } from 'react';
import b from './picture/u.png';
import face from'./picture/facebook.png';
import tel from './picture/tel.png';
import address from './picture/address.png';
import Login from './component/login';
import Reviewh from './component/reviewhome';
import Home from './component/home';
import Photo from './component/photo';
import Event from './component/event';
import Book from './component/bookroom';
import Register from './component/register';
import Review from './component/review';
import Test from './component/addevent';
import Addphoto from './component/addphoto';
import Showbook from './component/showbooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouterMatch,
  useParams
} from "react-router-dom";


export default class App extends Component {
  

  render() {
    return (
    <div>
        {/* leader banner */}
        <div>
        <img src={b} style={{height:150}} class="img-fluid"></img>
        </div>

        <Router>
        {/* body */}
      <div class="form-row">
        
        <div class="col-2">
        {/* login */}
        <div class="col" style={{backgroundColor:"#e1e3e1",padding:10}}>
               <Login/>
               
        </div>
        {/* review */}
        <div class="col bg-danger">
               <Reviewh/>   
        </div>
        
        </div>

       
        <div class="col-10">
        {/* navbar */}
        
        <nav class="navbar navbar-light bg-danger">
        <ul class="nav">
          <li class="card nav-item" style={{backgroundColor:"#026600",marginRight:20,width:150}}>
          <Link to="/home" class="nav-link text-center text-white">หน้าหลัก</Link>
          </li>
          <li class="card nav-item" style={{backgroundColor:"#026600",marginRight:20,width:150}}>
          <Link to="/books" class="nav-link text-center text-white">จองห้องพัก</Link>
          </li>
          <li class="card nav-item" style={{backgroundColor:"#026600",marginRight:20,width:150}}>
          <Link to="/event" class="nav-link text-center text-white">ข่าวสาร/กิจกรรม</Link>
          </li>
          <li class="card nav-item" style={{backgroundColor:"#026600",marginRight:20,width:150}}>
          <Link to="/photo" class="nav-link text-center text-white">อัลบั้มภาพ</Link>
          </li>
        </ul>
        </nav>
        {/* Content */}
        
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/books">
            <Book/>
          </Route>
          <Route path="/event">
            <Event/>
          </Route>
          <Route path="/photo">
          <Photo/>
          </Route>
          <Route path="/regis">
          <Register/>
          </Route>
          <Route path="/review">
          <Review/>
          </Route>
          <Route path="/addevent">
          <Test/>
          </Route>
          <Route path="/addphoto">
          <Addphoto/>
          </Route>
          <Route path="/viewbooks">
          <Showbook/>
          </Route>
        </Switch>
        
        </div>
      </div>
      </Router>

      {/* footer */}
      <div style={{backgroundColor:"#e1e3e1",marginTop:20,padding:10}}>
      <p class="text-center"><img src={face} width="30" height="30" class="d-inline-block align-top"/>บ้านพริกหวาน Sweet chilli house homestay
      <br/><img src={tel} width="30" height="30" class="d-inline-block align-top"/>093-2250276 , 087-8981224
      <br/><img src={address} width="30" height="30" class="d-inline-block align-top"/>บ้านพริกหวาน ฟาร์มสเตย์ บ้านท่าขันทอง ตำบลบ้านแซว
อำเภอเชียงแสน จังหวัดเชียงราย 57150</p>
      
        </div>
    </div>
    )
  }
}
