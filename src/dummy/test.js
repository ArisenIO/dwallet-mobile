import React, { Component } from 'react';
import {
    StyleSheet,
    View, TextInput,
    Text, Image, TouchableOpacity, Keyboard, BackHandler, Alert
} from 'react-native'

export default class RegisterScreen extends Component {
constructor(props){
    super(props);
    this.state={

    }
}
render(){
    return(
        <View>
            <Text style={{justifyContent:'center', alignItems:'center', textAlign:'center',marginTop:100,
            fontFamily:'DancingScript-Regular'
        
        }}>
                Hello New class
            </Text>
        </View>
    )
}
}