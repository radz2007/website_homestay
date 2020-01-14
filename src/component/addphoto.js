import React, { Component } from 'react'
import firebase from '../asset/firebase';
import FileUpload from 'react-firebase-file-uploader';

export default class addphoto extends Component {
    constructor(){
        super();
        this.state={
            image:'',
            imageURL:'',
            progress:0,
            Key_ID:''
        }
        
        this.handleUploadStart = this.handleUploadStart.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){ 
         this.setState({ 
           [e.target.name]:e.target.value 
         })
    }
    handleUploadStart =()=>{
        this.setState({
            progress:0
        })
    }
    handleUploadSuccess = filename =>{
        this.setState({
            image: filename,
            progress:100
        })
        firebase.storage().ref('photos').child(filename).getDownloadURL()
        .then(url => this.setState({
            imageURL:url
        }))
    } 
    handleSubmit(e){
        e.preventDefault();        
        if(this.state.Key_ID !== ''){ 
        return this.updateItem()      
      }const itemsRef = firebase.database().ref('photo')      
      const item = {
        imageURL:this.state.imageURL    
                }      
                itemsRef.push(item)      
                this.setState({Key_ID:'',image:'',imageURL:''})
              }
    render() {

        return (
            <div class="container">
                <div className="col-12"> 
                    <div className="form-row">
                    <div className="col-3"> 
                    </div>
                    <div className="col-6"> 
                    <p class="text-center" style={{padding:10}}><h3><b>เพิ่ม อัลบั้มภาพ</b></h3></p>
                    <form>
                    <div>
                    <img src={this.state.imageURL || 'https://via.placeholder.com/400x300'} style={{width:400,height:300,marginLeft:60,marginRight:60}}/>
                </div>
                
                <div class="custom-file" style={{marginBottom:10,marginTop:10}}>
                    <FileUpload
                    accept="image/*"
                    name="image"
                    storageRef={firebase.storage().ref('photos')}
                    onUploadStart={this.handleUploadStart}
                    onUploadSuccess={this.handleUploadSuccess}
                    />
                </div>
                    
                    <button class="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit}>Upload</button>
                    </form>
                    </div>
                    <div className="col-3"> 
                    </div>
                    </div> 
                </div>
                
            </div>
        )
    }
}
