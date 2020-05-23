import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { appReducer } from '../Reducers/index';
import Splash from '../Splash/splash';
import Createwallet from '../createwallet/createwallet';
import Homepage from '../Homepage/homepage';
import RegisterScreen from '../register/RegisterScreen';
import AddAccount from '../AddAccount/AddAccount';
import AppIntro from '../slider/slider'
import Recieve from '../Recieved/recieve'
import Send_money from '../Send/Send_money' 
import Pin_Code from '../App_pincode/Pin_code'


const Scenes = Actions.create(
    <Scene key='root' >

        <Scene key="Splash"
            initial={true}
            hideNavBar={true}
            component={Splash}
        />
         <Scene key="AppIntro"
            initial={false}
            hideNavBar={true}
            component={AppIntro}
        />
        <Scene key="Pin_Code"
            initial={false}
            hideNavBar={true}
            component={Pin_Code}
        />
          <Scene
            key="Createwallet"
            initial={false}
            hideNavBar={true}
            component={Createwallet}
        />
       
        <Scene key="homepage"
            component={Homepage}
            hideNavBar={true}
        />

        <Scene key="AddAccount"
        initial={false}
            component={AddAccount}
            hideNavBar={true}
        />

        <Scene key="RegisterScreen"
            component={RegisterScreen}
            hideNavBar={true}
        />
          <Scene key="Recieve"
            initial={false}
            hideNavBar={true}
            component={Recieve}
        />
       

       <Scene key="Send_money"
            initial={false}
            hideNavBar={true}
            component={Send_money}
        />
    </Scene>
)

const ConnectReducer = connect()(Router)
const Store = createStore(appReducer)

export default class MainNavigator extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <ConnectReducer scenes={Scenes} />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});