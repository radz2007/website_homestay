import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
import firebase from '../asset/firebase';

export default class review extends Component {
    constructor(){
        super();
        this.state={
            rating:0,
            name:'',
            comment:'',
            Key_ID:'',
            Com:[]
        }
        this.changeRating = this.changeRating.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
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
  const itemsRef = firebase.database().ref('review')      
  const item = {
        name : this.state.name,
        comment : this.state.comment,
        rating : this.state.rating   
        }      
            itemsRef.push(item)      
            this.setState({Key_ID:'',name:'',comment:'',rating:0})
    }
    componentDidMount(){
        const itemsRef = firebase.database().ref('review');
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
        })
        return (
            <div class="container">
                <div className="col-12"> 
                    <div className="form-row">
                    <div className="col-4"> 
                    </div>
                    <div className="col-4"> 
                    <p class="text-center" style={{padding:10}}><h3><b>รีวิว ที่พัก</b></h3></p>
                    {listReview}
                    </div>
                    <div className="col-4"> 
                    </div>
                    </div> 
                    </div>

                    <div className="col-12" style={{marginTop:100}}> 
                    <div className="form-row">
                    <div className="col-4"> 
                    </div>
                    <div className="col-4"> 
                    <h5><b>Comment</b></h5>
                    <ul class="nav flex-column">
                    <li class="card nav-item text-white" style={{backgroundColor:"#026600"}}>
                    <p style={{padding:10}}>ชื่อสมาชิก
                    <input type="text" name="name" class="form-control" onChange={this.handleChange}/><br/>
                    <StarRatings
                    rating={this.state.rating}
                    starHoverColor="yellow"
                    starRatedColor="yellow"
                    starDimension="20px"
                    starSpacing="1px"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="rating"
                    />
                    </p>
                    <textarea name="comment" rows="3" style={{marginRight:10,marginLeft:10}} placeholder="ข้อความรีวิว" onChange={this.handleChange}></textarea>
                    <button class="btn btn-danger text-center" style={{marginTop:10,marginBottom:10,marginLeft:250,marginRight:10}} onClick={this.handleSubmit}>Submit</button>
                    </li>
                    </ul>
                    </div>
                    <div className="col-4"> 
                    </div>
                    </div> 
                    </div>
                
            </div>
        )
    }
}
