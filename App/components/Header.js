import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { 
  Header, 
  Left,
  Right, 
  Body, 
  Title, 
  Icon 
} from "native-base";
import IconBadge from 'react-native-icon-badge';
import Drawer from 'react-native-drawer';
import SideBar from './SideBar';

class HeaderContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state =  {
      isDrawerToggle: false,
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

  goToCart() {
    const { isLoggedIn } = this.props;
    console.log('isLoggedIn in header', isLoggedIn)
    if(isLoggedIn) {
      this.props.history.push('/cart');
    } else {
      this.props.history.push('/login');
    }
  }

  goToLogin() {
    this.props.history.push('/login');
  }

  render() {
    console.log("header render.......")
    const { isProduct, products, isCart, isLoggedIn, user } = this.props;
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
          androidStatusBarColor="#4f6d7a"
          style={
            !isProduct ? { backgroundColor: "#222f3e" } : 
            { backgroundColor: "transparent", elevation:0}}
          >
          <Left>
            <TouchableOpacity 
              transparent
            >
              {!isProduct ?
                <Icon type="Feather" name='menu' style={{color: "#fff"}}  onPress={() => this.openDrawer()} /> :
                <Icon
                  transparent 
                  type="MaterialIcons" 
                  name='arrow-back' 
                  style={{color: "#222f3e"}} 
                  onPress={() => this.goToHome()}
                />
              }
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={[styles.title, {color: !isProduct ? "#fff" : "#222f3e"}]}>{this.props.title}</Title>
          </Body>
          <Right>
            <View >
              {isLoggedIn && 
                <Text 
                  style={!isCart ? {color: "#fff", paddingBottom: 18, paddingRight: 10} :
                  {color: "#222f3e", paddingRight: 10, paddingBottom: 5}}
                >
                  {user.profile.first_name}
                </Text>
              }
            </View>
            <TouchableOpacity 
              transparent
              style={isCart ? {} : {bottom: 13, paddingRight: 10}}
            >
              <Icon type="MaterialCommunityIcons" 
                name='login' 
                style={!isCart ? {color: "#fff"} : {color: "#222f3e"}}  
                onPress={() => this.goToLogin()} 
              /> 
            </TouchableOpacity>
            {!isCart && 
              <View style={{marginBottom: 10}}>
                <TouchableOpacity>
                  <IconBadge
                    MainElement={
                      <Icon 
                        type="MaterialIcons" 
                        name='add-shopping-cart' 
                        style={{color: isProduct ? "#222f3e" : "#fff", paddingTop: 20}} 
                        onPress={() => this.goToCart()}
                        />
                    }
                    BadgeElement={
                      <Text style={
                        isLoggedIn ?
                        {
                          color:'#FFFFFF', 
                          textAlign: "center", 
                          bottom: 1,
                        } : {
                          display: "none"
                        }
                      }
                      >
                        { isLoggedIn ? (products ? products.length : 0) : "" } 
                      </Text>
                    }
                    IconBadgeStyle={
                      isLoggedIn ? 
                      {
                        width: 10,
                        height:20,
                        backgroundColor: 'red',
                        left: 15,
                        top: 5
                      } : {
                        height: 0
                      }
                    }
                  />
                </TouchableOpacity>
            </View>
            }
          </Right>
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

const mapStateToProps = state => ({
  user: state.login.user,
  isLoggedIn: state.login.isLoggedIn,
  products: state.products.products
});

export default connect(mapStateToProps, null)(HeaderContainer);
