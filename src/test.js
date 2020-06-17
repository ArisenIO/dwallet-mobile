import React, { Component } from 'react';
import {View, Text,TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isModalVisible2:false
         };
    }
    toggleModal2 = () => {
        this.setState({ isModalVisible2: !this.state.isModalVisible2 });
    };
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>{this.setState({isModalVisible2:true})}}>
                <Text>Ok</Text>
                </TouchableOpacity>
               
              <Modal isVisible={this.state.isModalVisible2}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('28%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold',}}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' ,fontFamily: 'Montserrat-Regular',  }}>CAMERA permission denied</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            height: hp('5%'), marginTop: hp('5%'), width: wp('88%')
                        }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9",
                                    borderRadius: 20, width: wp('40%'), height: hp('5%'),
                                }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal2() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white',fontFamily: 'Montserrat-Bold', }}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
            </View>
        );
    }
}

export default Test;