import React, { } from 'react';
import { View, Text, Image } from "react-native";
import {Loader1} from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Loader = (props) => {
    return (
       
                <View style={{ alignItems: 'center', justifyContent: "center", flex:1 }}>
                    <Image resizeMode='contain' source={Loader1} 
                    style={{ height: hp('8%'), width: wp('15%'), }}
                     />
                     <Text>Plesae wait...</Text>
                </View>
           
    )
}

export default Loader;