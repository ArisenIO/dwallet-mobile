import Icon from "react-native-vector-icons/Ionicons"
import React, { Component,useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, View } from "react-native"
import PinView from "react-native-pin-view"


export default class createPin extends Component {
  pinView = React.createRef();
  pinView = null
  constructor(props) {
    super(props);
    this.pinView = null
    this.state = {
      firstpin: '',
      secondpin: '',
      codelist: '',
      visible: false,
      walletRestore: '',
      pinView:null
    };
  
  }

 componentDidMount() {
  }

  valueentered = (value) =>{
    console.log(value);
  }

  render (){
    return(

      <View>

      <Text
            style={{
              paddingTop: 24,
              paddingBottom: 48,
              color: "#000",
              fontSize: 48,
            }}>
            Create Pin
          </Text>

      <PinView 
      ref={this}
      pinLength={6} 
      buttonAreaStyle={{
        marginTop: 24,
      }}
      inputAreaStyle={{
        marginBottom: 24,
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
      ></PinView>
    </View>

    )
 }
}
