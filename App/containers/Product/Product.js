import React, { Component } from 'react';
import _ from 'lodash';
import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  AsyncStorage,
  ToastAndroid 
} from 'react-native';
import { 
  Container, 
  Content
} from 'native-base';

import HeaderContainer from '../../components/Header';
import AddToBag from '../../containers/Bag/AddToBag';

import productData from '../Data/productData';

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
let quantity = 1;

export default class Product extends Component {
  constructor(props) {
    super(props);
    const productName = this.props.history.entries[1].query.name;
    this.state = {
      product: productData.filter(data => data.name === productName)[0],
      item: '',
      badgeCount: 0
    }
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  componentDidMount = async () => {
    const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
    this.setState({
      badgeCount: products.length
    })
  }

  handleItem = (product) =>  {
    console.log("handleItem parent called>>>");
    this.addItemToCart(product);
  }

  addItemToCart = async (product) => {
    console.log("addItemToCart called>>>>");
    const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
    const existingProduct = _.findIndex(products, ['name', product.name]);
    console.log({existingProduct});
    if(existingProduct !== -1) {
      const productIdx = products.map(value => value.name).indexOf(product.name);
      console.log("productIdx........", productIdx);
      products[productIdx].quantity++;
      console.log("product........", products);
      ToastAndroid.show(`Added ${products[productIdx].quantity} ${product.name} to the Cart!`, ToastAndroid.SHORT);
      await AsyncStorage.setItem('products', JSON.stringify(products))
      .then(res => {
        console.log("Successfully merged product....")
      })
      .catch(error => {
        console.log(error);
      })
      return false;
    } else {
        ToastAndroid.show(`Added ${product.name} to the Cart!`, ToastAndroid.SHORT);
    }
    products.push(product);
    await AsyncStorage.setItem('products', JSON.stringify(products))
    .then(res => {
      console.log("Successfully added item to cart..")
      console.log(res);
      this.setState({
        badgeCount: products.length
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { product, badgeCount } = this.state;
    console.log("Product View", product)
    return (
      <View style={{width: "100%", height: "100%"}}>
        <HeaderContainer title="Product" isProduct {...this.props} badgeCount={badgeCount} />
        <Container style={{backgroundColor: "transparent"}}>
          <Content>
            <View style={styles.mainContainer}>
              <ScrollView 
                style={{width: "100%", height: "100%"}}
                contentContainerStyle={{flex:1}}
              >
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri: `${product.uri}`}} />
                </View>
                <View style={styles.productContainer}>
                  <Text name>{product.name}</Text>  
                  <Text cost>Rs. {product.cost}</Text>
                  <Text note>{product.desc}</Text>
                  <Text note>{product.desc}</Text>
                  <Text note>{product.desc}</Text>
                  <Text note>{product.desc}</Text>
                  <Text note>{product.desc}</Text>
                  <Text note>{product.desc}</Text>
                  <Text note>{product.desc}</Text>
                  <Text note>{product.desc}</Text>
                </View>
              </ScrollView>
            </View>
          </Content>
          <View style={{position: "absolute", bottom: 0, left: 0, width: "100%"}}>
            <AddToBag onAddItem={this.handleItem} product={this.state.product}/>
          </View>
        </Container>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  mainContainer: {
    flexDirection: "column", 
    justifyContent: "space-between", 
    alignItems: "flex-start"
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    width: "100%",
    height: deviceHeight / 1.5,
  },
  productContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingBottom: 45
  }
});