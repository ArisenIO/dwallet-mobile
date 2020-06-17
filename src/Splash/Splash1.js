import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {View, Text, TouchableOpacity, Image,StyleSheet} from 'react-native'
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Splash1 extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    async componentDidMount() {
       
        setTimeout(() => {
            //Actions.AppIntro();
// alert("ok")
Actions.replace('Splash')
        }, 1000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                style={{width:wp('100%'), height:hp('110%')}}
                resizeMode="contain"
                source={Icon.frist_splash}
                />  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
});
export default Splash1;