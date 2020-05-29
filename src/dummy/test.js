import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ModalTester extends Component {
    state = {
        isModalVisible: false,
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
                <Modal isVisible={this.state.isModalVisible} style={{
                    backgroundColor: 'white',
                    marginTop: 250, borderRadius: 10, width: 350, maxHeight: 250, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ height: 240 }}>
                        <View style={{ borderBottomWidth: 1, height: 50, justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Exit?</Text>
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20 }}>Are you sure you want to exit app?</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', height: 50, marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, alignItems: 'center', width: 150 }}
                                onPress={() => { this.setState({ isModalVisible: false }) }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#2dd5c9", borderRadius: 20, width: 150 }}

                                // onPress={() => BackHandler.exitApp()}
                                onPress={() => { this.toggleModal }}
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