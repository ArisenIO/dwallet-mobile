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
import Setting from '../Setting/Setting'
import Splash1 from '../Splash/Splash1'
import Create_Pin from '../App_Security/createPin'
import Confirm_Pin from '../App_Security/confirmPin'
import Mnemonics from '../Mnemonics/Mnemonics'
import ConfirmMnemonics from '../Mnemonics/ConfirmMnemonic'
import BackupphraseMnemonics from '../BackupPhrase/BackupphraseMnemonics'
import ActiveKeys from '../BackupPhrase/ActiveKeys'

const Scenes = Actions.create(
    <Scene key='root' >
        <Scene key="Splash1"
            initial={true}
            hideNavBar={true}
            component={Splash1}
        />
        <Scene key="Splash"
            initial={false}
            hideNavBar={true}
            component={Splash}
        />
        <Scene key="AppIntro"
            initial={false}
            hideNavBar={true}
            component={AppIntro}
        />
        <Scene key="Create_Pin"
            initial={false}
            hideNavBar={true}
            component={Create_Pin}
        />
        <Scene key="Confirm_Pin"
            initial={false}
            hideNavBar={true}
            component={Confirm_Pin}
        />
        <Scene
            key="Createwallet"
            initial={false}
            hideNavBar={true}
            component={Createwallet}
        />
        <Scene key="Mnemonics"
            initial={false}
            hideNavBar={true}
            component={Mnemonics}
        />
        <Scene key="ConfirmMnemonics"
            initial={false}
            hideNavBar={true}
            component={ConfirmMnemonics}
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
        <Scene key="Setting"
            initial={false}
            hideNavBar={true}
            component={Setting}
        />
        <Scene key="BackupphraseMnemonics"
            initial={false}
            hideNavBar={true}
            component={BackupphraseMnemonics}
        />
        <Scene key="ActiveKeys"
            initial={false}
            hideNavBar={true}
            component={ActiveKeys}
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