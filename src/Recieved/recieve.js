'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, BackHandler, Platform } from 'react-native'
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode-svg';

class Recieve extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.backAction = this.backAction.bind(this);
    }

    componentDidMount() {
        this._retrieveData();
        BackHandler.addEventListener("hardwareBackPress", this.backAction);

    }

    _retrieveData = () => {
        try {
            AsyncStorage.getItem('items').then((value) => {
                var parsed_value = JSON.parse(value);
                var account_name = parsed_value.items.accountName;
                this.setState({
                    AccountName: parsed_value.items.accountName,
                })
            }).catch((errr) => {
                // console.log("error in retri", errr);
            });
        } catch (error) {
            console.log("error in retri", error);
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        Actions.pop()
        return true;
    };

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => { this.backAction() }}>
                        <Image source={Icon.Back_icon} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', 
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%',fontFamily: 'Montserrat-Bold',
                    }}>Receive RIX</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: hp('5%'), width: wp('100%'), }}>
                    <Text style={{ fontSize: 18, color: '#a8a9ae', textAlign: 'center' ,fontFamily: 'Montserrat-Regular',}}>This QR code can be used by friends to send RIX to your account.</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ImageBackground
                        resizeMode="contain"
                        source={Icon.QR_code_frame}
                        style={{
                            height: hp('30%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: wp('60%'),
                            borderColor: 'black'
                        }}>

                        <QRCode
                            value={this.state.AccountName}
                            size={200}
                            bgColor='#000000'
                            fgColor='#FFFFFF' />

                    </ImageBackground>
                </View>
                <View style={{ marginVertical: 25, justifyContent: 'center', alignItems: 'center', fontSize: 20, fontFamily: 'Montserrat-Bold', }}>
                    <Text style={{fontFamily: 'Montserrat-Regular' }}>
                        {this.state.AccountName}
                    </Text>
                </View>

            </View>
        );
    }
}

export default Recieve;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        backgroundColor: '#4383fc',
        height: 60,
    }
})
