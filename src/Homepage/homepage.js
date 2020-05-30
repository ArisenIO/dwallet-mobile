import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity, Image, ScrollView, BackHandler, Alert
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Loader1 from '../assets/Loader'
import Icon from '../assets/Icon'
import image from '../../assets/leftArrow.png';
import Modal from 'react-native-modal';


export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountName: '',
            staked_to_self: '',
            staked_to_others: '',
            core_liquid_balance: '',
            total_balance: '',
            owner_privte_key: '',
            active_private_key: '',
            owner_public_key: '',
            active_public_key: '',
            isLoading: true,
        };
        this.backAction = this.backAction.bind(this);

        console.disableYellowBox = true;
    }
    componentDidMount() {
        this._retrieveData();
        BackHandler.addEventListener("hardwareBackPress", this.backAction);

    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    backAction = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        return true;
    };
    _retrieveData = () => {
        console.log("retrirve");
        try {
            AsyncStorage.getItem('items').then((value) => {
                var parsed_value = JSON.parse(value);
                console.log("async storage data", parsed_value);

                var account_name = parsed_value.items.accountName;

                console.log("Account Name", account_name);
                this.setState({
                    AccountName: parsed_value.items.accountName,
                    active_private_key: parsed_value.items.active_keys
                })
                fetch("https://dmobileapi.arisen.network/avote/search", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.state.AccountName
                    })
                })
                    .then(response => response.json())
                    .then((response) => {
                        console.log("resp_for_check_api", response)
                        if (response.success == true) {
                            this.setState({ isLoading: false })
                            if (response.account.core_liquid_balance) {
                                this.setState({ core_liquid_balance: response.account.core_liquid_balance })
                            }
                            else {
                                this.setState({ core_liquid_balance: "0.0000" })
                            }
                            var cpu_weigt = parseFloat(response.account.self_delegated_bandwidth.cpu_weight);
                            var net_weight = parseFloat(response.account.self_delegated_bandwidth.net_weight);
                            var stakedtoself = cpu_weigt + net_weight;
                            this.setState({ staked_to_self: stakedtoself })
                            var totalBalance = stakedtoself + parseFloat(this.state.core_liquid_balance);
                            this.setState({ total_balance: totalBalance })
                        }
                        else {
                            // alert(response.message)
                            this.setState({ error_msg: response.message })
                            this.toggleModal()
                        }
                    })
                    .catch(error => console.log(error)) //to catch the errors if any
            }).catch((errr) => {
                console.log("error in retri", errr);
            });
        } catch (error) {
            // Error retrieving data
        }
    };
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    _transferFunds = () => {
        Actions.Send_money();
        // alert("ok")
    }
    recieve_RIX = () => {
        Actions.Recieve();
    }
    setting = () => {
        Actions.Setting();
    }
    render() {
        if(this.state.isLoading){
            return(
            <Loader1/>
            )
          }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.backAction() }}
                        style={{ justifyContent: 'center', width: wp('10%') }}>
                        <Image source={Icon.Back_icon}
                            style={{ height: 20, tintColor: 'white', width: 20, alignSelf: 'center', marginLeft: '4%' }} />

                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('80%') }}>
                        <Text style={{
                            fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                            justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                        }}>Your Account Details</Text>
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: wp('10%'), }}>
                        <TouchableOpacity
                            onPress={() => { this.setting() }}                 >
                            <Image
                                source={Icon.Setting_icon}
                                resizeMode="contain"
                                style={{ height: 20, tintColor: 'white', width: 20, }}
                            />
                        </TouchableOpacity>

                    </View>

                </View>
                <ScrollView>
                    <View style={{
                        backgroundColor: '#4383fc', height: hp('22%'), width: wp('100%'),
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <View style={{
                            width: wp('75%'), height: hp('15%'),
                            justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                        }}>
                            {/* <Image
                            resizeMode="contain"
                            source={Icon.Profile_pic}
                            style={{ height: hp('10%'), width: wp('20%'), borderRadius: 75 }}
                        /> */}

                            <View style={{
                                height: hp('6%'), width: wp('100%'), justifyContent: 'center',
                                alignItems: 'center', 
                            }}>


                                <View style={{ width: wp('100%'), alignItems: 'center',
                                 justifyContent: 'center' }}>

                                    <Text style={{ color: '#ffffff', }}>Your Account Name is</Text>
                                    <Text style={{ color: '#ffffff', fontWeight: '700', marginTop: 15, fontSize: 25 }}>
                                        {/* hfgjdh */}
                                    {this.state.AccountName}
                                    </Text>

                                </View>


                                {/* <Text style={{ color: '#ffffff', }}>Balance Statement -></Text> */}
                            </View>
                        </View>

                    </View>
                    <View style={{ backgroundColor: '#4383fc', }}>
                        <Text style={{ color: '#ffffff', marginLeft: 30, fontWeight: '700', fontSize: 20, marginVertical: 5 }}>Balance Statement -></Text>
                    </View>

                    <View style={{ backgroundColor: '#4383fc' }}>
                        <View style={{
                            backgroundColor: '#e6e8e9', height: hp('55%'), width: wp('100%'), borderTopLeftRadius: 40,
                            justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 40
                        }}>
                            <View style={{
                                backgroundColor: '#ffffff', height: hp('10%'), width: wp('90%'),
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginVertical: hp("2%")
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: hp('3%'), width: wp('75%') }}>
                                    <Text style={{ color: '#75767b' }}>Liquid Balance</Text>
                                    <Text style={{ color: '#101217', fontWeight: '700' }}>
                                        {/* 2000 RIX */}
                                        {this.state.core_liquid_balance}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                backgroundColor: '#ffffff', height: hp('10%'), width: wp('90%'),
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginVertical: hp("2%")
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: hp('3%'), width: wp('75%') }}>
                                    <Text style={{ color: '#75767b' }}>Staked to Self</Text>
                                    <Text style={{ color: '#101217', fontWeight: '700' }}>
                                        {/* 200 RIX */}
                                        {this.state.staked_to_self}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                backgroundColor: '#ffffff', height: hp('10%'), width: wp('90%'),
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginVertical: hp("2%")
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: hp('3%'), width: wp('75%') }}>
                                    <Text style={{ color: '#75767b' }}>Total Balance</Text>
                                    <Text style={{ color: '#101217', fontWeight: '700' }}>
                                        {/* 20 RIX */}
                                        {this.state.total_balance}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', width: wp('90%'), marginTop: 45, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => { this._transferFunds() }}
                                    style={{
                                        justifyContent: 'center', alignItems: 'center', width: wp('42%'), height: hp('6%'),
                                        borderRadius: 15, borderWidth: wp('0.2%'), borderColor: '#101217'
                                    }}
                                >
                                    <Text style={{ color: '#101217', fontWeight: '700' }}>Send</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.recieve_RIX() }}
                                    style={{
                                        justifyContent: 'center', alignItems: 'center', width: wp('42%'), height: hp('6%'),
                                        borderRadius: 15, backgroundColor: '#2dd5c9'
                                    }}
                                >
                                    <Text style={{ color: '#ffffff', fontWeight: '700' }}>Recieve</Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                        {/* Modal 1 Start */}
                        <Modal isVisible={this.state.isModalVisible} style={{
                            backgroundColor: 'white',
                            marginTop: 250, borderRadius: 10, width: 350, maxHeight: 150, justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{}}>
                                <View style={{ height: 50, ustifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>
                                        {this.state.error_msg}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{
                                    width: 100, borderWidth: 1, backgroundColor: '#2dd5c9',
                                    borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: 40
                                }}
                                onPress={() => this.toggleModal()}
                            >
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </Modal>
                        {/* Modal 1 End */}
                        {/* Modal 2 start */}

                        <Modal isVisible={this.state.isModalVisible}
                            backdropColor='rgba(230,242,235,0.9)'
                            style={{
                                backgroundColor: 'white',
                                marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <View style={{ height: 240 }}>
                                <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center' }}>
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
                        {/* Modal 2 end */}
                    </View>
                    <View style={{ backgroundColor: '#e6e8e9', width: wp('100%'), height: hp('12%') }}>

                    </View>


                    {/* <View style={styles.account_name_container}>
                    <Text style={styles.account_name}>
                        Your Account Name </Text>
                    <Text style={styles.account_name}>
                        {this.state.AccountName}
                    </Text>
                </View>
                <View style={styles.blnc_main_cntr}>
                    <View style={styles.balance_name_container}>
                        <Text style={styles.account_name_blnce}>
                            Balance Statement
                    </Text>
                    </View>
                </View>

                <View style={styles.blac_cntr}>
                    <View style={styles.balance_container}>
                        <View style={styles.balance_inner_container}>
                            <Text style={styles.balance_name}>Liquid Balance:
                         </Text>
                            <Text style={styles.balance_amount}>
                                {this.state.core_liquid_balance} RIX
                         </Text>
                        </View>
                        <View style={styles.balance_inner_container}>
                            <Text style={styles.balance_name}>Staked to Self:
                         </Text>
                            <Text style={styles.balance_amount}>
                                {this.state.staked_to_self} RIX
                         </Text>
                        </View>
                        <View style={styles.balance_inner_container}>
                            <Text style={styles.balance_name}>Total Balance:
                         </Text>
                            <Text style={styles.balance_amount}>
                                {this.state.total_balance} RIX
                         </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.button1}>
                    <View style={styles.btn_inner_container}>
                        <View
                            style={styles.TouchableOpacity_btn_container}>
                            <TouchableOpacity
                                onPress={() => { this._transferFunds() }}
                                style={styles.TouchableOpacity}>
                                <Text style={styles.btn_text}>
                                    Send
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={styles.TouchableOpacity_btn_container}                        >
                            <TouchableOpacity
                                onPress={() => { this.recieve_RIX() }}
                                style={styles.TouchableOpacity}>
                                <Text style={styles.btn_text}>
                                    Recieve
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}
                </ScrollView>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#4383fc',
        height: 60,
        justifyContent: 'space-between'
    },
    account_name_container: {
        width: wp('100%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    balance_name_container: {
        borderRadius: 20,
        width: wp('50%'),
        marginVertical: hp('2%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1976D2',
    },

    account_name_blnce:
    {
        color: 'white'
    },
    account_name: {
        fontSize: 18,
        color: '#1976D2',

    },
    blac_cntr: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    balance_container: {

        width: wp('80%'),
        borderColor: 'gray',
        borderWidth: wp('1%'),
        height: hp('15%'),
        justifyContent: 'space-between'
    },
    blnc_main_cntr: {
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    balance_inner_container: {

        flexDirection: 'row',
        width: wp('70%'),
        height: hp('5%'),
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    balance_name: {
        color: '#1976D2',
        fontWeight: '700'
    },
    balance_amount: {
        marginLeft: wp('1%')
    },
    button1: {

        height: hp('50%'),
        justifyContent: 'flex-end',
        marginVertical: hp('3%'),

    },
    btn_inner_container: {
        justifyContent: 'space-between',

        height: hp('15%')
    },
    TouchableOpacity_btn_container: {
        width: wp('100%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    TouchableOpacity: {
        backgroundColor: '#1976D2',
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btn_text: {
        color: "white"
    }
});
