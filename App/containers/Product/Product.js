import React, { Component } from 'react';
import _ from 'lodash';
import { 
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  AsyncStorage,
  ToastAndroid ,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { 
  Container, 
  Content,
  Text
} from 'native-base';
import ImageZoom from 'react-native-image-pan-zoom';
import { setProducts, fetchProducts, addItemToCart } from '../../redux/actions/productAction';

import HeaderContainer from '../../components/Header';
import AddToBag from '../../containers/Bag/AddToBag';

import productData from '../Data/productData';

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

class Product extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    const productName = this.props.location.state.name || '';
    this.state = {
      product: productData.filter(data => data.name === productName)[0],
      item: '',
      badgeCount: 0
    }
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  componentDidMount = () => {
    const { fetchProducts, products } = this.props;
    fetchProducts();
  }

  handleIsLoginOrNot = () => {
    Alert.alert(
      'Login',
      `Please login for add item to the cart`,
      [
        {text: 'Cancel', onPress: () => { return false; }, style: 'cancel'},
        {text: 'LOGIN', onPress: () => this.props.history.push('/login')},
      ],
    )    
  }

  handleItem = (product) =>  {
    const { addItemToCart } = this.props;
    console.log("handleItem parent called>>>");
    // this.addItemToCart(product);
    addItemToCart(product, this.props, false);
  }

  addItemToCart = async (product) => {
    console.log("addItemToCart called>>>>");
    //const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
    const { products, setProducts, isLoggedIn } = this.props;
    if(!isLoggedIn) {
      this.handleIsLoginOrNot();
      return
    }
    const existingProduct = _.findIndex(products, ['name', product.name]);
    console.log({existingProduct});
    if(existingProduct !== -1) {
      const productIdx = products.map(value => value.name).indexOf(product.name);
      console.log("productIdx........", productIdx);
      products[productIdx].quantity++;
      console.log("product........", products);
      ToastAndroid.show(`Added ${products[productIdx].quantity} ${product.name} to the Cart!`, ToastAndroid.SHORT);
      setProducts(products);
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
    setProducts(products);
    await AsyncStorage.setItem('products', JSON.stringify(products))
    .then(res => {
      console.log("Successfully added item to cart..")
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
    this.props.history.push('/product');
  }

  render() {
    const { product } = this.state;
    console.log("Product View", product)
    return (
      <View style={{width: "100%", height: "100%"}}>
        <HeaderContainer title="Product" isProduct {...this.props} />
        <Container style={{backgroundColor: "transparent"}}>
          <Content>
            <View style={styles.mainContainer}>
              <ScrollView 
                style={{width: "100%", height: "100%"}}
                contentContainerStyle={{flex:1}}
              >
                <View style={styles.imageContainer}>
                  <ImageZoom 
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height / 1.5}
                    imageHeight={deviceHeight / 1.5}
                    imageWidth={deviceWidth}
                  >
                    <Image style={styles.image} source={{uri: `${product.uri}`}} />
                  </ImageZoom>
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

const mapStateToProps = state => ({
  products: state.products.products,
  isLoggedIn: state.login.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  setProducts: (products) => dispatch(setProducts(products)),
  fetchProducts: () => dispatch(fetchProducts()),
  addItemToCart: (product, props, flag) => dispatch(addItemToCart(product, props, flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product)