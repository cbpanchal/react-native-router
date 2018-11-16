import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import stripe from 'tipsi-stripe';
import { Button } from 'native-base';

export default class AndroidPayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allowed: false,
      token: null,
    }
  }

  UNSAFE_componentWillMount() {
    //const allowed = await stripe.deviceSupportsNativePay()
    this.setState({ allowed: true })
    console.log({stripe})
  }

  handleAndroidPayPress = async () => {
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'zip',
      country: 'US',
    };
    await stripe.paymentRequestWithCardForm(options)
    .then(response => {
      console.log('response======', response)
      this.setState({
        token: response.tokenId
      });
      this.handleCharge(response.tokenId);
    })
    .catch(error => {
      console.log('error===', error);
    });
    //this.handleCharge('tok_mastercard');
  }

  handleCharge = (token) => {
    const { totalAmount } = this.props
    fetch('http://192.168.0.18:3000/payment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({stripeToken: token, amount: totalAmount})
    })
    .then(resp => resp.json())
      .then(function(response) {
        console.log({response})
      }.bind(this))
      .catch(err => console.error(err));
    // axios.post('http://192.168.0.18:3000/payment', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  
  render() {
    const { loading, allowed, token } = this.state
    return (
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <Button
          onPress={this.handleAndroidPayPress}
          style={styles.paymentButton}
          rounded
        >
          <Text style={{fontSize: 20, color: "#fff"}}>Stripe Pay</Text>
        </Button>
        <View
          style={styles.token}
        >
          {token &&
            <Text style={styles.instruction}>
              Token: {token}
            </Text>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  paymentButton: {
    width: "100%", 
    marginTop: 20, 
    maxWidth: 180, 
    backgroundColor: "#222f3e", 
    padding: 20
  },
})