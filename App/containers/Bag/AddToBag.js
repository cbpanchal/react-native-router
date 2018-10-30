import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class AddToBag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 'product-1'
    }
  }

  handleItem() {
    const { product, onAddItem } = this.props;
    onAddItem(product);
  }

  render() {
    return (
      <TouchableOpacity
        onPress= {this.handleItem.bind(this)}
        style={styles.addToBad}
      >
        <Text style={{color: "#fff", textAlign: "center"}}>Add to bag</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  addToBad : {
    backgroundColor: "#222f3e",
    width: "100%",
    padding: 10
  }
});
