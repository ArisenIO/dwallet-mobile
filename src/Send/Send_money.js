import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput,
    Text, Image, TouchableOpacity, Keyboard,BackHandler,Alert
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
            isLoading: false

        }
        this.backAction=this.backAction.bind(this);

    }

    componentDidMount() {

        AsyncStorage.getItem('creds').then((value) => {
            var parsed_value = JSON.parse(value);
            this.setState({
                AccountName: parsed_value.Account_name,
                active_private_key: parsed_value.active_private_keys
            })
        })
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
                            // alert(err)
                            this.setState({error_msg:err})
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
                    style={{justifyContent:'center', alignItems:'center',}}
                    onPress={()=>{this.backAction()}}
                    >
                    <Image source={Icon.Back_icon} style={{ height: 20, width: 20,tintColor:'white', alignSelf: 'center', marginLeft: '4%' }} />
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
                        style={{ width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18, 
                        borderColor: 'gray', height: hp('8%') }}
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
                        style={{ width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                         borderColor: 'gray', height: hp('8%') }}
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
                backdropColor='rgba(230,242,235,0.9)'
                style={{
                    backgroundColor: 'white',
                    marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ height: 240 , width:340}}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error?</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}>  {this.state.error_msg}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}
                                onPress={() => {this.toggleModal()}}                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal 1 End */}
                {/*  start Modal for api response */}
                <Modal isVisible={this.state.isModalVisible1}
                    backdropColor='rgba(230,242,235,0.9)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 240, width: 340 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Send Details</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}> xyz...d,sbfmbdsf,mbdsnmg.</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}
                                onPress={() => { this.toggleModal1() }}                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Confrim</Text>
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