import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    Animated,
    View, Text
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';


export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountName:'',
            cpu_weight:'',
            net_weight:'',
            core_liquid_balance:''
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

            this.setState({AccountName:parsed_value.Account_name})

            fetch("http://51.15.78.253:3001/avote/search", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "shikhar"
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log("resp_for_check_api", response)
                if (response.success == true) {

                    this.setState({ Proceed: true })
                }
                else {
                    this.setState({ Proceed: false })
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

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    shikhar
                </Text>

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