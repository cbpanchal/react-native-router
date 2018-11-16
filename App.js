/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './App/index';
import configureStore from './App/redux/store/store';
import SplashScreen from 'react-native-splash-screen'

const store  = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
