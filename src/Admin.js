import React, { Component } from "react";
import {  Menu, Dropdown, Icon } from 'semantic-ui-react'
import "./App.css"

import DeliveryMaster from './components/parent-reel-management/DeliveryMaster'
import ProductMaster from './components/parent-reel-management/ProductMaster'

import { SemanticToastContainer } from 'react-semantic-toasts';

const trigger = (userName) => (
    <span>
        <Icon name='user' /> Hello, {userName}
    </span>
)

class Admin extends Component {
state = { activeItem:'rp'}

handleItemClick = (name) =>{
this.setState({activeItem:name})
}
  render() {
    let {activeItem} = this.state;
    return (
     
      <div>
         
            <Menu size="large"  pointing   >

           <Menu.Item name='Delivery Master' 
           active={activeItem === 'dm'} 
           onClick={()=>this.handleItemClick('dm')} />
            <Menu.Item name='Product Master' 
           active={activeItem === 'pm'} 
           onClick={()=>this.handleItemClick('pm')} />
            


  
        </Menu>
      
        {this.state.activeItem==="dm"?
         <DeliveryMaster/>:this.state.activeItem==="pm"?
         
        <div><ProductMaster/></div>:null}
           <SemanticToastContainer position="bottom-right" />
      </div>
    );
  }
}

export default Admin;
