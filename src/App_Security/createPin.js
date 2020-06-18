import Icon from "react-native-vector-icons/Ionicons"
import React, { Component,useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, View ,StyleSheet,Image} from "react-native"
import PinView from "react-native-pin-view"
import icon from "../assets/Icon"


export default class createPin extends Component {
  pinView = React.createRef();
  pinView = null
  constructor(props) {
    super(props);
    this.pinView = null
    this.state = {
      visible: false,
      confirmVisible:false
    };
  
  }

 componentDidMount() {
  }

  setEnteredPin = (value) =>{
    console.log(value);
    if (value.length > 0) {
      this.setShowRemoveButton(true)
    } else {
      this.setShowRemoveButton(false)
    }

    if (value.length === 6){
      this.setState({
        confirmVisible:true
      })
    } 
  }

  setShowRemoveButton(val) {
    this.setState({
      visible:val
    })
  }

  onButtonPress = (key) => {

    console.log("keys",key);

    if (key === "custom_left") {
     this.current.clear()
    }
    if (key === "custom_right") {

      //send to confirm pin page with props value "pin value"

    }
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
      onValueChange={value => this.setEnteredPin(value)}
      onButtonPress={key => {
        this.onButtonPress(key)
      }}
      customLeftButton={this.state.visible ?  <Text
        style={{
          paddingTop: 24,
          paddingBottom: 48,
          color: "#000",
          fontSize: 20,
        }}>
        Del
      </Text> : undefined}
      
      customRightButton={this.state.confirmVisible ? <Text
        style={{
          paddingTop: 24,
          paddingBottom: 48,
          color: "#000",
          fontSize: 20,
        }}>
        Done
      </Text> : undefined}
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