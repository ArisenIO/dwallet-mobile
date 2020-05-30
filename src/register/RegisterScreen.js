import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput,
    Text, Image, TouchableOpacity, Keyboard, BackHandler, Alert
} from "react-native";
import Clipboard from '@react-native-community/clipboard'
import { Button, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import image from '../../assets/leftArrow.png';
import { validation_reg } from '../../src/Validation/validation'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Dialog from "react-native-dialog";
import Toast from 'react-native-simple-toast';
import Loader1 from '../assets/Loader'
import Icon from '../assets/Icon';
import Modal from 'react-native-modal';


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountValue: 'RIX',
            AccountName: '',
            AccountName_error: '',
            accountStatus: false,
            checked: false,
            isModalVisible5: false,
            owner_private_keys: '',
            owner_public_keys: '',
            active_private_keys: '',
            active_public_keys: '',
            loader_visible: false,
            isLoading: false
        };
        this.backAction = this.backAction.bind(this);
        console.disableYellowBox = true;
    }
    componentDidMount() {
        // this._retrieveData();
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
            // alert("Not a valid character to enter");
            this.toggleModal()
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
                        this.setState({ Proceed: false, isLoading: false, error_msg: response.message })
                        // alert(response.message)
                        // this.setState({})
                        this.toggleModal2()
                    }
                })
                .catch(error => console.log(error)) //to catch the errors if any
        }
        else {
            this.setState({ isLoading: false })
            // alert("Account Name must be of 12 characters")
            this.toggleModal3()
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
                    // alert("Please enter valid Account Name")
                    this.toggleModal4()
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
        this.setState({ isModalVisible5: true });
    };

    hideDialog = () => {
        this.setState({ isLoading: false });
    };

    //   handleCancel = () => {
    //     this.setState({ dialogVisible: false });
    //   };

    handleCopy = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.writeToClipboard();
        this.setState({ isModalVisible5: false });
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

                this.hideDialog();

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



                    Actions.replace('homepage');
                }
                else {
                    Toast.show("Not Registered try later", Toast.LONG);
                }

            })
            .catch(error => console.log(error))
    };
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    toggleModal2 = () => {
        this.setState({ isModalVisible2: !this.state.isModalVisible2 });
    };
    toggleModal3 = () => {
        this.setState({ isModalVisible3: !this.state.isModalVisible3 });
    };
    toggleModal4 = () => {
        this.setState({ isModalVisible4: !this.state.isModalVisible4 });
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
                        onPress={() => { this.backAction() }}>
                        <Image source={Icon.Back_icon} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
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
                        style={{
                            width: wp('90%'), borderBottomWidth: wp('0.1%'), fontSize: 18,
                            borderColor: '#a8a9ae', height: hp('8%')
                        }}
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
                <View style={{ width: wp('100%'), justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('75%') }}>

                        <TouchableOpacity
                            onPress={() => { this._genrate() }}
                        >
                            <Image
                                resizeMode="contain"
                                source={Icon.Generate_btn}
                                style={{ width: wp('35%'), height: hp('8%') }}
                            />
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={() => { this._checkloop() }}
                        >
                            <Image
                                resizeMode="contain"
                                source={Icon.Checkip_btn}
                                style={{ width: wp('35%'), height: hp('8%') }}
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
                            <View style={{ marginVertical: hp('1%') }}>
                                <Text>
                                    Account Name is Available &#128512; please press proceed
                                </Text>
                            </View>
                            <TouchableOpacity style={{
                                height: hp('5%'), width: wp('35%'), borderRadius: 20,
                                backgroundColor: '#2dd5c9', justifyContent: 'center', alignItems: 'center'
                            }}
                                onPress={() => { this._proceed() }}
                            >
                                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
                                    Proceed
                    </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }


                <View>
                    {/* start Modal for copy key */}
                    <Modal isVisible={this.state.isModalVisible5}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 150, borderRadius: 10, width: 350, maxHeight: 450, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 240, height: 440, width:340 }}>
                        <View style={{ borderBottomWidth: 1,marginLeft:5, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>Keys Generated</Text>
                        </View>
                        <View style={{ height: 80,  justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>  Please keep your private and public keys safe somewhere it help you to restore your account.
                        </Text>
                        </View>
                        <View style={{ marginHorizontal:wp('1%'), width:340}}>
                            <Text style={{ fontSize: 13, fontWeight: '700' }}>
                                Owner keys:-
                    </Text>
                    <View style={{flexDirection:'row', }}>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>
                                Public keys: 
                            </Text>
                            <View style={{ width:250}}>
                            <Text style={{fontSize:12,color:'grey', marginLeft:2,textAlign:'center'}}>
                            {this.state.owner_public_keys}
                            </Text>
                            </View>
                          
                    </View>
                           
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>
                                Private keys: 
                            </Text>
                            <View style={{ width:250}}>
                            <Text style={{fontSize:12,color:'grey', marginLeft:2}}>
                            {this.state.owner_private_keys}
                            </Text>
                            </View>
                    </View>
                        </View>
                        <View style={{ marginHorizontal:wp('1%'), marginTop:5}}>
                            <Text style={{ fontSize: 13, fontWeight: '700' }}>
                         
                                Active keys:-
                    </Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>
                                Public keys: 
                            </Text>
                            <View style={{ width:250}}>
                            <Text style={{fontSize:12,color:'grey', marginLeft:2}}>
                            {this.state.active_public_keys}
                            </Text>
                            </View>
                    </View>
                           
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>
                                Private keys: 
                            </Text>
                            <View style={{ width:250}}>
                            <Text style={{fontSize:12,color:'grey', marginLeft:2}}>
                            {this.state.active_private_keys}
                            </Text>
                            </View>
                    </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 38, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center',
                                 backgroundColor: "#2dd5c9", borderRadius: 20, width: 200 }}
                                 onPress={()=>{this.handleCopy()}}
                            >
                                <Text style={{ fontSize: 14, fontWeight: "400", color: 'white' }}>Copy and Register</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 38, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center',
                                 backgroundColor: "#2dd5c9", borderRadius: 20, width: 200 }}
                                 onPress={()=>{
                                    this.setState({isModalVisible5: false})
                                    }}
                            >
                                <Text style={{ fontSize: 14, fontWeight: "400", color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                    {/*end  Modal for copy key  */}
                    {/* <Dialog.Container visible={this.state.dialogVisible}>
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
                    </Dialog.Container> */}
                </View>
                {/* Modal 1 Start */}
                <Modal isVisible={this.state.isModalVisible}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 240, width: 340 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error!</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}> Not a valid character to enter.</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}
                                onPress={() => { this.toggleModal() }}                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal 1 End */}

                {/* Modal 2 Start */}
                <Modal isVisible={this.state.isModalVisible2}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 240, width: 340 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error!</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 14 }}> {this.state.err}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}
                                onPress={() => { this.toggleModal2() }}                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal 2 End */}

                {/* Modal 3 Start */}
                <Modal isVisible={this.state.isModalVisible3}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 240, width: 340 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error!</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 14 , textAlign:'center'}}> Account name must be of 12 character.</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 30, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 80 }}
                                onPress={() => { this.toggleModal3() }}                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal 3 End */}

                {/* Modal 4 Start */}
                <Modal isVisible={this.state.isModalVisible4}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 240, width: 340 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error!</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20, textAlign:'center' }}> Please enter valid name.</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}
                                onPress={() => { this.toggleModal4() }}                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal 4 End */}

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
