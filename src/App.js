import React, { Component } from "react";
import {  Menu, Dropdown, Icon } from 'semantic-ui-react'
import "./App.css"
import ReelManagement from './components/reel-management/ReelManagement'
import ParentReelManagement from './components/parent-reel-management/ParentReelManagement'


import Admin from './Admin'

import DeliveryMaster from './components/parent-reel-management/DeliveryMaster'
import ProductMaster from './components/parent-reel-management/ProductMaster'
import Date1 from './components/parent-reel-management/Date1'
import createRowData from './createRowData'

import PackageManagement from './components/package-management/PackageManagement'
import { SemanticToastContainer } from 'react-semantic-toasts';

const trigger = (userName) => (
    <span>
        <Icon name='user' /> Hello, {userName}
    </span>
)

class App extends Component {
state = { activeItem:'rp'}

handleItemClick = (name) =>{
this.setState({activeItem:name})
}
  render() {
    let {activeItem} = this.state;
    return (
     
      <div>
         
            <Menu size="large" inverted pointing   >

           
            <Menu.Item name='Parent Reel Master' 
           active={activeItem === 'prm'} 
           onClick={()=>this.handleItemClick('prm')} />
          <Menu.Item
            name='Reel Production'
            active={activeItem === 'rp'}
             onClick={()=>this.handleItemClick('rp')}
          />
          <Menu.Item
            name='Packaging Slip'
            active={activeItem === 'ps'}
             onClick={()=>this.handleItemClick('ps')}
          />
          <Menu.Item
            name='Reports'
            active={activeItem === 'report'}
             onClick={()=>this.handleItemClick('report')}
          />
          <Menu.Item
            name='Admin'
            active={activeItem === 'admin'}
             onClick={()=>this.handleItemClick('admin')}
          />


          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown  trigger={trigger(this.props.username)}  options={
                [
                  {
                    key: 'user',
                    text: (
                      <span>
                        Signed in as <strong>{this.props.username}</strong>
                      </span>
                    ),
                    disabled: true,
                  },
                  { key: 'profile', text: 'Your Profile' },
                  (<Dropdown.Item key='sign-out' onClick={this.signOut}>Sign Out</Dropdown.Item>),
                ]
              } />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      
        {this.state.activeItem==="prm"?
       
        <ParentReelManagement/>:this.state.activeItem==="rp"?
       
        <ReelManagement  />:this.state.activeItem==="ps"?
        <PackageManagement/>:this.state.activeItem==="report"?
        <div>REPORT</div>:this.state.activeItem==="admin"?
        <div><Admin /></div>:null}
           <SemanticToastContainer position="bottom-right" />
      </div>
    );
  }
}

export default App;
