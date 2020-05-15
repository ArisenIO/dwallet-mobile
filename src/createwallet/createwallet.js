import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,View,
    Text, ScrollView, Image, TouchableOpacity
} from "react-native";
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'
export default class Createwallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.disableYellowBox = true;
    }
    componentDidMount() {
    }
    createBtn = () => {
        Actions.AddAccount();
    }
    restoreBtn = () => {
        Actions.RegisterScreen();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginTop: hp('2%'), height: hp('60%'),
                }}>
                    {/* <Text style={{ color: '#5364CD', fontSize: 20, textAlign: 'center' }}>
                        Logo Image
                    </Text> */}
                    <Image 
                    source={Icon.App_logo}
                    resizeMode="contain"
                    />
                </View>
                <View style={{ width: wp('100'), height: hp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: '700', fontSize: 22 }}>Welcome!</Text>
                </View>
                <View style={{ marginTop: 2 }}>
                    <View style={{ width: wp('100'), height: hp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Welcome to D-Wallet.To start working</Text>
                    </View>
                    <View style={{ width: wp('100'), height: hp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>with the wallet, just add your account here</Text>
                    </View>
                </View>
                <View style={styles.button1}>
                    <View
                        style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={this.createBtn}
                            style={{
                                backgroundColor:'#2D5E86', width: wp('90%'), height: hp('5%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 5
                            }}
                        >
                            <Text style={{ color: "white" }}>
                                ADD ACCOUNT
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={this.restoreBtn}
                            style={{
                                // backgroundColor: '#81d594',
                                backgroundColor:'#2D5E86',
                                width: wp('90%'), height: hp('5%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 5
                            }}
                        >
                            <Text style={{ color: 'white' }}>
                                REGISTER ACCOUNT
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button1: {

        height: hp('13%'),
        justifyContent: 'space-between',
        marginVertical: hp('3%')
    }
});