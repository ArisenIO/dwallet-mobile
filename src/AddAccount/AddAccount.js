import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput, TouchableOpacity,
    Text, ScrollView, Image, BackHandler,Platform
} from "react-native";
import { validation_quantity, validateName } from '../../src/Validation/validation'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'
import Modal from 'react-native-modal';

export default class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountValue: 'RIX',
            showPvtkey: true,
            confirmpvtkey: '',
            btnState: false
        };
        this.backAction = this.backAction.bind(this);

        console.disableYellowBox = true;
    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    backAction = () => {
        Actions.pop()
        return true;
    };

    showPvtKeybtn = () => {
        if (this.state.showPvtkey == true) {
            this.setState({ showPvtkey: false })
        } else {
            this.setState({ showPvtkey: true })
        }
    }

    confirmpvtkey = (text) => {
        this.state.confirmpvtkey = text;
        console.log("confirmpvtkey>>>>>", text, this.state.confirmpvtkey);
    }

    activekey = () => {
        Actions.replace('ActiveKeys')
    }

    nextbtn = () => {
        Actions.replace('BackupphraseMnemonics')
    }

    set_to_account_name(txt) {
        this.setState({ account: txt });
        this.state.AccountName_error = validateName(txt).error;
        this.state.AccountName_status = validateName(txt).status;
    }

    set_to_quantity(txt) {
        this.setState({ private_key: txt });
        this.state.txtErrorMessage = validation_quantity(txt).error;
        this.state.txtStatus = validation_quantity(txt).status;
    }

    goback = () => {
        Actions.Createwallet();
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    toggleModal2 = () => {
        this.setState({ isModalVisible2: !this.state.isModalVisible2 });
    };

    toggleModal3 = () => {
        this.setState({ isModalVisible3: !this.state.isModalVisible3 });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { this.backAction() }}
                                style={{ justifyContent: 'center' }}>
                                <Image source={Icon.Back_icon} style={{ tintColor: 'white', height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />

                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 22, color: 'white', textAlign: 'center',
                                fontFamily: 'Montserrat-Bold',
                                justifyContent: 'center', alignSelf: 'center', marginStart: '5%'
                            }}>Add PeepsID</Text>
                        </View>
                    </View>
                    {/* <View
                        style={{
                            width: wp('100%'), height: hp('8%'),
                            justifyContent: 'center', alignItems: 'center', marginTop: hp('5%')
                        }}>
                        <TextInput
                            style={{
                                width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Enter your name"
                            value={this.state.to_account_name}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                            onChangeText={(text) => { this.set_to_account_name(text) }}
                        />
                    </View> */}
                    {/* <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: 'red', fontFamily: 'Montserrat-Regular', }}>{this.state.AccountName_error} </Text>
                    </View>
                    <View style={{
                        width: wp('100%'), height: hp('8%'),
                        justifyContent: 'center', alignItems: 'center', marginTop: hp('5%')
                    }}>
                        <TextInput
                            style={{
                                width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Enter Active Private Key"
                            value={this.state.private_key}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            keyboardType="default"
                            minLength={12}
                            onChangeText={(text) => { this.set_to_quantity(text) }}
                        />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: 'red', fontFamily: 'Montserrat-Regular', }}>{this.state.txtErrorMessage} </Text>
                    </View> */}

                    <View style={{ height: hp('15%'), justifyContent: 'space-between', marginVertical: hp('30%') }}>

                        <View style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#2dd5c9',
                                    width: wp('60%'), height: hp('6%'),
                                    justifyContent: 'center', alignItems: 'center', borderRadius: 25
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.nextbtn() }}
                            >
                                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Montserrat-Bold' }}>Import Backup Phrase</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: wp('100%'), height: hp('12%'), justifyContent: 'center', alignItems: 'center' }} >

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#2dd5c9',
                                    width: wp('60%'), height: hp('6%'),
                                    justifyContent: 'center', alignItems: 'center', borderRadius: 25
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.activekey() }}
                            >
                                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Montserrat-Bold' }}>Import Active Key</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                {/* Modal 1 Start */}
                <Modal isVisible={this.state.isModalVisible}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', }}>Error</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', fontFamily: 'Montserrat-Regular' }}>Please enter your name</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            height: hp('5%'), marginTop: hp('5%'), width: wp('88%'),paddingBottom:'5%'
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('40%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Regular',paddingBottom:'2%' }}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
                {/* Modal 1 End */}
                {/* Modal 2  Start */}
                <Modal isVisible={this.state.isModalVisible2}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', }}>Error</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', fontFamily: 'Montserrat-Regular', }}>Please enter your Active private key</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            height: hp('5%'), marginTop: hp('5%'), width: wp('88%'),paddingBottom:'5%'
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('40%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal2() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Regular' ,paddingBottom:'2%'}}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
                {/* Modal 2 End */}
                {/* Modal 3 Start */}
                <Modal isVisible={this.state.isModalVisible3}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', fontFamily: 'Montserrat-Bold', }}>Error</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Montserrat-Regular', }}>{this.state.error_msg}</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            height: hp('5%'), marginTop: hp('5%'), width: wp('88%'),paddingBottom:'5%'
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('40%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal3() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Regular',paddingBottom:'2%' }}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
                {/* Modal 3 End */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#4383fc',
        height: 60,
        // backgroundColor:'red'
    }
});