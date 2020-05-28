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
                <Modal isVisible={this.state.isModalVisible} style={{ backgroundColor:'white',
                 marginTop: 250, borderRadius: 10, width: 350, maxHeight: 150, justifyContent: 'center',
                  alignItems: 'center' }}>
                    <View style={{backgroundColor:'red' }}>
                        <View style={{ height:50,backgroundColor:"green", justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:20}}>
                            {this.state.error_msg}ehfduihdguhdu
                        </Text>
                        </View>
                    </View>                    
                    <TouchableOpacity
                    style={{  width:100, borderWidth:1,backgroundColor:'#4383fc',
                    borderRadius:10,justifyContent:'center', alignItems:'center', height:40}}
                    onPress={()=>this.toggleModal()}
                    >
                        <Text>OK</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}