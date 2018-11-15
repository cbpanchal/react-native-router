import React, {Component} from 'react';
import { View, Text } from "react-native";
import { Button } from "native-base";
import HeaderContainer from '../../components/Header';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.location.state) {
      nextProps.closeDrawer()
    }
    return nextProps;
  }
  
  home() {
    this.props.history.push("/");
  }
  
  render() {
    return(
      <View>
         <HeaderContainer title="Aboutus" {...this.props}/>
         <View style={{alignItems: 'center'}}>
          <Text>Welcome to Aboutus</Text>
         </View>
      </View>
    )
  }
}

export default AboutUs;