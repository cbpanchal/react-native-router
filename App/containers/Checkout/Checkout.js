import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import stripe from 'tipsi-stripe'
import AndroidPayScreen from '../../containers/Stripe/AndroidPayScreen';

import { 
  Container,
  Button,
} from 'native-base';

import HeaderContainer from '../../components/Header';

stripe.setOptions({
  publishableKey: 'pk_test_0mJoldPImPQsrCpx2qtV8qFv'
  // androidPayMode: 'test', // Android only
})

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { totalAmount } = this.props;
    return (
      <View style={{width: "100%", height: "100%"}}>
        <HeaderContainer title="Check out" {...this.props} />
        <Container>
          <View style={styles.paymentButtonContainer}>
            <Text style={styles.totalAmountContainer}>
              Total Payable Amount : <Text style={{fontWeight: "bold"}}>${totalAmount}</Text>
            </Text>
            <View style={{ justifyContent: "center", alignItems: "center"}}>
              <Button onPress={() => {
                let options = {
                  description: 'Credits towards consultation',
                  image: 'https://i.imgur.com/3g7nmJC.png',
                  currency: 'INR',
                  key: 'rzp_test_5P98JVK1X98EC8',
                  amount: `${totalAmount}`,
                  name: 'Test mode',
                  prefill: {
                    email: 'void@razorpay.com',
                    contact: '9191919191',
                    name: 'Razorpay Software'
                  },
                  theme: {color: '#F37254'}
                }
                RazorpayCheckout.open(options).then((data) => {
                  // handle success
                  console.log("data", data);
                  alert(`Success: ${data.razorpay_payment_id}`);
                  this.props.history.push('/');
                }).catch((error) => {
                  // handle failure
                  alert(`Error: ${error.code} | ${error.description}`);
                });
              }}
              rounded
              info
              style={styles.paymentButton}
              >
                <Text style={{color: "#222f3e", fontSize: 20, textAlign: "center", padding: 15}}> Razor Pay </Text>
              </Button>
            </View>
            <AndroidPayScreen totalAmount={totalAmount}/>
          </View>
        </Container>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  totalAmount: state.products.totalAmount,
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

const styles = StyleSheet.create({
  paymentButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
  },
  paymentButton: {
    width: "100%",
    maxWidth: 130,
  },
  totalAmountContainer: {
    fontSize: 20, 
    color: "#222f3e", 
    paddingBottom: 25
  }
});