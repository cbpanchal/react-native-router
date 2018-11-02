import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FBLogin } from 'react-native-facebook-login';


export default class FBLoginView extends Component {
  render() {
    return (
      <View>
        <FBLogin />
      </View>
    )
  }
}