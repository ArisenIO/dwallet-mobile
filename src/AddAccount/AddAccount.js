import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput, TouchableOpacity,
    Text, ScrollView, Image
} from "react-native";
import { Button, Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import image from '../../assets/leftArrow.png';
import eye from '../../assets/eye.png';
import Toast from 'react-native-simple-toast';

export default class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountValue: 'RIX',
            showPvtkey: true,
            confirmpvtkey: '',
            btnState: false
        };
        console.disableYellowBox = true;
    }


    componentDidMount() {

    }

    createBtn = () => {
        Actions.AddAccount();
    }

    restoreBtn = () => {
        Actions.RegisterScreen();
    }

    showPvtKeybtn = () => {
        if (this.state.showPvtkey == true) {
            this.setState({ showPvtkey: false })
        } else {
            this.setState({ showPvtkey: true })
        }
    }

    confirmpvtkey = (text) => {
        this.state.confirmpvtkey = text;
        console.log("confirmpvtkey>>>>>", text, this.state.confirmpvtkey);
    }

    nextbtn = () => {
        // if (this.state.confirmpvtkey == "") {
        //     Toast.show("Please enter active private key", Toast.SHORT);
        //     this.setState({ btnState: false })
        // } else {
        //     this.setState({ btnState: true })
        // }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={image} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                        <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', marginStart: '2%' }}>Add Account</Text>
                    </View>


                    <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1, marginLeft: '4%', marginRight: '4%', borderRadius: 5, height: 70, width: '80%', marginTop: '5%' }}>
                        <View style={{ position: 'absolute', backgroundColor: '#FFF', top: -16, left: 25, padding: 5, zIndex: 50 }}>
                            <Text style={{ color: 'grey', fontSize: 15, paddingRight: '1%' }}> Account type</Text>
                        </View>
                        <TextInput
                            style={{ paddingLeft: '4%' }}
                            value={this.state.AccountValue}
                            placeholderTextColor="grey"
                        >
                        </TextInput>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '8%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderColor: 'grey', borderWidth: 1, marginLeft: '4%', marginRight: '4%', borderRadius: 5, height: 70, width: '80%' }}>
                            <View style={{ width: '80%' }}>
                                <Input
                                    secureTextEntry={this.state.showPvtkey}
                                    style={{ paddingLeft: '4%' }}
                                    placeholderTextColor="grey"
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    placeholder="Active Private Key"
                                    onChangeText={this.getAccountName}
                                    inputStyle={{ color: '#000', fontSize: 13, justifyContent: 'center', alignSelf: 'center' }}>
                                </Input>
                            </View>

                            {this.state.showPvtkey == true ?
                                <Icon
                                    name='eye-slash'
                                    size={22}
                                    type='font-awesome'
                                    color='#0f15a8'
                                    underlayColor='transparent'
                                    onPress={this.showPvtKeybtn}
                                    containerStyle={{ justifyContent: 'center', alignSelf: 'center', margin: 25 }} />
                                :
                                <TouchableOpacity onPress={this.showPvtKeybtn}>
                                    <Image source={eye} style={{ height: 15, width: 25, margin: 25 }} />
                                </TouchableOpacity>}
                        </View>

                    </View>


                    {this.state.btnState == false &&
                        <View style={{ marginTop: '10%', opacity: 0.7 }}>
                            <Button
                                onPress={this.nextbtn()}
                                title="Next"
                                titleStyle={{
                                    color: 'white',
                                    fontSize: 14
                                }}
                                buttonStyle={{ borderWidth: 1, borderColor: '#0f15a8', borderRadius: 20, width: 250, alignSelf: 'center', backgroundColor: '#0f15a8' }} />
                        </View>}


                    {this.state.btnState == true &&
                        <View style={{ marginTop: '10%' }}>
                            <Button
                                onPress={this.nextbtn()}
                                title="Next"
                                titleStyle={{
                                    color: 'white',
                                    fontSize: 14
                                }}
                                buttonStyle={{ borderWidth: 1, borderColor: '#0f15a8', borderRadius: 20, width: 250, alignSelf: 'center', backgroundColor: '#0f15a8' }} />
                        </View>}

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#5364CD',
        height: 60
    }
});