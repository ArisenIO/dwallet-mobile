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
    _genrate=()=>{
        // alert('ok')
        fetch("http://51.15.78.253:3001/avote/random/word",{
            method:'GET'
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
    _checkloop=()=>{
        // alert('ok')
        fetch("http://51.15.78.253:3001/avote/account/lookup",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newAccountName:this.state.AccountName
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log("resp_for_check_api", response)
               if(response.success==true){
                   this.setState({Proceed:true})
               }
               else{
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

                {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '3%', marginRight: '3%' }}>
                    <Text style={{ color: 'grey', fontSize: 15 }}>
                        To start working with RIX you need an account.
                        Peeps Lab can sponsor your first account creation.
                        with 4KB RAM and 0.2 RIX delegated for CPU and NET resources.
                    </Text>
                </View> */}


                {/* <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1, marginLeft: '4%', marginRight: '4%', borderRadius: 5, height: 70, width: '80%', marginTop: '5%' }}>
                    <View style={{ position: 'absolute', backgroundColor: '#FFF', top: -16, left: 25, padding: 5, zIndex: 50 }}>
                        <Text style={{ color: 'grey', fontSize: 15, paddingRight: '1%' }}> Account type</Text>
                    </View>
                    <TextInput
                        style={{ }}
                        value={this.state.AccountValue}
                        placeholderTextColor="grey"
                    >
                    </TextInput>
                </View> */}


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '8%' }}>
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        borderColor: 'grey', borderWidth: 1, marginLeft: '4%',
                        marginRight: '4%', borderRadius: 5, height: 70, width: '60%'
                    }}>
                        <View style={{ position: 'absolute', backgroundColor: '#FFF', top: -16, left: 25, padding: 5, zIndex: 50 }}>
                            <Text style={{ color: 'grey', fontSize: 15, paddingRight: '1%' }}> Account Name</Text>
                        </View>
                        <TextInput
                            // style={{ backgroundColor: 'red' }}
                            value={this.state.AccountName}
                            placeholder="Enter 12 Letter unique name"
                            placeholderTextColor="black"
                            value={this.state.AccountName}
                            autoCapitalize="none"
                            maxLength={12}
                            editable={false}
                            onChangeText={( text) => { this.getEmail(text) }}
                            // maxLength={12}
                            // autoCapitalize='none'
                            // onChangeText={(AccountName) => { this.getAccountName(AccountName) }}
                            inputStyle={{ color: '#000', fontSize: 15, justifyContent: 'center', alignSelf: 'center'
                             }}>
                        </TextInput>


                    </View>

                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginRight: '2%' }}>
                        {/* <Button
                            title="CHECK"
                            onPress={this.checkBtn}
                            titleStyle={{ color: 'white', fontWeight: '500', fontSize: 14 }}
                            buttonStyle={{ borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 10, width: 100, alignSelf: 'center', backgroundColor: 'grey' }} /> */}
                        <TouchableOpacity 
                        onPress={()=>{this._genrate()}}
                        >
                            <View style={{
                                borderRadius: 80, width: 70, height: 40, alignItems: 'center', justifyContent: 'center',
                                 backgroundColor: '#491f92',
                                borderRadius: 10
                            }}
                            >
                                <Text style={{ color: '#fff', }}>Genrate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ }}>
                    <Text style={{ color: 'red',marginLeft:wp('5%') }}>{this.state.AccountName_error} </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('100%'), height: hp('15%'), }}>
                    <TouchableOpacity onPress={()=>{this._checkloop()}}
                        style={{ height: hp('5%'), width: wp('20%'), borderRadius: 10,
                         backgroundColor: '#491f92', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', }}>
                            Checkup
                    </Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.Proceed == true
                        ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('100%'), height: hp('15%'), }}>
                            <TouchableOpacity style={{ height: hp('5%'), width: wp('40%'), borderRadius: 10, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', }}>
                                    Proceed
                    </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }


                {/* <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <CheckBox
                        size={26}
                        checkedColor="#0f15a8"
                        checked={this.state.checked}
                        onIconPress={this.iconpress}
                        containerStyle={{}}

                    />
                    <Text style={{ color: 'black', fontSize: 18, marginTop: '2%' }}>Specify your own keys</Text>
                </View> */}
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
        backgroundColor: '#5364CD',
        height: 60
    }
});