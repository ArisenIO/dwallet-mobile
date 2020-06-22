import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput, TouchableOpacity,
    Text, ScrollView, Image, BackHandler, Alert, Platform
} from "react-native";
import { validation_quantity, validateName } from '../../src/Validation/validation'
// import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'
import Modal from 'react-native-modal';

export default class ActiveKeys extends Component {
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
        // this._retrieveData();
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    backAction = () => {
        Actions.pop()
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


    nextbtn = () => {

        console.log('import key screen')
        if (this.state.AccountName_status) {
            if (this.state.txtStatus) {
                fetch("https://dmobileapi.arisen.network/avote/account/info", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        account: (this.state.account).trim(),
                        private_key: (this.state.private_key).trim()
                    })
                })
                    .then(response => response.json())
                    .then((response) => {
                        if (response.success == true) {
                            var items = {
                                'accountName': (this.state.account).trim(),
                                'active_keys': (this.state.private_key).trim(),
                                'new_wallet': "0"
                            }
                            AsyncStorage.setItem(
                                'items', JSON.stringify({ items })
                            );
                            Actions.replace('homepage')
                        }
                        else if (response.success == false) {
                            this.setState({ error_msg: response.message })
                            this.toggleModal3()
                            console.log("error_msg_in_addAcount_", response.message)
                        }
                    })
                    .catch(error => console.log(error)) //to catch the errors if any
            }
            else {
                this.setState({ txtStatus: false })
                // alert("Please enter private key.")
                this.toggleModal2()
            }
        }
        else {
            this.setState({ AccountName_status: false })
            // alert("Please enter account name.")
            this.toggleModal()
        }
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
        // alert("ok")
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    toggleModal2 = () => {
        this.setState({ isModalVisible2: !this.state.isModalVisible2 });
    };
    toggleModal3 = () => {
        console.log("pressed ok");
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
                            }}>Add Account</Text>
                        </View>
                    </View>
                    <View
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
                    </View>
                    <View style={{ marginLeft: 15 }}>
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
                    </View>

                    <View
                        style={{ width: wp('100%'), height: hp('12%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('7%') }}
                    >
                        <TouchableOpacity
                            onPress={() => { this.nextbtn() }}
                            style={{
                                backgroundColor: '#2dd5c9', width: wp('75%'), height: hp('6%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 25
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 17, fontFamily: 'Montserrat-Bold', }}>
                                Next
                            </Text>
                        </TouchableOpacity>
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
                            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', }}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', fontFamily: 'Montserrat-Regular' }}>Please enter your name</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            height: hp('5%'), marginTop: hp('5%'), width: wp('88%')
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('40%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Regular' }}>Ok</Text>
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
                            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', }}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '100', fontFamily: 'Montserrat-Regular', }}>Please enter your Active private key</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            height: hp('5%'), marginTop: hp('5%'), width: wp('88%')
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('40%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal2() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Regular', }}>Ok</Text>
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
                        marginTop: 240, borderRadius: 10, width: wp('90%'), maxHeight: hp('40%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('30%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('6%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', fontFamily: 'Montserrat-Bold', }}>Whoops!</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Montserrat-Regular', }}>The account information you entered does not match the username or simply doesn't exist. Check the username and the active key, to make sure they match and if they're registered</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            height: hp('5%'), marginTop: hp('3%'), width: wp('88%')
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('40%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal3() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Regular', }}>Ok</Text>
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