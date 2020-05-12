import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    View,
    Text, ScrollView, Image
} from "react-native";
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


export default class Createwallet extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        console.disableYellowBox = true;
    }


    componentDidMount() {

    }

    createBtn = () => {
    }

    restoreBtn = () => {
        Actions.RegisterScreen();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '28%' }}>
                        <Text style={{ color: '#5364CD', fontSize: 20, textAlign: 'center' }}>
                            @LOGO
                    </Text>
                    </View>

                    <View style={styles.button1}>

                        <Button
                            title="Add Account"
                            onPress={this.createBtn}
                            titleStyle={{ color: 'white', fontWeight: '500', fontSize: 14 }}
                            buttonStyle={{ borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 10, width: 200, alignSelf: 'center' }} />

                        <Text style={{ alignSelf: 'center', padding: '6%', fontSize: 18, fontWeight: '500', color: '#5364CD' }}>
                            OR
                        </Text>

                        <Button
                            onPress={this.restoreBtn}
                            title="Register Account"
                            titleStyle={{ color: 'white', fontWeight: '500', fontSize: 14 }}
                            buttonStyle={{ borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 10, width: 200, alignSelf: 'center' }} />
                    </View>
                </View>
            </ScrollView>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button1: {
        flex: 1,
        marginTop: '50%',
    }
});