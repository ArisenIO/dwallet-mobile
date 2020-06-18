import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component, useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, View, StyleSheet, Image } from "react-native"
import PinView from "react-native-pin-view"
import Icons from "../assets/Icon"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';

import AsyncStorage from '@react-native-community/async-storage';



export default class createPin extends Component {
  pinView = React.createRef();
  pinView = null
  constructor(props) {
    super(props);
    this.pinView = null
    this.state = {
      visible: false,
      confirmVisible: false,
      pin: ""
    };

  }

  componentDidMount() {
  }

  valueentered = (value) => {
    console.log('=====================123SS', value);
  }

  setEnteredPin = (value) => {
   var pincode =value
    console.log('set entered pin value=======================', pincode);
    this.setState({ pin: pincode })
    // AsyncStorage.setItem('Pin', pincode)

    if (value.length > 0) {
      this.setShowRemoveButton(true)
      // Actions.replace('confirmPin')
    } else {
      this.setShowRemoveButton(false)
    }

    if (value.length === 6) {
      this.setState({
        confirmVisible: true
      })
    }
  }

  setShowRemoveButton(val) {
    this.setState({
      visible: val
    })
  }

  onButtonPress = (key) => {
    console.log("keys onbutton press 1", key);

    if (key === "custom_left") {
      this.current.clear()
    }
    if (key === "custom_right") {
      const createpin = JSON.stringify(this.state.pin)
      console.log('key onbutton press rightbutton 1',createpin)
      AsyncStorage.setItem('pin',createPin)
      console.log('key onbutton press rightbutton 1',createpin)

    }
  }

  setShowRemoveButton() {
    this.setState({
      visible: true
    })
  }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: 'white', }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30, width: wp('100%'), height: hp('5%') }}>
          <Text style={{ fontSize: 40, fontWeight: '700', color: '#379aff' }}>dWallet</Text>
        </View>
        <View style={{
          width: wp('100%'), height: hp('20%'), justifyContent: 'center', alignItems: 'center',
        }}>
          <Image
            source={Icons.App_logo1}
            style={{ width: wp('30%'), height: hp('15%') }}
          />
        </View>
        <View style={{ marginTop: 1, width: wp("100%"), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#379aff', fontSize: 20, fontWeight: '700' }}>
            Enter your security pin code
         </Text>
        </View>

        <PinView
          ref={this}
          pinLength={6}
          buttonAreaStyle={{
            marginTop: 25,
          }}
          onValueChange={value => this.setEnteredPin(value)}
          onButtonPress={key => {
            this.onButtonPress(key)
          }}
          inputAreaStyle={{
            marginBottom: 25,
          }}
          inputViewEmptyStyle={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#000",
          }}
          inputViewFilledStyle={{
            backgroundColor: "#000",
          }}
          buttonViewStyle={{
            borderWidth: 1,
            borderColor: "#000",
          }}
          buttonTextStyle={{
            color: "#000",
          }}

          customLeftButtonViewStyle={{
            borderWidth: 1,
            borderRadius: 1,
            borderColor: "#000",
          }}
          customRightButtonViewStyle={{
            borderWidth: 1,
            borderRadius: 1,
            borderColor: "#000",
          }}
          customLeftButton={this.state.visible ? <Icon name="times" size={30} color="#000" /> : undefined}
          customRightButton={this.state.confirmVisible ? <Icon name="check" size={30} color="#000" /> : undefined}
        ></PinView>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#000",
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});