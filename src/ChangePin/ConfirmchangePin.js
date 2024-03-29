import Icon from "react-native-vector-icons/Ionicons"
import React, { Component, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, Image, View, Alert } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';


class ConfirmchangePin extends Component {
    constructor(props) {
        super(props);
        this.pinView = null
        this.state = {
            showRemoveButton: false,
            showCompletedButton: false,
            enteredPin: '',
        };
    }

    enterValue = (value) => {
        this.setState({ enteredPin: value }, () => {
            if (this.state.enteredPin.length > 0) {
                this.setState({ showRemoveButton: true })
            } else {
                this.setState({ showRemoveButton: false })
            }
            if (this.state.enteredPin.length === 6) {
                this.setState({ showCompletedButton: true })
            }
            else {
                this.setState({ showCompletedButton: false })
            }
            console.log("Ok..", this.state.enteredPin)
        })
    }

    confirm = () => {
        if (this.state.enteredPin) {
            var pin_code = { "pin_code": this.state.enteredPin }
            AsyncStorage.setItem('pin_code', JSON.stringify(pin_code)).then((resp) => {
                AsyncStorage.getItem('pin_code').then((response) => {
                    if (response) {
                        Toast.show("Pin code changed successfully", Toast.LONG)
                        Actions.pop();
                    } else {
                        Toast.show("Pin code not changed Try again ...", Toast.LONG)
                        Actions.pop();
                    }
                })
            })
        }
        else {
            Toast.show("Enter Corrert Pin",Toast.LONG)
        }
    }

    render() {
        return (
            <>
                <StatusBar barStyle="light-content" />
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={Images.App_logo1}
                        style={{ width: wp('40%'), height: hp('20%'), }}
                    />
                    <View style={{ marginVertical: hp('5%') }}>
                        <Text style={{fontSize: 20,fontFamily: 'Montserrat-Bold' }}>Enter your new pincode</Text>
                    </View>
                    <ReactNativePinView
                        inputSize={32}
                        ref={this}
                        pinLength={6}
                        buttonSize={60}
                        onValueChange={value => { this.enterValue(value) }}
                        buttonAreaStyle={{
                            marginTop: 24,
                        }}
                        inputAreaStyle={{
                            marginBottom: 24,
                        }}
                        inputViewEmptyStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                        inputViewFilledStyle={{
                            backgroundColor: "black",
                        }}
                        buttonViewStyle={{
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                        buttonTextStyle={{
                            color: "black",
                        }}
                        onButtonPress={key => {
                            if (key === "custom_left") {
                                this.current.clear()
                            }
                            if (key === "custom_right") {
                                this.confirm()
                            }

                        }}
                        customLeftButton={this.state.showRemoveButton ?
                            <Image
                                source={Images.Back_Icn}
                                resizeMode="contain"
                                resizeMethod="resize"
                                style={{ width: wp('10%'), height: hp('5%') }}
                            />
                            :
                            undefined}

                        customRightButton={this.state.showCompletedButton ?
                            <Image
                                source={Images.done_Icon}
                                resizeMode="contain"
                                resizeMethod="resize"
                                style={{ width: wp('10%'), height: hp('5%'), }}
                            /> :
                            undefined}
                    />
                </SafeAreaView>
            </>
        );
    }
}

export default ConfirmchangePin;
