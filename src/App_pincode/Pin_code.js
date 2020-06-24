import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Alert ,ScrollView,BackHandler,} from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ButtonGroup } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';


class Pin_Code extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirm_password: '',
            btn: false,
            myData: [],
            myData_status: false,
            reset_text: false,
            isModalVisible: false,
        }
        this.backAction=this.backAction.bind(this);
    }

    async componentDidMount() {
        try {
            this.fetchData()
        } catch (e) {
            console.log(e);
        }
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
      }

      backAction = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        return true;
      };

    fetchData = () => {
        AsyncStorage.getItem('pin_code').then(resp => {
            console.log("after getting data", resp)
            if (resp != null) {
                this.setState({ myData: JSON.parse(resp), myData_status: true })
            }
            else {
                this.setState({ myData_status: false })
            }
        })
    }

    check_pin = () => {
        if (this.state.password === this.state.confirm_password) {
            var pin_code = {
                "pin_code": this.state.confirm_password
            }
            console.log("___pin_code_in_ayncstorage", pin_code)
            AsyncStorage.setItem(
                'pin_code', JSON.stringify(pin_code)
            );
            Actions.Createwallet();
        }
        else if (this.state.myData_status == true) {
            if (this.state.myData.pin_code === this.state.confirm_password) {
                Actions.Createwallet();
            }
            else {
                alert("Please enter correct pin code.")
            }
        }
        else {
            alert("please enter correct pin code.")
        }
    }
    
    render() {
        { console.log("__value", this.state.confirm_password) }
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <ScrollView>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30, width: wp('100%'), height: hp('5%') }}>
                    <Text style={{ fontSize: 40, fontWeight: '700', color: '#379aff' }}>dWallet</Text>
                </View>
                <View style={{
                    width: wp('100%'), height: hp('30%'), justifyContent: 'center', alignItems: 'center',
                }}>
                    <Image
                        source={Icon.App_logo1}
                        style={{ width: wp('50%'), height: hp('25%') }}
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
                    {
                        this.state.myData_status == false ?
                            <View>
                                <SmoothPinCodeInput
                                    autoFocus={true}
                                    containerDefault={
                                        { backgroundColor: 'red' }
                                    }
                                    password mask="﹡"
                                    cellSize={36}
                                    codeLength={4}
                                    value={this.state.password}
                                    // onFulfill={() => { this.setState({ confirm: true }) }}
                                    onTextChange={password => this.setState({ password })} />

                                {/* {
                            this.state.confirm==true ? */}

                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ color: '#379aff' }}>Confirm your password</Text>
                                </View>
                            </View>
                            :
                            null
                    }
                    <View >
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
                    {/* :
                        null
                    } */}
                    {
                        this.state.btn == true ?
                            <View style={{
                                justifyContent: 'center', alignItems: 'center', width: wp('100%'),
                                height: hp('15%'), justifyContent: 'space-between', marginVertical: hp('2%')
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
                </ScrollView>
                {/* Modal Start */}
                <Modal isVisible={this.state.isModalVisible} style={{
                    backgroundColor: 'white',
                    marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ height: 240 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Exit?</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}>Are you sure you want to exit app?</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, alignItems: 'center', width: 150 }}
                                onPress={() => { this.setState({ isModalVisible: false }) }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}

                                onPress={() => BackHandler.exitApp()}
                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal end */}
                
            </View>
        );
    }
}
export default Pin_Code;