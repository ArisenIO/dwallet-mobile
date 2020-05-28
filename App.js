import React from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import Homepage from './src/Homepage/homepage'
import Recieve from './src/Recieved/recieve'
import Splash from './src/Splash/splash'
import Slider from './src/slider/slider'
import AddAccount from './src/AddAccount/AddAccount'
import CustomButton from './src/Component/custom_Button'
import Send_money from './src/Send/Send_money'
import Pin_Code from './src/App_pincode/Pin_code'
import Createwallet from './src/createwallet/createwallet'
import RegisterScreen from './src/register/RegisterScreen'
import HelloWorld from './src/dummy/test'
export default class App extends React.Component {
  render() {
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <StatusBar backgroundColor="#4383fc">
        </StatusBar>
        <MainNavigator />
      </View >
    )
  }
}


