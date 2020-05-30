import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput,
    Text, Image, TouchableOpacity, Keyboard, BackHandler, Alert, Linking
} from "react-native";
import Clipboard from '@react-native-community/clipboard'
import { Button, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import image from '../../assets/leftArrow.png';
import { validation_quantity, validateName } from '../../src/Validation/validation'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog from "react-native-dialog";
import Toast from 'react-native-simple-toast';
import Loader1 from '../assets/Loader'
import Icon from '../assets/Icon'
import Modal from 'react-native-modal';

class Send_money extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountName: '',
            to_account_name: '',
            quantity: '',
            active_private_key: '',
            txtErrorMessage: '',
            txtStatus: false,
            isLoading: false,
            transaction_hash: ''

        }
        this.backAction = this.backAction.bind(this);

    }

    componentDidMount() {

        AsyncStorage.getItem('items').then((value) => {
            var parsed_value = JSON.parse(value);
            this.setState({
                AccountName: parsed_value.items.accountName,
                active_private_key: parsed_value.items.active_keys
            })
        })
        BackHandler.addEventListener("hardwareBackPress", this.backAction);

    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    backAction = () => {
        Actions.pop()

        return true;
    };

    // set_to_account_name = (txt) => {
    //     if (this.state.to_account_name == null) {
    //         this.setState({ AccountName_status: false, AccountName_error: "*please enter your name." })
    //     }
    //     else {
    //         this.setState({ AccountName_status: true, to_account_name: txt, AccountName_error: "" })
    //     }

    // }

    set_to_account_name(txt) {
        this.setState({ to_account_name: txt });
        this.state.AccountName_error = validateName(txt).error;
        this.state.AccountName_status = validateName(txt).status;

    }
    set_to_quantity(txt) {
        this.setState({ quantity: txt });
        this.state.txtErrorMessage = validation_quantity(txt).error;
        this.state.txtStatus = validation_quantity(txt).status;

    }

    _transfer = () => {
        if (this.state.AccountName_status) {
            if (this.state.txtStatus) {
                this.setState({ isLoading: true })
                var to_name = this.state.to_account_name;
                var quantity_ = parseFloat(this.state.quantity).toFixed(4);

                console.log("account name", to_name, quantity_);

                fetch("https://dmobileapi.arisen.network/avote/transfer/v1", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: this.state.AccountName,
                        to: to_name,
                        quantity: quantity_,
                        memo: "",
                        private_key: this.state.active_private_key
                    })
                })
                    .then(response => response.json())
                    .then((response) => {
                        this.setState({ isLoading: false })
                        console.log("_resp_for_transfer_", response, " TRANSACTION ", response)
                        if (response.success) {

                            var hash = response.transfer.transaction_id;
                            this.setState({
                                isModalVisible1: true,
                                transaction_hash: hash
                            })

                        }
                        else {
                            var error = JSON.parse(response.error);
                            var err = error.error.details[0].message;
                            // alert(err)
                            this.setState({ error_msg: err })
                            this.toggleModal()
                        }

                    })
                    .catch(error => console.log(error)) //to catch the errors if any
            }
            else {
                this.setState({ txtStatus: false, txtErrorMessage: '*please enter quantity.' })
            }
        }

        else {
            this.setState({ AccountName_status: false, AccountName_error: '*please enter your name.' })
        }

    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    toggleModal1 = () => {
        this.setState({ isModalVisible1: !this.state.isModalVisible1 });
    };


    render() {
        if (this.state.isLoading) {
            return (
                <Loader1 />
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => { this.backAction() }}
                    >
                        <Image source={Icon.Back_icon} style={{ height: 20, width: 20, tintColor: 'white', alignSelf: 'center', marginLeft: '4%' }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                    }}>Transfer RIX</Text>
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
                        value={this.state.to_account_name}
                        placeholder="To Name"
                        autoCapitalize="none"
                        minLength={12}
                        onChangeText={(text) => { this.set_to_account_name(text) }}
                        maxLength={12}
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
                        value={this.state.quantity}
                        placeholder="Quantity"
                        autoCapitalize="none"
                        keyboardType='number-pad'
                        minLength={12}
                        onChangeText={(text) => { this.set_to_quantity(text) }}
                    />
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ color: 'red' }}>{this.state.txtErrorMessage} </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { this._transfer() }}
                    >
                        <Image
                            resizeMode="contain"
                            source={Icon.Send_btn}
                            style={{ width: wp('40%'), }}
                        />
                    </TouchableOpacity>
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
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.error_msg}.</Text>
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
                {/*  start Modal for api response */}
                <Modal isVisible={this.state.isModalVisible1}
                    backdropColor='rgba(0,0,0,1)'
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
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.transaction_hash}</Text>
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
                                onPress={() => { this.toggleModal1() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white' }}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
                {/* End modal for api resp  */}
            </View>
        );
    }
}

export default Send_money;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#4383fc',
        height: 60
    }
})