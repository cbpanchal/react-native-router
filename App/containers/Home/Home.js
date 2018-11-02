import React, {Component} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  RefreshControl, 
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import HeaderContainer from '../../components/Header';
import { Footer } from 'native-base';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import productData from '../Data/productData';
import newProductData from '../Data/newProducts';
import sliderProducts from '../Data/sliderProducts';

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

class Home extends Component {

  constructor(props) {
    super(props);
    const isLocationState = this.props.location.state;
    const user = isLocationState ? this.props.location.state.user : {};
    const isLoggedIn = isLocationState ? this.props.location.state.isLoggedIn : false;
    console.log("Props from FB>>>>>>", this.props)
    this.state = {
      refreshing: false,
      animating: false,
      products: productData,
      badgeCount: 0,
      data: sliderProducts,
      currentUser: user,
      isLoggedIn: isLoggedIn
    }
  }

  componentDidMount = async () => {
    const products = JSON.parse(await AsyncStorage.getItem('products')) || [];
    this.setState({
      badgeCount: products.length
    })
  }

  nextPage() {
    this.props.history.push('/login');
  }

  handleProductView(product) {
    console.log(product);
    //this.props.history.push('/product');
    this.props.history.push({
      pathname: '/product',
      state: {name: product.name}
    })
  }

  _onRefresh = () => {
    console.log('hiiii')
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 2000)
    console.log("refresh control called.......")
  }

  _onScroll() {
    this.setState({animating: true},() => {
      setTimeout(() => {
        this.setState({products: this.state.products.concat(newProductData), animating: false})
      }, 1000)
    });
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => (
    <TouchableOpacity
      key={item.name}
      style={styles.productContainer}
      onPress = {() => this.handleProductView(item)}
      activeOpacity = {0.7}
    >
      <Image
        style={[styles.productImage, objectFit="cover"]}
        source={{uri: `${item.uri}`}}
      />
      <Text name style={styles.productName}>{item.name}</Text>
      <Text>{item.cost}</Text>
      <Text style={styles.productDesc}>{item.desc}</Text>
      <Text>{this.state.item}</Text>
    </TouchableOpacity>
  )
    
  _renderSlider ({item, index}, parallaxProps) {
    const { thumbnail, title } = item;
    return (
      <View style={{flex: 1, justifyContent: "center", margin: 10}}>
        <ParallaxImage
          source={{uri: thumbnail}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
        <Text 
          style={{textAlign: "center", paddingTop: 5, color: "#222f3e"}} 
          numberOfLines={2}>
          { title }
        </Text>
      </View>
    );
  }

  render() {
    console.log(this.state)
    const { products, refreshing, animating, badgeCount, currentUser, isLoggedIn } = this.state;
    return(
      <View style={styles.container}>
        <HeaderContainer 
          title="Home" {...this.props} 
          badgeCount={badgeCount} 
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
        <ActivityIndicator 
          size="large" 
          color="#222f3e" 
          style={[styles.activityIndicator, { opacity: animating ? 1.0 : 0.0 }]} 
          animating={true}
        />
        <ScrollView
          contentContainerStyle={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center"
          }}
          style={{height: '100%', width: '100%'}}
          showsVerticalScrollIndicator={false}
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this._onScroll();
            }
          }}
          scrollEventThrottle={400}
        >
          <Carousel
            data={this.state.data}
            renderItem={this._renderSlider}
            hasParallaxImages={true}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
            itemHeight={500}
            autoplay= {true}
            autoplayInterval ={5000}
            loop={true}
          />
          <FlatList
            style={{ height: '100%', flexDirection: "column", flexWrap: "wrap", alignContent: "space-around"}}
            data={products}
            initialNumToRender={15}
            renderItem={(item) => this._renderItem(item)}
            keyExtractor={this._keyExtractor}
            refreshControl={
              <RefreshControl
                  colors={["#9Bd35A", "#689F38"]}
                  refreshing={refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  title="loading.."
              />
            }
            numColumns={2}
            refreshing={refreshing}
            extraData={products}
          />
        </ScrollView>
        <Footer style={styles.footer}>
          <Text style={{color: "#fff"}}>Footer</Text>
        </Footer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    height: '100%',
    width: '100%'
  },
  productContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: deviceWidth/2,
    padding: 10
  },
  productImage: {
    width: '100%',
    height: 200,
    padding: 10,
  },
  productName: {
    marginTop: 10
  },
  productDesc: {
    marginTop: 5
  },
  footer: {
    backgroundColor: "#222f3e", 
    justifyContent:"center", 
    alignItems:"center"
  },
  activityIndicator: {
    position: "absolute", 
    bottom: 100,
    right: 0,
    left: 0,
    zIndex: 10000
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "stretch"
  }
});
export default Home;