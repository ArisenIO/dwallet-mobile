import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ButtonGroup } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class Pin_Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_password: '',
            btn: false,
            myData: [],
            myData_status: false,
            reset_text: false
        }
    }
    async componentDidMount() {
        try {
            this.fetchData()
        } catch (e) {
            console.log(e);
        }
    }

    fetchData = () => {
        AsyncStorage.getItem('pin_code').then(resp => {
            console.log("after getting data", resp)
            if (resp != null) {
                this.setState({ myData: JSON.parse(resp), myData_status: true })
            }
            else {
                this.setState({ myData_status: false })
            }
            console.log("__get__", this.state.myData)
        })
    }

    check_pin = () => {
        if(this.state.password===this.state.confirm_password){  
        if (this.state.myData_status == true) {
            if (this.state.myData.pin_code === this.state.confirm_password) {
                Actions.Createwallet();
            }
            else {
                alert("Please enter correct pin.")
            }
        }
        else {
            var pin_code = {
                "pin_code": this.state.confirm_password
            }
            console.log("___pin_code_in_ayncstorage", pin_code)
            AsyncStorage.setItem(
                'pin_code', JSON.stringify(pin_code)
            );
            Actions.Createwallet();
        }
    }
    else{
        alert("please enter correct pass")
    }
    }
    //  _removeData =()=>{
    //     this.setState({ reset_text: true })
    //     // AsyncStorage.removeItem('pin_code',JSON.stringify(this.state.myData))
    //          AsyncStorage.removeItem('pin_code',JSON.stringify(this.state.myData),()=>{this.check_pin()})
    // }
    render() {
        { console.log("__value", this.state.confirm_password) }
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={{
                    marginTop: 50, width: wp('100%'), height: hp('30%'), justifyContent: 'center', alignItems: 'center',
                }}>
                    <Image
                        source={Icon.App_logo1}
                        style={{ width: wp('80%'), height: hp('25%') }}
                    />
                </View>
                <View style={{ marginTop: 20, width: wp("100%"), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#379aff', fontSize: 20, fontWeight: '700' }}>
                        Enter your security pin code
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    {/* {
                        this.state.reset_text == true ?
                            <View style={{justifyContent:'center', alignItems:'center',marginVertical:hp('2%')}}> 
                                <Text style={{ color: '#1976D2', fontSize: 20 }}>Change your pin</Text>

                            </View>
                            :
                            null
                    } */}

                        <SmoothPinCodeInput
                        containerDefault={
                            { backgroundColor: 'red' }
                        }
                        password mask="﹡"
                        cellSize={36}
                        codeLength={4}
                        value={this.state.password}
                        onFulfill={() => { this.setState({ confirm: true }) }}
                        onTextChange={password => this.setState({ password })} />
                        {
                            this.state.confirm==true ?
                        <View >
                            <View style={{marginVertical:10}}>
                            <Text style={{color:'#379aff'}}>Confirm your password</Text>
                            </View>
                        
                    <SmoothPinCodeInput
                        containerDefault={
                            { backgroundColor: 'red' }
                        }
                        password mask="﹡"
                        cellSize={36}
                        codeLength={4}
                        value={this.state.confirm_password}
                        onFulfill={() => { this.setState({ btn: true }) }}
                        onTextChange={confirm_password => this.setState({ confirm_password })} />
                        </View>
                        :
                        null
                    }
                    {
                        this.state.btn == true ?
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', width: wp('100%'),
                        height: hp('15%'), justifyContent: 'space-between', marginVertical: hp('5%')
                    }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#1976D2', borderRadius: 10, borderWidth: wp('0.2%'),
                                width: wp('40%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center'
                            }}
                            onPress={() => { this.check_pin() }}
                        >
                            <Text style={{ color: 'white' }}>Done</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={{
                                backgroundColor: '#1976D2', borderRadius: 10, borderWidth: wp('0.2%'),
                                width: wp('40%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center'
                            }}
                            onPress={() => { this._removeData() }}
                        >
                            <Text style={{ color: 'white' }}>Reset Pin</Text>
                        </TouchableOpacity> */}

                    </View>
                     :
                            null
                    } 
                </View>
            </View>
        );
    }
}
export default Pin_Code;