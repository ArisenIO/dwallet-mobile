import React, { Component } from 'react';
import {View, TouchableOpacity, Text,StyleSheet,} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = (props) => {

    return (
        <View style={[styles.mainContainer, props.mainContainer]}>
            <TouchableOpacity onPress={props.onPress}
            style={[styles.touchableOpacity, props.touchableOpacity]}
            >
                    <Text style={[props.textStyle, styles.text]}>jhjeh{props.title}</Text>
            </TouchableOpacity>

        </View>
    )
}
export default CustomButton;
const styles=StyleSheet.create({
    touchableOpacity:{
        backgroundColor:'red',
     width:wp('90%'),
    height:hp('5%'),
     borderRadius:3,
     shadowColor:'gray',
     shadowOpacity:0.5,
     justifyContent:'center',
     alignItems:'center'
    
},
mainContainer:{
    justifyContent:'center',
    alignItems:'center',
  
},
textStyle:{
   fontSize:12,
   
}
})