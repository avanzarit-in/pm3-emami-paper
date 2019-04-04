import React, { Component } from "react";
import {  Menu, Dropdown, Icon } from 'semantic-ui-react'
import "./App.css"

import DeliveryMaster from './components/parent-reel-management/DeliveryMaster'
import ProductMaster from './components/parent-reel-management/ProductMaster'

import Date1 from './components/parent-reel-management/Date1'
import AppFilter from './AppFilter'

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

            <Menu.Item name='Date1' 
           active={activeItem === 'dt'} 
           onClick={()=>this.handleItemClick('dt')} />
            <Menu.Item name='AppFilter' 
           active={activeItem === 'ft'} 
           onClick={()=>this.handleItemClick('ft')} />



  
        </Menu>
      
        {this.state.activeItem==="dm"?
         <DeliveryMaster/>:this.state.activeItem==="pm"?

         <ProductMaster/>:this.state.activeItem==="dt"?
         <Date1/>:this.state.activeItem==="ft"?
         
        <div><AppFilter /></div>:null}

           <SemanticToastContainer position="bottom-right" />
      </div>
    );
  }
}

export default Admin;
