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
            <TouchableOpacity onPress={() => {
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
            style={styles.paymentButton}
            activeOpacity= {0.2}
            >
              <Text style={{color: "#fff", fontSize: 20, textAlign: "center"}}> Razor Pay </Text>
            </TouchableOpacity>
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
  },
  paymentButton: {
    backgroundColor: "#222f3e",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: 120
  },
  totalAmountContainer: {
    fontSize: 20, 
    color: "#222f3e", 
    paddingBottom: 25
  }
});