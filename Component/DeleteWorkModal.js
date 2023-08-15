import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Divider, Flex} from "native-base";
import Modal from "../Helper/modal";
import React from "react";
import Color from "../Helper/Color";


export default function DeleteWorkModal(props) {

    const state = props.state? props.state : false;
    const setState = props.setState? props.setState : ()=>{};
    const onDeleteButtonClick = props.onDeleteButtonClick? props.onDeleteButtonClick : ()=>{};
    const name = props.name? props.name : "?";

    return (
        <Modal
            visible={state}
            dismiss={() => setState(false)}
        >
            <View style={styles.modalView}>
                <Text style={styles.deleteModalText}>
                    <Text style={[styles.blueText, styles.boldText]}>'{name}'</Text>
                    <Text> </Text>
                    <Text>지울까요?</Text>
                </Text>
                <Divider></Divider>
                <Flex direction="row" style={{marginTop: 20}}>
                    <TouchableOpacity onPress={() => setState(false)} style={{marginRight: 40}} >
                        <Text style={[styles.grayText, styles.semiBoldText]}>아니요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDeleteButtonClick}>
                        <Text style={[styles.redText, styles.semiBoldText]}>지우기</Text>
                    </TouchableOpacity>
                </Flex>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    deleteModalText: {fontSize: 16, marginBottom: 20},
    boldText: {fontSize: 18, fontWeight: '600'},
    semiBoldText: {fontSize: 18, fontWeight: '400'},
    grayText: {color: 'black'},
    blueText: {color: Color.Blue},
    redText: {color: 'red'},
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 25,

        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})
