import React from 'react';
import { StyleSheet, StatusBar, View, Text,Alert, ToastAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';
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
import Setting from './src/Setting/Setting'
import Create_Pin from './src/App_Security/createPin'
import Confirm_Pin from './src/App_Security/confirmPin'
import Mnemonic from './src/Mnemonics/Mnemonics'
import NetInfo from "@react-native-community/netinfo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      connection_Status:''
    }
  }

  componentDidMount() {
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = state => {
    if (state.isConnected) {
      // Alert.alert('online');
      this.setState({connection_Status: 'Online'});
    } else {
      this.setState({connection_Status: 'Offline'},()=>{
        Toast.show('Network Error,Please check your internet connection',Toast.LONG)
      });
    }
  };

  render() {
    return (
      <View style={{ height: '100%', width: '100%' }}>
      <StatusBar backgroundColor="#4383fc">
      </StatusBar>
      <MainNavigator/>
    </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});


