import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
import firebase from '../asset/firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouterMatch,
    useParams
  } from "react-router-dom";

export default class reviewhome extends Component {
    constructor(){
        super();
        this.state = {
            Com:[]
        }
    }
    componentDidMount(){
        const itemsRef = firebase.database().ref('review').limitToLast(3) ;
                    itemsRef.on('value',(snapshot) => {
                            let items1 = snapshot.val();         
                            let newState = [];         
                            for(let item in items1){            
                            newState.push({Key_ID:item,
                            name:items1[item].name,              
                            rating:items1[item].rating,
                            comment:items1[item].comment           
                            })         
                          }         
                          this.setState({
                          Com:newState         
                        })      
                    }) 
      }
      
    render() {
        let listReview = this.state.Com.map((item)=>{
            for(let i=0;i<2;i++){
            return(
            <ul class="nav flex-column">
            <li class="card nav-item text-white" style={{marginBottom:10,backgroundColor:"#026600"}}>
            <p style={{padding:10}}>{item.name}<br/>
            <StarRatings
            rating={item.rating}
            starDimension="20px"
            starSpacing="1px"
            starRatedColor="yellow"
            /><br/>
            <small>{item.comment}</small></p>
            </li>
            </ul>
            )
        }
})
        return (
            <div style={{marginTop:10,padding:10}}>
            <h5 class="card-title text-center"><Link style={{textDecoration:"none"}} to="/review" class=" text-dark">Review</Link></h5>
        {listReview}
            </div>
        )
    }
}
