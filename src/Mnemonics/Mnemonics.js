import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, BackHandler, Platform, TextInput, Clipboard, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from '../assets/Icon'
import Modal from 'react-native-modal';
// import { PrivateKey, PublicKey } from '@arisencore/ecc'
import ethers from 'ethers'

export default class Mnemonic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mnemonics: 'service',
            clipboardText: "",

            data: [
                {
                    name: 'bird',
                    count: '1'
                },
                {
                    name: 'wolf',
                    count: '2'
                },
                {
                    name: 'stay',
                    count: '3'
                },
                {
                    name: 'parrot',
                    count: '4'
                },
                {
                    name: 'dirt',
                    count: '5'
                },
                {
                    name: 'bracket',
                    count: '6'
                },
                {
                    name: 'ridge',
                    count: '7'
                },
                {
                    name: 'clarify',
                    count: '8'
                },
                {
                    name: 'series',
                    count: '9'
                },
                {
                    name: 'ticket',
                    count: '10'
                },
                {
                    name: 'exclude',
                    count: '11'
                },
                {
                    name: 'true',
                    count: '12'
                },
            ]

        };
        console.disableYellowBox = true;
        this.backAction = this.backAction.bind(this);

    }

    async componentDidMount() {
        this.generate_mnemonic()
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }


    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    generate_mnemonic = () => {
        function dynamicSort(property) {
            var sortOrder = 1;

            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }

            return function (a, b) {
                if (sortOrder == -1) {
                    return b[property].localeCompare(a[property]);
                } else {
                    return a[property].localeCompare(b[property]);
                }
            }
            // Sort the MyData array with the custom function
            // that sorts alphabetically by the name key

        }
      var myData=  this.state.data.sort(dynamicSort("name"));
        this.setState({myData})
        console.log("data=======>", myData);
        
        // wallet = ethers.Wallet.createRandom();
        // Mnemonic_List = wallet.mnemonic
        // console.log("12 words in mnemonic list", Mnemonic_List)

        // console.log("wallet", Mnemonic_List, ethers.utils.HDNode.isValidMnemonic(Mnemonic_List));

        // master = PrivateKey.fromSeed(Mnemonic_List)
        // ownerPrivate = master.getChildKey('owner')
        // activePrivate = ownerPrivate.getChildKey('active')



        // console.log(ownerPrivate.toString(), " ", PrivateKey.fromString(ownerPrivate.toWif()).toPublic().toString(), "   ", activePrivate.toString(), PrivateKey.fromString(activePrivate.toWif()).toPublic().toString())
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

        let copiedText = await Clipboard.setString(this.state.Mnemonics);
        alert('text copied', copiedText)
    }
    renderItem = (item) => {
        return (<View style={{
            flexDirection: 'row', flex: 1, justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'),
            width: wp('100%')
        }}>

            <Text
                style={{
                    textAlign: 'center', justifyContent: 'center',
                    width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                    borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                }}
            >{item.count}. {item.name}</Text>
        </View>
        )
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ width: wp('95'), height: Platform.OS === 'ios' ? hp('7%') : hp('5%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('8%') }}>
                        <Text style={{ color: '#505050', fontFamily: 'Montserrat-Bold', fontSize: 22 }}>Your Mnemonic Phrase</Text>
                    </View>
                    <FlatList
                        data={this.state.myData}
                        numColumns={3}
                        renderItem={({ item }) => this.renderItem(item)}

                    />

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: hp('10%'), marginTop: hp('5%'), width: wp('100%') }}>

                        <TextInput
                            style={{
                                width: wp('30%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular',
                            }}
                            placeholder="Mnemonics"
                            value={1 + '.' + this.state.Mnemonics}
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
                            value={2 + '.' + this.state.Mnemonics}
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
                            value={3 + "." + this.state.Mnemonics}
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
                            value={4 + '.' + this.state.Mnemonics}
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
                            value={5 + '.' + this.state.Mnemonics}
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
                            value={6 + "." + this.state.Mnemonics}
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
                            value={7 + '.' + this.state.Mnemonics}
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
                            value={8 + '.' + this.state.Mnemonics}
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
                            value={9 + "." + this.state.Mnemonics}
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
                            value={10 + '.' + this.state.Mnemonics}
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
                            value={11 + '.' + this.state.Mnemonics}
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
                            value={12 + "." + this.state.Mnemonics}
                            placeholderTextColor='#a8a9ae'
                            autoCapitalize="none"
                            minLength={12}
                        // onChangeText={(text) => { this.set_to_account_name(text) }}
                        />

                    </View> */}

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