import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, BackHandler, Platform, TextInput, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from '../assets/Icon'
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard'
import Modal from 'react-native-modal';
//import { PrivateKey } from '../../node_modules/@arisencore/ecc/lib/api_object'

const ethers = require('ethers');


export default class Mnemonics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mnemonicslist: '',
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
            word12: ''
        };
        console.disableYellowBox = true;
        this.backAction = this.backAction.bind(this);

    }

    async componentDidMount() {
        this.generate_mnemonics()
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        AsyncStorage.getItem('MnemonicsList').then(resp => {
            if (resp) {
                var MnemonicsList = resp.split('')
                console.log('===================if case MnemonicsList',MnemonicsList)
            } else {
                console.log("MnemonicsList=====elsecase", resp)

            }
        })
    }

    generate_mnemonics = () => {
        wallet = ethers.Wallet.createRandom();
        Mnemonic_List = wallet.mnemonic;
        var array_list = Mnemonic_List.split(/\s+/);
        this.setState({
            Mnemonicslist: Mnemonic_List,
            word1: array_list[0],
            word2: array_list[1],
            word3: array_list[2],
            word4: array_list[3],
            word5: array_list[4],
            word6: array_list[5],
            word7: array_list[6],
            word8: array_list[7],
            word9: array_list[8],
            word10: array_list[9],
            word11: array_list[10],
            word12: array_list[11]

        })

        console.log("string list length", array_list[0]);

        console.log("wallet mnemonic list", Mnemonic_List, ethers.utils.HDNode.isValidMnemonic("shikhar sri"));


        // master = PrivateKey.fromSeed(Mnemonic_List)
        // ownerPrivate = master.getChildKey('owner')
        // activePrivate = ownerPrivate.getChildKey('active')



        // console.log(ownerPrivate.toString(), " ", PrivateKey.fromString(ownerPrivate.toWif()).toPublic().toString(), "   ", activePrivate.toString(), PrivateKey.fromString(activePrivate.toWif()).toPublic().toString())
    }


    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        //this.setState({ isModalVisible: !this.state.isModalVisible });
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

        let word1 = this.state.word1
        let word2 = this.state.word2
        let word3 = this.state.word3
        let word4 = this.state.word4
        let word5 = this.state.word5
        let word6 = this.state.word6
        let word7 = this.state.word7
        let word8 = this.state.word8
        let word9 = this.state.word9
        let word10 = this.state.word10
        let word11 = this.state.word11
        let word12 = this.state.word12

        if (word1 == "" || word1 == null) {
            alert('Enter 1 Mnemonics')
        } else if (word2 == "" || word2 == null) {
            alert('Enter 2 Mnemonics')
        } else if (word3 == "" || word3 == null) {
            alert('Enter 3 Mnemonics')
        } else if (word4 == "" || word4 == null) {
            alert('Enter 4 Mnemonics')
        } else if (word5 == "" || word5 == null) {
            alert('Enter 5 Mnemonics')
        } else if (word6 == "" || word6 == null) {
            alert('Enter 6 Mnemonics')
        } else if (word7 == "" || word7 == null) {
            alert('Enter 7 Mnemonics')
        } else if (word8 == "" || word8 == null) {
            alert('Enter 8 Mnemonics')
        } else if (word9 == "" || word9 == null) {
            alert('Enter 9 Mnemonics')
        } else if (word10 == "" || word10 == null) {
            alert('Enter 10 Mnemonics')
        } else if (word11 == "" || word11 == null) {
            alert('Enter 11 Mnemonics')
        } else if (word12 == "" || word12 == null) {
            alert('Enter 12 Mnemonics')
        } else {
            console.log('===========word1', word1)


        }

        // fetch("https://dmobileapi.arisen.network/avote/account/pass/phrase", {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         phrase: Mnemonic_List
        //     })
        // })
        //     .then(response => response.json())
        //     .then((response) => {
        //         console.log("resp_for_check_api====>", response)
        //         this.setState({
        //             ActivePrivate: response.activePrivate,
        //             ActivePublic: response.activePublicKey,
        //             OwnerPrivate: response.ownerPrivate,
        //             OwnerPublic: response.ownerPublicKey

        //         }, () => { console.log("active key", this.state.ActivePublic) })

        //         var items = {
        //             "ActivePrivateKey": this.state.ActivePrivate,
        //             "ActivePublicKey": this.state.ActivePublic,
        //             "OwnerPrivate": this.state.OwnerPrivate,
        //             "OwnerPublic": this.state.OwnerPublic
        //         }
        //         AsyncStorage.setItem(
        //             'items', JSON.stringify({ items })
        //         );

        //     })
        //     .catch(error => console.log(error)) //to catch the errors if any

    }




    render() {

        // if (this.state.loading) return <ActivityIndicator size="large" />

        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ width: wp('95'), height: Platform.OS === 'ios' ? hp('7%') : hp('5%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                        <Text style={{ color: '#505050', fontFamily: 'Montserrat-Bold', fontSize: 22 }}>Confirm Mnemonic Phrase</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="1st word"
                            value={this.state.word1}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            disabled={true}
                            editable={true}
                            onChangeText={text => this.setState({ word1: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="2nd word"
                            value={this.state.word2}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word2: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="3rd word"
                            value={this.state.word3}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word3: text })}

                        />

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="4th word"
                            value={this.state.word4}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word4: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="5th word"
                            value={this.state.word5}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word5: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="6th word"
                            value={this.state.word6}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word6: text })}

                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="7th word"
                            value={this.state.word7}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word7: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="8th word"
                            value={this.state.word8}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word8: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="9th word"
                            value={this.state.word9}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word9: text })}

                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('3%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="10th word"
                            value={this.state.word10}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word10: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="11th word"
                            value={this.state.word11}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word11: text })}

                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="12th word"
                            value={this.state.word12}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            editable={true}
                            onChangeText={text => this.setState({ word12: text })}

                        />

                    </View>

                    {/* <View style={{  justifyContent: 'space-between', height: hp('10%'), marginTop: hp('10%'), width: wp('90%') }}> */}
                    <View
                        style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('7%') }}
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


                    {/* </View> */}
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});