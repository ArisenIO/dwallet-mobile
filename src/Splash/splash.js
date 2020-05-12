import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    Animated,
    View, Text
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';



export default class splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restoredone: '',
            WalletCreated: '',
            Created: '',
            from_restore: ''
        };
        console.disableYellowBox = true;
    }


    async componentDidMount() {

        await AsyncStorage.getItem("RestoreDone").then((x2) => {
            if (x2) {
                this.state.restoredone = x2
            }
        })

        await AsyncStorage.getItem("WalletCreated").then((x1) => {
            if (x1) {
                this.state.WalletCreated = x1;
            }
        })

        await AsyncStorage.getItem("created").then((x1) => {
            if (x1) {
                this.state.Created = x1
            }
        });

        await AsyncStorage.getItem("restore").then((x2) => {
            if (x2) {
                this.state.from_restore = x2
            }
        })

        setTimeout(() => {
            console.log("inside set timeout");
            
            Actions.createwallet();
            // }
        }, 3000);
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: '50%' }}>
                    <Text style={{ fontSize: 25, color: 'red', alignSelf: 'center', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>
                        D Wallet From Arisen
                </Text>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ring: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    }
});