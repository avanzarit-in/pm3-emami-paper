 import React, {Component} from 'react';
 import ReelManagement from './ReelManagement';
 export default class ReelNoFormatter extends Component{
     state={
         REELNO : "REELNO"
     }
     render(){
         return <ReelManagement REELNO ={this.state.REELNO}/>
             

     }
 }