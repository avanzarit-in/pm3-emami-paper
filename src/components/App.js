import React, { Component } from "react";
import { Transition, Image, Menu, Sidebar, Segment, Dropdown, Icon, Popup, Breadcrumb, Accordion, Grid } from 'semantic-ui-react'
import "tabler-react/dist/Tabler.css";
import "./App.css"
import DataGrid from './components/data-grid/DataGrid'
import Dashboard1 from './components/dashboard/Dashboard1'
const trigger = (userName) => (
    <span>
        <Icon name='user' /> Hello, {userName}
    </span>
)

class App extends Component {
state = { activeItem:'prm'}

handleItemClick = (name) =>{
this.setState({activeItem:name})
}
  render() {
    let {activeItem} = this.state;
    return (
      <div>
        <Menu size="large" inverted pointing   >

           <Menu.Item name='Parent Reel Master' active={activeItem === 'prm'} onClick={()=>this.handleItemClick('prm')} />
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
        <DataGrid />
      </div>
    );
  }
}

export default App;
