import {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList,} from 'react-native';
import {windowHeight, windowWidth} from "../Helper/utils";
import {Box, Center, Flex, ScrollView} from "native-base";
import Work from "../Component/Work";
import {formatTime} from "../Helper/TimeHelper";
import AddWorkModal from "../Component/AddWorkModal";
// import {MaterialCommunityIcons} from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalContext from "../Component/Context";
import Color from "../Helper/Color";
import LoadingScreen from "./LoadingScreen";

export default function TimerScreen({navigation, addModalOn, setAddModalOn})
{
    const {mainController, todayData} = useContext(GlobalContext);
    const [editMode, setEditMode] = useState(false);
    const [toggleName, setToggleName] = useState("toggle-switch-off-outline");

    if (todayData.ready === false) {
        return <LoadingScreen/>
    }

    function handleEditMode() {
        setToggleName(editMode? "toggle-switch-off-outline" : "toggle-switch-outline")
        setEditMode(!editMode);
    }

    function handleAddWork(name) {
        if (mainController.isWorkNameExist(name)) {
            alert("이미 있어요!");
            return;
        }
        mainController.addWork(name);
        setAddModalOn(false);
    }

    function handleRemoveWork(id) {
        mainController.removeWork(id);
    }

    return(
        <View style={styles.container}>
            <AddWorkModal state={addModalOn} setState={setAddModalOn} onAddButtonClick={handleAddWork} />
            <SafeAreaView style={styles.footerArea}>
                <Flex direction='row' alignItems='center' justifyContent='center' mt={3}>
                    <Box style={{flex:1}} ml={8}>
                        <Text style={styles.bannerText}>
                            Timer
                        </Text>
                    </Box>
                    <Box mr={8}>
                        <TouchableOpacity onPress={handleEditMode}>
                            <MaterialCommunityIcons color={editMode? Color.Red : 'black'} size={30} name={toggleName}/>
                        </TouchableOpacity>
                    </Box>
                </Flex>
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} style={[styles.workListArea, {maxHeight: windowHeight - 200}]}>
                <Center m={7} >
                    <Text style={styles.todayText}>Today</Text>
                    <Text style={styles.totalTime}>{formatTime(todayData.getTotalTime())}</Text>
                </Center>
                <View>
                    {todayData.workList?.map(work => (<Work key={work.updateKey} work={work} editMode={editMode} handleRemove={handleRemoveWork}/>))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {width: windowWidth, height: windowHeight, backgroundColor:'white'},
    sectionArea: {width: "100%", height: "100%",},
    workListArea: {margin: 15},
    item: {marginBottom: 50, backgroundColor: '#f9c2ff',},
    header: {fontSize: 32, backgroundColor: '#fff',},
    title: {fontSize: 24,},
    footerArea: {height: 100, width: "100%", borderRadius: 4, padding: 10, shadowColor: 'black', shadowRadius: 8, shadowOpacity: 0.07, backgroundColor: 'white' },
    todayText: {margin: 5, color:'gray'},
    bannerText: {fontWeight:'700', fontSize:16},
    rightAlignText: {textAlign: 'right'},
    totalTime: {textAlign: 'right', fontWeight: '600', fontSize: 20},
    blueText: {color: Color.Blue}
});
