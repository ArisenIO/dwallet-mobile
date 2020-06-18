import React, { Component } from 'react';
import { Animated, Image, Text, View, KeyboardAvoidingView, ScrollView, BackHandler, Platform, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import CodeFiled from 'react-native-confirmation-code-field';
import { Dimensions } from 'react-native';
import Toast from 'react-native-simple-toast';
var width_screen = Dimensions.get('screen').width;
var height_screen = Dimensions.get('screen').height;
import AsyncStorage from "@react-native-community/async-storage";
var wordpin;


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

export default class createPin extends Component {
  state = {
    firstpin: "",

  }
  constructor(props) {
    super(props);
    this.BackButton = this.BackButton.bind(this);
  };

  async componentDidMount() {
    wordpin = await AsyncStorage.getItem("forgotMnemonicPin");
    BackHandler.addEventListener('hardwareBackPress', this.BackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.BackButton);
  }


  BackButton = () => {
    if (wordpin == 1) {
      Actions.pop();
      return true;
    } else {
      Actions.replace('createwallet');
    }
  }


  _animationsColor = [...new Array(codeLength)].map(
    () => new Animated.Value(0),
  );
  _animationsScale = [...new Array(codeLength)].map(
    () => new Animated.Value(1),
  );

  onFinishCheckingCode = code => {
    this.state.firstpin = code;
  };

  gotoConfirmPin = () => {
    console.log("going from create pin to confirm pin");
    if (this.state.firstpin.length == 4) {
      Actions.replace("confirmPin", { firstpin: this.state.firstpin })
    }
    else {
      Toast.show("Enter your 4 Digit Pin First", Toast.SHORT);
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : null}>
        <ScrollView style={Platform.OS === "ios" ? "flex:1" : null}>
          <View
            style={{ height: height_screen, width: width_screen, backgroundColor: 'white' }}>
            <View style={styles.inputWrapper}>
              <View style={{ flex: 1, marginBottom: '10%' }}>
                <Text style={styles.inputLabel}>Create Application Pin</Text>
                <Image style={styles.icon} source={source} />
                <Text style={styles.inputSubLabel}>{'Please enter the Application Pin'}</Text>
                <Text style={styles.inputSubLabel}>{'It can be used to send Ethers,Bitcoins and ERC20 Tokens. '}</Text>
                <Text style={styles.inputSubLabel}>{'So Make sure you save this pin somewhere.'}</Text>

                <CodeFiled
                  maskSymbol=" "
                  variant="clear"
                  codeLength={codeLength}
                  keyboardType="numeric"
                  cellProps={this.cellProps}
                  containerProps={this.containerProps}
                  onFulfill={this.onFinishCheckingCode}
                  CellComponent={Animated.Text} />

                <Button
                  onPress={this.gotoConfirmPin}
                  title="VERIFY"
                  titleStyle={{ color: 'white', fontSize: 18, alignSelf: 'center' }}
                  buttonStyle={{
                    borderWidth: 1, borderColor: '#5364CD', borderRadius: 25, width: 180,
                    alignSelf: 'center', backgroundColor: '#5364CD', height: 50
                  }} />
              </View>
            </View>
          </View>
        </ScrollView >
      </KeyboardAvoidingView >

    );
  }
}
