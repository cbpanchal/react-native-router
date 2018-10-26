import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Drawer } from 'native-base';
import SideBar from './SideBar';

export default class DrawerContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
   
    return (
      <View>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.navigator} />}
          onClose={this.closeDrawer} >
        </Drawer>
      </View>
    )
  }
}