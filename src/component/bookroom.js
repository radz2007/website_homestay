import React, { Component } from 'react'
import firebase from '../asset/firebase';
import one from '../picture/1.jpg';
import two from '../picture/2.jpg';
import three from '../picture/33.jpg';
export default class bookroom extends Component {
    constructor(){
        super();
        this.state = {
            Key_ID:'',
            name:'',
            house:'',
            people:0,
            total:0,
            check:[],
            search:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    

    handleChange(e){ 
        this.setState({
          [e.target.name]:e.target.value,
          total:this.state.people*400
        })

   }
   handleSubmit(e){
    e.preventDefault();        
    if(this.state.Key_ID !== ''){ 
    return this.updateItem()      
  }
  const itemsRef = firebase.database().ref('books')      
  const item = {
        house : this.state.house,
        name : this.state.name,
        people : this.state.people,
        total : this.state.total,
        date : this.state.search   
        }      
            itemsRef.push(item)      
            this.setState({Key_ID:'',name:'',house:'',people:0,total:0})
    }

    searchTest = e =>{
        this.setState({search:e.target.value},function(){
            this.componentDidMount();});
    }
    componentDidMount(){
        if(this.state.search.length === 0){
        const itemsRef = firebase.database().ref('books') ;
                    itemsRef.on('value',(snapshot) => {
                            let items1 = snapshot.val();         
                            let newState = [];         
                            for(let item in items1){            
                            newState.push({Key_ID:item,
                            house:items1[item].house,
                            people:items1[item].people       
                            })         
                          }         
                          this.setState({
                          check:newState         
                        })      
                    })
        }else{
            const itemsRef = firebase.database().ref('books') ;
                    itemsRef.orderByChild('date').startAt(this.state.search).endAt(this.state.search+"\uf8ff").on('value',(snapshot) => {
                            let items1 = snapshot.val();         
                            let newState = [];         
                            for(let item in items1){            
                            newState.push({Key_ID:item,
                            house:items1[item].house,
                            people:items1[item].people       
                            })         
                          }         
                          this.setState({
                          check:newState         
                        })      
                    })
        }
      }
    render() {
        return (
            <div>
                <div class="container">
                    <div class="row" style={{marginTop:10}}>
                    <div className="col-10"> 
                    <div className="form-row">
                    <div className="col-3"> 
                    วันที่
                   <input type="date" className="form-control" name="search" onChange={this.searchTest}/>
                    </div>
                    </div> 
                    </div>
                    <div class="spinner-grow text-success" role="status">
                    </div>
                    <small><b>free</b></small>
                    <div class="spinner-grow text-danger" role="status" style={{marginLeft:25}}>
                    </div>
                    <small><b>full</b></small>
                </div>
                <div class="container" style={{backgroundColor:"#e1e3e1",padding:20,marginTop:20}}>
                <div class="row" style={{marginTop:10}}>
                    <div class="card col text-center" style={{backgroundColor:"#00f200",padding:20}}><b>หลังที่ 1</b><br/>จำกัด 6 คน</div>
                    <div class="col" >
                    <img src={one} class="card-img-top" style={{width:250,height:200}}/></div>
                    <div class="col"></div>
                    <div class="col" ><br/><b>จองห้องพัก</b><br/>
                    ชื่อผู้จอง<br/><input className="form-control" name="name" style={{marginBottom:20}} placeholder="ชื่อผู้จอง" value={this.state.name} onChange={this.handleChange}/>
                    หลังที่
                    <br/><select class="custom-select" name="house" onChange={this.handleChange}>
                    <option selected>หลังที่ต้องการจอง</option>
                    <option value="1">หลังที่ 1</option>
                    <option value="2">หลังที่ 2</option>
                    <option value="3">หลังที่ 3</option>
                    </select></div>
                    <div class="col"></div>
                    </div>   
                <div class="row" style={{marginTop:10}}>
                <div class="card col text-center" style={{backgroundColor:"#00f200",padding:20}}><b>หลังที่ 2</b><br/>จำกัด 6 คน<br/><br/><br/></div>
                    <div class="col"> <img src={two} class="card-img-top" style={{width:250,height:200}}/></div>
                    <div class="col"></div>
                    <div class="col">จำนวนคนที่เข้าพัก
                    <br/><input class="form-control" name="people" onChange={this.handleChange} value={this.state.people}>
                    </input>
                    <br/></div>
                    <div class="col"></div>
                </div>
                <div class="row" style={{marginTop:10}}>
                <div class="card col text-center" style={{backgroundColor:"#00f200",padding:20}}><b>หลังที่ 3</b><br/>จำกัด 6 คน<br/><br/><br/></div>
                    <div class="col"><img src={three} class="card-img-top" style={{width:250,height:200}}/></div>
                    <div class="col"></div>
                    <div class="col"><button class="btn btn-danger btn-lg btn-block" onClick={this.handleSubmit}>ยืนยัน</button></div>
                    <div class="col"></div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
