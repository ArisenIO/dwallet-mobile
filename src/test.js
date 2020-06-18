import Icon from "react-native-vector-icons/Ionicons"
import React, { Component, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import AsyncStorage from '@react-native-community/async-storage';


class createPin extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showRemoveButton:false,
      showCompletedButton:false,
      enteredPin:'',
     };
  }
  enterValue=(value)=>{
    this.setState({enteredPin:value},()=>{
      if (this.state.enteredPin.length > 0) {
        this.setState({showRemoveButton:true})
      } else {
        this.setState({showRemoveButton:false})
      }
      if (this.state.enteredPin.length === 6) {
        var pin_code = {
          "pin_code": this.state.enteredPin
      }
        AsyncStorage.setItem(
          'pin_code', JSON.stringify(pin_code)
      );
      console.log("data in async", pin_code)
      this.setState({showCompletedButton:true})
      } else {
        this.setState({showCompletedButton:false})
      }
      console.log("Ok..", this.state.enteredPin)
    })
  }
    render() {
    return (
      <>
      <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              paddingTop: 24,
              paddingBottom: 48,
              color: "rgba(255,255,255,0.7)",
              fontSize: 48,
            }}>
           dWallet
          </Text>
          <ReactNativePinView
            inputSize={32}
            ref={this}
            pinLength={6}
            buttonSize={60}
            onValueChange={value => {this.enterValue(value)}}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={{
              marginBottom: 24,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            inputViewFilledStyle={{
              backgroundColor: "#FFF",
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            buttonTextStyle={{
              color: "#FFF",
            }}
            onButtonPress={key => {
              if (key === "custom_left") {
                pinView.current.clear()
              }
              if (key === "custom_right") {
                alert("Entered Pin: " + this.state.enteredPin)
              }
            
            }}
            customLeftButton={this.state.showRemoveButton ? 
            <Icon name={"ios-backspace"} size={36} color={"#FFF"} /> : undefined}
            customRightButton={this.state.showCompletedButton ? <Icon name={"ios-unlock"} size={36} color={"#FFF"} /> : undefined}
          />
        </SafeAreaView>
    </>
    );
  }
}

export default createPin;