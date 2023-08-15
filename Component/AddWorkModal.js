import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import {Divider, Flex} from "native-base";
import Modal from "../Helper/modal";
import React, {useState} from "react";
import Color from "../Helper/Color";

export default function AddWorkModal(props) {
	const [title, setTitle] = useState("");
	const state = props.state ? props.state : false;
	const setState = props.setState ? props.setState : () => {};
	const onAddButtonClick = props.onAddButtonClick
		? props.onAddButtonClick
		: () => {};

	function _onAddButtonClick() {
		onAddButtonClick(title);
		setTitle("");
	}

	return (
		<Modal visible={state} dismiss={() => setState(false)}>
			<View style={styles.modalView}>
				<Text style={styles.titleText}>새로운 작업</Text>
				<TextInput
					placeholder="제목을 입력하세요"
					value={title}
					onChangeText={setTitle}
					style={styles.input}
				/>
				<Divider />
				<Flex direction="row" style={{marginTop: 20}}>
					<TouchableOpacity
						onPress={() => setState(false)}
						style={{marginRight: 40}}>
						<Text style={[styles.grayText, styles.semiBoldText]}>취소</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={_onAddButtonClick}>
						<Text style={[styles.blueText, styles.semiBoldText]}>추가</Text>
					</TouchableOpacity>
				</Flex>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	titleText: {marginBottom: 10, fontWeight: "600", fontSize: 16},
	deleteModalText: {fontSize: 16, marginBottom: 20},
	boldText: {fontSize: 18, fontWeight: "600"},
	semiBoldText: {fontSize: 18, fontWeight: "400"},
	grayText: {color: "black"},
	blueText: {color: Color.Blue},
	redText: {color: "red"},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 25,

		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
