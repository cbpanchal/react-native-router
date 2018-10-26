import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { 
  Container, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Button, 
  Icon, 
  Left, 
  Body, 
  Right,
  H1 
} from 'native-base';

import HeaderContainer from '../../components/Header';
import productData from '../Data/productData';

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default class Product extends Component {

  constructor(props) {
    super(props);
    const productName = this.props.history.entries[1].query.name;
    this.state = {
      product: productData.filter(data => data.name === productName)[0]
    }
  }

  render() {
    const { product } = this.state
    console.log("Product View", product)
    return (
      <View style={{width: "100%", height: "100%"}}>
        <HeaderContainer title="Product" isProduct {...this.props}/>
        <Container style={{backgroundColor: "transparent"}}>
          <Content>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: `${product.uri}`}} />
            </View>
            <View style={styles.productContainer}>
              <Text name>{product.name}</Text>
              <Text>{product.cost}</Text>
              <Text note>{product.desc}</Text>
            </View>
            {/* <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: `${product.uri}`}} />
                  <Body>
                    <H1>{product.name}</H1>
                    <Text note>{product.desc}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: `${product.uri}`}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
            </Card> */}
          </Content>
        </Container>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
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
    alignItems: "stretch"
  }
});