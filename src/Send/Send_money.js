import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, Keyboard, BackHandler, Alert, Linking, PermissionsAndroid, Platform, } from "react-native";
import Clipboard from '@react-native-community/clipboard'
import { Button, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { validation_quantity, validateName } from '../../src/Validation/validation'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog from "react-native-dialog";
import Toast from 'react-native-simple-toast';
import Loader1 from '../assets/Loader'
import Icon from '../assets/Icon'
import Modal from 'react-native-modal';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import ReactNativePinView from "react-native-pin-view"


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
            transaction_hash: '',
            qrvalue: '',
            opneScanner: false,
            cam: false,
            confirmedpinview: true,
            pincode: ''

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

        AsyncStorage.getItem('pin_code').then(resp => {
            let jsonvalue = JSON.parse(resp)
            console.log("after getting data", jsonvalue.pin_code)
            this.setState({ pincode: jsonvalue.pin_code })
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

    set_to_account_name(txt) {
        this.setState({ to_account_name: (txt).trim() });
        this.state.AccountName_error = validateName(txt).error;
        this.state.AccountName_status = validateName(txt).status;
    }

    set_to_quantity(txt) {
        this.setState({ quantity: (txt).trim() });
        this.state.txtErrorMessage = validation_quantity(txt).error;
        this.state.txtStatus = validation_quantity(txt).status;
    }

    _transfer = () => {
        if (this.state.AccountName_status) {
            if (this.state.txtStatus) {
                this.setState({ confirmedpinview: false })
            } else {
                this.setState({ txtStatus: false, txtErrorMessage: '*please enter quantity.' })
            }
        } else {
            this.setState({ AccountName_status: false, AccountName_error: '*please enter your name.' })
        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    toggleModal1 = () => {
        this.setState({ isModalVisible1: !this.state.isModalVisible1 });
    };

    toggleModal2 = () => {
        this.setState({ isModalVisible2: !this.state.isModalVisible2 });
    };

    toggleModal3 = () => {
        this.setState({ isModalVisible3: !this.state.isModalVisible3 });
    };

    onOpneScanner() {
        var that = this;
        // this.setState({cam:true})
        //To Start Scanning
        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'CameraExample App Camera Permission',
                        'message': 'CameraExample App needs access to your camera '
                    }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //If CAMERA Permission is granted
                        that.setState({ to_account_name: '' });
                        that.setState({ opneScanner: true, cam: true });

                    } else {
                        // alert("CAMERA permission denied");
                        that.toggleModal2()
                    }
                } catch (err) {
                    that.setState({ err: err })
                    that.toggleModal3()
                    alert("Camera permission err", err);
                    console.warn(err);
                }
            }
            //Calling the camera permission function
            requestCameraPermission();
        } else {
            that.setState({ to_account_name: '' });
            that.setState({ opneScanner: true });
        }
    }


    //   onOpenlink() {
    //     //Function to open URL, If scanned 
    //     Linking.openURL(this.state.to_account_name);
    //     //Linking used to open the URL in any browser that you have installed
    //   }


    onBarcodeScan(to_account_name) {
        //called after te successful scanning of QRCode/Barcode
        this.set_to_account_name(to_account_name);
        this.setState({ to_account_name: to_account_name });
        this.setState({ opneScanner: false });
    }

    enterValue = (value) => {
        this.setState({ enteredPin: value }, () => {
            if (this.state.enteredPin.length > 0) {
                this.setState({ showRemoveButton: true })
            } else {
                this.setState({ showRemoveButton: false })
            }
            if (this.state.enteredPin.length === 6) {
                this.setState({ showCompletedButton: true })
            } else {
                this.setState({ showCompletedButton: false })
            }
            console.log("Ok..", this.state.enteredPin)
        })
    }

    Create = () => {
        console.log("callin", this.state.pincode, this.state.enteredPin);
        if (this.state.pincode == this.state.enteredPin) {
            this.setState({ isLoading: true, confirmedpinview: true, })
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
            Toast.show("Wrong pin entered", Toast.LONG)
            this.setState({ confirmedpinview: true })
        }
    }



    render() {
        if (this.state.isLoading) {
            return (
                <Loader1 />
            )
        }
        if (!this.state.opneScanner) {
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
                            fontSize: 22, color: 'white', textAlign: 'center', fontFamily: 'Montserrat-Bold',
                            justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                        }}>Transfer RIX</Text>
                    </View>

                    {this.state.confirmedpinview ?
                        <View>
                            <View style={{ width: wp('100%'), justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    width: wp('90%'), height: hp('8%'),
                                    justifyContent: 'space-between', alignItems: 'center', marginTop: hp('5%'), flexDirection: 'row'
                                }}>
                                    {this.state.cam === false ?
                                        <TextInput
                                            style={{
                                                width: wp('70%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular'
                                            }}
                                            value={this.state.to_account_name}
                                            placeholder="To Name"
                                            autoCapitalize="none"
                                            placeholderTextColor='#a8a9ae'
                                            minLength={1}
                                            onChangeText={(text) => { this.set_to_account_name(text) }}
                                            maxLength={12}
                                        />
                                        :
                                        <TextInput
                                            style={{
                                                width: wp('70%'), borderBottomWidth: wp('0.1%'), fontSize: 18, backgroundColor: 'red',
                                                borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular'
                                            }}
                                            value={this.state.to_account_name}
                                            placeholder="Enter Account Name"
                                            autoCapitalize="none"
                                            editable={true}
                                            placeholderTextColor='#a8a9ae'
                                            minLength={1}
                                            onChangeText={(text) => { this.set_to_account_name(text) }}
                                            maxLength={12}
                                        />
                                    }

                                    <TouchableOpacity
                                        onPress={() => this.onOpneScanner()}
                                    >
                                        <Image
                                            style={{ width: wp('10%'), height: hp('8%') }}
                                            source={Icon.Camera_icon}
                                            resizeMethod="resize"
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ color: 'red', fontFamily: 'Montserrat-Regular' }}>{this.state.AccountName_error} </Text>
                            </View>
                            <View style={{ width: wp('100%'), height: hp('8%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                                <TextInput
                                    style={{ width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18, borderColor: 'gray', height: hp('8%'), color: 'black', fontFamily: 'Montserrat-Regular' }}
                                    value={this.state.quantity}
                                    placeholder="Quantity"
                                    autoCapitalize="none"
                                    placeholderTextColor='#a8a9ae'
                                    keyboardType='numeric'
                                    minLength={12}
                                    onChangeText={(text) => { this.set_to_quantity(text) }}
                                />
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ color: 'red', fontFamily: 'Montserrat-Regular' }}>{this.state.txtErrorMessage} </Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => { this._transfer() }}
                                    style={{justifyContent: 'center', alignItems: 'center', width: wp('42%'), height: hp('6%'),borderRadius: 15, backgroundColor: '#2dd5c9', marginTop: 20 }} >
                                    <Text style={{ color: '#ffffff', fontFamily: 'Montserrat-Bold' }}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                         :
                        <View>
                            <View style={{ marginVertical: hp('7%') }}>
                                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold',textAlign:'center' }}>Enter your security pincode</Text>
                            </View>
                            <ReactNativePinView
                                inputSize={32}
                                ref={this}
                                pinLength={6}
                                buttonSize={60}
                                onValueChange={value => { this.enterValue(value) }}
                                buttonAreaStyle={{
                                    marginTop: 25,
                                }}
                                inputAreaStyle={{
                                    marginBottom: 25,
                                }}
                                inputViewEmptyStyle={{
                                    backgroundColor: "transparent",
                                    borderWidth: 1,
                                    borderColor: "black",
                                }}
                                inputViewFilledStyle={{
                                    backgroundColor: "black",
                                }}
                                buttonViewStyle={{
                                    borderWidth: 1,
                                    borderColor: "black",
                                }}
                                buttonTextStyle={{
                                    color: "black",
                                }}
                                onButtonPress={key => {
                                    if (key === "custom_left") {
                                        this.current.clear()
                                    }
                                    if (key === "custom_right") {
                                        this.Create()
                                    }

                                }}
                                customLeftButton={this.state.showRemoveButton ?
                                    <Image
                                        source={Images.Back_Icn}
                                        resizeMode="contain"
                                        resizeMethod="resize"
                                        style={{ width: wp('10%'), height: hp('5%') }}
                                    />
                                    :
                                    undefined}

                                customRightButton={this.state.showCompletedButton ?

                                    <TouchableOpacity onPress={() => { this.Create() }}>
                                        <Image
                                            source={Images.done_Icon}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                            style={{ width: wp('10%'), height: hp('5%'), }}
                                        />
                                    </TouchableOpacity> :
                                    undefined}
                            />
                        </View>
                    }

                    {/* Modal 1 Start */}
                    <Modal isVisible={this.state.isModalVisible}
                        backdropColor='rgba(0,0,0,1)'
                        style={{
                            backgroundColor: 'white',
                            marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('40%'), justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <View style={{ height: hp('28%') }}>
                            <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold' }}>Error?</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Montserrat-Regular' }}>{this.state.error_msg}.</Text>
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
                                    <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Bold' }}>Ok</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>
                    {/* Modal 1 End */}
                    {/*  start Modal for api response */}
                    <Modal isVisible={this.state.isModalVisible1}
                        // backdropColor='rgba(0,0,0,1)'
                        style={{backgroundColor: 'white',marginTop: 260, borderRadius: 20, width: wp('92%'), maxHeight: Platform.OS === "ios" ? hp('42%') : hp('40%'), justifyContent: 'center',alignItems: 'center'}}>
                        <View style={{ height: hp('28%') }}>
                            <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Bold' }}>RIX Sent Successfully</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, width: wp('90%') }}>
                                <Text style={{ fontSize: 13, textAlign: 'center', color: 'blue', fontFamily: 'Montserrat-Regular' }}>Your Transaction Id is {this.state.transaction_hash}</Text>
                            </View>
                            <View style={{ width: wp('90%'), height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{justifyContent: 'space-around', alignItems: 'center',height: hp('8%'), marginTop: hp('5%'), width: wp('90%'), flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",borderRadius: 20, width: wp('45%'), height: hp('5%')}}
                                        onPress={() => {Linking.openURL("https://data.arisen.network/accounts/" + this.state.to_account_name)}}>
                                        <Text style={{ fontSize: 12, color: 'white', fontFamily: 'Montserrat-Bold',textAlign:'center' }}>Check Via Arisen Explorer</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: wp('45%'), height: hp('5%')}}
                                        onPress={() => { this.toggleModal1() }} >
                                        <Text style={{ fontSize: 12, color: 'white', fontFamily: 'Montserrat-Bold',textAlign:"center" }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* End modal for api resp  */}
                    {/* Cameraa Permission start modal */}
                    <Modal isVisible={this.state.isModalVisible2}
                        backdropColor='rgba(0,0,0,1)'
                        style={{
                            backgroundColor: 'white',
                            marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <View style={{ height: hp('28%') }}>
                            <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', }}>Error?</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Montserrat-Regular', }}>CAMERA permission denied</Text>
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
                                    onPress={() => { this.toggleModal2() }}
                                >
                                    <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Bold', }}>Ok</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>
                    {/* Camera Permission Modal End */}

                    {/* Cameraa Permission start modal */}
                    <Modal isVisible={this.state.isModalVisible3}
                        backdropColor='rgba(0,0,0,1)'
                        style={{
                            backgroundColor: 'white',
                            marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <View style={{ height: hp('28%') }}>
                            <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', }}>Error?</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Montserrat-Regular', }}>CAMERA permission denied</Text>
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
                                    <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Bold', }}>Ok</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>

                    {/* Camera Permission Modal End */}
                </View>
            );

        }
        return (
            <View style={{ flex: 1 }}>
                <CameraKitCameraScreen
                    showFrame={false}
                    //Show/hide scan frame
                    scanBarcode={true}
                    //Can restrict for the QR Code only
                    laserColor={'blue'}
                    //Color can be of your choice
                    frameColor={'yellow'}
                    //If frame is visible then frame color
                    colorForScannerFrame={'black'}
                    //Scanner Frame color
                    onReadCode={event =>
                        this.onBarcodeScan(event.nativeEvent.codeStringValue)
                    }
                />
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
        height: 60,
    }
})