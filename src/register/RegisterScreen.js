import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput,
    Text, Image, TouchableOpacity
} from "react-native";
import { Button, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import image from '../../assets/leftArrow.png';
import { validation_reg } from '../../src/Validation/validation'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountValue: 'RIX',
            AccountName: '',
            AccountName_error: '',
            accountStatus: false,
            checked: false,
        };
        console.disableYellowBox = true;
    }
    componentDidMount() {
    }
    iconpress = () => {
        if (this.state.checked == true) {
            this.setState({ checked: false })
        } else {
            this.setState({ checked: true })
        }
    }
    getEmail(AccountName) {
        this.setState({ AccountName: AccountName });
        this.state.AccountName_error = validation_reg(AccountName).error;
        this.state.accountStatus = validation_reg(AccountName).status;
    }
    _genrate = () => {
        // alert('ok')
        fetch("http://51.15.78.253:3001/avote/random/word", {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                console.log("resp_genrate_page__", response.account)
                this.setState({

                    AccountName: response.account
                }, () => { console.log("resp_in_for_account_token", this.state.AccountName) })
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }
    _checkloop = () => {
        // alert('ok')
        fetch("http://51.15.78.253:3001/avote/account/lookup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newAccountName: this.state.AccountName
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log("resp_for_check_api", response)
                if (response.success == true) {
                    this.setState({ Proceed: true })
                }
                else {
                    alert("Please enter the account name")
                }
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }
    _proceed = () => {
        fetch("http://51.15.78.253:3001/avote/account/lookup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newAccountName: this.state.AccountName
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log("resp_for_check_api", response)
                if (response.success == true) {
                    this.setState({ Proceed: true })
                }
                else {
                    alert("Please enter the account name")
                }
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={image} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                    }}>Register account</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '8%' }}>
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        borderColor: '#2D5E86', borderWidth: 1, marginLeft: '4%',
                        marginRight: '4%', borderRadius: 5, height: 70, width: '60%'
                    }}>
                        <View style={{ position: 'absolute', backgroundColor: '#FFF', top: -16, left: 25, padding: 5, zIndex: 50 }}>
                            <Text style={{ color: '#2D5E86', fontSize: 15, paddingRight: '1%' }}> Account Name</Text>
                        </View>
                        <TextInput
                            // style={{ backgroundColor: 'red' }}
                            value={this.state.AccountName}
                            placeholder="Enter 12 Letter unique name"
                            placeholderTextColor='#2D5E86'
                            value={this.state.AccountName}
                            autoCapitalize="none"
                            maxLength={12}
                            // editable={false}
                            onChangeText={(text) => { this.getEmail(text) }}
                            maxLength={12}
                            autoCapitalize='none'
                            // onChangeText={(AccountName) => { this.getAccountName(AccountName) }}
                            inputStyle={{
                                color: '#2D5E86', fontSize: 15, justifyContent: 'center', alignSelf: 'center'
                            }}>
                        </TextInput>
                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginRight: '2%' }}>
                        <TouchableOpacity
                            onPress={() => { this._genrate() }}
                        >
                            <View style={{
                                borderRadius: 80, width: 70, height: 40, alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#2D5E86',
                                borderRadius: 10
                            }}
                            >
                                <Text style={{ color: '#fff', }}>Genrate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{}}>
                    <Text style={{ color: 'red', marginLeft: wp('5%') }}>{this.state.AccountName_error} </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('100%'), height: hp('15%'), }}>
                    <TouchableOpacity onPress={() => { this._checkloop() }}
                        style={{
                            height: hp('5%'), width: wp('20%'), borderRadius: 10,
                            backgroundColor: '#2D5E86', justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{ color: '#fff', }}>
                            Checkup
                    </Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.Proceed == true
                        ?
                        <View style={{
                            justifyContent: 'center', alignItems: 'center', width: wp('100%'),
                            height: hp('15%'),
                        }}>
                            <TouchableOpacity style={{
                                height: hp('5%'), width: wp('40%'), borderRadius: 10,
                                backgroundColor: '#2D5E86', justifyContent: 'center', alignItems: 'center'
                            }}
                                onPress={() => { this._proceed() }}
                            >
                                <Text style={{ color: '#fff', }}>
                                    Proceed
                    </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#2D5E86',
        height: 60
    }
});