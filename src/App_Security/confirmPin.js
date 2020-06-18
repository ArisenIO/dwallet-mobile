import React, { Component } from 'react';
import {
  Animated, Image, Text, View,
  KeyboardAvoidingView, ScrollView, StyleSheet, ActivityIndicator, BackHandler, Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import CodeFiled from 'react-native-confirmation-code-field';
import { Dimensions } from 'react-native'
var width_screen = Dimensions.get('screen').width;
var height_screen = Dimensions.get('screen').height;
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';



const codeLength = 4;
const source = {
  uri:
    'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};


export default class confirmPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstpin: '',
      secondpin: '',
      codelist: '',
      visible: false,
      walletRestore: ''
    };

    const value = this.props.firstpin;
    this.state.firstpin = value;
    console.disableYellowBox = true;
    this.BackButton = this.BackButton.bind(this);
  }

  async componentDidMount() {
    wordpin = await AsyncStorage.getItem("forgotMnemonicPin");
    console.log("wordpin---", wordpin);
    var restorewholewallet = await AsyncStorage.getItem("created");
    console.log("restore_wholewallet", restorewholewallet);
    this.setState({ walletRestore: restorewholewallet })
    console.log("this.state.wallet restoring", this.state.walletRestore);
    BackHandler.addEventListener('hardwareBackPress', this.BackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.BackButton);
  }

  BackButton = () => {
    Actions.replace('createPin');
  }

  _animationsColor = [...new Array(codeLength)].map(
    () => new Animated.Value(0),
  );
  _animationsScale = [...new Array(codeLength)].map(
    () => new Animated.Value(1),
  );

  onFinishCheckingCode = code => {
    this.state.secondpin = code;
  };

  // storeData = async (key, value) => {
  //   try {
  //     return await AsyncStorage.setItem(key, value)
  //   } catch (e) {
  //     return e;
  //   }
  // }

  checkPin = async () => {
    var forgot = await AsyncStorage.getItem("fromForgotPin");
    var fromForget = await AsyncStorage.getItem("fromForget");

    if (this.state.firstpin == this.state.secondpin && this.state.walletRestore == 0) {
      this.setState({
        visible: true
      });
      await AsyncStorage.setItem("pin", this.state.firstpin);
      Actions.replace("HomeScreen");
    }
    else if (this.state.firstpin == this.state.secondpin && forgot == 1) {
      this.setState({
        visible: true
      });
      await AsyncStorage.setItem("pin", this.state.firstpin);
      Actions.replace("HomeScreen");
    }

    else if (this.state.firstpin == this.state.secondpin && fromForget === "1") {
      await AsyncStorage.setItem("pin", this.state.firstpin);
      Actions.replace("HomeScreen");
    }
    else if (this.state.firstpin == this.state.secondpin && wordpin === "1") {
      await AsyncStorage.setItem("pin", this.state.firstpin);
      Actions.replace("HomeScreen");
    }

    else if (this.state.firstpin != this.state.secondpin && forgot == 1) {
      Toast.show("Please Enter The Correct Pin", Toast.SHORT);
    }
    else if (this.state.firstpin == this.state.secondpin) {
      this.setState({
        visible: true
      });

      var restore = await AsyncStorage.getItem("restore")
      if (restore == "0" || restore == null) {

        await AsyncStorage.setItem("pin", this.state.firstpin)
        wallet = ethers.Wallet.createRandom();
        Mnemonic_List = wallet.mnemonic;
        console.log("mnemonic_list", Mnemonic_List);
        // var a = this.storeData("phrase", Mnemonic_List);
        await AsyncStorage.setItem("phrase", Mnemonic_List);
        AsyncStorage.getItem("phrase").then((a) => {
          if (a) {
            console.log("value of a on confirm pin", a);
            this.setState({
              visible: false
            });
            Actions.replace("mnemonic");
          }
        })
      }
      else {
        await AsyncStorage.setItem("pin", this.state.firstpin)
        this.setState({
          visible: false
        });
        Actions.replace('restoreScreen');
      }
    }
    else {
      Toast.show("Please Enter The Correct Pin", Toast.SHORT);
    }
  }

  animateCell({ hasValue, index, isFocused }) {
    Animated.parallel([
      Animated.timing(this._animationsColor[index], {
        toValue: isFocused ? 1 : 0,
        duration: 250,
      }),
      Animated.spring(this._animationsScale[index], {
        toValue: hasValue ? 0 : 1,
        duration: hasValue ? 300 : 250,
      }),
    ]).start();
  }

  cellProps = ({ hasValue, index, isFocused }) => {
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? this._animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : this._animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: this._animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: this._animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };
    setTimeout(() => {
      this.animateCell({ hasValue, index, isFocused });
    }, 0);

    return {
      style: [styles.input, animatedCellStyle],
    };
  };

  containerProps = { style: styles.inputWrapStyle };

  render() {
    return (
      this.state.visible ? <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', flexDirection: 'column', backgroundColor: 'white' }}>
        <ActivityIndicator
          color='black'
          size="large" />
        <Text style={{ fontSize: 12, color: 'black', fontWeight: '500', textAlign: 'center', margin: 10 }}>Hold on! Your 12 Word Mnemonics For Ethereum is being generated. Do not go back or cancel this process.</Text>
      </View> :
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : null}>
          <ScrollView style={Platform.OS === "ios" ? "flex:1" : null}>
            <View style={{ height: height_screen, width: width_screen, backgroundColor: 'white' }}>

              <View style={styles.inputWrapper}>
                <View style={{ flex: 1, marginBottom: '10%' }}>
                  <Text style={styles.inputLabel}>Re-enter the Application Pin</Text>
                  <Image style={styles.icon} source={source} />
                  <Text style={styles.inputSubLabel}>{'Please re-enter the Application Pin'}</Text>
                  <Text style={styles.inputSubLabel}>{'It can be used to send Ethers,Bitcoins And ERC20 Tokens.'}</Text>
                  <Text style={styles.inputSubLabel}>{'So Make Sure You Save This Pin Somewhere .'}</Text>
                  <CodeFiled
                    maskSymbol=""
                    variant="clear"
                    codeLength={codeLength}
                    keyboardType="numeric"
                    cellProps={this.cellProps}
                    containerProps={this.containerProps}
                    onFulfill={this.onFinishCheckingCode}
                    CellComponent={Animated.Text} />

                  <Button
                    onPress={this.checkPin}
                    title="Confirm"
                    titleStyle={{ color: 'white', fontSize: 18, textAlign: 'center', padding: 5 }}
                    buttonStyle={{
                      borderWidth: 1, borderColor: '#5364CD', borderRadius: 25, width: 180,
                      alignSelf: 'center', backgroundColor: '#5364CD', height: 50
                    }} />

                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

    );
  }
}

const styless = StyleSheet.create({

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  }
});