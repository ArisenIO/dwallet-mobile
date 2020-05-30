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
                        marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{ height: 240, width: 340 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Send Details</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}> xysd,sbfmbdsf,mbdsnmg.</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}
                                onPress={() => { this.toggleModal() }}                                // onPress={() => { this.toggleModal }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </View>
        );
    }
}