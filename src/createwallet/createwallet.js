import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet, View,
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
        this.setState({ b_2: !this.state.b_2 })
        Actions.AddAccount();
    }
    restoreBtn = () => {
        this.setState({ b_2: !this.state.b_2 })
        Actions.RegisterScreen();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginTop: hp('15%'), height: hp('25%')
                }}>
                    <Image
                        source={Icon.App_logo1}
                        resizeMode="contain"
                        style={{ width: wp('50%') }}
                    />
                </View>
                <View style={{ width: wp('100'), height: hp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#505050', fontWeight: '700', fontSize: 22 }}>Welcome!</Text>
                </View>
                <View style={{
                    marginTop: 10, width: wp('100%'), height: hp('10%'), justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ width: wp('70%'), height: hp('8%'), justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#a8a9ae', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>
                            Welcome to dWallet. To start working withthe wallet, just add your account here.
                            </Text>
                    </View>
                </View>
                <View style={styles.button1}>
                    <View
                        style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={this.createBtn}
                            style={{
                                backgroundColor: this.state.b_2 ? null : '#2dd5c9', width: wp('50%'), height: hp('6%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 25
                            }}
                        >
                            <Text style={{ color: this.state.b_2 ? '#379aff' : 'white', fontSize: 16, fontWeight: '700' }}>
                                Add Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={this.restoreBtn}
                            style={{
                                backgroundColor: this.state.b_2 ? '#2dd5c9' : null,
                                width: wp('50%'), height: hp('6%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 25
                            }}
                        >
                            <Text style={{ color: this.state.b_2 ? 'white' : '#379aff', fontSize: 16, fontWeight: '700' }}>
                                Register Account
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
        flex: 1, backgroundColor: 'white'
    },
    button1: {

        height: hp('13%'),
        justifyContent: 'space-between',
        marginVertical: hp('8%')
    }
});