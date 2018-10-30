import React, { Component } from 'react';
import {
  View, 
  AsyncStorage, 
  ScrollView, 
  FlatList, 
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { 
  Container, 
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  Icon
} from 'native-base';

import HeaderContainer from '../../components/Header';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      items: "",
      total: 0
    }
  }

  componentDidMount = async () => {
    console.log("componentDidMount called>>>>>>>>")
    const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
    console.log("Products in cart...", products);
    this.setState({
      products,
      items: products.length,
      total: this.totolAmount(products)
    })
  }
  
  totolAmount = (products) => (
    total = products.reduce((sum, current) => {
      return sum + (Number(current.cost) * Number(current.quantity)) 
    }, 0)
  )

  handleRemoveItem = async (item) => {
    const { products } = this.state;
    const itemIndex = products.indexOf(item);
    products.splice(itemIndex, 1);
    console.log("removed after products", products);
    await AsyncStorage.removeItem('products')
      .then(res => {
        AsyncStorage.setItem('products', JSON.stringify(products))
        .then(res => {
          this.setState({
            products,
            items: products.length,
            total: this.totolAmount(products)
          })
          ToastAndroid.show(`Removed ${item.name} from Cart`, ToastAndroid.SHORT)
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  _keyExtractor = (item, index) => index.toString();

  toggleItems = async (item, operation) => {
    const { products } = this.state;
    const productIdx = products.map(value => value.name).indexOf(item.name);
    if(operation === "minus") {
      if(products[productIdx].quantity === 1) {
        this.handleRemoveItem(item);
        return false;
      }
      products[productIdx].quantity--;
    } else if (operation === "plus") {
      products[productIdx].quantity++;
    }
    console.log("product........", products);
    await AsyncStorage.setItem('products', JSON.stringify(products))
    .then(res => {
      this.setState({
        products,
        total: this.totolAmount(products)
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  _renderItem = ({item}) => (
    <Card>
      <CardItem>
        <View style={styles.mainContainer}>
          <View style={{width: "30%"}}>
            <Image source={{uri: `${item.uri}`}} style={{height: 150, width: null, flex: 1}}/>
          </View>
          <View style={styles.productContainer}>
            <Text name>{item.name}</Text> 
            <Text cost>${item.cost}</Text> 
            <Text note>{item.desc}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                transparent
                onPress={() => this.toggleItems(item, "minus")}
              >
                <Icon 
                  type="Feather" 
                  name='minus-square'
                  style={{color: "red"}}
                />
              </TouchableOpacity>
              <Text style={{top: 3}} note>Quantity : {item.quantity}  </Text>
              <TouchableOpacity 
                transparent
                onPress={() => this.toggleItems(item, "plus")}
              >
                <Icon 
                  type="Feather" 
                  name='plus-square'
                  style={{color: "green"}}
                />
              </TouchableOpacity> 
            </View>
            <Text style={{paddingTop: 10}} cost>Amount : Rs. ${item.quantity * item.cost}</Text> 
          </View>
        </View>
      </CardItem>
      <View style={styles.buttonContainer}>
        <Left style={{flex: 1, borderRightWidth: 2, borderRightColor: "#eee"}}>
          <TouchableOpacity
            transparent 
            style={[styles.cardButton]}
            onPress={() => this.handleRemoveItem(item)}
          >
            <Text style={styles.cardButtonText}>REMOVE</Text>
          </TouchableOpacity>
        </Left>
        <Right style={{flex: 1}}>
          <TouchableOpacity 
            transparent 
            style={styles.cardButton}
          >
            <Text style={styles.cardButtonText}>BUY</Text>
          </TouchableOpacity>
        </Right>
      </View>
    </Card>
  )

  render() {
    console.log(this.state);
    const { products, items, total } = this.state;
    return (
      <View style={{width: "100%", height: "100%"}}>
      <HeaderContainer title="Cart" isProduct isCart {...this.props} badgeCount= {items} />
        <Container style={{backgroundColor: "#e5e5e5"}}>
          <Content>
            <ScrollView>
              <View style={styles.itemsContainer}>
                <Text style={{flex: 1}}>{`ITEMS (${items})`}</Text>
                <Text style={{flex: 1, textAlign: "right"}}>{`Total ($${total})`}</Text>
              </View>
              <FlatList
                style={{ height: '100%', flexDirection: "column", flexWrap: "wrap", alignContent: "space-around"}}
                data={products}
                renderItem={(item) => this._renderItem(item)}
                keyExtractor={this._keyExtractor}
                extraData={products}
                initialNumToRender={15}
              />
            </ScrollView>
          </Content>
        </Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%", 
    flexDirection: "row", 
    justifyContent: "flex-start", 
    alignContent:"space-between"
  },
  productContainer: {
    width: "70%",
    flexDirection: "column",
    alignContent: "flex-start",
    padding: 20,
    paddingTop: 0
  },
  buttonContainer: {
    borderTopColor: "#eee", 
    borderTopWidth: 1, 
    height: 45, 
    width: "100%", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignContent: "space-between"
  },
  cardButton: {
    padding: 5,
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "center",
    justifyContent: "center", 
    alignContent:"center"
  },
  cardButtonText: {
    color: "#222f3e", 
    textAlign: "center"
  },
  quantityContainer: {
    width: "100%", 
    flexDirection: "row",
    justifyContent: "flex-start", 
    alignContent: "space-around",
    paddingTop: 5
  },
  itemsContainer: {
    flex: 1, 
    padding: 5, 
    paddingLeft: 20, 
    flexDirection: "row", 
    justifyContent: "flex-start", 
    alignContent: "space-around"
  }
});