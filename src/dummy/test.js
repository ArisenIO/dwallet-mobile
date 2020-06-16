import React, { Component } from 'react';
import {
    StyleSheet,
    View, TextInput,
    Text, Image, TouchableOpacity, Keyboard, BackHandler, Alert,Modal, Platform
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class RegisterScreen extends Component {
constructor(props){
    super(props);
    this.state={
        isModalVisible:false  
    }
}
toggleModal1 = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
};

render(){
    return(
        <View>
            <Modal isVisible={this.state.isModalVisible1}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight:Platform.OS==="ios" ? hp('42%') : hp('40%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18,fontFamily: 'Montserrat-Bold'  }}>RIX Sent Successfully</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 14, textAlign: 'center' ,color:'blue',fontFamily: 'Montserrat-Regular' }}>Your Transaction Id is {this.state.transaction_hash}</Text>
                        </View>
                        <View style={{ width:wp('100%'),  height: hp('8%'),justifyContent:'center', alignItems:'center'}}>
                        <View style={{
                            justifyContent: 'space-between', alignItems: 'center',
                            height: hp('8%'), marginTop: hp('5%'), width: wp('95%'),flexDirection:'row'
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('45%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { 
                                    Linking.openURL("https://data.arisen.network/accounts/" + this.state.to_account_name)}
                                 }
                            >
                                <Text style={{ fontSize: 12, color: 'white' ,fontFamily: 'Montserrat-Bold' }}>Check Via Arisen Explorer</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('45%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal1() }}
                            >
                                <Text style={{ fontSize: 12, color: 'white',fontFamily: 'Montserrat-Bold'  }}>Cancel</Text>
                            </TouchableOpacity>

                        </View>

                        </View>
                       
                    </View>
                </Modal>
        </View>
    )
}
}