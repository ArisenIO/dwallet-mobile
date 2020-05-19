import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput,
    Text, Image, TouchableOpacity, Keyboard
} from "react-native";
import Clipboard from '@react-native-community/clipboard'
import { Button, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import image from '../../assets/leftArrow.png';
import { validation_quantity } from '../../src/Validation/validation'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog from "react-native-dialog";
import Toast from 'react-native-simple-toast';
import Loader1 from '../assets/Loader'

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
            isLoading: false

        }
    }

    componentDidMount() {

        AsyncStorage.getItem('creds').then((value) => {
            var parsed_value = JSON.parse(value);
            this.setState({
                AccountName: parsed_value.Account_name,
                active_private_key: parsed_value.active_private_keys
            })
        })

    }

    set_to_account_name = (txt) => {
        if (this.state.to_account_name == null) {
            this.setState({ AccountName_status: false, AccountName_error: "*please enter your name." })
        }
        else {
            this.setState({ AccountName_status: true, to_account_name: txt, AccountName_error: "" })
        }

    }
    set_to_quantity(txt) {
        this.setState({ quantity: txt });
        this.state.txtErrorMessage = validation_quantity(txt).error;
        this.state.txtStatus = validation_quantity(txt).status;

    }

    // set_to_quantity = (txt) => {
    //     this.setState({ quantity: txt });
    // }

    _transfer = () => {
        if (this.state.AccountName_status == true) {
            if (this.state.txtStatus == true) {
                this.setState({ isLoading: true })
                var to_name = this.state.to_account_name;
                var quantity_ = parseFloat(this.state.quantity).toFixed(4);

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
                        console.log("_resp_for_transfer_", response)
                        if (response.success) {

                        }
                        else {
                            var error = JSON.parse(response.error);
                            var err = error.error.details[0].message + " You Dont have Liquid Balance to Send";
                            alert(err)
                        }

                    })
                    .catch(error => console.log(error)) //to catch the errors if any
            }
            else {
                // alert("Please fill your ammont correctly..!")
                this.setState({ txtStatus: false, txtErrorMessage: "*Please Provide valid quantity no." })
            }
        }

        else {
            this.setState({ AccountName_status: false, AccountName_error: '*please enter your name.' })
        }

    }


    render() {
        if (this.state.isLoading) {
            return (
                <Loader1 />
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={image} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                    }}>Transfer RIX</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '8%' }}>
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        borderColor: '#1976D2', borderWidth: 1, marginLeft: '4%',
                        marginRight: '4%', borderRadius: 5, height: 70, width: '60%'
                    }}>
                        <View style={{ position: 'absolute', backgroundColor: '#FFF', top: -16, left: 25, padding: 5, zIndex: 50 }}>
                            <Text style={{ color: '#1976D2', fontSize: 15, paddingRight: '1%' }}> To Name</Text>
                        </View>
                        <TextInput
                            value={this.state.to_account_name}
                            placeholder="To account name"
                            placeholderTextColor='#1976D2'
                            autoCapitalize="none"
                            minLength={12}
                            onChangeText={(text) => { this.set_to_account_name(text) }}
                            maxLength={12}
                            inputStyle={{
                                color: '#1976D2', fontSize: 15, justifyContent: 'center', alignSelf: 'center'
                            }}>
                        </TextInput>
                    </View>

                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ color: 'red' }}>{this.state.AccountName_error} </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '8%' }}>
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        borderColor: '#1976D2', borderWidth: 1, marginLeft: '4%',
                        marginRight: '4%', borderRadius: 5, height: 70, width: '60%'
                    }}>
                        <View style={{ position: 'absolute', backgroundColor: '#FFF', top: -16, left: 25, padding: 5, zIndex: 50 }}>
                            <Text style={{ color: '#1976D2', fontSize: 15, paddingRight: '1%' }}> Quantity</Text>
                        </View>
                        <TextInput
                            value={this.state.quantity}
                            placeholder="Quantity"
                            placeholderTextColor='#1976D2'
                            autoCapitalize="none"
                            keyboardType='number-pad'
                            minLength={12}
                            onChangeText={(text) => { this.set_to_quantity(text) }}

                            inputStyle={{
                                color: '#1976D2', fontSize: 15, justifyContent: 'center', alignSelf: 'center'
                            }}>
                        </TextInput>

                    </View>
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ color: 'red' }}>{this.state.txtErrorMessage} </Text>
                </View>

                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: wp('100%'), height: hp('50%'), }}>
                    <TouchableOpacity onPress={() => { this._transfer() }}
                        style={{
                            height: hp('5%'), width: wp('90%'), borderRadius: 10,
                            backgroundColor: '#1976D2', justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{ color: '#fff', }}>
                            Send
                </Text>
                    </TouchableOpacity>
                </View>

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
        backgroundColor: '#2D5E86',
        height: 60
    }
})