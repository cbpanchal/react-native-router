import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, 
  AsyncStorage, 
  ScrollView, 
  FlatList, 
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator
} from 'react-native';
import { 
  Container, 
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  Icon,
  Footer
} from 'native-base';

import HeaderContainer from '../../components/Header';
import { setProducts, fetchProducts, setTotalAmount } from '../../redux/actions/productAction';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isProductLoaded: false,
      items: "",
      total: 0
    }
  }

  componentDidMount = async () => {
    console.log("componentDidMount called>>>>>>>>")
    //const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
    const { products, setTotalAmount } = this.props;
    console.log("Products in cart...", products);
    this.setState({
      products,
      isProductLoaded: true,
      items: products.length,
      total: this.totolAmount(products)
    })
    setTotalAmount(this.totolAmount(products));
  }
  
  totolAmount = (products) => (
    total = products.reduce((sum, current) => {
      return sum + (Number(current.cost) * Number(current.quantity)) 
    }, 0)
  )

  handleConfirm(item) {
    Alert.alert(
      'Remove Item',
      `Are you sure want to remove ${item.name} ?`,
      [
        {text: 'Cancel', onPress: () => { return false; }, style: 'cancel'},
        {text: 'OK', onPress: () => this.handleRemoveItem(item)},
      ],
    )    
  }

  handleRemoveItem = async (item) => {
    const { products } = this.state;
    const { setTotalAmount } = this.props;
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
          setTotalAmount(this.state.total)
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
    const { setTotalAmount } = this.props;
    const productIdx = products.map(value => value.name).indexOf(item.name);
    if(operation === "minus") {
      if(products[productIdx].quantity === 1) {
        this.handleConfirm(item);
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
      setTotalAmount(this.state.total)
    })
    .catch(error => {
      console.log(error);
    })
  }

  goBackToProduct(item) {
    console.log(this.props.history);
    this.props.history.push({
      pathname: '/product',
      state: {name: item.name}
    })
  }

  _renderItem = ({item}) => (
    <Card>
      <CardItem>
        <View style={styles.mainContainer}>
          <TouchableOpacity 
            onPress={() => this.goBackToProduct(item)}
            activeOpacity= {0.7}
            style={{width: "30%"}}
          >
            <Image source={{uri: `${item.uri}`}} style={{height: 150, width: null, flex: 1}}/>
          </TouchableOpacity>
          <View style={styles.productContainer}>
            <TouchableOpacity 
              onPress={() => this.goBackToProduct(item)}
              activeOpacity= {0.7}
            >
              <Text name>{item.name}</Text>
            </TouchableOpacity>
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
            onPress={() => this.handleConfirm(item)}
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
    const { products, items, total, isProductLoaded } = this.state;
    return (
      <View style={{width: "100%", height: "100%"}}>
      <HeaderContainer title="Cart" isProduct isCart {...this.props} badgeCount= {items} />
        <Container style={{backgroundColor: "#e5e5e5"}}>
          <Content>
            <ScrollView>
              <View style={styles.itemsContainer}>
                <Text style={{flex: 1}}>{`ITEMS (${items})`}</Text>
                <Text style={{flex: 1, textAlign: "right"}}>{`TOTAL ($${total})`}</Text>
              </View>
              {!isProductLoaded ? (
                <View style={{ flex: 1, justifyContent: 'center'}}>
                  <ActivityIndicator 
                    size="large" 
                    color="#222f3e" 
                    animating
                  />
                </View>
              ):(
                <FlatList
                  style={{ height: '100%', flexDirection: "column", flexWrap: "wrap", alignContent: "space-around"}}
                  data={products}
                  renderItem={(item) => this._renderItem(item)}
                  keyExtractor={this._keyExtractor}
                  extraData={products}
                  initialNumToRender={15}
                />
              )}
            </ScrollView>
          </Content>
        </Container>
        <View style={{position: "absolute", bottom: 0, width: "100%"}}>
          <TouchableOpacity 
            onPress={() => this.props.history.push('/checkout')}
            style={styles.checkoutButton}
            activeOpacity={0.5}
          >
            <Text style={{color: "#fff", textAlign: "center"}}>CHECK OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  isLoggedIn: state.login.isLoggedIn,
  products: state.products.products,
});

const mapDispatchToProps = dispatch => ({
  setProducts: (products) => dispatch(setProducts(products)),
  setTotalAmount: (amount) => dispatch(setTotalAmount(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

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
  },
  checkoutButton: {
    backgroundColor: "#222f3e",
    width: "100%",
    padding: 10
  }
});