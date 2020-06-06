'use strict';

import React, { Component } from 'react';
import {View,Text, Image, StyleSheet,TouchableOpacity, ImageBackground,BackHandler,Alert} from 'react-native'
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image from '../../assets/leftArrow.png';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode-svg';

class Recieve extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.backAction=this.backAction.bind(this);
    }

    componentDidMount(){
        this._retrieveData();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);

}

_retrieveData = () => {
    console.log("retrirve");
    try {
        AsyncStorage.getItem('items').then((value) => {
            var parsed_value = JSON.parse(value);
            console.log("async storage data", parsed_value);

            var account_name = parsed_value.items.accountName;

            console.log("Account Name",account_name);
            this.setState({
                AccountName: parsed_value.items.accountName,
            })

        }).catch((errr) => {
            console.log("error in retri", errr);
        });
    } catch (error) {
        // Error retrieving data
        console.log("error in retri", error);

    }
};

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
    render() { 
        return ( 
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity
                    style={{justifyContent:'center', alignItems:'center', }}
                    onPress={()=>{this.backAction()}}>
                    <Image source={Icon.Back_icon} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                    }}>Home</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('5%')}}>
                <Text style={{fontSize:20,color:'#a8a9ae'}}>Scan your QR Code.</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <ImageBackground
                resizeMode="contain"
                source={Icon.QR_code_frame}
                style={{
                height:hp('30%'), 
                justifyContent:'center',
                 alignItems:'center',
                 width:wp('60%'),
                 borderColor:'black'
                 }}>
                   
                   <QRCode
                    value={this.state.AccountName}
                    size={200}
                    bgColor='#000000'
                    fgColor='#FFFFFF'/>

                </ImageBackground>
                </View>
                <View style={{marginVertical:25, justifyContent:'center', alignItems:'center', fontSize:20, fontWeight:'700'}}>
                    <Text>
                        {this.state.AccountName}
                    </Text>
                </View>
                
            </View>
         );
    }
}
 
export default Recieve;

const Styles=StyleSheet.create({
container:{
    flex:1,
   
    
},
header: {
    flexDirection: 'row',
    backgroundColor: '#4383fc',
    height: 60,
    // backgroundColor:'red'
}
})
