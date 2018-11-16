import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from "react-native";
import { connect } from 'react-redux';
import { 
  Header, 
  Left,
  Right, 
  Body, 
  Title, 
  Icon, 
} from "native-base";
import IconBadge from 'react-native-icon-badge';

class HeaderContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state =  {
      isDrawerToggle: false,
    }
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer = () => {
    console.log(this.props, "open drawer");
    this.props.openDrawer()
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
      <Header
        transparent={true}
        noShadow
        style={
          isProduct ? {  backgroundColor:'transparent' , zIndex: 9999} : 
          { backgroundColor: "#222f3e", }}
        >
        <StatusBar
          backgroundColor="#364b63"
          barStyle="light-content" 
        />
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
                style={isCart ? styles.cartPage : isProduct ? styles.productPage :
                  {color: "#fff", paddingBottom: 18, paddingRight: 10}
               }
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
              style={isCart ? {color: "#222f3e"} : isProduct ? {color: "#222f3e"} : {color: "#fff"}}  
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
  },
  cartPage : {
    color: "#222f3e", 
    paddingRight: 10, 
    paddingBottom: 5
  },
  productPage: {
    color: "#222f3e", 
    paddingRight: 10, 
    paddingBottom: 17
  }
});

const mapStateToProps = state => ({
  user: state.login.user,
  isLoggedIn: state.login.isLoggedIn,
  products: state.products.products
});

export default connect(mapStateToProps, null)(HeaderContainer);
