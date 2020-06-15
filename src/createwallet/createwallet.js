import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet, View,
    Text, ScrollView, Image, TouchableOpacity,BackHandler, Platform
} from "react-native";
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'
import Modal from 'react-native-modal';

export default class Createwallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.disableYellowBox = true;
        this.backAction=this.backAction.bind(this);

    }
    async componentDidMount() {
        // try {
        //     this.fetchData()
        // } catch (e) {
        //     console.log(e);
        // }
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
      }
      backAction = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        //   Actions.pop()
        // Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //   {
        //     text: "Cancel",
        //     onPress: () => null,
        //     style: "cancel"
        //   },
        //   { text: "YES", onPress: () => BackHandler.exitApp() }
        // ]);
        return true;
      };
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
                <View style={{ width: wp('100'), height: Platform.OS === 'ios' ? hp('7%') : hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#505050',fontFamily: 'Montserrat-Bold',fontSize: 22 }}>Let's get started!</Text>
                </View>
                <View style={{
                    marginTop: 10, width: wp('100%'), height: Platform.OS === 'ios' ? hp('15%') : hp('12%'), justifyContent: 'center',
                    alignItems: 'center'
                }}>
                        <Text style={{ color: '#a8a9ae',
                        //  fontWeight: '100',
                          fontSize: 16,
                         textAlign: 'center',fontFamily: 'Montserrat-Regular', 
                          
                          }}>
                        To get started with dWallet, either login with PeepsID or create a new PeepsID.
                            </Text>
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
                            <Text style={{ color: this.state.b_2 ? '#379aff' : 'white', fontSize: 16, fontFamily: 'Montserrat-Bold', }}>
                            Login With PeepsID
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
                            <Text style={{ color: this.state.b_2 ? 'white' : '#379aff', fontSize: 16,fontFamily: 'Montserrat-Bold',}}>
                            Create New PeepsID
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Modal Start */}
                <Modal isVisible={this.state.isModalVisible}
                 backdropColor='rgba(0,0,0,1)'
                 style={{
                    backgroundColor: 'white',
                    marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold',  }}>Exit?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign:'center' ,fontFamily: 'Montserrat-Regular', }}>Are you sure you want exit app?</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', height: hp('5%'), marginTop: hp('5%'), width:wp('88%')
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", 
                                borderRadius: 20, width: wp('40%') }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.setState({isModalVisible:false})}}
                            >
                                <Text style={{ fontSize: 18,  color: 'white' ,fontFamily: 'Montserrat-Bold', }}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", 
                                borderRadius: 20, width: wp('40%') }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { BackHandler.exitApp()}}
                            >
                                <Text style={{ fontSize: 18,  color: 'white' ,fontFamily: 'Montserrat-Bold',}}>Yes</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal end */}
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