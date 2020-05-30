import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard'
import Toast from 'react-native-simple-toast';


class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isModalVisible2: false
        }
    }
    async componentDidMount() {
        AsyncStorage.getItem('items').then(resp => {
            var data = JSON.parse(resp)
            console.log("resp", data)
            var name = data.items.accountName
            console.log("name", name)
            var key = data.items.active_keys
            this.setState({ account_name: name, active_key: key })
        })
    }
    writeToClipboard = async () => {
        var copied_data = {
            "Account_name": this.state.account_name,
            "active_private_key": this.state.active_key
        };
        await Clipboard.setString(JSON.stringify(copied_data));

        Toast.show('Copied', Toast.SHORT);
    }
    backAction = () => {
        Actions.pop();
    }
    reset_data = (data) => {
        AsyncStorage.removeItem('items', JSON.stringify(data))
        Actions.replace('Splash')
    }
    render() {
        { console.log("resp_name", this.state.account_name) }
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
                <View style={{ backgroundColor: '#e1e1e1', height: hp('93%') }}>
                    <View style={{ justifyContent: 'space-between', height: hp('15%'), width: wp('90%'), marginHorizontal: 10, marginVertical: 10 }}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ isModalVisible: true }) }}
                            style={{ backgroundColor: 'white', borderRadius: 10, height: hp('6.5%'), width: wp('90%'), justifyContent: 'center', padding: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', }}>Reset Application</Text>
                        </TouchableOpacity>
                        <View style={{ width: wp('90%'), height: hp('0.2%'), backgroundColor: 'black' }}></View>
                        <TouchableOpacity
                            onPress={() => { this.setState({ isModalVisible2: true }) }}
                            style={{ backgroundColor: 'white', borderRadius: 10, height: hp('6.5%'), width: wp('90%'), justifyContent: 'center', padding: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', }}>Backup </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* reset modal start */}
                <Modal isVisible={this.state.isModalVisible} style={{
                    backgroundColor: 'white',
                    marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ height: 240 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Hello?</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}>Are you sure you want reset your data?</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, alignItems: 'center', width: 150 }}
                                onPress={() => { this.setState({ isModalVisible: false }) }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.reset_data() }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal end */}
                {/* start Modal for copy key */}
                <Modal isVisible={this.state.isModalVisible2}
                    backdropColor='rgba(230,242,235,0.9)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 250, borderRadius: 10, width: 350, maxHeight: 240, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 250, width: 340, }}>
                        <View style={{ borderBottomWidth: 1, marginLeft: 5, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>Your Generated Keys</Text>
                        </View>
                        <View style={{ height: 80, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>  Please keep your private and public keys safe somewhere it help you to restore your account.
                        </Text>
                        </View>
                        <View style={{ marginHorizontal: wp('1%'), width: 340 }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 2 }}>
                                <Text style={{ fontSize: 12, fontWeight: '700', textAlign: 'center' }}>
                                    Account Name:
                            </Text>
                                <View style={{ width: 250 }}>
                                    <Text style={{ fontSize: 12, color: 'grey', marginLeft: 2, }}>
                                        {this.state.account_name}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: 2 }}>
                                <Text style={{ fontSize: 12, fontWeight: '700', textAlign: 'center' }}>
                                    Active keys:
                            </Text>
                                <View style={{ width: 250 }}>
                                    <Text style={{ fontSize: 12, color: 'grey', marginLeft: 2, textAlign: 'center' }}>
                                        {this.state.active_key}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35 }}>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center', alignItems: 'center',
                                        backgroundColor: "#2dd5c9", borderRadius: 20, width: 200
                                    }}
                                    onPress={() => { this.writeToClipboard() }}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Copy and Register</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
                {/*end  Modal for copy key  */}

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