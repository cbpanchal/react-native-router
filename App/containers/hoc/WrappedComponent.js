import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setProducts } from '../../redux/actions/productAction';

export default function isAuthenticated(WrappedComponent) {
  class authentication extends Component {
    componentWillMount() {
    
    }

    componentWillReceiveProps(nextProps) {
      const { setProducts } = this.props;
      console.log("componentWillReceiveProps HOC...", nextProps)
      //setProducts()
    }

    render() {
      return <WrappedComponent />;
    }
  }

  const mapStateToProps = state => ({
    products: state.products.products
  });

  const mapDispatchToProps = dispatch => {
    return {
      setProducts: () => {
        dispatch(setProducts())
      }
    }
  }
  
  return connect(
    null,
    mapDispatchToProps
  )(authentication);
}

