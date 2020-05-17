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


export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountName:'',
            staked_to_self:'',
            staked_to_others:'',
            core_liquid_balance:'',
            total_balance:'',
            owner_privte_key:'',
            active_private_key:'',
            owner_public_key:'',
            active_public_key:''
        };
        console.disableYellowBox = true;
    }


    componentDidMount() {

        this._retrieveData();


    }

    _retrieveData = () => {

        console.log("retrirve");
        try {
         AsyncStorage.getItem('creds').then((value) =>{


            var parsed_value = JSON.parse(value);

            console.log("async storage data",parsed_value);

            this.setState({AccountName:parsed_value.Account_name,
            active_private_key:parsed_value.active_private_keys
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

                    if(response.account.core_liquid_balance){
                        this.setState({core_liquid_balance:response.account.core_liquid_balance})
                    }
                    else{
                        this.setState({core_liquid_balance:"0.0000"})
                    }

                    var cpu_weigt = parseFloat(response.account.self_delegated_bandwidth.cpu_weight);
                    var net_weight = parseFloat(response.account.self_delegated_bandwidth.net_weight);

                    var stakedtoself = cpu_weigt+net_weight;
                    this.setState({staked_to_self:stakedtoself})
                    
                    var totalBalance = stakedtoself + parseFloat(this.state.core_liquid_balance);
                    this.setState({total_balance:totalBalance})




                }
                else {
                    alert(response.message)
                }
            })
            .catch(error => console.log(error)) //to catch the errors if any
        

            
         }).catch((errr)=>{
            console.log("error in retri",errr);

         });
          
        } catch (error) {
          // Error retrieving data
        }
      };

      _transferFunds = () =>{

        // axios.post(`http://51.15.78.253:3001/avote/transfer`,{
        //     from:from,
        //     to:to,
        //     quantity:quantity,
        //     memo:memo,
        //     private_key:private_key
        //   })

        fetch("https://dmobileapi.arisen.network/avote/transfer", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // from: this.state.AccountName,
                // to : "shikhar",
                // quantity:"0.001",
                // memo:"hello",
                // private_key:this.state.active_private_key
                from: "shikhar",
                to : "stopstruggle",
                quantity:"0.001",
                memo:"hello",
                private_key:"5KYBQRonbjy7bcXhQLG4RWJxvNLEmuiALfeeQtwmA9b368nvdgh"
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log("resp_for_check_api", response)
                

            })
            .catch(error => console.log(error)) //to catch the errors if any
        }


        recieve_RIX = () => {
            console.log("recieve");
        }
       
      
    

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.AccountName}
                </Text>

                <View>
                    <Text>Liquid Balance: {this.state.core_liquid_balance} RIX</Text>
                </View>
                <View>
                    <Text>Staked to Self: {this.state.staked_to_self} RIX</Text>
                </View>
                {/* <View>
                    <Text>Staked to others : {this.state.staked_to_others} RIX</Text>
                </View> */}
                <View>
                    <Text>Total Balance: {this.state.total_balance} RIX</Text>
                </View>

                <TouchableOpacity onPress={() => { this._transferFunds() }}
                        style={{
                            height: hp('5%'), width: wp('20%'), borderRadius: 10,
                            backgroundColor: '#2D5E86', justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{ color: '#fff', }}>
                            Send
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.recieve_RIX() }}
                        style={{
                            height: hp('5%'), width: wp('20%'), borderRadius: 10,
                            backgroundColor: '#2D5E86', justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{ color: '#fff', }}>
                            Recieve
                    </Text>
                    </TouchableOpacity>

            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        marginLeft:30
    }
});