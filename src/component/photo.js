import React, { Component } from 'react'
import firebase from '../asset/firebase';

export default class photo extends Component {
    constructor(){
        super()
        this.state={
            imageURL:[]
        }
    }
    componentDidMount(){
        const itemsRef = firebase.database().ref('photo');
                    itemsRef.on('value',(snapshot) => {
                            let items1 = snapshot.val();         
                            let newState = [];         
                            for(let item in items1){            
                            newState.push({Key_ID:item,
                            imageURL:items1[item].imageURL         
                            })         
                          }         
                          this.setState({
                          imageURL:newState         
                        })      
                    }) 
      }
    render() {
        let listReview = this.state.imageURL.map((item)=>{
            return(
                <div class="card" style={{width:205,height:205,marginRight:5,float:"left",marginBottom:20}}>
                <img src={item.imageURL} style={{width:205,height:205}} class="card-img-top"/>
                </div>
            )
})

        return (
            <div class="container">
        <table class="table table-borderless" style={{marginTop:30}}>
            <tr class="thead-dark">
            <th>
            อัลบั้มภาพ
            </th>
            </tr>
            <tr class="thead-light">
                <th>
                {listReview}
                </th>
            </tr>
        </table>
        </div>
        )
    }
}
