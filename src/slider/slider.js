import React, { Component } from 'react'
import { Image, View, Text } from 'react-native';
import Images from '../assets/Icon'
import Onboarding from 'react-native-onboarding-swiper';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import Createwallet from '../createwallet/createwallet'

class AppIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !!value, loading: false });
    });
  }
  _onDone = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
      Actions.Createwallet();
    });
  };
  _onSkip = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
      Actions.Createwallet();
    });
  };
  render() {
    if (this.state.loading) return <ActivityIndicator size="large" />

    if (this.state.showRealApp) {
         return (
        <Createwallet />
      );
    }
    else {
           return (
        <Onboarding
          onDone={() => { this._onDone() }}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image source={Images.First_Silder} />,
              title: 'Onboarding',
              subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
              backgroundColor: '#fe6e58',
              image: <Image source={Images.First_Silder} />,
              title: 'The Title',
              subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
              backgroundColor: '#999',
              image: <Image source={Images.First_Silder} />,
              title: 'Triangle',
              subtitle: "Beautiful, isn't it?",
            },
          ]}
        />
      );
    }
  }
}
export default AppIntro;