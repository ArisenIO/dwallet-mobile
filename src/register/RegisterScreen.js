import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View, TextInput,
    Text, Image
} from "react-native";
import { Button, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import image from '../../assets/leftArrow.png';


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountValue: 'RIX',
            AccountName: '',
            checked: false

        };
        console.disableYellowBox = true;
    }


    componentDidMount() {

    }

    iconpress = () => {
        if (this.state.checked == true) {
            this.setState({ checked: false })
        } else {
            this.setState({ checked: true })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={image} style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: '4%' }} />
                    <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', marginStart: '2%' }}>Register account</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '3%', marginRight: '3%' }}>
                    <Text style={{ color: 'grey', fontSize: 15 }}>
                        To start working with RIX you need an account.
                        Peeps Lab can sponsor your first account creation.
                        with 4KB RAM and 0.2 RIX delegated for CPU and NET resources.
                    </Text>
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
                        <View style={{ position: 'absolute', backgroundColor: '#FFF', top: -16, left: 25, padding: 5, zIndex: 50 }}>
                            <Text style={{ color: 'grey', fontSize: 15, paddingRight: '1%' }}> Account Name</Text>
                        </View>
                        <TextInput
                            style={{ paddingLeft: '4%' }}
                            value={this.state.AccountName}
                            placeholderTextColor="grey"
                            placeholder="Enter 12 Letter unique name"
                            onChangeText={this.getAccountName}
                            inputStyle={{ color: '#000', fontSize: 13, justifyContent: 'center', alignSelf: 'center' }}>
                        </TextInput>
                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginRight: '2%' }}>
                        <Button
                            title="CHECK"
                            onPress={this.checkBtn}
                            titleStyle={{ color: 'white', fontWeight: '500', fontSize: 14 }}
                            buttonStyle={{ borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 10, width: 100, alignSelf: 'center', backgroundColor: 'grey' }} />
                    </View>
                </View>


                <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <CheckBox
                        size={26}
                        checkedColor="#0f15a8"
                        checked={this.state.checked}
                        onIconPress={this.iconpress}
                        containerStyle={{}}

                    />
                    <Text style={{ color: 'black', fontSize: 18, marginTop: '2%' }}>Specify your own keys</Text>
                </View>
            </View>

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