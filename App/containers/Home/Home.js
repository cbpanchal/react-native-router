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
  ActivityIndicator
} from "react-native";
import { H1 } from "native-base";
import HeaderContainer from '../../components/Header';
import { Container, 
  Content, 
  Button, 
  Footer, 
  List, 
  ListItem, 
  Thumbnail, 
  Left, 
  Body, 
  Right 
} from 'native-base';

import productData from '../Data/productData';
import newProductData from '../Data/newProducts';

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      animating: false,
      products: productData
    }
  }

  nextPage() {
    this.props.history.push('/login');
  }

  handleProductView(product) {
    console.log(product);
    //this.props.history.push('/product');
    this.props.history.push({
      pathname: '/product',
      query: {name: product.name},
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
      }, 2000)
    });
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({item}) => (
      <TouchableOpacity
        key={item.name}
        style={styles.productContainer}
        onPress = {() => this.handleProductView(item)}
      >
        <Image
          style={[styles.productImage, objectFit="cover"]}
          source={{uri: `${item.uri}`}}
        />
        <Text name style={styles.productName}>{item.name}</Text>
        <Text>{item.cost}</Text>
        <Text style={styles.productDesc}>{item.desc}</Text>
      </TouchableOpacity>
  )
  
  render() {
    console.log(this.state)
    const { products, refreshing, animating } = this.state;
    return(
      <View style={styles.container}>
        <HeaderContainer title="Home" {...this.props}/>
        <ActivityIndicator 
          size="large" 
          color="red" 
          style={styles.activityIndicator} 
          animating={this.state.animating}
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
          scrollEventThrottle={2000}
        >
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
   }
});
export default Home;