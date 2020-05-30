import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';

export default class ModalTester extends Component {
    state = {
        isModalVisible: true,
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Button title="Show modal" onPress={this.toggleModal} /> */}
                <TouchableOpacity
                    onPress={this.toggleModal}
                >
                    <Text>Show Modal</Text>
                </TouchableOpacity>
                <Modal isVisible={this.state.isModalVisible}
                    backdropColor='rgba(0,0,0,1)'
                    style={{
                        backgroundColor: 'white',
                        marginTop: 260, borderRadius: 10, width: wp('90%'), maxHeight: hp('32%'), justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: hp('28%') }}>
                        <View style={{ borderBottomWidth: 1, height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Error?</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.error_msg}jdhfkjdhfjfhjgfghfhjhgfj.</Text>
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
                                onPress={() => { this.toggleModal() }}
                            >
                                <Text style={{ fontSize: 18, color: 'white' }}>Ok</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>
            </View>
        );
    }
}