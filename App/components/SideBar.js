import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Link, Redirect } from "react-router-native";
import { 
  Container, 
  Content, 
  List, 
  ListItem, 
  Text, 
  Left, 
  Right, 
  Icon 
} from 'native-base';

const sideBar = [
  {
    page: 'Home',
    icon: {
      type: "MaterialIcons",
      name: "home"
    }
  },
  {
    page: 'Login',
    icon: {
      type: "MaterialCommunityIcons",
      name: "login"
    }
  },
  {
    page: 'Aboutus',
    icon: {
      type: "MaterialIcons",
      name: "description"
    }
  }
];

export default class SideBar extends Component {

  constructor(props) {
    super(props);
  }

  handleScreen(screen) {
    const { closeDrawer } = this.props;
    console.log('handleScreen=======', this.props)
    switch (screen) {
      case 1:
          console.log("home");
          <Link to="/"/>
          closeDrawer();
          break;
      case 2:
          //history.push("/login");
          closeDrawer();
          <Link to="/login"/>
          break;
      case 3:
          closeDrawer();
          <Link to="/aboutus"/>
          //history.push("/aboutus");
          break;
      default:
        break;
    }
  }

  _renderItem = ({item}) => (
    <ScrollView>
        {/* <ListItem onPress={() => {this.handleScreen(item.screen)}}>
          <Left>
            <Text>{item.page}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem> */}
        <Link component={TouchableOpacity} 
         to={{
          pathname: item.page === 'Home' ? '/' : item.page,
          search: "?utm=your+face",
          state: { isRoute: true }
        }}> 
          <View 
            style={styles.sideBarContent}
          >
            <Left style={{flexDirection: "row", flex: 1}}>
              <Text>
                <Icon type={item.icon.type} name={item.icon.name} style={{color: "#222f3e"}}/>
              </Text>
              <Text style={{paddingTop: 4, paddingLeft: 5, color: "#222f3e"}}>
                {item.page}
              </Text>
            </Left>
            <Right>
              <Text>
                <Icon type="MaterialCommunityIcons" name="chevron-right" style={{color: "#222f3e"}}/>
              </Text>
            </Right>
          </View>
        </Link>
    </ScrollView>
  )

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <Container style={{backgroundColor: "#e5e5e5"}}>
          <Content>
            <FlatList
              style={{ height: '100%', flexDirection: "column", flexWrap: "wrap", alignContent: "space-around"}}
              data={sideBar}
              renderItem={(item) => this._renderItem(item)}
              keyExtractor={this._keyExtractor}
              extraData={sideBar}
              initialNumToRender={15}
            />
          </Content>
        </Container>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1  
  },
  sideBarContent: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "lightgrey"
  }
});  