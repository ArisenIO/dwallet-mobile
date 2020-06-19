import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, BackHandler, Platform, TextInput, Clipboard } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from '../assets/Icon'
import Modal from 'react-native-modal';
// let {PrivateKey, PublicKey } = require('@arisencore/ecc')
const ethers = require('ethers');


export default class Mnemonics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mnemonics1: '',
            Mnemonics2: '',
            Mnemonics3: '',
            Mnemonics4: '',
            Mnemonics5: '',
            Mnemonics6: '',
            Mnemonics7: '',
            Mnemonics8: '',
            Mnemonics9: '',
            Mnemonics10: '',
            Mnemonics11: '',
            Mnemonics12: '',
            clipboardText: "",
            Mnemonicslist: '',
        };
        console.disableYellowBox = true;
        this.backAction = this.backAction.bind(this);

    }

    async componentDidMount() {
        this.generatemnemonics()
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    generatemnemonics = () => {
        console.log('Generate Mnemonics')
        var wallet = ethers.Wallet.createRandom();
        var Mnemonic_List = wallet.mnemonic
        var item = Mnemonic_List.split(" ");
        this.setState({
            Mnemonics1: item[0],
            Mnemonics2: item[1],
            Mnemonics3: item[2],
            Mnemonics4: item[3],
            Mnemonics5: item[4],
            Mnemonics6: item[5],
            Mnemonics7: item[6],
            Mnemonics8: item[7],
            Mnemonics9: item[8],
            Mnemonics10: item[9],
            Mnemonics11: item[10],
            Mnemonics12: item[11],
            Mnemonicslist:item
        }, () => {
            console.log('=========================pppppppp', item[0],this.state.Mnemonicslist)
            // console.log("wallet===========1", Mnemonic_List, item, 'Second============', ethers.utils.HDNode.isValidMnemonic(Mnemonic_List));

        })

    }


    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        // this.setState({ isModalVisible: !this.state.isModalVisible });
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


    createBtn = () => {
        // this.setState({ b_2: !this.state.b_2 })
        // Actions.AddAccount();
        alert('button clicked')
    }
    copyClipboard = async () => {

        let copiedText = await Clipboard.setString(this.state.Mnemonicslist);
        console.log('text copied', copiedText)
    }

    render() {

        // if (this.state.loading) return <ActivityIndicator size="large" />



        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ width: wp('95'), height: Platform.OS === 'ios' ? hp('7%') : hp('5%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('8%') }}>
                        <Text style={{ color: '#505050', fontFamily: 'Montserrat-Bold', fontSize: 22 }}>Your Mnemonic Phrase</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={1 + '.' + this.state.Mnemonics1}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={7}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={2 + '.' + this.state.Mnemonics2}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={3 + "." + this.state.Mnemonics3}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={4 + '.' + this.state.Mnemonics4}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={7}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={5 + '.' + this.state.Mnemonics5}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={6 + "." + this.state.Mnemonics6}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={7 + '.' + this.state.Mnemonics7}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={7}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={8 + '.' + this.state.Mnemonics8}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={9 + "." + this.state.Mnemonics9}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={10 + '.' + this.state.Mnemonics10}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={7}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={11 + '.' + this.state.Mnemonics11}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={12 + "." + this.state.Mnemonics12}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: hp('10%'), marginTop: hp('10%'), width: wp('90%') }}>
                        <View
                            style={{ width: wp('85%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                        >
                            <TouchableOpacity
                                onPress={this.createBtn}
                                style={{
                                    backgroundColor: this.state.b_2 ? null : '#2dd5c9', width: wp('75%'), height: hp('6%'),
                                    justifyContent: 'center', alignItems: 'center', borderRadius: 5
                                }}
                            >
                                <Text style={{ color: this.state.b_2 ? '#379aff' : 'white', fontSize: 13, fontFamily: 'Montserrat-Bold', }}>
                                    I Wrote Down My Mnemonics Phrase
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{ width: wp('10%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                        >
                            <TouchableOpacity
                                onPress={this.copyClipboard}
                                style={{
                                    backgroundColor: this.state.b_2 ? '#2dd5c9' : null,
                                    width: wp('25%'), height: hp('6%'),
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                            >
                                <Icon name="copy" size={30} color="#000" />
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
                                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', }}>Exit?</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Montserrat-Regular', }}>Are you sure you want exit app?</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between', height: hp('5%'), marginTop: hp('5%'), width: wp('88%')
                            }}>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                        borderRadius: 20, width: wp('40%')
                                    }}

                                    // onPress={() => BackHandler.exitApp()}
                                    onPress={() => { this.setState({ isModalVisible: false }) }}
                                >
                                    <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Bold', }}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                        borderRadius: 20, width: wp('40%')
                                    }}

                                    // onPress={() => BackHandler.exitApp()}
                                    onPress={() => { BackHandler.exitApp() }}
                                >
                                    <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Bold', }}>Yes</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                    {/* Modal end */}
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white'
    },
    button1: {

        height: hp('13%'),
        // justifyContent: 'space-between',
        // marginHorizontal: hp('1%'),
        flexDirection: "row"
    }
});