import React , {Component} from 'react'
import {View,Text, StyleSheet} from 'react-native'

class Send_money extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <View style={Styles.container}>
                <Text>
                    Hello Send Money....!
                </Text>
            </View>
          );
    }
}
 
export default Send_money;

const Styles=StyleSheet.create({
    container:{
        flex:1,
       
    }
})