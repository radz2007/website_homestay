import React, { Component } from 'react'
import firebase from '../asset/firebase';
export default class event extends Component {
    constructor(){
        super();
        this.state={
          event:[]
        }
      }
    componentDidMount(){
        const itemsRef1 = firebase.database().ref('event');
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
        let listevent = this.state.event.map((item1)=>{
            return(
                 <div class="card" style={{marginRight:5,float:"left"}}>
                 <img src={item1.imageURL} style={{width:205,height:205}} class="card-img-top"/>
                  <div class="card-body" style={{backgroundColor:"#4c4d4c"}}>
                 <p class="card-text text-light">{item1.title}</p>
                 </div>
                 </div>
       )
     })
        return (
            <div class="container">
        <table class="table table-borderless" style={{marginTop:30}}>
            <tr class="thead-dark">
            <th>
            ข่าวสาร/กิจกรรม
            </th>
            </tr>
            <tr class="thead-light">
                <th>
                {listevent}
                </th>
            </tr>
        </table>
        </div>
        )
    }
}
