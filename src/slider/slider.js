import { Image } from 'react-native';
import React from 'react';
import Images from '../assets/Icon'
import Onboarding from 'react-native-onboarding-swiper';

const Simple = () => (
  <Onboarding
    onDone={() => {alert("ok")}}
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

export default Simple;