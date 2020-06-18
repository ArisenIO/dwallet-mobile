import Icon from 'react-native-vector-icons/dist/FontAwesome';
import React, { Component, useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, View, Image } from "react-native"
import Icons from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PinView from "react-native-pin-view"


export default class createPin extends Component {
  pinView = React.createRef();
  pinView = null
  constructor(props) {
    super(props);
    this.pinView = null
    this.state = {
      pincode:"",
      firstpin: '',
      secondpin: '',
      codelist: '',
      visible: false,
      walletRestore: '',
      pinView: null,
      visible:false
    };

  }

  componentDidMount() {
  }

  valueentered = (value) => {
    console.log('=====================123SS', value);
  }

  setEnteredPin = (value) =>{
    console.log(value);
    if (value.length > 0) {
      this.setShowRemoveButton(true)
    } else {
      this.setShowRemoveButton(false)
    }
  }

  setShowRemoveButton() {
    this.setState({
      visible:true
    })
  }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: 'white', }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: wp('100%'), height: hp('5%') }}>
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
          onValueChange={value => this.setEnteredPin(value)}
          buttonAreaStyle={{
            marginTop: 20,
          }}
          inputAreaStyle={{
            marginBottom: 20,
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
          customLeftButtonViewStyle	={{
            borderWidth: 1,
            borderRadius:1,
              borderColor: "#000",
          }}
          customLeftButton={this.state.visible ? <Icon name="cross" size={36} color={"#000"} /> : undefined}
        ></PinView>
      </View>

    )
  }
}
