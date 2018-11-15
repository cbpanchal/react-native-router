import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import stripe from 'tipsi-stripe';

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
      <View>
        <TouchableOpacity
          onPress={this.handleAndroidPayPress}
          style={{width: "100%", paddingTop: 20}}
        >
          <Text>Pay with Android Pay</Text>
        </TouchableOpacity>
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
    backgroundColor: "#222f3e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: 120
  },
})