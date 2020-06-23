import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native'
import Icon from '../assets/Icon'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Splash1 extends Component {
    constructor(props) {
        super(props);
        this.fadeAnim = new Animated.Value(1);
        console.disableYellowBox = true;
    }
    async componentDidMount() {

        Animated.timing(          // Animate over time
            this.fadeAnim, // The animated value to drive
            {
              toValue: 0,           // Animate to opacity: 1 (opaque)
              duration: 2000,
            }
          ).start(() => {
            console.log('fading out');
            Actions.replace('Splash')
          });
      

        // setTimeout(() => {
        //     Actions.replace('Splash')
        // }, 1000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{ ...this.props.style, opacity: this.fadeAnim }} >
                    <Image
                        style={{ width: wp('100%'), height: hp('110%') }}
                        resizeMode="contain"
                        source={Icon.frist_splash}
                    />
                </Animated.View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
export default Splash1;