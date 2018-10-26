import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class SideBar extends Component {

  constructor(props) {
    super(props);
  }
  
  goToLogin() {
    const { history } = this.props;
    history.push("/login");
  }

  goToHome() {
    const { history } = this.props;
    history.push("/");
  }

  goToAboutUs() {
    const { history } = this.props;
    history.push("/aboutus");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.menu} onPress={() => this.goToHome()}>Home</Text>
        <Text style={styles.menu} onPress={() => this.goToLogin()}>Login</Text>
        <Text style={styles.menu} onPress={() => this.goToAboutUs()}>About us</Text>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10
  },
  menu: {
    fontSize: 20,
    textAlign: "center",
    color: "#757575"
  }
});  