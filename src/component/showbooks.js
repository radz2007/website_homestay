import React, { Component } from 'react'
import firebase from '../asset/firebase';
export default class showbooks extends Component {
    constructor(){
        super();
        this.state={
            show:[],
            search:''
        }
        this.removeItem = this.removeItem.bind(this)   
        this.handleChange = this.handleChange.bind(this)  
    }
    removeItem(Key_ID){
        const itemsRef = firebase.database().ref('/books');
            itemsRef.child(Key_ID).remove();} 
            handleChange(e){ 
              this.setState({ 
                [e.target.name]:e.target.value 
             }) 
         }
         handleChange(e){ 
            this.setState({
              [e.target.name]:e.target.value,
            })
    
       }
    componentDidMount(){
        const itemsRef = firebase.database().ref('books').orderByChild('date').limitToLast(20) ;
                    itemsRef.on('value',(snapshot) => {
                            let items1 = snapshot.val();         
                            let newState = [];         
                            for(let item in items1){            
                            newState.push({Key_ID:item,
                            house:items1[item].house,
                            people:items1[item].people ,
                            date:items1[item].date,
                            total:items1[item].total,
                            name:items1[item].name
                            })         
                          }         
                          this.setState({
                          show:newState         
                        })      
                    }) 
    }
    render() {
        
        let filter = this.state.show.filter(
            (item) =>{
              return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
          );
      
        let showlist = filter.map((item)=>{
            return(
                <tr className="thead-light"> 
                      <th width="25%"><p class="text-center">{item.date}</p></th>
                      <th width="20%"><p class="text-center">{item.name}</p></th>
                      <th width="10%"><p class="text-center">{item.house}</p></th>
                      <th width="20%"><p class="text-center">{item.people}</p></th> 
                      <th width="15%"><p class="text-center">{item.total}</p></th> 
                      <th width="10%"><p class="text-center"><button  onClick={() => this.removeItem(item.Key_ID)} class="btn btn-success">Success</button></p></th>  
                    </tr>
            )
        })
        return (
            <div>
                <div class="container">
                    <div class="row" style={{marginTop:10}}>
                    <div className="col-12"> 
                    <div className="form-row">
                        <div class="col-2">
                        </div>
                        <div class="col-8">
                            <p class="text-center"><h2>รายการ จองห้องพัก</h2></p>
                        </div>
                        <div class="col-2">  
                        </div>
                    </div> 
                    </div>
                    
                    <div className="col-12" style={{marginTop:20}}> 
                    <div className="form-row">
                        <div class="col-2">
                        
                        </div>
                        <div class="col-8">
                        Search<br/>
                        <input type="text" className="form-control" placeholder="ค้นหาชื่อผู้จอง" name="search" onChange={this.handleChange}/><br/>
        <table className="table table-sm table-bordered"> 
                    <tr className="thead-dark"> 
                      <th width="25%"><p class="text-center">วันที่</p></th>
                      <th width="20%"><p class="text-center">ชื่อผู้จอง</p></th>
                      <th width="10%"><p class="text-center">หลังที่</p></th>
                      <th width="20%"><p class="text-center">จำนวนคน</p></th> 
                      <th width="15%"><p class="text-center">ราคา</p></th>  
                      <th width="15%"><p class="text-center">เสร็จสิ้น</p></th>
                    </tr>
                    {showlist}
        </table> 
                        </div>
                        <div class="col-2">  
                        </div>
                    </div> 
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
