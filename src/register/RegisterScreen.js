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
import { validation_reg } from '../../src/Validation/validation'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog from "react-native-dialog";
import Toast from 'react-native-simple-toast';
import Loader1 from '../assets/Loader'
import Icon from '../assets/Icon';
//wait reg on blockchain


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountValue: 'RIX',
            AccountName: '',
            AccountName_error: '',
            accountStatus: false,
            checked: false,
            dialogVisible: false,
            owner_private_keys: '',
            owner_public_keys: '',
            active_private_keys: '',
            active_public_keys: '',
            loader_visible: false,
            isLoading: false
        };
        console.disableYellowBox = true;
    }
    componentDidMount() {
    }
    goback = () => {
        Actions.Createwallet();
        // alert("ok")
    }
    iconpress = () => {
        if (this.state.checked == true) {
            this.setState({ checked: false })
        } else {
            this.setState({ checked: true })
        }
    }
    getAccountName(AccountName) {

        this.setState({ Proceed: false })

        var x = this.alphanumeric(AccountName);
        if (x) {
            this.setState({ AccountName: AccountName });
        }
        else {
            alert("Not a valid character to enter");
        }
    }
    _genrate = () => {
        this.setState({ Proceed: false, isLoading: true })
        fetch("https://dmobileapi.arisen.network/avote/random/word", {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                console.log("resp_genrate_page__", response.account)
                this.setState({
                    AccountName: response.account, isLoading: false
                }, () => { console.log("resp_in_for_account_token", this.state.AccountName) })
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }
    _checkloop = () => {
        this.setState({ isLoading: true })

        var accountname = this.state.AccountName;
        if (accountname.length == 12) {
            Keyboard.dismiss();
            fetch("https://dmobileapi.arisen.network/avote/account/lookup", {
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

                        this.setState({ Proceed: true, isLoading: false })
                    }
                    else {
                        this.setState({ Proceed: false })
                        alert(response.message)
                    }
                })
                .catch(error => console.log(error)) //to catch the errors if any
        }
        else {
            alert("Account Name must be of 12 characters")
        }
    }
    _proceed = () => {
        this.setState({ isLoading: false })
        fetch("https://dmobileapi.arisen.network/avote/account/keys", {
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

                //{"account": "loveaffair11", "active_private": "5J9dikvJnK3SmEHcoottXogsonjfBsDzQggYJDLmHFPGUve9vcB", 
                //"active_public": "RSN75W8mipfTk4oSamxLWiBFQgUnHPvdwbbaRcNPDifhYd4YLGhJd",
                // "owner_private": "5Ka2buLz2U39ae8Xe9PgAvq1hHhUdgXb5nvKxvawby39LUo2JEt", 
                //"owner_public": "RSN7pjSWUaBSkv1J3ZJi5tbzuZWC8feTHbhtKt6ua5EqmsAGTaVdh"}

                if (response.success == true) {


                    this.setState({
                        owner_private_keys: response.owner_private,
                        owner_public_keys: response.owner_public,
                        active_private_keys: response.active_private,
                        active_public_keys: response.active_public,
                        AccountName: response.account,
                        isLoading: false
                    })
                    this.showDialog();

                }
                else {
                    alert("Please enter valid Account Name")
                }
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }

    alphanumeric(inputtxt) {
        var txt = inputtxt.trim();
        var letters = /^[1-5a-z]+$/;
        if (txt == "") {
            this.setState({ AccountName: "" });
            return false;
        }
        if (letters.test(inputtxt)) {
            return true;
        }
        else {
            return false;
        }
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    //   handleCancel = () => {
    //     this.setState({ dialogVisible: false });
    //   };

    handleCopy = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.writeToClipboard();
        this.setState({ dialogVisible: false });
    };

    writeToClipboard = async () => {
        //To copy the text to clipboard

        //  this.setState({loader_visible:true})

        var copied_data = {
            "Account_name": this.state.AccountName,
            "owner_public_keys": this.state.owner_public_keys,
            "owner_private_keys": this.state.owner_private_keys,
            "active_public_keys": this.state.active_public_keys,
            "active_private_keys": this.state.active_private_keys

        };
        await Clipboard.setString(JSON.stringify(copied_data));

        Toast.show('Copied', Toast.SHORT);



        fetch("https://dmobileapi.arisen.network/avote/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newAccountName: this.state.AccountName,
                ownerPubKey: this.state.owner_public_keys,
                activePubKey: this.state.active_public_keys
            })
        })
            .then(response => response.json())
            .then((response) => {
                if (response.success) {
                    Toast.show("Registered successfully on Blockchain", Toast.LONG);
                    // AsyncStorage.setItem(
                    //       'creds',
                    //       JSON.stringify(copied_data));

                    var items = {
                        'accountName': this.state.AccountName,
                        'active_keys': this.state.active_private_keys,
                        'new_wallet': "1"


                    }

                    AsyncStorage.setItem(
                        'items', JSON.stringify({ items })
                    );

                    //   AsyncStorage.setItem(
                    //     'active_keys',this.state.active_private_keys
                    //     );
                    //     AsyncStorage.setItem(
                    //         'new_wallet',"1"
                    //         );

                    Actions.homepage();
                }
                else {
                    Toast.show("Not Registered try later", Toast.LONG);
                }

            })
            .catch(error => console.log(error))
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
                        style={{ justifyContent: 'center' }}
                        onPress={() => { this.goback() }}>
                        <Image source={image} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                    }}>Register Account</Text>
                </View>

                <View style={{
                    width: wp('100%'), height: hp('8%'),
                    justifyContent: 'center', alignItems: 'center', marginTop: hp('5%')
                }}>
                    <TextInput
                        style={{ width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                         borderColor: '#a8a9ae', height: hp('8%') }}
                        value={this.state.AccountName}
                        placeholder="Account Name"
                        placeholderTextColor='#a8a9ae'
                        autoCapitalize="none"
                        minLength={12}
                        onChangeText={(text) => { this.getAccountName(text) }}
                        maxLength={12}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginTop: hp('2%'), alignItems: 'center', width: wp('100%') }}>
                    <View style={{ width: wp('90%'), height: hp('10%') }}>
                        <Text style={{ textAlign: 'center', color: '#a8a9ae', fontSize: 13 }}>*Account name can contain numbers from 1-5 and letters from a-z (small case),There shouldn't be any special characters present in the account name</Text>
                    </View>
                </View>
                <View style={{width:wp('100%'), justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:wp('75%')}}>
                
                    <TouchableOpacity
                        onPress={() => { this._genrate() }}
                    >
                       <Image
                       resizeMode="contain"
                       source={Icon.Generate_btn}
                       style={{width:wp('35%'),height:hp('8%')}}
                       />
                    </TouchableOpacity>

                

                    <TouchableOpacity
                        onPress={() => { this._checkloop() }}
                    >
                       <Image
                       resizeMode="contain"
                       source={Icon.Checkip_btn}
                       style={{width:wp('35%'),height:hp('8%')}}
                       />
                    </TouchableOpacity>
              
                </View>
                </View>

                {
                    this.state.Proceed == true
                        ?
                        <View style={{
                            justifyContent: 'center', alignItems: 'center', width: wp('100%'),
                            height: hp('15%'),
                        }}>
                            <View style={{marginVertical:hp('1%')}}>
                                <Text>
                                    Account Name is Available &#128512; please press proceed
                                </Text>
                            </View>
                            <TouchableOpacity style={{
                                height: hp('5%'), width: wp('40%'), borderRadius: 10,
                                backgroundColor: '#2dd5c9', justifyContent: 'center', alignItems: 'center'
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


                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Keys Generated</Dialog.Title>
                        <Dialog.Description>
                            Please keep your private and public keys safe somewhere it help you to restore your account.
                </Dialog.Description>

                        <View>
                            <Text>
                                Owner keys:
                    </Text>
                            <Text>
                                Public keys: {this.state.owner_public_keys}
                            </Text>
                            <Text>
                                Private Keys : {this.state.owner_private_keys}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Active keys:
                    </Text>
                            <Text>
                                Public keys: {this.state.active_public_keys}
                            </Text>
                            <Text>
                                Private Keys : {this.state.active_private_keys}
                            </Text>
                        </View>
                        <Dialog.Button label="Copy and Register" onPress={this.handleCopy} />
                    </Dialog.Container>
                </View>

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
        backgroundColor: '#1976D2',
        height: 60
    }
});
