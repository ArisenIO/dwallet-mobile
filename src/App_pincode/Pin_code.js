import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ButtonGroup } from 'react-native-elements';


class Pin_Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            btn: false
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('pin_code').then((value) => {
            var get_pin_code_ = JSON.parse(value);
            console.log("__Pincode_in_componentDidmount__", get_pin_code_)
        })
    }
    check_pin = (get_pin_code_) => {
        var pin_code = {
            "pin_code": this.state.password
        }
        console.log("___pin_code_in_ayncstorage", pin_code)
        AsyncStorage.setItem(
            'pin_code', JSON.stringify(pin_code)
        );
        if (get_pin_code_ == this.state.password) {
            alert("ok")
        }
    }
    render() {
        { console.log("__value", this.state.password) }
        return (
            <View style={{ flex: 1,backgroundColor:'white', }}>
                <View style={{  marginTop:50,width: wp('100%'), height: hp('30%'), justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Image
            
                        source={Icon.App_logo1}
                        style={{ width: wp('80%'), height: hp('25%') }}
                    />
                </View>
                <View style={{ marginTop: 20, width: wp("100%"), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#1976D2', fontSize: 20, fontWeight: '700' }}>
                        Enter your security pin code
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <SmoothPinCodeInput
                        containerDefault={
                            { backgroundColor: 'red' }
                        }
                        password mask="﹡"
                        cellSize={36}
                        codeLength={4}
                        value={this.state.password}
                        onFulfill={() => { this.setState({ btn: true }) }}
                        onTextChange={password => this.setState({ password })} />
                    {/* {
                    this.state.btn==true ? */}
                    <View style={{  justifyContent: 'center', alignItems: 'center', width: wp('100%'),
                     height: hp('15%') }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#1976D2', borderRadius: 10, borderWidth: wp('0.2%'),
                             width: wp('40%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => { this.check_pin() }}
                        >
                            <Text style={{color:'white'}}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    {/* :
                        null
                } */}
                </View>

            </View>

        );
    }
}

export default Pin_Code;