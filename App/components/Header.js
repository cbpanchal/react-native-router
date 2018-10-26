import React, { Component } from 'react';
import { 
  Header, 
  Left, 
  Body, 
  Title, 
  Button, 
  Icon } from "native-base";
import { StyleSheet, View } from "react-native";
import Drawer from 'react-native-drawer';
import SideBar from './SideBar';

class HeaderContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state =  {
      isDrawerToggle: false
    }
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  closeDrawer = () => {
    this._drawer.close()
  };
  
  openDrawer = () => {
    console.log("open drawer");
    this._drawer.open()
  };

  goToHome() {
    this.props.history.entries = []
    this.props.history.push('/');
  }

  render() {
    const { isProduct } = this.props;
    return (
        // {/* <Drawer
        //   ref={(ref) => this._drawer = ref}
        //   type="displace"
        //   content={<SideBar {...this.props} closeDrawer= {this.closeDrawer} />}
        //   openDrawerOffset={100}
        //   styles={drawerStyles}
        //   tapToClose
        // >
         
        // </Drawer> */}
         <Header
            transparent
            noShadow
            androidStatusBarColor="#4f6d7a"
            style={
              !isProduct ? { backgroundColor: "#222f3e" } : 
              { backgroundColor: "transparent", elevation:0}}
            >
            <Left>
              <Button 
                transparent
                onPress={() => this.openDrawer()}
              >
                {!isProduct ?
                  <Icon type="Feather" name='menu' /> :
                  <Icon
                    transparent 
                    type="MaterialIcons" 
                    name='arrow-back' 
                    style={{color: "#222f3e"}} 
                    onPress={() => this.goToHome()}
                  />
                }
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>{!isProduct ? this.props.title: ""}</Title>
            </Body>
          </Header>
    );
  }
}
const styles =  StyleSheet.create({
  title: {
    fontSize: 20
  }
});

const drawerStyles = {
  drawer: { 
    shadowColor: '#000000', 
    shadowOpacity: 0.8, 
    shadowRadius: 3
  }
};

export default HeaderContainer;
