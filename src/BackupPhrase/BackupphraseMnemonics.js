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
//import { PrivateKey } from '../../node_modules/@arisencore/ecc/lib/api_object'

const ethers = require('ethers');


export default class BackupphraseMnemonics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mnemonicslist: [],
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
            AccountName: ''
        };
        console.disableYellowBox = true;
        this.backAction = this.backAction.bind(this);

    }

    async componentDidMount() {
        // this.generate_mnemonics()
        try {

            var accountname = await AsyncStorage.getItem('accountName')
            this.setState({ AccountName: JSON.parse(accountname) })
            console.log('================================accountname', JSON.parse(accountname))
            BackHandler.addEventListener("hardwareBackPress", this.backAction);
            AsyncStorage.getItem('MnemonicsList').then(resp => {
                if (resp) {
                    var MnemonicsList = resp.split(/\s+/)
                    this.setState({ list: MnemonicsList })
                    console.log('=if case MnemonicsList', MnemonicsList)
                } else {
                    console.log("MnemonicsList=====elsecase", resp)
                }
            })
        } catch (err) {
            console.log('Error', err)
        }
    }

    // generate_mnemonics = () => {
    //     wallet = ethers.Wallet.createRandom();
    //     Mnemonic_List = wallet.mnemonic;
    //     var array_list = Mnemonic_List.split(/\s+/);
    //     this.setState({
    //         Mnemonicslist: Mnemonic_List,
    //         word1: array_list[0],
    //         word2: array_list[1],
    //         word3: array_list[2],
    //         word4: array_list[3],
    //         word5: array_list[4],
    //         word6: array_list[5],
    //         word7: array_list[6],
    //         word8: array_list[7],
    //         word9: array_list[8],
    //         word10: array_list[9],
    //         word11: array_list[10],
    // word12: array_list[11]
    // })

    // console.log("wallet mnemonic list",array_list[0], Mnemonic_List, ethers.utils.HDNode.isValidMnemonic("shikhar sri"));

    // master = PrivateKey.fromSeed(Mnemonic_List)
    // ownerPrivate = master.getChildKey('owner')
    // activePrivate = ownerPrivate.getChildKey('active')
    // console.log(ownerPrivate.toString(), " ", PrivateKey.fromString(ownerPrivate.toWif()).toPublic().toString(), "   ", activePrivate.toString(), PrivateKey.fromString(activePrivate.toWif()).toPublic().toString())
    // }


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
        }
        else if (word1 != this.state.list[0]) {
            Toast.show('1st word is not correct', Toast.SHORT)
        }
        else if (word2 != this.state.list[1]) {
            Toast.show('2nd word is not correct', Toast.SHORT)

        }
        else if (word3 != this.state.list[2]) {
            Toast.show('3rd word is not correct', Toast.SHORT)

        }
        else if (word4 != this.state.list[3]) {
            Toast.show('4th word is not correct', Toast.SHORT)

        }
        else if (word5 != this.state.list[4]) {
            Toast.show('5th word is not correct', Toast.SHORT)

        }
        else if (word6 != this.state.list[5]) {
            Toast.show('6th word is not correct', Toast.SHORT)

        }
        else if (word7 != this.state.list[6]) {
            Toast.show('7th word is not correct', Toast.SHORT)

        }
        else if (word8 != this.state.list[7]) {
            Toast.show('8th word is not correct', Toast.SHORT)

        }
        else if (word9 != this.state.list[8]) {
            Toast.show('9th word is not correct', Toast.SHORT)

        }
        else if (word10 != this.state.list[9]) {
            Toast.show('10th word is not correct', Toast.SHORT)

        }
        else if (word11 != this.state.list[10]) {
            Toast.show('11th word is not correct', Toast.SHORT)

        }
        else if (word12 != this.state.list[11]) {
            Toast.show('12th word is not correct', Toast.SHORT)

        }

        else {

            this.state.Mnemonicslist.push(word1)
            this.state.Mnemonicslist.push(word2)
            this.state.Mnemonicslist.push(word3)
            this.state.Mnemonicslist.push(word4)
            this.state.Mnemonicslist.push(word5)
            this.state.Mnemonicslist.push(word6)
            this.state.Mnemonicslist.push(word7)
            this.state.Mnemonicslist.push(word8)
            this.state.Mnemonicslist.push(word9)
            this.state.Mnemonicslist.push(word10)
            this.state.Mnemonicslist.push(word11)
            this.state.Mnemonicslist.push(word12)

            console.log('both array compare', this.state.Mnemonicslist, "===========", this.state.list)
            console.log('===========word1', word1, word2, word3, word4, word5, word6, word7, word8, word9, word10, word11, word12,'=====',Mnemonics)

            if (JSON.stringify(this.state.list) === JSON.stringify(this.state.Mnemonicslist)) {
                fetch("https://dmobileapi.arisen.network/avote/account/pass/phrase", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phrase: Mnemonic_List
                    })
                })
                    .then(response => response.json())
                    .then((response) => {
                        console.log("resp_for_check_api====>", response)
                        this.setState({
                            ActivePrivate: response.activePrivate,
                            ActivePublic: response.activePublicKey,
                            OwnerPrivate: response.ownerPrivate,
                            OwnerPublic: response.ownerPublicKey

                        }, () => {


                            console.log("active key", this.state.ActivePublic)
                        })
                        fetch("https://dmobileapi.arisen.network/avote/register", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                newAccountName: this.state.AccountName,
                                ownerPubKey: this.state.OwnerPublic,
                                activePubKey: this.state.ActivePublic
                            })
                        })
                            .then(response => response.json())
                            .then((response) => {

                                // this.hideDialog();

                                if (response.success) {
                                    Toast.show("Registered successfully on Blockchain", Toast.LONG);
                                    // AsyncStorage.setItem(
                                    //       'creds',
                                    //       JSON.stringify(copied_data));

                                    var items = {
                                        'accountName': this.state.AccountName,
                                        'active_keys': this.state.ActivePrivate,
                                        'active_public_keys': this.state.ActivePublic,
                                        'new_wallet': "1"
                                    }

                                    AsyncStorage.setItem(
                                        'items', JSON.stringify({ items })
                                    );

                                    //   AsyncStorage.setItem(
                                    //     'active_keys',this.state.active_private_keys
                                    //     );
                                    //     AsyncStorage.setItem(
                                    //         'new_wallet',"1"
                                    //         );



                                    Actions.replace('homepage');
                                }
                                else {
                                    Toast.show("Not Registered try later", Toast.LONG);
                                }

                            })



                    })
                    .catch(error => console.log(error)) //to catch the errors if any
            } else {
                Toast.show('Your Mnemonics dont matches,Try again', Toast.SHORT);

            }

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

                    <View style={styles.header}>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => { this.backAction() }}>
                            <Image source={Icons.Back_icon} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 22, color: 'white', textAlign: 'center',
                            justifyContent: 'center', alignSelf: 'center', marginStart: '2%', fontFamily: 'Montserrat-Bold',
                        }}>Confirm Mnemonic Phrase</Text>
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
                                Create PeepsID
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
    },
    header: {
        flexDirection: 'row',
        backgroundColor: "#4383fc",
        height: 60,
    }
});