import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, BackHandler, Platform, TextInput, Clipboard } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from '../assets/Icon'
import Modal from 'react-native-modal';
//import { PrivateKey } from '../../node_modules/@arisencore/ecc/lib/api_object'

const ethers = require('ethers');

export default class Createwallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mnemonicslist: '',
            clipboardText: "",
            word1:'',
            word2:'',
            word3:'',
            word4:'',
            word5:'',
            word6:'',
            word7:'',
            word8:'',
            word9:'',
            word10:'',
            word11:'',
            word12:''
        };
        console.disableYellowBox = true;
        this.backAction = this.backAction.bind(this);

    }

    async componentDidMount() {
        this.generate_mnemonics()
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    generate_mnemonics = () => {
        wallet = ethers.Wallet.createRandom();
        Mnemonic_List = wallet.mnemonic;
        var array_list = Mnemonic_List.split(/\s+/);
        this.setState({
            Mnemonicslist:Mnemonic_List,
            word1:array_list[0],
            word2:array_list[1],
            word3:array_list[2],
            word4:array_list[3],
            word5:array_list[4],
            word6:array_list[5],
            word7:array_list[6],
            word8:array_list[7],
            word9:array_list[8],
            word10:array_list[9],
            word11:array_list[10],
            word12:array_list[11]

        })
        
        console.log("string list length", array_list[0]);
        console.log("wallet mnemonic list", Mnemonic_List, ethers.utils.HDNode.isValidMnemonic(Mnemonic_List));


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
        // this.setState({ b_2: !this.state.b_2 })
        // Actions.AddAccount();
        alert('button clicked')
    }
    copyClipboard = async () => {

        // let copiedText = await Clipboard.setString(this.state.Mnemonics);
        // alert('text copied', copiedText)
        var copied_data = {
            "Mnemonics":this.state.Mnemonicslist
        };
        await Clipboard.setString(JSON.stringify(copied_data));

        Toast.show('Copied', Toast.SHORT);
        console.log("copy_data====>", copied_data)
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ width: wp('95'), height: Platform.OS === 'ios' ? hp('7%') : hp('5%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('8%') }}>
                        <Text style={{ color: '#505050', fontFamily: 'Montserrat-Bold', fontSize: 22 }}>Your Mnemonic Phrase</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="1st word"
                            value={1 + '.' + this.state.word1}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="2nd word"
                            value={2 + '.' + this.state.word2}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="3rd word"
                            value={3 + "." + this.state.word3}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="4th word"
                            value={4 + '.' + this.state.word4}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="5th word"
                            value={5 + '.' + this.state.word5}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="6th word"
                            value={6 + "." + this.state.word6}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="7th word"
                            value={7 + '.' + this.state.word7}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="8th word"
                            value={8 + '.' + this.state.word8}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="9th word"
                            value={9 + "." + this.state.word9}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="10th word"
                            value={10 + '.' + this.state.word10}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="11th word"
                            value={11 + '.' + this.state.word11}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 15,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="12th word"
                            value={12 + "." + this.state.word12}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
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