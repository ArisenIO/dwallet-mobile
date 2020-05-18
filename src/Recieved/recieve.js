import React, { Component } from 'react';
import {View,Text, Image, StyleSheet} from 'react-native'

class Recieve extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={Styles.container}>
                <Text>
                    Hello,...
                </Text>
            </View>
         );
    }
}
 
export default Recieve;

const Styles=StyleSheet.create({
container:{
    flex:1,
    
}
})
