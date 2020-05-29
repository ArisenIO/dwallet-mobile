import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet, View,
    Text, ScrollView, Image, TouchableOpacity
} from "react-native";
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../assets/Icon'
export default class Createwallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.disableYellowBox = true;
        this.backAction=this.backAction.bind(this);

    }
    async componentDidMount() {
        // try {
        //     this.fetchData()
        // } catch (e) {
        //     console.log(e);
        // }
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
      }
      backAction = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        //   Actions.pop()
        // Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //   {
        //     text: "Cancel",
        //     onPress: () => null,
        //     style: "cancel"
        //   },
        //   { text: "YES", onPress: () => BackHandler.exitApp() }
        // ]);
        return true;
      };
    createBtn = () => {
        this.setState({ b_2: !this.state.b_2 })
        Actions.AddAccount();
    }
    restoreBtn = () => {
        this.setState({ b_2: !this.state.b_2 })
        Actions.RegisterScreen();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginTop: hp('15%'), height: hp('25%')
                }}>
                    <Image
                        source={Icon.App_logo1}
                        resizeMode="contain"
                        style={{ width: wp('50%') }}
                    />
                </View>
                <View style={{ width: wp('100'), height: hp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#505050', fontWeight: '700', fontSize: 22 }}>Welcome!</Text>
                </View>
                <View style={{
                    marginTop: 10, width: wp('100%'), height: hp('10%'), justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ width: wp('70%'), height: hp('8%'), justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#a8a9ae', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>
                            Welcome to dWallet. To start working withthe wallet, just add your account here.
                            </Text>
                    </View>
                </View>
                <View style={styles.button1}>
                    <View
                        style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={this.createBtn}
                            style={{
                                backgroundColor: this.state.b_2 ? null : '#2dd5c9', width: wp('50%'), height: hp('6%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 25
                            }}
                        >
                            <Text style={{ color: this.state.b_2 ? '#379aff' : 'white', fontSize: 16, fontWeight: '700' }}>
                                Add Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={this.restoreBtn}
                            style={{
                                backgroundColor: this.state.b_2 ? '#2dd5c9' : null,
                                width: wp('50%'), height: hp('6%'),
                                justifyContent: 'center', alignItems: 'center', borderRadius: 25
                            }}
                        >
                            <Text style={{ color: this.state.b_2 ? 'white' : '#379aff', fontSize: 16, fontWeight: '700' }}>
                                Register Account
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Modal Start */}
                <Modal isVisible={this.state.isModalVisible} style={{
                    backgroundColor: 'white',
                    marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ height: 240 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Exit?</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}>Are you sure you want to exit app?</Text>
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

                                onPress={() => BackHandler.exitApp()}
                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal end */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white'
    },
    button1: {

        height: hp('13%'),
        justifyContent: 'space-between',
        marginVertical: hp('8%')
    }
});