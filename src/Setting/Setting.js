import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'
import { Actions } from 'react-native-router-flux';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    backAction = () => {
        Actions.pop();
    }
    render() {
        return (
            <View style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.backAction() }}
                        style={{ justifyContent: 'center' }}>
                        <Image source={Icon.Back_icon}
                            style={{ height: 20, tintColor: 'white', width: 20, alignSelf: 'center', marginLeft: '4%' }} />

                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold',
                        justifyContent: 'center', alignSelf: 'center', marginStart: '2%'
                    }}>Setting Screen</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: hp('5%') }}>
                    <View style={{ justifyContent: 'space-between', height: hp('10%'), width: wp('80%') }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', }}>Rest Application:-</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700', }}>backup for key:-</Text>
                    </View>
                </View>


            </View>
        );
    }
}
const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        backgroundColor: '#4383fc',
        height: 60
    },
})
export default Setting;