import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image ,BackHandler} from 'react-native'
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
        this.backAction = this.backAction.bind(this);

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
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
      }
      backAction = () => {
        Actions.pop();
        return true;
      };
    writeToClipboard = async () => {
        var copied_data = {
            "Account_name": this.state.account_name,
            "active_private_key": this.state.active_key
        };
        await Clipboard.setString(JSON.stringify(copied_data));
        Toast.show('Copied', Toast.SHORT);
        this.setState({isModalVisible2:false})
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
                <TouchableOpacity
                            onPress={() => { this.setState({ isModalVisible: true }) }}
                            style={{ width: wp('100%'), height: hp('8%'),  justifyContent: 'center' , marginLeft:20}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: hp('8%'), width: wp('55%')}}>
                        <Image
                            resizeMode="contain"
                            source={Icon.Reset_icon}
                            style={{width:wp('7%'), marginTop:5 }}
                        />
                        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20,  }}>Reset Application</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{width:wp('100%'), height:hp('0.03%'), backgroundColor:'gray'}}></View>
                <TouchableOpacity
                 onPress={() => { this.setState({isModalVisible2:true}) }}
                style={{ width: wp('100%'), height: hp('8%'),  justifyContent: 'center' , marginLeft:20}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: hp('8%'), width: wp('32%')}}>
                       
                       <View style={{ justifyContent:'center', alignItems:'center'}}>
                       <Image
                            resizeMode="contain"
                            source={Icon.Backup_icon}
                            style={{width:wp('8%'), marginTop:5 }}
                        />
                           </View> 
                        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20,  }}>Backup</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* reset modal start */}
                <Modal isVisible={this.state.isModalVisible}
                 backdropColor='rgba(0,0,0,1)'
                style={{
                    backgroundColor: 'white',
                    marginTop: 250, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Alert?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign:'center' }}>Are you sure you want reset your data?</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', height: hp('5%'), marginTop: hp('5%')
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", 
                                borderRadius: 20, width: wp('37%') }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.setState({isModalVisible:false})}}
                            >
                                <Text style={{ fontSize: 18,  color: 'white' }}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", 
                                borderRadius: 20, width: wp('37%') }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.reset_data() }}
                            >
                                <Text style={{ fontSize: 18,  color: 'white' }}>Yes</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                {/* Modal end */}
                {/* start Modal for copy key */}
                <Modal isVisible={this.state.isModalVisible2}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 250, borderRadius: 10, width:wp('90%'), maxHeight: hp('36%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('34%'), width: wp('89%'), }}>
                        <View style={{ borderBottomWidth: 1, marginLeft: 5, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>Your Generated Keys</Text>
                        </View>
                        <View style={{ height: hp('8%'), justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>  Please keep your private and public keys safe somewhere it help you to restore your account.
                        </Text>
                        </View>
                        <View style={{ marginHorizontal: wp('1%'), width: wp('80%'), height:hp('23%') }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 2 , marginVertical:hp('1%')}}>
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
                            <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', height: hp('5%'), marginTop: hp('6%'), width:wp('86%')
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", 
                                borderRadius: 20, width: wp('37%') }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.setState({isModalVisible2:false})}}
                            >
                                <Text style={{ fontSize: 18,  color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", 
                                borderRadius: 20, width: wp('37%') }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.writeToClipboard() }}
                            >
                                <Text style={{ fontSize: 18,  color: 'white' }}>Copy</Text>
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