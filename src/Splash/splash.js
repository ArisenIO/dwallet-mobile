import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    Animated,
    View, Text,Image, ImageBackground, Platform
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'

export default class Splash extends Component {
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
            //Actions.AppIntro();

            console.log("inside set timeout");

            AsyncStorage.getItem('items').then((value) =>{

                if(value){
                    Actions.replace('homepage')
                }
                else{
                    Actions.replace('AppIntro');
                }
             }).catch((errr)=>{
                console.log("error in retri",errr);
    
             });

        }, 3000);
        //     console.log("inside set timeout");

        //     AsyncStorage.getItem('creds').then((value) =>{

        //         if(value){
        //             Actions.homepage()
        //         }
        //         else{
        //             Actions.AppIntro();
        //         }
        //      }).catch((errr)=>{
        //         console.log("error in retri",errr);
    
        //      });
        // }, 3000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                style={{width:wp('100%'), height:hp('110%')}}
                resizeMode="contain"
                source={Icon.Splash_Icon}
                />            
                  {/* <View style={{ width: wp('50%'), height: hp('50%'), justifyContent: 'center', alignItems: 'center' }}>
                   <Image
                   style={{ width: wp('50%'), height: hp('30%'), }}
                   source={Icon.App_logo1}
                   resizeMode="contain"
                   />
                </View>

                <View style={{ width: wp('100%'), height: hp('20%'), marginTop: hp('2%'), justifyContent: 'flex-end' }}>
                    <View style={{
                        width: wp('100%'), height: hp('5%'), justifyContent: 'center',
                        alignItems: 'center', marginTop: hp('5%')
                    }}>
                        <Text style={{ fontWeight: '700', fontSize: 35, color: '#356B97' }}>
                          dWallet App</Text></View>
                </View> */}

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
});