import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    Animated,
    View, Text,
    TouchableOpacity
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Loader1 from '../assets/Loader'

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
            isLoading:true,
        };
        console.disableYellowBox = true;
    }
    componentDidMount() {
        this._retrieveData();
    }
    _retrieveData = () => {
        console.log("retrirve");
        try {

            
    

            AsyncStorage.getItem('items').then((value) => {
                var parsed_value = JSON.parse(value);
                console.log("async storage data", parsed_value);
                this.setState({
                    AccountName: parsed_value.accountName,
                    active_private_key: parsed_value.active_keys
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
                        console.log("resp_for_check_api", response.account.account_name)
                        if (response.success == true) {
                            this.setState({isLoading:false})
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
                            alert(response.message)
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
    _transferFunds = () => {
        Actions.Send_money();
    }
    recieve_RIX = () => {
        Actions.Recieve();
    }
    render() {
        if(this.state.isLoading){
            return(
            <Loader1/>
            )
          }
        return (
            <View style={styles.container}>
                <View style={styles.account_name_container}>
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
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,

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
        color:'#1976D2',
       
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
