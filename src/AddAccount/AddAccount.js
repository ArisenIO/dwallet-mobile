import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput, TouchableOpacity,
    Text, ScrollView, Image, BackHandler, Alert
} from "react-native";
import { validation_quantity, validateName } from '../../src/Validation/validation'
// import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import image from '../../assets/leftArrow.png';
import eye from '../../assets/eye.png';
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
        if (this.state.AccountName_status) {
            if (this.state.txtStatus) {
                fetch("https://dmobileapi.arisen.network/avote/account/info", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        account: this.state.account,
                        private_key: this.state.private_key
                    })
                })
                    .then(response => response.json())
                    .then((response) => {
                        console.log("resp_for_check_api", response)
                        if (response.success == true) {

                            var items = {
                                'accountName': this.state.account,
                                'active_keys': this.state.private_key,
                                'new_wallet': "0"
                            }

                            AsyncStorage.setItem(
                                'items', JSON.stringify({ items })
                            );

                            //   AsyncStorage.setItem(
                            //     'active_keys',this.state.private_key
                            //     );
                            //     AsyncStorage.setItem(
                            //         'new_wallet',"0"
                            //         );

                            Actions.replace('homepage')
                        }
                        else if (response.success == false) {
                            this.setState({ error_msg: response.message })
                            // alert(response.success.message)
                            this.toggleModal3()
                            console.log("error_msg_in_addAcount_", response.message)
                        }

                        //{"account": "loveaffair11", "active_private": "5J9dikvJnK3SmEHcoottXogsonjfBsDzQggYJDLmHFPGUve9vcB", 
                        //"active_public": "RSN75W8mipfTk4oSamxLWiBFQgUnHPvdwbbaRcNPDifhYd4YLGhJd",
                        // "owner_private": "5Ka2buLz2U39ae8Xe9PgAvq1hHhUdgXb5nvKxvawby39LUo2JEt", 
                        //"owner_public": "RSN7pjSWUaBSkv1J3ZJi5tbzuZWC8feTHbhtKt6ua5EqmsAGTaVdh"}

                        // if (response.success == true) {


                        //     this.setState({owner_private_keys: response.owner_private,
                        //         owner_public_keys:response.owner_public,
                        //         active_private_keys:response.active_private,
                        //         active_public_keys:response.active_public,
                        //         AccountName:response.account,
                        //         isLoading:false
                        //                     })
                        //     this.showDialog();

                        // }
                        // else {
                        //     alert("Please enter valid Account Name")
                        // }
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
        this.setState({ isModalVisible3: !this.state.isModalVisible3 });
    };
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { this.backAction() }}
                            style={{ justifyContent: 'center' }}>
                            <Image source={Icon.Back_icon} style={{ tintColor: 'white', height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />

                        </TouchableOpacity>
                        <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', marginStart: '2%' }}>Add Account</Text>
                    </View>
                    <View
                        style={{
                            width: wp('100%'), height: hp('8%'),
                            justifyContent: 'center', alignItems: 'center', marginTop: hp('5%')
                        }}>
                        <TextInput
                            style={{
                                width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%')
                            }}
                            placeholder="Enter your name"
                            value={this.state.to_account_name}
                            autoCapitalize="none"
                            minLength={12}
                            onChangeText={(text) => { this.set_to_account_name(text) }}
                        />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: 'red' }}>{this.state.AccountName_error} </Text>
                    </View>
                    <View style={{
                        width: wp('100%'), height: hp('8%'),
                        justifyContent: 'center', alignItems: 'center', marginTop: hp('5%')
                    }}>
                        <TextInput
                            style={{
                                width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                borderColor: 'gray', height: hp('8%')
                            }}
                            placeholder="Private Key"
                            value={this.state.private_key}
                            autoCapitalize="none"
                            keyboardType="default"
                            minLength={12}
                            onChangeText={(text) => { this.set_to_quantity(text) }}
                        />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: 'red' }}>{this.state.txtErrorMessage} </Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { this.nextbtn() }}
                        >
                            <Image
                                resizeMode="contain"
                                source={Icon.Next_btn}
                                style={{ width: wp('40%'), }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Modal 1 Start */}
                <Modal isVisible={this.state.isModalVisible}
                    backdropColor='rgba(230,242,235,0.9)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>Please enter your name</Text>
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
                                <Text style={{ fontSize: 18, color: 'white' }}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
                {/* Modal 1 End */}
                {/* Modal 2  Start */}
                <Modal isVisible={this.state.isModalVisible2}
                    backdropColor='rgba(230,242,235,0.9)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>Please enter your private key</Text>
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
                                <Text style={{ fontSize: 18, color: 'white' }}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
                {/* Modal 2 End */}
                {/* Modal 3 Start */}
                <Modal isVisible={this.state.isModalVisible3}
                    backdropColor='rgba(230,242,235,0.9)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.error_msg}</Text>
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
                                onPress={() => { this.toggleModal3() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white' }}>Ok</Text>
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
        height: 60
    }
});