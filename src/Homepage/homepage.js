import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    Animated,
    View, Text
} from "react-native";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        console.disableYellowBox = true;
    }


    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    HOME PAGE SCREEN
                </Text>

            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});