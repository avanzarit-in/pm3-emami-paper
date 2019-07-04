import React, { Component } from "react";
import {  Menu, Dropdown, Icon } from 'semantic-ui-react'
import "./App.css"

//import DeliveryMaster from './components/parent-reel-management/DeliveryMaster'
//import ProductMaster from './components/parent-reel-management/ProductMaster'
import { SemanticToastContainer } from 'react-semantic-toasts';

const trigger = (userName) => (
    <span>
        <Icon name='user' /> Hello, {userName}
    </span>
)

class Admin extends Component {
state = { activeItem:'dp'}

handleItemClick = (name) =>{
this.setState({activeItem:name})
}
  render() {
    let {activeItem} = this.state;
    return (
     
      <div>
         
            <Menu size="large"  pointing   >

           <Menu.Item name='Daily Production' 
           active={activeItem === 'dp'} 
           onClick={()=>this.handleItemClick('dp')} />
            <Menu.Item name='Shift Wise Production' 
           active={activeItem === 'swp'} 
           onClick={()=>this.handleItemClick('swp')} />
            <Menu.Item name='Dispatch Report' 
           active={activeItem === 'dr'} 
           onClick={()=>this.handleItemClick('dr')} />
           <Menu.Item name='Reel Status' 
           active={activeItem === 'rs'} 
           onClick={()=>this.handleItemClick('rs')} />
            <Menu.Item name='Stock Register' 
           active={activeItem === 'sr'} 
           onClick={()=>this.handleItemClick('sr')} />
           <Menu.Item name='Reel Weight Register' 
           active={activeItem === 'rwr'} 
           onClick={()=>this.handleItemClick('rwr')} />
            <Menu.Item name='Reel Production Land' 
           active={activeItem === 'rpl'} 
           onClick={()=>this.handleItemClick('rpl')} />
           <Menu.Item name='Reel Production Zebra' 
           active={activeItem === 'rpz'} 
           onClick={()=>this.handleItemClick('rpz')} />
           
           



  
        </Menu>
      
        {this.state.activeItem==="dp"?
         <div>Daily Production</div>:this.state.activeItem==="dr"?
         <div>Dispatch Report</div>:this.state.activeItem==="rs"?
         <div>Reel Status</div>:this.state.activeItem==="sr"?
         <div>Stock Register</div>:this.state.activeItem==="rwr"?
         <div>Reel Weight Register</div>:this.state.activeItem==="rpl"?
         <div>Reel ProductionL</div>:this.state.activeItem==="rpz"?
         <div>Reel Production Zebra</div>:this.state.activeItem==="swp"?
         <div>Shift Wise Production</div>:null}
           <SemanticToastContainer position="bottom-right" />
      </div>
    );
  }
}

export default Admin;
