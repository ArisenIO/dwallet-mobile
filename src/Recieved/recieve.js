import React, { Component } from 'react';
import {View,Text, Image, StyleSheet,TouchableOpacity} from 'react-native'
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image from '../../assets/leftArrow.png';

class Recieve extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity
                    style={{justifyContent:'center'}}
                    onPress={()=>{this.goback()}}>
                    <Image source={image} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                    }}>Home</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginVertical:hp('5%')}}>
                <Text style={{fontSize:20}}>Scan your QR Code.</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{borderWidth:wp('1%'),
                height:hp('30%'), 
                justifyContent:'center',
                 alignItems:'center',
                 width:wp('60%'),
                 borderColor:'black'
                 }}>
                    <Image

                    source={Icon.Qr_code}
                    resizeMode="contain"
                    />
                </View>
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
    backgroundColor: '#1976D2',
    height: 60
}
})
