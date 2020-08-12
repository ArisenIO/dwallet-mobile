import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, BackHandler, Platform, TextInput, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icons from '../assets/Icon'
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard'
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
const ethers = require('ethers');


export default class BackupphraseMnemonics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mnemonicslist: '',
            list: "",
            clipboardText: "",
            word1: '',
            word2: '',
            word3: '',
            word4: '',
            word5: '',
            word6: '',
            word7: '',
            word8: '',
            word9: '',
            word10: '',
            word11: '',
            word12: '',
            AccountName: '',
            spinner: false
        };
        console.disableYellowBox = true;
        this.backAction = this.backAction.bind(this);

    }

    async componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        Actions.pop()
        return true;
    };

    toggleModal3 = () => {
        console.log("pressed ok");
        this.setState({ isModalVisible3: !this.state.isModalVisible3 });
    };


    createBtn = () => {
        console.log('button clicked', this.state.AccountName)
        let word1 = this.state.word1.trim()
        let word2 = this.state.word2.trim()
        let word3 = this.state.word3.trim()
        let word4 = this.state.word4.trim()
        let word5 = this.state.word5.trim()
        let word6 = this.state.word6.trim()
        let word7 = this.state.word7.trim()
        let word8 = this.state.word8.trim()
        let word9 = this.state.word9.trim()
        let word10 = this.state.word10.trim()
        let word11 = this.state.word11.trim()
        let word12 = this.state.word12.trim()

        if (word1 == "" || word1 == null) {
            Toast.show('Enter 1st Mnemonics', Toast.SHORT);
        } else if (word2 == "" || word2 == null) {
            Toast.show('Enter 2nd Mnemonics', Toast.SHORT);
        } else if (word3 == "" || word3 == null) {
            Toast.show('Enter 3rd Mnemonics', Toast.SHORT);
        } else if (word4 == "" || word4 == null) {
            Toast.show('Enter 4th Mnemonics', Toast.SHORT);
        } else if (word5 == "" || word5 == null) {
            Toast.show('Enter 5th Mnemonics', Toast.SHORT);
        } else if (word6 == "" || word6 == null) {
            Toast.show('Enter 6th Mnemonics', Toast.SHORT);
        } else if (word7 == "" || word7 == null) {
            Toast.show('Enter 7th Mnemonics', Toast.SHORT);
        } else if (word8 == "" || word8 == null) {
            Toast.show('Enter 8th Mnemonics', Toast.SHORT);
        } else if (word9 == "" || word9 == null) {
            Toast.show('Enter 9th Mnemonics', Toast.SHORT);
        } else if (word10 == "" || word10 == null) {
            Toast.show('Enter 10th Mnemonics', Toast.SHORT);
        } else if (word11 == "" || word11 == null) {
            Toast.show('Enter 11th Mnemonics', Toast.SHORT);
        } else if (word12 == "" || word12 == null) {
            Toast.show('Enter 12th Mnemonics', Toast.SHORT);
        } else {
            let mnemonic_list = word1 + " " + word2 + " " + word3 + " " + word4 + " " + word5 + " " + word6 + " " + word7 + " " + word8 + " " + word9 + " " + word10 + " " + word11 + " " + word12
            this.state.Mnemonicslist = mnemonic_list;
            console.log("list words", mnemonic_list);
            this.setState({ spinner: true })
            fetch("https://dmobileapi.arisen.network/avote/account/pass/phrase", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phrase: mnemonic_list
                })
            })
                .then(response => response.json())
                .then((response) => {
                    console.log("resp_for_check_api====>", response)
                    if (response.message) {
                        this.setState({ error_msg: response.message })
                        this.toggleModal3()
                        // Toast.show("Backup phrase did not match any PeepsID. Try again.", Toast.SHORT);
                    }
                    else {
                        this.setState({
                            ActivePrivate: response.activePrivate,
                            ActivePublic: response.activePublicKey,
                            OwnerPrivate: response.ownerPrivate,
                            OwnerPublic: response.ownerPublicKey
                        }, () => {
                            fetch("https://dmobileapi.arisen.network/avote/search", {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    text: this.state.ActivePublic
                                })
                            })
                                .then(response => response.json())
                                .then((response) => {
                                    console.log("account name", response.account_names[0]);
                                    if (response.account_names[0]) {
                                        this.setState({ spinner: false }, () => {
                                            Toast.show("Imported successfully", Toast.LONG);
                                            var items = {
                                                'accountName': response.account_names[0],
                                                'active_keys': this.state.ActivePrivate,
                                                'active_public_keys': this.state.ActivePublic,
                                                'new_wallet': "1",
                                                'mnemonic': JSON.stringify({
                                                    phrase: mnemonic_list
                                                })
                                            }
                                            AsyncStorage.setItem(
                                                'items', JSON.stringify({ items })
                                            );
                                            Actions.replace('homepage');
                                        })
                                    }
                                    else {
                                        this.setState({ spinner: false }, () => {
                                            Toast.show("Try later", Toast.LONG);
                                        })
                                    }
                                })
                        })
                    }
                })
                .catch(error => {
                    Toast.show(error, Toast.SHORT)
                })



        }


    }




    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => { this.backAction() }}>
                            <Image source={Icons.Back_icon} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 22, color: 'white', textAlign: 'center',
                            justifyContent: 'center', alignSelf: 'center', marginStart: '1%', fontFamily: 'Montserrat-Bold',
                        }}>Import Mnemonic Phrase</Text>
                    </View>

                    {/* <View style={{ width: wp('95'), height: Platform.OS === 'ios' ? hp('7%') : hp('5%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                        <Text style={{ color: '#505050', fontFamily: 'Montserrat-Bold', fontSize: 22 }}>Confirm Mnemonic Phrase</Text>
                    </View> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>1.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word1}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word1: text })}

                            />
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>2.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word2}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word2: text })}

                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>3.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word3}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word3: text })}

                            />
                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>4.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word4}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word4: text })}

                            />
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>5.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word5}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word5: text })}

                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>6.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word6}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word6: text })}

                            />
                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>7.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word7}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word7: text })}

                            />
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>8.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word8}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word8: text })}

                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>9.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word9}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word9: text })}

                            />
                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>10.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word10}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word10: text })}

                            />
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>11.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word11}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word11: text })}

                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{
                                width: wp('4%'), fontSize: 10,
                                borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                            }}>12.</Text>
                            <TextInput
                                style={{
                                    width: wp('25%'), borderBottomWidth: wp('0.1%'), fontSize: 10,
                                    borderColor: 'gray', color: 'black', fontFamily: 'Montserrat-Regular',
                                }}
                                placeholder="Mnemonics"
                                value={this.state.word12}
                                placeholderTextColor='#a8a9ae'
                                autoCapitalize="none"
                                disabled={true}
                                editable={true}
                                onChangeText={text => this.setState({ word12: text })}

                            />
                        </View>

                    </View>
                    {/* <View style={{  justifyContent: 'space-between', height: hp('10%'), marginTop: hp('10%'), width: wp('90%') }}> */}
                    <View
                        style={{ width: wp('100%'), height: hp('12%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('7%') }}
                    >
                        <TouchableOpacity
                            onPress={this.createBtn}
                            style={{
                                backgroundColor: this.state.b_2 ? null : '#2dd5c9', width: wp('75%'), height: hp('6%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 25
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 17, fontFamily: 'Montserrat-Bold' }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>


                    {/* </View> */}
                </View>

                {/* Modal Start */}
                <Modal isVisible={this.state.isModalVisible3}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 240, borderRadius: 10, width: wp('90%'), maxHeight: hp('30%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('25%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('6%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', fontFamily: 'Montserrat-Bold' }}>Error!</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Montserrat-Regular', }}>Backup phrase did not match any PeepsID. Try again.</Text>
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

                {/* Modal Ends */}

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        backgroundColor: "#4383fc",
        height: 60,
    },
    spinnerTextStyle: {
        color: '#FFF'
    }
});